# Design System - Rent4uSolutions

Rent4uSolutions is designed with a premium, luxury brand feel. It integrates standard light and dark mode mappings with gold/bronze accents to convey exclusive, high-value real estate opportunities.

---

## 🎨 Color Palette & Variables

The colors are defined as native CSS variables inside the Tailwind v4 layers within [globals.css](file:///d:/SpaceX/۔کام/Learn%20with%20Hammad/Mustafa%20Rent/Rent4You%20New/app/globals.css):

| CSS Variable | Token Name | Light Mode Value | Dark Mode Value | Usage / Notes |
| :--- | :--- | :--- | :--- | :--- |
| `--background` | `background` | `#F8FAFC` (Slate 50) | `#05070D` (Very dark blue) | Site body background |
| `--surface` | `surface` | `#FFFFFF` | `#0B1220` (Dark slate-blue) | Component cards and sections |
| `--foreground` | `foreground` | `#0F172A` (Slate 900) | `#FFFFFF` | Main typography |
| `--muted` | `muted-text` | `#475569` (Slate 600) | `#CBD5E1` (Slate 300) | Descriptions and secondary copy |
| `--gold` | `gold` | `#D4A017` | `#D4A017` | Brand accent: borders, text links, buttons |
| `--border-color` | `border-subtle` | `#E2E8F0` (Slate 200) | `rgba(255, 255, 255, 0.12)` | Subtle divider lines and boundaries |

---

## 🔧 Tailwind CSS v4 Theme Mapping

Tailwind CSS v4 configures tokens using native CSS custom properties within the `@theme` block:

```css
@theme {
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-foreground: var(--foreground);
  --color-muted-text: var(--muted);
  --color-gold: var(--gold);
  --color-border-subtle: var(--border-color);
}
```

---

## ✍ Typography & Headings

- **Primary Font**: `Plus Jakarta Sans` (`--font-sans`). Imported dynamically from Google Fonts using `next/font/google` within [layout.tsx](file:///d:/SpaceX/۔کام/Learn%20with%20Hammad/Mustafa%20Rent/Rent4You%20New/app/layout.tsx):
  ```typescript
  const pjs = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-sans',
  });
  ```
- **Base Style Configuration**: The font variable is injected into the root HTML tag. The default typography properties applied to the body are:
  - `.font-sans` - Applies `Plus Jakarta Sans`.
  - `.antialiased` - Premium text rendering.
  - `.text-foreground bg-background` - Adapts dynamically to light and dark modes.
  - `.selection:bg-gold/20 selection:text-gold` - Custom selection color override.

---

## ✨ Premium Visual Enhancements & Utility Styles

### 1. Glassmorphism
Used heavily on navigation wrappers (e.g., sticky Navbar scrolled state):
- `bg-surface/80`
- `backdrop-blur-md`
- `border-b border-border-subtle`

### 2. Radial Glowing Accents
Subtle radial gradients that appear on card hover actions to elevate interactions:
- `bg-gold/5` or `bg-gold/10` combined with a blur layer: `blur-[100px]` or `blur-3xl`.
- Example implementation found in `WhyPartner` and `SampleDealPack` components.

### 3. Responsive Curves
Sections that sit over parallax headers utilize responsive borders:
- `rounded-t-[40px]` combined with negative margins `mt-[-2px]` to prevent edge-gapping during scrolling layouts.
