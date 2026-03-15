# xCloud Design System — Playground

A full interactive component playground and design-token inspector for the **xCloud Design System**, built on Next.js 16, React 19, Tailwind CSS v4, and shadcn/ui v4.

## Overview

The playground showcases every component in the xCloud UI library (~55 components) and lets designers and engineers inspect the exact design tokens behind any rendered element — just long-press any part of the page.

## Features

- **Full component gallery** — all ~55 shadcn/ui v4 components in one page, organized by category
- **Token Inspector** — long-press (500 ms) any element to open a right-panel showing:
  - Color tokens (resolved from computed CSS → Figma primitive + semantic variable names)
  - Typography tokens (font family, size, weight, line-height, letter-spacing)
  - Spacing tokens (padding, margin, width, height mapped to `spacing-*` scale)
  - Border-radius tokens (mapped to xCloud radius scale)
- **Light / Dark mode** toggle
- **Zero-error TypeScript** — strict mode, clean `tsc --noEmit`
- **Tailwind v4 CSS-variable theming** — complete two-layer token architecture (`--primitive-*` → semantic vars → Tailwind utilities)

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | Next.js 16 (App Router) |
| UI primitives | @base-ui/react |
| Component library | shadcn/ui v4 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript (strict) |
| Charts | Recharts |
| Drawer | Vaul |
| Toasts | Sonner |
| OTP input | input-otp |
| Date picker | react-day-picker v9 |
| Carousel | embla-carousel-react |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Token Inspector Usage

1. Hover over any component on the playground page
2. **Long-press** (hold for 0.5 s) to trigger the Token Inspector
3. A slide-in panel appears on the right showing all resolved design tokens for that element
4. Click the **×** button or press **Escape** to close

### Token Color Map

The inspector resolves computed `rgb()` values back to both the Figma primitive token (e.g. `--primitive-blue-500`) and the semantic alias (e.g. `--primary`, `--brand`), covering:

- Blue scale (25–950) → Brand / Primary
- Light-shade scale (25–950) → Surface tokens (light mode)
- Dark-shade scale (25–950) → Surface tokens (dark mode)
- Green scale → Success / Positive status
- Orange scale → Warning / Caution status
- Red scale → Error / Destructive status

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 theme + all CSS custom properties
│   ├── layout.tsx
│   └── page.tsx             # Full component playground
├── components/
│   ├── theme-provider.tsx
│   ├── ui/                  # ~55 shadcn/ui v4 components
│   └── xcloud/
│       └── token-inspector.tsx   # Long-press inspector + token resolution
├── hooks/
│   └── use-mobile.tsx
└── lib/
    ├── tokens.ts            # Design token definitions
    └── utils.ts
```

## Changelog

### v1.1.0 — Token Inspector + Full Component Gallery (2026-03-15)

#### Added
- **Token Inspector** with long-press interaction (500 ms threshold)
  - Color token resolution: computed RGB → primitive + semantic CSS variable names
  - Typography panel: font-family, size, weight, line-height, letter-spacing
  - Spacing panel: padding/margin/width/height mapped to xCloud spacing scale
  - Border-radius panel: mapped to xCloud radius scale
- Complete `COLOR_TOKEN_MAP` covering all Figma primitive tokens:
  - Blue 25–950 (Brand/Primary)
  - Light Shade 25–950 (Surface, light mode)
  - Dark Shade 25–950 (Surface, dark mode)
  - Green 25–950 (Success/Positive)
  - Orange 25–950 (Warning/Caution)
  - Red 25–950 (Error/Destructive)
- `SPACING_TOKEN_MAP` mapping pixel values → `spacing-*` token names
- Full component playground with all ~55 shadcn/ui v4 components:
  - Layout: Card, Separator, Aspect Ratio, Resizable Panels
  - Overlay: Dialog, Alert Dialog, Sheet, Drawer, Popover, Hover Card, Tooltip
  - Navigation: Breadcrumb, Tabs, Navigation Menu, Pagination, Menubar, Sidebar
  - Forms: Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider, Toggle, Toggle Group, OTP Input, Native Select, Field, Input Group
  - Data display: Table, Calendar, Chart (Bar, Line, Area, Pie), Avatar, Badge, Alert, Progress, Skeleton, Spinner, Item, Empty, Kbd
  - Feedback: Toast (Sonner), Command palette, Dropdown Menu, Context Menu, Collapsible, Accordion, Carousel, Scroll Area

#### Fixed
- All TypeScript strict-mode errors (0 errors on `tsc --noEmit`)
- base-ui trigger `render` prop pattern (replaces deprecated `asChild`)
- Vaul `DrawerTrigger`/`DrawerClose` — styled via `className` (no `render` support)
- base-ui `Accordion` — removed invalid `type="single" collapsible` props
- base-ui `Slider` `onValueChange` signature mismatch
- `ResizablePanelGroup` — corrected `direction` → `orientation`
- base-ui `ToggleGroup` — converted to controlled state to eliminate "uncontrolled" console warning
- `Empty` component — switched to correct sub-component API (`EmptyHeader`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`)
- `Spinner` — replaced invalid `size` prop with `className`

### v1.0.0 — Initial scaffold (2026-03-01)

- Next.js 16 + Tailwind CSS v4 project bootstrapped
- shadcn/ui v4 component library installed
- Base UI primitives wired up
- Two-layer CSS custom property token architecture in `globals.css`

## License

MIT
