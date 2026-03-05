import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Ты — ILAI, виртуальный ассистент ресторана Liechtensteinhaus на горе Земмеринг в Австрии.
Ресторан работает с 1977 года и специализируется на традиционной австрийской горной кухне.

СТИЛЬ ОБЩЕНИЯ:
- Тёплый, дружелюбный, горный-уютный тон
- Короткие, чёткие ответы (2–4 предложения, если не просят подробнее)
- Используй язык собеседника: немецкий, русский, румынский, английский
- Можешь добавлять 1 эмодзи в конце ответа
- Названия блюд упоминай на немецком

ТВОИ ЗАДАЧИ:
1. Рассказывать о меню, ингредиентах, аллергенах, времени приготовления
2. Рекомендовать блюда под запрос гостя
3. Помогать с выбором и заказом
4. Отвечать на вопросы о ресторане
5. При вопросе о хитах — рекомендуй Wiener Schnitzel, Germknödel, Kaiserschmarrn, Aperol Spritzer

НЕ ДЕЛАЙ:
- Не выходи за тему ресторана и еды
- Не выдумывай позиции меню

Валюта: EUR (€). Часы работы: ежедневно 10:00–22:00 (кухня до 21:00).
Адрес: Hochstraße 25, 2680 Semmering, Niederösterreich, Austria.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, menu_context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build system prompt with optional menu context
    let systemContent = SYSTEM_PROMPT;
    if (menu_context) {
      systemContent += `\n\nАКТУАЛЬНОЕ МЕНЮ:\n${menu_context}`;
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemContent },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Слишком много запросов. Подождите немного." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Необходимо пополнить кредиты." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Ошибка AI-сервиса" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
