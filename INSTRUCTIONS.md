# ILAI — Dine Chat Live — AI Agent Instructions

> This file helps AI coding assistants (Cursor, Claude, Copilot, etc.) understand the project structure, conventions, and how to extend the application.

---

## Project Overview

**ILAI** (Dine Chat Live) is a mobile-first AI-powered restaurant assistant PWA built for **La Maison** restaurant.  
It lets guests browse the menu, chat with an AI concierge, place orders, earn loyalty points, and interact via voice — all from a phone at their table.

**Live repo:** `github.com/iliuha93/dine-chat-live`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Routing | React Router v6 |
| State | React Context (CartContext, LanguageContext) |
| Backend | Supabase (Lovable Cloud) — auth, DB, edge functions, storage |
| AI | Lovable AI Gateway (`ai.gateway.lovable.dev`) via edge functions |
| Deployment | Railway (Docker + nginx) or Lovable Publish |

---

## Directory Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui primitives (DO NOT edit manually)
│   ├── BottomTabBar.tsx  # Main tab navigation (Chat, Menu, Cart, Profile)
│   ├── LanguageSwitcher.tsx
│   └── NavLink.tsx
├── data/
│   └── menuData.ts      # Static dish catalog (Dish interface + dishes[])
├── hooks/               # Custom React hooks
├── i18n/
│   ├── LanguageContext.tsx  # i18n provider (ru/ro/en)
│   ├── ru.json
│   ├── ro.json
│   └── en.json
├── integrations/
│   └── supabase/        # Auto-generated — DO NOT EDIT
├── pages/
│   ├── SplashPage.tsx        # 2s animated splash → /login
│   ├── LoginPage.tsx         # Auth screen (Google, Facebook, Guest)
│   ├── ChatPage.tsx          # AI chat interface
│   ├── RealtimePage.tsx      # Voice assistant (push-to-talk)
│   ├── MenuPage.tsx          # Menu with categories, search, grid
│   ├── DishDetailPage.tsx    # Single dish detail + add to cart
│   ├── CartPage.tsx          # Order summary + checkout
│   ├── OrderConfirmationPage.tsx
│   ├── LoyaltyPage.tsx       # Points & rewards
│   └── ProfilePage.tsx       # User settings
├── store/
│   └── CartContext.tsx   # Global cart state (add/remove/clear)
├── index.css            # Design system tokens & utility classes
└── App.tsx              # Routes & providers
```

---

## Route Map

| Path | Page | Auth Required |
|------|------|--------------|
| `/` | SplashPage | No |
| `/login` | LoginPage | No |
| `/chat` | ChatPage | No (guest allowed) |
| `/live` | RealtimePage | No |
| `/menu` | MenuPage | No |
| `/dish/:id` | DishDetailPage | No |
| `/cart` | CartPage | No |
| `/order-confirmation` | OrderConfirmationPage | No |
| `/loyalty` | LoyaltyPage | No |
| `/profile` | ProfilePage | No |

---

## Design System

### Colors (HSL, defined in `index.css :root`)

All colors use CSS custom properties. **Never hardcode colors in components.**

| Token | Purpose |
|-------|---------|
| `--background` | App background (dark: `20 14% 8%`) |
| `--foreground` | Primary text |
| `--primary` | Gold accent (`38 70% 50%`) |
| `--card` | Card surfaces |
| `--muted` / `--muted-foreground` | Subdued elements |
| `--destructive` | Errors, recording state |
| `--chat-bubble-user` / `--chat-bubble-bot` | Chat message backgrounds |
| `--mic-active` | Mic recording indicator |

### Fonts

| Variable | Font | Usage |
|----------|------|-------|
| `--font-display` | Playfair Display | Headings, restaurant name |
| `--font-body` | Inter | Body text, UI |
| `--font-elegant` | Cormorant Garamond | Slogans, descriptions |

### Utility Classes (defined in `index.css`)

- `gold-gradient` — Primary gold gradient background
- `gold-text` — Gold gradient text
- `glass-card` / `glass-card-strong` — Frosted glass surfaces
- `glow-pulse` — Pulsing gold glow animation
- `shimmer` — Horizontal shimmer effect
- `ambient-orb` — Blurred decorative background orb
- `animate-fade-up` — Fade in from below
- `safe-bottom` — Safe area padding for mobile
- `no-scrollbar` — Hide scrollbar

---

## Internationalization (i18n)

Three languages: **Russian (ru)**, **Romanian (ro)**, **English (en)**.

```tsx
import { useLanguage } from "@/i18n/LanguageContext";

