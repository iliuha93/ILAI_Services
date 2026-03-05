import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, FileText, Heart, Star, Bell, Info, ChevronRight, LogOut, Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import BottomTabBar from "@/components/BottomTabBar";

const langOptions = [
  { code: "DE", flag: "🇩🇪", label: "Deutsch" },
  { code: "EN", flag: "🇬🇧", label: "English" },
  { code: "RU", flag: "🇷🇺", label: "Русский" },
  { code: "RO", flag: "🇷🇴", label: "Română" },
] as const;

const ProfilePage = () => {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  const [showLangPicker, setShowLangPicker] = useState(false);

  const menuItems = [
    { icon: Globe, label: t.profile.language, value: langOptions.find(l => l.code === lang)?.flag + " " + lang, onClick: () => setShowLangPicker(!showLangPicker) },
    { icon: FileText, label: t.profile.orders_history, onClick: () => {} },
    { icon: Heart, label: t.profile.favorites, onClick: () => {} },
    { icon: Star, label: t.profile.loyalty, value: "Gold", onClick: () => navigate("/loyalty") },
    { icon: Bell, label: t.profile.notifications, onClick: () => {} },
    { icon: Info, label: t.profile.about, onClick: () => {} },
  ];

  return (
    <div className="relative flex flex-col h-screen bg-background max-w-md mx-auto overflow-hidden">
      <div className="ambient-orb w-64 h-64 bg-primary top-[-10%] right-[-20%]" />

      <header className="relative z-10 flex items-center justify-center px-4 py-3 border-b border-border/50 glass-card-strong">
        <h2 className="text-lg font-semibold text-foreground">{t.profile.title}</h2>
      </header>

      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full border-2 border-primary gold-gradient flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">Г</span>
          </div>
          <p className="text-lg font-semibold text-foreground">{t.profile.guest}</p>
          <p className="text-sm text-muted-foreground">{t.profile.guest_hint}</p>
        </div>

        {/* Settings list */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {menuItems.map(({ icon: Icon, label, value, onClick }, i) => (
            <div key={label}>
              <button
                onClick={onClick}
                className={`w-full flex items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-secondary/20 ${
                  i < menuItems.length - 1 && !(i === 0 && showLangPicker) ? "border-b border-border/30" : ""
                }`}
              >
                <Icon className="w-5 h-5 text-muted-foreground shrink-0" />
                <span className="flex-1 text-sm text-foreground">{label}</span>
                {value && <span className="text-xs text-muted-foreground mr-1">{value}</span>}
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${i === 0 && showLangPicker ? "rotate-90" : ""}`} />
              </button>

              {/* Language picker dropdown */}
              {i === 0 && showLangPicker && (
                <div className="border-b border-border/30 bg-secondary/10">
                  {langOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setLang(opt.code as any);
                        setShowLangPicker(false);
                      }}
                      className="w-full flex items-center gap-3 px-6 py-3 text-left transition-colors hover:bg-secondary/20"
                    >
                      <span className="text-lg">{opt.flag}</span>
                      <span className="flex-1 text-sm text-foreground">{opt.label}</span>
                      {lang === opt.code && <Check className="w-4 h-4 text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-border/50 text-destructive text-sm font-medium transition-all hover:border-destructive/30 active:scale-[0.98]"
        >
          <LogOut className="w-4 h-4" />
          {t.profile.logout}
        </button>

        <p className="text-[10px] text-muted-foreground text-center">{t.profile.version}</p>
      </div>

      <BottomTabBar />
    </div>
  );
};

export default ProfilePage;