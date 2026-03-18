"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface InputFieldProps extends React.ComponentProps<"input"> {
  /** Label text shown above the input */
  label?: string
  /** Appends " * (Optional)" to the label */
  optional?: boolean
  /** Appends a blue "*" to the label (required field) */
  required?: boolean
  /** Helper text shown below the input */
  helperText?: string
  /** Icon shown before helper text */
  helperIcon?: React.ReactNode
  /** Error message — replaces helperText and turns border red */
  error?: string
  /** Icon slot inside the input, left side */
  iconLeft?: React.ReactNode
  /** Icon slot inside the input, right side */
  iconRight?: React.ReactNode
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      optional = false,
      required = false,
      helperText,
      helperIcon,
      error,
      iconLeft,
      iconRight,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const uid = React.useId()
    const inputId = id ?? uid
    const hasError = !!error

    return (
      <div className="flex w-full flex-col gap-1">
        {/* Label row */}
        {label && (
          <div className="flex items-center gap-1 leading-tight">
            <label
              htmlFor={inputId}
              className="text-sm font-medium text-text-secondary"
            >
              {label}
            </label>
            {required && (
              <span className="text-sm text-primary" aria-hidden="true">*</span>
            )}
            {optional && (
              <span className="text-sm text-muted-foreground">(Optional)</span>
            )}
          </div>
        )}

        {/* Input with optional icon slots */}
        <div className="relative flex items-center">
          {iconLeft && (
            <div className="pointer-events-none absolute left-4 flex items-center text-icon-tertiary">
              {iconLeft}
            </div>
          )}
          <Input
            ref={ref}
            id={inputId}
            aria-invalid={hasError || undefined}
            className={cn(
              iconLeft && "pl-10",
              iconRight && "pr-10",
              className
            )}
            {...props}
          />
          {iconRight && (
            <div className="pointer-events-none absolute right-4 flex items-center text-icon-tertiary">
              {iconRight}
            </div>
          )}
        </div>

        {/* Helper text / error */}
        {(error || helperText) && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs leading-tight",
              error ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {helperIcon && !error && (
              <span className="shrink-0 text-icon-tertiary">{helperIcon}</span>
            )}
            <span>{error ?? helperText}</span>
          </div>
        )}
      </div>
    )
  }
)
InputField.displayName = "InputField"

export { InputField }
