import { useNavigate } from "react-router-dom";
import { UtensilsCrossed, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogin = () => navigate("/chat");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 overflow-hidden">
      <div className="ambient-orb w-72 h-72 bg-primary top-[-5%] left-[-10%]" />
      <div className="ambient-orb w-96 h-96 bg-primary bottom-[-15%] right-[-15%]" />
      <div className="ambient-orb w-48 h-48 bg-destructive top-[60%] left-[10%] opacity-[0.06]" />

      {/* Language switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent via-primary/20 to-transparent" />

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-10">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 animate-fade-up">
          <div className="relative">
            <div className="w-24 h-24 rounded-full gold-gradient flex items-center justify-center shadow-xl glow-pulse">
              <UtensilsCrossed className="w-11 h-11 text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
          </div>
          <div className="text-center space-y-1.5">
            <h1 className="text-4xl font-bold gold-text tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              {t.common.restaurant_name}
            </h1>
            <p className="text-muted-foreground text-sm italic" style={{ fontFamily: "var(--font-elegant)" }}>
              {t.common.slogan}
            </p>
          </div>
        </div>

        <div className="animate-fade-up text-center space-y-1" style={{ animationDelay: "0.1s" }}>
          <p className="text-foreground text-lg font-medium" style={{ fontFamily: "var(--font-elegant)" }}>
            {t.auth.welcome}
          </p>
          <p className="text-muted-foreground text-xs">{t.auth.subtitle}</p>
        </div>

        <div className="w-full flex flex-col gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <button onClick={handleLogin} className="group w-full flex items-center gap-3 rounded-2xl glass-card-strong px-5 py-4 text-sm font-medium text-foreground transition-all hover:border-primary/30 active:scale-[0.98] hover:shadow-lg hover:shadow-primary/5">
            <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors">
              <GoogleIcon />
            </div>
            <div className="text-left">
              <span className="block text-foreground text-sm font-medium">{t.auth.google_signin}</span>
              <span className="block text-muted-foreground text-[10px]">{t.auth.google_desc}</span>
            </div>
          </button>

          <button onClick={handleLogin} className="group w-full flex items-center gap-3 rounded-2xl glass-card-strong px-5 py-4 text-sm font-medium text-foreground transition-all hover:border-primary/30 active:scale-[0.98] hover:shadow-lg hover:shadow-primary/5">
            <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors">
              <FacebookIcon />
            </div>
            <div className="text-left">
              <span className="block text-foreground text-sm font-medium">{t.auth.facebook_signin}</span>
              <span className="block text-muted-foreground text-[10px]">{t.auth.facebook_desc}</span>
            </div>
          </button>

          {/* Guest button */}
          <button onClick={handleLogin} className="w-full rounded-2xl border border-border/50 px-5 py-4 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:border-primary/30 active:scale-[0.98]">
            {t.auth.guest_continue}
          </button>
        </div>

        <div className="w-full h-px shimmer animate-fade-up" style={{ animationDelay: "0.3s" }} />

        <p className="text-muted-foreground text-[10px] text-center max-w-[240px] animate-fade-up leading-relaxed" style={{ animationDelay: "0.35s" }}>
          {t.auth.terms}
        </p>

        {/* ILAI Services branding */}
        <div className="animate-fade-up flex flex-col items-center gap-1 mt-2" style={{ animationDelay: "0.4s" }}>
          <p className="text-muted-foreground/60 text-[9px] tracking-widest uppercase">Powered by</p>
          <p className="text-muted-foreground text-xs font-semibold tracking-wide">ILAI Services</p>
        </div>
      </div>
    </div>
  );
};

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default LoginPage;
