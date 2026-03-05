import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Heart } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { dishes, Dish, getDishImage } from "@/data/menuData";
import { useDishPhotos } from "@/hooks/useDishPhotos";
import BottomTabBar from "@/components/BottomTabBar";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const categories = ["all", "appetizers", "salads", "soups", "mains", "grill", "desserts", "drinks", "kids", "sides"];

const getDishName = (d: Dish, lang: string) => lang === "RO" ? d.nameRo : lang === "EN" ? d.nameEn : d.name;
const getDishDesc = (d: Dish, lang: string) => lang === "RO" ? d.descriptionRo : lang === "EN" ? d.descriptionEn : d.description;

const MenuPage = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { photoMap } = useDishPhotos();
  const [active, setActive] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const resolveImage = (dish: Dish) => photoMap.get(dish.id) ?? getDishImage(dish);

  const catLabel = (c: string) => (t.menu as Record<string, string>)[c] || c;

  const filtered = dishes.filter((d) => {
    const matchCat = active === "all" || d.category === active;
    const matchSearch = !search || getDishName(d, lang).toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const badgeLabel = (b?: string) => b ? (t.menu as Record<string, string>)[b] || b : "";

  return (
    <div className="relative flex flex-col h-screen bg-background max-w-md mx-auto overflow-hidden">
      <div className="ambient-orb w-64 h-64 bg-primary top-[-10%] right-[-20%]" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-border/50 glass-card-strong">
        <button onClick={() => navigate("/chat")} className="w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-foreground">{t.menu.title}</h2>
        <div className="flex items-center gap-1">
          <button onClick={() => setSearchOpen(!searchOpen)} className="w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground transition-all">
            <Search className="w-5 h-5" />
          </button>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Search */}
      {searchOpen && (
        <div className="relative z-10 px-4 py-2 border-b border-border/30">
          <div className="flex items-center bg-secondary/30 border border-border/50 rounded-2xl px-4 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.menu.search}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="relative z-10 px-4 py-3 overflow-x-auto flex gap-2 no-scrollbar">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              active === c
                ? "gold-gradient text-primary-foreground shadow-md"
                : "bg-secondary/30 border border-border/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {catLabel(c)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((dish) => (
            <button
              key={dish.id}
              onClick={() => navigate(`/dish/${dish.id}`)}
              className="glass-card rounded-2xl overflow-hidden text-left transition-all active:scale-[0.98]"
            >
              <div className="relative">
                <img src={resolveImage(dish)} alt={getDishName(dish, lang)} className="w-full h-[140px] object-cover" loading="lazy" />
                {dish.badge && (
                  <span className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {badgeLabel(dish.badge)}
                  </span>
                )}
              </div>
              <div className="p-3 space-y-1">
                <p className="text-sm font-semibold text-foreground line-clamp-2 leading-tight">{getDishName(dish, lang)}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{getDishDesc(dish, lang)}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-base font-bold text-primary">{dish.price} {t.common.currency}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFav(dish.id); }}
                    className="p-1"
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(dish.id) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                  </button>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
};

export default MenuPage;
