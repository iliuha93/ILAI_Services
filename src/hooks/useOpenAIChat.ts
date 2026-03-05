import { useState, useCallback, useRef } from "react";
import { dishes } from "@/data/menuData";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  time: string;
}

interface APIMessage {
  role: "user" | "assistant";
  content: string;
}

const getTime = () =>
  new Date().toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" });

const buildMenuContext = (): string => {
  return dishes
    .map(
      (d) =>
        `- ${d.name} — €${d.price.toFixed(2)}, ${d.weight}, ${d.prepTime} min. Zutaten: ${d.ingredients.join(", ")}${d.allergens?.length ? `. Allergene: ${d.allergens.join(", ")}` : ""}`
    )
    .join("\n");
};

const MENU_CONTEXT = buildMenuContext();

async function streamChat({
  messages,
  menuContext,
  onDelta,
  onDone,
  onError,
}: {
  messages: APIMessage[];
  menuContext: string;
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages, menu_context: menuContext }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      if (resp.status === 429) {
        onError(errorData.error || "Слишком много запросов. Подождите немного.");
        return;
      }
      if (resp.status === 402) {
        onError(errorData.error || "Необходимо пополнить кредиты.");
        return;
      }
      onError(errorData.error || `Ошибка сервера (${resp.status})`);
      return;
    }

    if (!resp.body) {
      onError("Нет ответа от сервера");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Final flush
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }

    onDone();
  } catch (e) {
    onError(e instanceof Error ? e.message : "Ошибка подключения");
  }
}

export const useOpenAIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const historyRef = useRef<APIMessage[]>([]);

  const addMessage = useCallback((text: string, isUser: boolean): ChatMessage => {
    const msg: ChatMessage = {
      id: Date.now().toString() + Math.random(),
      text,
      isUser,
      time: getTime(),
    };
    setMessages((prev) => [...prev, msg]);
    return msg;
  }, []);

  const sendMessage = useCallback(
    async (userText: string): Promise<void> => {
      addMessage(userText, true);

      historyRef.current = [
        ...historyRef.current,
        { role: "user", content: userText },
      ];

      setIsTyping(true);

      let assistantSoFar = "";
      const assistantId = Date.now().toString() + Math.random();

      await streamChat({
        messages: historyRef.current,
        menuContext: MENU_CONTEXT,
        onDelta: (chunk) => {
          assistantSoFar += chunk;
          setMessages((prev) => {
            const existing = prev.find((m) => m.id === assistantId);
            if (existing) {
              return prev.map((m) =>
                m.id === assistantId ? { ...m, text: assistantSoFar } : m
              );
            }
            return [
              ...prev,
              { id: assistantId, text: assistantSoFar, isUser: false, time: getTime() },
            ];
          });
        },
        onDone: () => {
          historyRef.current = [
            ...historyRef.current,
            { role: "assistant", content: assistantSoFar },
          ];
          setIsTyping(false);
        },
        onError: (error) => {
          addMessage(`Ошибка: ${error}`, false);
          historyRef.current = historyRef.current.slice(0, -1);
          setIsTyping(false);
        },
      });
    },
    [addMessage]
  );

  const clearHistory = useCallback(() => {
    historyRef.current = [];
    setMessages([]);
  }, []);

  return { messages, isTyping, sendMessage, clearHistory };
};
