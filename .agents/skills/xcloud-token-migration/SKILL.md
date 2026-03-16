---
name: xcloud-token-migration
description: >
  Extracts and converts xCloud Figma design tokens into
  CSS custom properties and Tailwind config. Trigger on:
  "migrate tokens", "update tokens", "sync from Figma",
  "extract design tokens", "update globals.css"
---

# xCloud Token Migration Skill

You are migrating design tokens from xCloud's Figma file into a Next.js + shadcn/ui project.
**Figma file key:** `RZ358zi905ydRzx8MYmv8o`

## Architecture Rules

- xCloud uses a **TWO-LAYER** token system: primitives (raw hex) feed into semantic tokens
- Primitives go in `:root` as `--primitive-*` variables
- Semantic tokens reference primitives and go in `:root` (light) and `.dark` (dark)
- Tailwind v4 uses `@theme inline {}` to map CSS vars to Tailwind utilities — NO tailwind.config.ts
- Font family is **Inter** — NEVER use DM Sans, system-ui, or sans-serif as primary
- Spacing follows a **4px base grid**: 4, 8, 12, 16, 24, 28, 32px
- Border radius scale: 4, 8, 12, 16px mapped to xs, sm, md, lg

## Known Token Values

| Token | Hex | oklch |
|-------|-----|-------|
| Brand primary | #147AFF | oklch(0.596 0.221 258.7) |
| Brand hover (light) | #1169DB | oklch(0.531 0.196 258.6) |
| Brand hover (dark) | #0E57B6 | oklch(0.461 0.169 258.6) |
| Text primary (light) | #1F2128 | oklch(0.221 0.014 272.6) |
| Text primary (dark) | #E9EBED | oklch(0.937 0.004 248.2) |

## Workflow

1. Use Figma MCP: run `get_design_context` AND `get_variable_defs` on relevant nodes
2. Parse response for color, typography, spacing, radius, and shadow tokens
3. Convert hex → oklch (Tailwind v4 uses oklch, not HSL)
4. Write primitives to `:root` in `globals.css`
5. Write semantic tokens to `:root` (light) and `.dark` (dark) in `globals.css`
6. Add new color aliases to `@theme inline {}` block in `globals.css`
7. Verify shadcn components render with xCloud tokens

## Critical Checks

- ALWAYS run both `get_design_context` and `get_variable_defs`
- NEVER approximate token values — use exact hex from Figma
- ALWAYS preserve the primitive → semantic reference chain
- In Tailwind v4, ALL theme customization goes in `globals.css` via `@theme inline`
