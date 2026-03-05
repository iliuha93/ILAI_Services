import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const langLabels: Record<string, { flag: string; label: string }> = {
  DE: { flag: "🇩🇪", label: "Deutsch" },
  EN: { flag: "🇬🇧", label: "English" },
  RU: { flag: "🇷🇺", label: "Русский" },
  RO: { flag: "🇷🇴", label: "Română" },
};

const SplashPage = () => {
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();
  const [showLangPicker, setShowLangPicker] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLangPicker(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background overflow-hidden">
      <div className="ambient-orb w-72 h-72 bg-primary top-[-5%] left-[-10%]" />
      <div className="ambient-orb w-96 h-96 bg-primary bottom-[-15%] right-[-15%]" />

      <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-up">
        <div style={{ animation: "fade-in 0.6s ease-out, scale-in 0.6s ease-out" }}>
          <img
            src="/Liechtensteinhaus_Logo.png"
            alt="Liechtensteinhaus"
            className="w-28 h-28 rounded-full object-cover drop-shadow-xl border-2 border-primary/30"
          />
        </div>

        <div className="text-center space-y-1.5">
          <h1 className="text-[40px] font-bold gold-text tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Liechtensteinhaus
          </h1>
          <p className="text-muted-foreground text-sm italic" style={{ fontFamily: "var(--font-elegant)" }}>
            Semmering, seit 1977
          </p>
        </div>

        {showLangPicker ? (
          <div className="flex flex-col items-center gap-4 animate-fade-up">
            <p className="text-muted-foreground text-xs">Sprache wählen / Choose language</p>
            <div className="flex gap-2 flex-wrap justify-center">
              {Object.entries(langLabels).map(([code, { flag, label }]) => (
                <button
                  key={code}
                  onClick={() => setLang(code as any)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                    lang === code
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  <span className="text-lg">{flag}</span>
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={handleContinue}
              className="mt-4 px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-medium text-sm transition-all hover:opacity-90 active:scale-[0.97]"
            >
              {lang === "DE" ? "Weiter" : lang === "RU" ? "Далее" : lang === "RO" ? "Continuă" : "Continue"}
            </button>
          </div>
        ) : (
          <div className="flex gap-2 mt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashPage;
