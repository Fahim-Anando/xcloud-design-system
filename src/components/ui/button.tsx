"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

// xCloud radius tokens: rounded-sm = 4px (component), rounded = 8px (container)
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all duration-150 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm",
        brand:
          "bg-primary text-white hover:bg-primary-hover shadow-sm",
        outline:
          "border-border bg-background text-text-secondary [&_svg]:text-icon-secondary hover:bg-muted aria-expanded:bg-muted dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "border-primary bg-transparent text-primary hover:bg-primary/5 aria-expanded:bg-primary/5",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        "destructive-soft":
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // Figma specs: xs 22h·4px r · sm 33h·4px r · md 36h·4px r · lg 40h·8px r (primary) / 44h (secondary/outline)
        xs:      "h-[22px] gap-1 px-2 py-1 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm:      "h-[33px] gap-1 px-3 py-2 text-sm [&_svg:not([class*='size-'])]:size-4",
        default: "h-9 gap-2 px-3 py-2 text-sm [&_svg:not([class*='size-'])]:size-5",
        lg:      "h-10 gap-2 px-4 py-3 text-base [&_svg:not([class*='size-'])]:size-5",
        xl:      "h-11 gap-2 px-5 py-3 text-base [&_svg:not([class*='size-'])]:size-5",
        icon:         "size-9 [&_svg:not([class*='size-'])]:size-5",
        "icon-xs":    "size-[22px] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":    "size-[33px] [&_svg:not([class*='size-'])]:size-4",
        "icon-lg":    "size-10 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    compoundVariants: [
      // Secondary / outline at lg → h-11 (44px), radius 8px (rounded) from lg size class
      { variant: ["secondary", "outline"], size: "lg", className: "h-11" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

function Button({
  className,
  variant = "default",
  size = "default",
  loading = false,
  iconLeft,
  iconRight,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : iconLeft}
      {children}
      {!loading && iconRight}
    </ButtonPrimitive>
  )
}

Button.displayName = "Button"

export { Button, buttonVariants }
export type { ButtonProps }
