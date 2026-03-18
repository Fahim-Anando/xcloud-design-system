import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Layout
        "flex h-11 w-full min-w-0",
        // Shape & Surface — matches Figma: surface-secondary bg, border-primary border, 4px radius
        "rounded-sm border border-border bg-card",
        // Spacing — Figma: px-16 py-12
        "px-4 py-3",
        // Typography
        "text-sm font-normal text-foreground",
        "placeholder:text-muted-foreground",
        // Transitions
        "transition-colors duration-150 outline-none",
        // Hover — border-primary-active
        "hover:border-border-active",
        // Focus — border-primary-active, no ring (clean Figma style)
        "focus-visible:border-border-active",
        // Disabled — 30% opacity per design rules
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30",
        // Error
        "aria-invalid:border-destructive",
        // File input
        "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Input }
