# xCloud Design System — Agent Rules

These rules apply to every task in this project. Never override them.

## Typography
- Font family is **Inter** — NEVER substitute DM Sans, system-ui, or generic sans-serif
- Apply `font-sans` (mapped to Inter) on all components

## Token Usage
- Use exact hex values from Figma exports — never approximate
- Follow the **two-layer architecture**: primitives → semantic
  - Primitives: `--primitive-*` in `:root` of globals.css
  - Semantic: named vars (`--primary`, `--foreground`, etc.) referencing primitives
- In components, use **Tailwind classes only** (`bg-primary`, `text-foreground`) — never inline hex values

## Component Standards
- Start from the **shadcn base** — never build from scratch if a base exists
- Use **cva** for ALL variant logic — never ad-hoc className strings
- Use **cn()** from `@/lib/utils` for conditional Tailwind classes
- TypeScript strict mode — **no `any` types**
- Named exports + `React.forwardRef` with `displayName`
- Every component must work in **both light and dark mode**

## File Locations
- `src/components/ui/` — shadcn base components (customized with xCloud tokens)
- `src/components/xcloud/` — xCloud composite/custom components
- `src/lib/utils.ts` — cn() utility
- `src/lib/tokens.ts` — token constants for JS usage
- `src/app/globals.css` — token layer (primitives + semantic)

## Animation
- Duration: 150–300ms for UI transitions
- Easing: easeOut entrances, easeIn exits
- Movement: 8–16px max
- CSS transitions for hover/focus
- Framer Motion for enter/exit, stagger, scroll-triggered

## Figma MCP
- Figma file key: `RZ358zi905ydRzx8MYmv8o`
- ALWAYS run BOTH `get_design_context` AND `get_variable_defs` — variables capture scales that design context misses
- Dev Mode annotations are more reliable than raw layer data

## Dark Mode
- Toggle via `.dark` class on `<html>`
- Never use `prefers-color-scheme` media query — use next-themes
- Verify: text readable, borders correct, brand blue hover uses `#0E57B6` (not `#1169DB`) in dark
