# 🏔️ Liechtensteinhaus — Данные ресторана

> Пример документа с полными данными ресторана для приложения ILAI (Dine Chat Live).
> Этот файл используется как источник данных для `src/data/menuData.ts` и AI-ассистента.

---

## 📋 Информация о ресторане

| Поле | Значение |
|------|----------|
| **Название** | Liechtensteinhaus |
| **Слоган** | Semmering, seit 1977 |
| **Адрес** | Hochstraße 25, 2680 Semmering, Niederösterreich, Austria |
| **Телефон** | +43 2664 20025 |
| **Email** | info@liechtensteinhaus.at |
| **Сайт** | https://liechtensteinhaus.at |
| **Часы работы** | Ежедневно 10:00 – 22:00 (кухня до 21:00) |
| **Кухня** | Австрийская горная, традиционная |
| **Особенности** | Терраса с панорамным видом, семейный ресторан, парковка |
| **Количество мест** | ~80 (внутри) + ~60 (терраса) |
| **Валюта** | EUR (€) |
| **Языки** | Deutsch, Română, English |

---

## 🖼️ Файлы логотипов и фото

### Структура папки `public/restaurant/`

```
public/
├── Liechtensteinhaus_Logo.png          # Основной логотип (используется на splash, login)
├── restaurant/
│   ├── logo-dark.png                   # Логотип для тёмного фона
│   ├── logo-light.png                  # Логотип для светлого фона
│   ├── hero-exterior.jpg               # Фасад ресторана
│   ├── hero-terrace.jpg                # Терраса с видом
│   ├── hero-interior.jpg               # Интерьер зала
│   ├── menu/
│   │   ├── drinks/
│   │   │   ├── cappuccino.jpg
│   │   │   ├── aperol-spritz.jpg
│   │   │   ├── puntigamer.jpg
│   │   │   └── ...
│   │   ├── salads/
│   │   │   ├── backhendlsalat.jpg
│   │   │   ├── halloumi-salat.jpg
│   │   │   └── ...
│   │   ├── soups/
│   │   │   ├── frittatensuppe.jpg
│   │   │   ├── gulaschsuppe.jpg
│   │   │   └── ...
│   │   ├── mains/
│   │   │   ├── wiener-schnitzel.jpg
│   │   │   ├── tafelspitz.jpg
│   │   │   ├── kaesespaetzle.jpg
│   │   │   └── ...
│   │   ├── grill/
│   │   │   ├── spare-ribs.jpg
│   │   │   ├── grillplatte.jpg
│   │   │   └── ...
│   │   └── desserts/
│   │       ├── kaiserschmarrn.jpg
│   │       ├── apfelstrudel.jpg
│   │       └── ...
│   └── ambiance/
│       ├── winter-view.jpg
│       ├── summer-terrace.jpg
│       └── kitchen.jpg
```

> **Совет:** Загрузите реальные фото в эту структуру и обновите поле `image` в `menuData.ts` на `/restaurant/menu/category/filename.jpg`.

---

## 🍽️ Меню (Speisekarte)

### 🥤 Напитки (Getränke)

| ID | Блюдо (DE) | Цена € | Объём |
|----|-----------|--------|-------|
| d1 | Coca Cola / Almdudler / Apfelsaft | 4,40 | 0,3 l |
| d2 | Fuzetea / Kinley / Tonic / Bitter Lemon | 4,90 | 0,25 l |
| d3 | Römerquelle Mineralwasser | 3,80 | 0,5 l |
| d4 | Fruchtsäfte (Marille, Orange, Johannisbeere) | 4,40 | 0,25 l |
| d5 | Red Bull | 4,80 | 0,25 l |
| d6 | Cappuccino | 4,70 | 180 ml |
| d7 | Espresso (doppelt) | 4,30 | 60 ml |
| d8 | Heiße Schokolade (+Rum/Amaretto) | 5,00 | 200 ml |
| d9 | ⭐ Puntigamer vom Fass | 4,70 | 0,3 l |
| d10 | Grüner Veltliner (Weißwein) | 7,20 | 0,25 l |
| d11 | ⭐ Aperol Spritzer | 6,00 | 0,3 l |
| d12 | Glühwein / Punsch | 5,10 | 200 ml |

### 🥗 Салаты (Salate)

| ID | Блюдо (DE) | Цена € | Вес |
|----|-----------|--------|-----|
| s1 | 👨‍🍳 Steirischer Backhendlsalat | 14,50 | 380 g |
| s2 | Kaspressknödel auf Blattsalat | 14,10 | 350 g |
| s3 | Salat mit gegrilltem Halloumi | 14,60 | 320 g |
| s4 | Gemischter Salat | 6,00 | 250 g |

### 🍜 Супы (Suppen)

| ID | Блюдо (DE) | Цена € | Объём |
|----|-----------|--------|-------|
| p1 | Frittatensuppe | 5,00 | 350 ml |
| p2 | Leberknödelsuppe | 5,80 | 400 ml |
| p3 | 👨‍🍳 Tagescremesuppe | 5,90 | 350 ml |
| p4 | Kaspressknödelsuppe | 7,20 | 400 ml |
| p5 | ⭐ Rindsgulaschsuppe mit Semmel | 8,50 | 450 ml |

