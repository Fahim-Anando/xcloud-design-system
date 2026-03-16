/**
 * xCloud Design System — Token Constants (JS/TS layer)
 * Source: Figma export — Tokens.zip + Premetives.zip
 *
 * Use CSS variables in components (bg-primary, text-foreground, etc.)
 * Use these constants only when you need token values in JavaScript
 * (e.g. Framer Motion keyframes, canvas drawing, chart config).
 */

export const tokens = {
  colors: {
    // ── Blue scale — 13 steps ──────────────────────────────
    blue: {
      25: "#DDECFF", 50: "#BCD9FF", 100: "#9AC6FF",
      200: "#79B3FF", 300: "#57A0FF", 400: "#368DFF",
      500: "#147AFF", // brand primary
      600: "#1169DB", // hover light
      700: "#0E57B6", // hover dark
      800: "#0B4692", 900: "#09346D", 950: "#062349",
      A100: "#031124",
    },
    // ── Light shades (light mode neutral) ──────────────────
    lightShades: {
      25:  "#FFFFFF", 50:  "#FAFBFC", 100: "#F2F5F7",
      200: "#EDF0F2", 300: "#E4E7EB",
      400: "#8B939E", 500: "#737985", 600: "#535865",
      700: "#40444F", 800: "#2D313B", 900: "#1F2128", 950: "#181A1F",
    },
    // ── Dark shades (dark mode neutral) ────────────────────
    darkShades: {
      25:  "#E9EBED", 50:  "#CBCFD5", 100: "#B0B6BF",
      200: "#89909D", 300: "#737A85", 400: "#515A67",
      500: "#373E4A", 600: "#333842", 700: "#292E39",
      800: "#23272D", 900: "#1F2328", 950: "#181B1F",
    },
    // ── Status — 13 steps each ─────────────────────────────
    green: {
      25: "#C0E4CD", 50: "#A5DCB9", 100: "#8BD4A6",
      200: "#70CC93", 300: "#55C480", 400: "#3ABB6D",
      500: "#1DC35A", 600: "#18AD4F", 700: "#149744",
      800: "#10813A", 900: "#0C6A2F", 950: "#095525",
      A100: "#1E3F30",
    },
    orange: {
      25: "#FEEEDC", 50: "#FFDEBB", 100: "#FDC68C",
      200: "#FCB264", 300: "#F5923F", 400: "#F47C18",
      500: "#F2870D", 600: "#DB790B", 700: "#C36B09",
      800: "#AB5C07", 900: "#934E05", 950: "#7B4003",
      A100: "#633101",
    },
    red: {
      25: "#FDE9E6", 50: "#FBCDCB", 100: "#F7B0AD",
      200: "#F3938F", 300: "#EF756F", 400: "#EB5851",
      500: "#E24C3C", 600: "#CC4436", 700: "#B63C30",
      800: "#A0352A", 900: "#8A2D24", 950: "#73261E",
      A100: "#5D1F18",
    },
    // ── Semantic shortcuts ─────────────────────────────────
    brand:       "#147AFF",
    brandHover:  { light: "#1169DB", dark: "#0E57B6" },
  },

  // ── Typography ─────────────────────────────────────────────
  typography: {
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    // Figma token name → px / rem
    size: {
      "font-size-50":  { px: 8,  rem: 0.5   },
      "font-size-75":  { px: 10, rem: 0.625 },
      "font-size-100": { px: 12, rem: 0.75  },
      "font-size-125": { px: 14, rem: 0.875 },
      "font-size-150": { px: 16, rem: 1.0   },
      "font-size-175": { px: 18, rem: 1.125 },
      "font-size-200": { px: 20, rem: 1.25  },
      "font-size-225": { px: 22, rem: 1.375 },
      "font-size-250": { px: 24, rem: 1.5   },
      "font-size-350": { px: 32, rem: 2.0   },
      "font-size-400": { px: 36, rem: 2.25  },
      "font-size-450": { px: 40, rem: 2.5   },
    },
    weight: {
      regular:  400,
      medium:   500,
      semibold: 600,
      bold:     700,
    },
    // Semantic text tokens
    semantic: {
      "text-heading-xxlarge": { size: 36, weight: 600 },
      "text-heading-xlarge":  { size: 24, weight: 600 },
      "text-heading-large":   { size: 22, weight: 600 },
      "text-heading-medium":  { size: 20, weight: 600 },
      "text-heading-small":   { size: 18, weight: 500 },
      "text-heading-xsmall":  { size: 16, weight: 500 },
      "text-large":           { size: 18, weight: 500 },
      "text-medium":          { size: 16, weight: 400 },
      "text-small":           { size: 14, weight: 400 },
      "text-xsmall":          { size: 12, weight: 400 },
      "text-xxsmall":         { size: 10, weight: 400 },
      "text-paragraph-medium": { size: 16, weight: 400 },
      "text-paragraph-small":  { size: 14, weight: 400 },
      "text-paragraph-xsmall": { size: 12, weight: 400 },
    },
  },

  // ── Spacing (4px grid) ──────────────────────────────────────
  spacing: {
    xxs: 4,   xs: 8,   sm: 12,
    md:  16,  lg: 24,  xl: 28,  xxl: 32,
  },

  // ── Radius ─────────────────────────────────────────────────
  // component = 4px (buttons, inputs, badges, chips)
  // container = 8px (cards, panels, modals, dropdowns)
  radius: {
    component: 4,   // px — buttons / inner components
    container: 8,   // px — cards / panels / containers
    sm:  12,
    md:  16,
    lg:  24,
    xl:  28,
    xxl: 32,
  },

  // ── Animation ──────────────────────────────────────────────
  animation: {
    duration: { fast: 150, base: 200, slow: 300 },
    easing: {
      enter:  [0.0, 0.0, 0.2, 1.0] as const,
      exit:   [0.4, 0.0, 1.0, 1.0] as const,
      spring: { type: "spring" as const, stiffness: 300, damping: 30 },
    },
  },
} as const;

export type Tokens = typeof tokens;
