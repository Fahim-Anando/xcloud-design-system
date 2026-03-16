---
name: xcloud-component-builder
description: >
  Builds and customizes shadcn/ui components for the xCloud design system.
  Trigger on: "build component", "add component", "customize button",
  "implement [ComponentName]", "create xCloud [component]"
---

# xCloud Component Builder Skill

You are building and customizing shadcn/ui components for the xCloud design system.
Every component must faithfully match xCloud's Figma specs while following shadcn conventions.

## Stack

- React 19 + Next.js 16 (App Router)
- TypeScript strict mode
- Tailwind CSS v4
- shadcn/ui components in `src/components/ui/`
- class-variance-authority (cva) for variants
- cn() utility from `@/lib/utils`
- Framer Motion for animations
- lucide-react for icons

## Component Rules

1. Start from the **shadcn base** — never build from scratch if a base exists
2. Use **cva** for ALL variant logic (size, variant, state)
3. ALL colors via CSS variables (`bg-primary`, `text-foreground`) — never hardcode hex
4. ALL components must work in **light and dark mode**
5. Export named components with TypeScript interfaces
6. Add `displayName` to all `forwardRef` components
7. Include a `// Usage:` comment at the bottom of each file

## Variant Pattern (Button example)

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground hover:bg-primary-hover",
        outline:     "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        ghost:       "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link:        "text-primary underline-offset-4 hover:underline",
        brand:       "bg-primary text-white hover:bg-primary-hover shadow-sm",
      },
      size: {
        xs: "h-7 px-2 text-xs rounded-xs",
        sm: "h-8 px-3 text-xs rounded-sm",
        md: "h-9 px-4 text-sm rounded-sm",   // default
        lg: "h-10 px-5 text-sm rounded-md",
        xl: "h-12 px-6 text-base rounded-md",
        icon: "h-9 w-9 rounded-sm",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
)
```

## Figma Workflow

1. Check Figma using `get_design_context` on the component node
2. Extract: colors, typography, spacing, border-radius, shadows, states
3. Map extracted values to existing CSS variables where possible
4. If new tokens needed, add to `globals.css` following primitive → semantic pattern
5. Build component with ALL states: default, hover, active, focus, disabled, loading, error
6. Test in both light and dark modes

## Animation Guidelines

- Duration: 150–300ms
- Easing: `easeOut` entrances, `easeIn` exits
- Movement: 8–16px, never > 24px
- CSS transitions for hover/focus states
- Framer Motion for enter/exit and stagger animations
