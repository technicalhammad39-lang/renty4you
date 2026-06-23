# Project Overview - Rent4uSolutions

Rent4uSolutions is a highly premium, interactive, and responsive web application designed for UK property investors. The platform showcases investment opportunities and sourcing strategies, with a particular focus on compliance and cashflow optimization.

---

## 🎯 Target Audience & Value Proposition

- **Audience**: Property investors, Airbnb operators, and landlords looking for packaged Rent-to-Rent (R2R), Serviced Accommodation (SA), and Council Sourcing deals.
- **Value Proposition**: 
  - Save time by avoiding constant agent outreach.
  - Transparent, packaged opportunities presented like institutional investor reports.
  - Rigorous sourcing-level compliance checks (e.g., PRS, ICO registration in progress, planning permissions, lease terms).
  - Realistic and conservative cashflow projections to build long-term trust.

---

## 🛠 Tech Stack & Modern Tooling

The application leverages a modern, cutting-edge front-end stack:
- **Core Framework**: [Next.js (v15.4.0)](https://nextjs.org/) utilizing the **App Router** structure.
- **Runtime & Library**: [React 19](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/).
- **Styling**: [TailwindCSS (v4.0.0-beta/stable/next)](https://tailwindcss.com/) with PostCSS configuration, establishing unified semantic custom variables (`--background`, `--surface`, `--foreground`, `--gold`, `--muted`, `--border-color`).
- **Smooth Scrolling**: [Lenis (v1.1.0)](https://github.com/darkroomengineering/lenis) for premium, fluid kinetic scrolling dynamics.
- **Animations**:
  - [GSAP (v3.12.5)](https://gsap.com/) & [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) for scroll-bound parallax, fades, slide-ins, and complex timeline-driven visual reveals.
  - [Framer Motion](https://www.framer.com/motion/) for element-level transitions, entrance animations, and slide deck fade animations.
- **Icons**: [Phosphor Icons (`@phosphor-icons/react`)](https://phosphoricons.com/) for a sleek, consistent iconography style across the site.
- **Dark Mode**: [next-themes (v0.3.0)](https://github.com/pacocoursey/next-themes) for automatic system theme detection and manual light/dark toggle.

---

## 📁 Directory Structure & File Mapping

```
Rent4You New/
├── app/
│   ├── globals.css        # Global CSS rules, custom CSS variables, custom Lenis rules
│   ├── layout.tsx         # Root layout configuration, typography settings, Providers wrapper
│   └── page.tsx           # Home page assembling all sections
├── components/            # Reusable UI component sections
│   ├── compliance-strip.tsx   # Sourcing standard check details (PRS, ICO)
│   ├── contact.tsx            # Contact form and quick action channels (WhatsApp, Calendly)
│   ├── core-strategies.tsx    # Details of strategies (SA, Council Leasing, R2R)
│   ├── deal-pack.tsx          # Mock interactive dashboard representation of a deal pack
│   ├── faq.tsx                # Expandable accordion FAQs with CSS-grid row transitions
│   ├── footer.tsx             # Quick links, legal disclaimers, compliance status
│   ├── hero.tsx               # Parallax header with background slides and GSAP-bound scroll blur
│   ├── navbar.tsx             # Responsive, backdrop-blur sticky navbar with theme switcher
│   ├── pricing.tsx            # Sourcing fee schedules (Reservation and Completion phases)
│   ├── process-workflow.tsx   # Interactive vertical timeline showing search/delivery stages
│   ├── providers.tsx          # ThemeProvider and smooth scroll (Lenis + GSAP) initialization
│   ├── sample-deal-pack.tsx   # E-mail form that triggers mockup file downloads
│   └── why-partner.tsx        # Highlight check list and brand benefits
├── hooks/
│   └── use-mobile.ts      # Custom hook to detect mobile viewport size (breakpoint: 768px)
├── lib/
│   └── utils.ts           # Styling utility class merging (clsx + tailwind-merge)
├── docs/                  # Project documentation folder [NEW]
├── package.json           # Package dependencies, build scripts, dev tools
├── tsconfig.json          # TypeScript compilation settings
└── next.config.ts         # Next.js configurations (Remote patterns, Standalone target, Webpack custom options)
```
