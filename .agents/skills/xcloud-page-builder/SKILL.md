---
name: xcloud-page-builder
description: >
  Builds full page layouts for xCloud by composing design system components.
  Trigger on: "build page", "implement dashboard", "create [PageName] page",
  "build layout", "implement from Figma frame"
---

# xCloud Page Builder Skill

You are building full page layouts for xCloud by composing components from the design system.
Goal: pixel-accurate implementation of Figma frames.
**Figma file key:** `RZ358zi905ydRzx8MYmv8o`

## Layout Architecture

- **App shell**: fixed top navbar (`h-14`) + collapsible sidebar (`w-16` collapsed, `w-64` expanded) + main content
- **Main content**: scrollable, consistent padding (`p-6`)
- **Responsive**: mobile-first, key breaks at sm(640), md(768), lg(1024), xl(1280)
- **Grid**: CSS Grid for page-level layouts, Flexbox for component internals

## Figma Workflow

1. Paste the Figma frame link in your prompt
2. Use `get_design_context` + `get_variable_defs` to read frame structure
3. Decompose the frame into: layout grid, component instances, spacing, content
4. Build using existing components from `src/components/`
5. Create missing components following the component-builder skill
6. Verify layout matches the Figma frame

## Known Page Patterns

| Page | Key Layout |
|------|-----------|
| Dashboard | 4 stat cards in a row, 2×2 panel grid, full-width billing panel |
| Server List | filterable table with status indicators and quick actions |
| Site Detail | tabbed layout: Settings, Backups, SSL, Monitoring |
| Onboarding | stepped wizard with provider selection cards |

## Component Sources

- `src/components/ui/` — shadcn base (Button, Input, Card, Table, etc.)
- `src/components/xcloud/` — custom composites (SidebarNav, StatCard, UpgradeBanner, etc.)
- `src/app/(playground)/` — page demos and playground

## Spacing Reference

| Token | Value |
|-------|-------|
| Navbar height | h-14 (56px) |
| Sidebar collapsed | w-16 (64px) |
| Sidebar expanded | w-64 (256px) |
| Content padding | p-6 (24px) |
| Card gap | gap-4 (16px) |
| Section gap | gap-6 (24px) |
