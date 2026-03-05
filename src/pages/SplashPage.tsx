import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login", { replace: true }), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

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

        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