const { t, language, setLanguage } = useLanguage();
// Access: t.menu.title, t.chat.placeholder, etc.
```

Translation files: `src/i18n/{ru,ro,en}.json`  
When adding new strings, update **all three** files.

---

## Cart State

```tsx
import { useCart } from "@/store/CartContext";

const { items, addItem, removeItem, clearCart } = useCart();
// items: Array<{ dish: Dish; qty: number }>
```

---

## Menu Data

Static catalog in `src/data/menuData.ts`.  
Each `Dish` has multilingual fields: `name` / `nameRo` / `nameEn`.

Categories: `appetizers`, `salads`, `soups`, `mains`, `grill`, `desserts`, `drinks`  
Badges: `hit`, `new`, `chef`

---

## What Needs Implementation (TODO)

### 1. Authentication (Priority: High)
- Connect Google & Facebook OAuth via Supabase Auth
- Implement proper sign-in/sign-out flow
- Create `profiles` table for user data
- Currently all auth buttons just navigate to `/chat` (mock)

### 2. AI Chat Integration (Priority: High)
- Create edge function `supabase/functions/chat/index.ts`
- Use Lovable AI Gateway: `https://ai.gateway.lovable.dev/v1/chat/completions`
- System prompt should know the restaurant menu and act as a concierge
- Implement SSE streaming in ChatPage
- Currently uses `simulateReply()` with static responses

### 3. Voice / Realtime Mode (Priority: Medium)
- Integrate Web Speech API or ElevenLabs for STT/TTS
- Connect to the same AI backend as chat
- RealtimePage currently has UI only, no real voice processing

### 4. Database — Orders & History (Priority: Medium)
- Create `orders` table (user_id, items, total, status, table_number, created_at)
- Save orders on checkout instead of just showing confirmation
- Order history in ProfilePage

### 5. Loyalty System (Priority: Low)
- Create `loyalty_points` table
- Track points per order
- Rewards redemption
- Currently shows mock data

### 6. Menu from Database (Priority: Low)
- Move dishes to Supabase table
- Admin panel for menu management
- Real-time menu updates

---

## Backend Conventions

### Edge Functions
- Location: `supabase/functions/<function-name>/index.ts`
- Always include CORS headers
- Use `LOVABLE_API_KEY` (auto-provisioned) for AI Gateway
- Handle 429 (rate limit) and 402 (payment required) errors

### Database
- Never reference `auth.users` directly — use a `profiles` table
- Always add RLS policies
- Use validation triggers instead of CHECK constraints

### Supabase Client
```tsx
import { supabase } from "@/integrations/supabase/client";
```
**Never edit** `src/integrations/supabase/client.ts` or `types.ts`.

---

## Environment Variables

Available via Vite:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

---

## Deployment

### Railway (Docker)
- `Dockerfile` + `nginx.conf` included
- Uses `PORT` env variable from Railway
- Build: `npm run build` → serve via nginx

### Lovable
- Click Share → Publish in the Lovable editor

---

## Coding Conventions

1. **Mobile-first**: All pages use `max-w-md mx-auto` and safe-area padding
2. **Dark theme only**: No light mode support currently
3. **Semantic tokens**: Always use Tailwind classes from the design system, never raw colors
4. **Component size**: Keep pages under 200 lines; extract sections into components
5. **Animations**: Use CSS animations from `index.css` or `framer-motion`
6. **No `any`**: Use proper TypeScript interfaces
7. **i18n**: All user-facing strings must come from translation files

---

## Quick Start for AI Agents

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# The app runs at http://localhost:8080
```

When implementing a feature:
1. Check this file for existing conventions
2. Read relevant page/component files first
3. Update all 3 translation files if adding UI text
4. Use design system tokens from `index.css`
5. Test on mobile viewport (375px width)
