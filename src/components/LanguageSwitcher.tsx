import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useState, useRef, useEffect } from "react";

const langs = ["DE", "EN", "RU", "RO"] as const;

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
      >
        <Globe className="w-3.5 h-3.5" />
        {lang}
      </button>
      {open && (
        <div className="fixed right-4 mt-1 glass-card-strong rounded-xl overflow-hidden z-[100] min-w-[60px] shadow-xl border border-border/50"
          style={{ top: ref.current ? ref.current.getBoundingClientRect().bottom + 4 : 0 }}
        >
          {langs.map((l) => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              className={`block w-full px-3 py-2 text-xs font-medium text-left transition-colors ${
                l === lang ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