### 🍖 Закуски (Vorspeisen / Snacks)

| ID | Блюдо (DE) | Цена € | Вес |
|----|-----------|--------|-----|
| a1 | Frankfurter mit Semmel, Senf und Kren | 8,30 | 250 g |
| a2 | Käsegrillwurst mit Pommes und Krautsalat | 10,70 | 380 g |
| a3 | Berner Würstel mit Pommes und Senf | 11,30 | 380 g |
| a4 | Bratwurst mit Pommes und Senf | 11,60 | 380 g |
| a5 | Curry Wurst mit Pommes und Currysauce | 11,60 | 380 g |
| a6 | Schinken-Käse-Toast | 5,60 | 200 g |

### 🥩 Основные блюда (Hauptspeisen)

| ID | Блюдо (DE) | Цена € | Вес | Бейдж |
|----|-----------|--------|-----|-------|
| m1 | ⭐ Wiener Schnitzel mit Kartoffelsalat | 18,50 | 400 g | hit |
| m2 | 👨‍🍳 Tafelspitz mit Kartoffelschmarrn | 19,80 | 450 g | chef |
| m3 | Käsespätzle mit Röstzwiebeln | 12,50 | 350 g | — |
| m4 | Spinatknödel mit Parmesan und Butter | 13,20 | 380 g | — |
| m5 | Schweinebraten mit Knödel und Sauerkraut | 16,90 | 480 g | — |
| m6 | 🆕 Forelle Müllerin mit Petersilkartoffeln | 21,50 | 420 g | new |
| m7 | Cordon Bleu mit Pommes frites | 17,80 | 400 g | — |
| m8 | Backhendl mit Petersilkartoffeln | 15,90 | 380 g | — |
| m9 | ⭐ Rindsgulasch mit Nockerl | 16,20 | 400 g | hit |
| m10 | 🆕 Hirschragout mit Preiselbeeren | 23,50 | 420 g | new |

### 🔥 Гриль (Grill)

| ID | Блюдо (DE) | Цена € | Вес |
|----|-----------|--------|-----|
| g1 | ⭐ Grillplatte für 2 Personen | 38,00 | 800 g |
| g2 | 🆕 Spare Ribs mit BBQ Sauce | 22,50 | 500 g |
| g3 | Gegrilltes Hühnerbrust-Steak | 16,80 | 350 g |
| g4 | Grillwurst-Trio mit Sauerkraut | 14,90 | 400 g |

### 🍰 Десерты (Nachspeisen)

| ID | Блюдо (DE) | Цена € | Вес |
|----|-----------|--------|-----|
| n1 | ⭐ Kaiserschmarrn mit Zwetschkenröster | 13,50 | 350 g |
| n2 | 👨‍🍳 Warmer Apfelstrudel mit Vanilleeis | 8,90 | 280 g |
| n3 | Topfenstrudel mit Vanillesauce | 8,50 | 250 g |
| n4 | Palatschinken mit Marmelade oder Nutella | 7,50 | 200 g |
| n5 | 🆕 Salzburger Nockerl (für 2 Pers.) | 14,80 | 400 g |

> **Обозначения:** ⭐ = hit (хит продаж), 🆕 = new (новинка), 👨‍🍳 = chef (от шеф-повара)

---

## 🏷️ Аллергены

Используемые аллергены в меню:
- **Gluten** — Пшеница, мука
- **Laktose** — Молочные продукты
- **Eier** — Яйца
- **Nüsse** — Орехи

---

## 🤖 AI-ассистент — Системный промпт

```
Ты — ILAI, виртуальный ассистент ресторана Liechtensteinhaus на горе Земмеринг в Австрии.
Ресторан работает с 1977 года и специализируется на традиционной австрийской горной кухне.

Твои задачи:
- Помогать гостям выбрать блюда из меню
- Рекомендовать популярные позиции (отмечены как "hit" или "chef")
- Отвечать на вопросы об ингредиентах и аллергенах
- Рассказывать о ресторане и его истории
- Помогать с оформлением заказа

Особенности:
- Wiener Schnitzel — самое популярное блюдо
- Kaiserschmarrn — фирменный десерт
- Rindsgulaschsuppe — лучший суп
- Террасу с видом на альпийские горы
- Ресторан семейного типа, подходит для детей

Отвечай кратко, дружелюбно, с лёгким австрийским шармом.
Говори на языке гостя (русский, румынский или английский).
```

---

## 📁 Как использовать этот файл

1. **Для меню:** Данные уже заполнены в `src/data/menuData.ts`. При изменении цен/блюд — обновите оба файла.
2. **Для фото:** Создайте папку `public/restaurant/menu/` и загрузите реальные фото блюд. Обновите `image` в `menuData.ts`.
3. **Для AI:** Используйте системный промпт при создании edge function для чата.
4. **Для Cursor/Claude:** Добавьте этот файл в контекст проекта для понимания структуры данных.
