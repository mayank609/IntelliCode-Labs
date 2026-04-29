# IntelliCodeLabs — Website

A fully responsive, production-ready website for **IntelliCodeLabs** — an AI professional services company focused on healthcare insurance, logistics, and contact center engineering.

Built with **React 18 + TypeScript + Vite**.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the dev server
```bash
npm run dev
```
Visit `http://localhost:5173`

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
├── main.tsx                  # Entry point
├── App.tsx                   # Root component + scroll tracking
├── styles/
│   └── globals.css           # All global styles & CSS variables
└── components/
    ├── Navbar.tsx             # Sticky top navigation
    ├── Hero.tsx               # Full-screen hero with side nav & floating cards
    ├── Ticker.tsx             # Animated keyword ticker strip
    ├── AboutUs.tsx            # Company overview + stats
    ├── Highlights.tsx         # 4 product line cards
    ├── KeyFeatures.tsx        # Interactive feature tabs with metric card
    ├── Industries.tsx         # Healthcare / Logistics / Contact Center
    ├── Products.tsx           # TestMind, AgentForge, PromptOps, VoicePilot
    ├── HowWeHelp.tsx          # 3-step process + benefits
    ├── Testimonials.tsx       # Client testimonials with dot navigation
    ├── CTA.tsx                # Call-to-action banner
    ├── Footer.tsx             # Dark footer with nav columns & watermark
    └── ui/
        ├── Icon.tsx           # SVG icon component
        ├── Sparkline.tsx      # Mini line chart
        └── Donut.tsx          # Donut/ring chart
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#f4f4f6` |
| Accent (blue) | `oklch(0.48 0.14 232)` |
| Accent (teal) | `oklch(0.52 0.12 168)` |
| Font | Plus Jakarta Sans |
| Card radius | `20px` |

---

## 📦 Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety throughout
- **Vite** — Fast dev server & bundler
- **CSS** — Global stylesheet with CSS custom properties (no CSS-in-JS)
