import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-1 text-xs font-medium whitespace-nowrap transition-all [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground",
        outline:
          "border-border text-foreground",
        // xCloud status variants
        success:
          "bg-success/10 text-success dark:bg-success/20",
        warning:
          "bg-warning/10 text-warning dark:bg-warning/20",
        destructive:
          "bg-destructive/10 text-destructive dark:bg-destructive/20",
        info:
          "bg-primary/10 text-primary dark:bg-primary/20",
        // Solid status variants
        "success-solid":
          "bg-success text-success-foreground",
        "warning-solid":
          "bg-warning text-warning-foreground",
        "destructive-solid":
          "bg-destructive text-destructive-foreground",
        // Neutral
        muted:
          "bg-muted text-muted-foreground",
        ghost:
          "text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

Badge.displayName = "Badge"

export { Badge, badgeVariants }

// Usage:
// <Badge variant="success">Active</Badge>
// <Badge variant="warning">Pending</Badge>
// <Badge variant="destructive">Offline</Badge>
// <Badge variant="info">Beta</Badge>
// <Badge variant="success-solid">Online</Badge>
