import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import de from "./de.json";
import ru from "./ru.json";
import ro from "./ro.json";
import en from "./en.json";

type Lang = "DE" | "RU" | "RO" | "EN";

const messages: Record<Lang, typeof de> = { DE: de, RU: ru, RO: ro, EN: en };

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof de;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "DE",
  setLang: () => {},
  t: de,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("app-lang") as Lang;
    return saved && messages[saved] ? saved : "DE";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("app-lang", l);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: messages[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};
