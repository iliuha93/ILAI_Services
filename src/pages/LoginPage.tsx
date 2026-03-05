import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { lovable } from "@/integrations/lovable/index";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState<"google" | "apple" | null>(null);

  const handleGoogleLogin = async () => {
    setLoading("google");
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result?.error) {
      toast({ title: "Ошибка входа", description: String(result.error), variant: "destructive" });
      setLoading(null);
    } else if (!result?.redirected) {
      navigate("/chat", { replace: true });
    }
  };

  const handleAppleLogin = async () => {
    setLoading("apple");
    const result = await lovable.auth.signInWithOAuth("apple", {
      redirect_uri: window.location.origin,
    });
    if (result?.error) {
      toast({ title: "Ошибка входа", description: String(result.error), variant: "destructive" });
      setLoading(null);
    } else if (!result?.redirected) {
      navigate("/chat", { replace: true });
    }
  };

  const handleGuestLogin = () => navigate("/chat");

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
          <img
            src="/Liechtensteinhaus_Logo.png"
            alt="Liechtensteinhaus"
            className="w-28 h-28 object-contain drop-shadow-xl"
          />
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
          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading !== null}
            className="group w-full flex items-center gap-3 rounded-2xl glass-card-strong px-5 py-4 text-sm font-medium text-foreground transition-all hover:border-primary/30 active:scale-[0.98] hover:shadow-lg hover:shadow-primary/5 disabled:opacity-60 disabled:pointer-events-none"
          >
            <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors">
              {loading === "google" ? <Spinner /> : <GoogleIcon />}
            </div>
            <div className="text-left">
              <span className="block text-foreground text-sm font-medium">
                {loading === "google" ? "Подключаемся..." : t.auth.google_signin}
              </span>
              <span className="block text-muted-foreground text-[10px]">{t.auth.google_desc}</span>
            </div>
          </button>

          {/* Apple */}
          <button
            onClick={handleAppleLogin}
            disabled={loading !== null}
            className="group w-full flex items-center gap-3 rounded-2xl glass-card-strong px-5 py-4 text-sm font-medium text-foreground transition-all hover:border-primary/30 active:scale-[0.98] hover:shadow-lg hover:shadow-primary/5 disabled:opacity-60 disabled:pointer-events-none"
          >
            <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors">
              {loading === "apple" ? <Spinner /> : <AppleIcon />}
            </div>
            <div className="text-left">
              <span className="block text-foreground text-sm font-medium">
                {loading === "apple" ? "Подключаемся..." : (t.auth as any).apple_signin || "Войти через Apple"}
              </span>
              <span className="block text-muted-foreground text-[10px]">{(t.auth as any).apple_desc || "Быстрый и безопасный вход"}</span>
            </div>
          </button>

          {/* Guest button */}
          <button
            onClick={handleGuestLogin}
            disabled={loading !== null}
            className="w-full rounded-2xl border border-border/50 px-5 py-4 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:border-primary/30 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
          >
            {t.auth.guest_continue}
          </button>
        </div>

        <div className="w-full h-px shimmer animate-fade-up" style={{ animationDelay: "0.3s" }} />

        <p className="text-muted-foreground text-[10px] text-center max-w-[240px] animate-fade-up leading-relaxed" style={{ animationDelay: "0.35s" }}>
          {t.auth.terms}
        </p>

        {/* ILAI Services branding */}
        <div className="animate-fade-up flex flex-col items-center gap-0.5" style={{ animationDelay: "0.4s" }}>
          <p className="text-muted-foreground/60 text-[9px] tracking-widest uppercase">Powered by</p>
          <p className="text-muted-foreground text-xs font-semibold tracking-wide">ILAI Services</p>
        </div>
      </div>
    </div>
  );
};

const Spinner = () => (
  <svg className="animate-spin w-5 h-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.52-3.23 0-1.44.62-2.2.44-3.06-.4C3.12 15.55 3.89 8.65 8.9 8.35c1.27.07 2.15.73 2.9.78.95-.19 1.86-.84 2.89-.76 1.39.12 2.42.72 3.08 1.83-2.83 1.7-2.16 5.42.38 6.46-.53 1.4-1.22 2.78-2.1 3.62zM12.03 8.26C11.88 5.8 13.88 3.82 16.2 3.63c.34 2.79-2.52 4.88-4.17 4.63z" />
  </svg>
);

export default LoginPage;
