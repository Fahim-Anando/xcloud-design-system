"use client"

import * as React from "react"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface InputFieldProps extends React.ComponentProps<"input"> {
  /** Label text shown above the input */
  label?: string
  /** Tooltip text shown on the ⓘ icon next to the label */
  labelTooltip?: string
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
      labelTooltip,
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
    const [isFilled, setIsFilled] = React.useState(!!props.defaultValue)
    const inputRef = React.useRef<HTMLInputElement>(null)

    // Merge refs
    React.useImperativeHandle(ref, () => inputRef.current!)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsFilled(!!e.target.value)
      props.onChange?.(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFilled(!!e.target.value)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFilled(!!e.target.value)
      props.onBlur?.(e)
    }

    return (
      <div className="flex w-full min-w-80 flex-col gap-1">
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
            {/* Tooltip trigger */}
            {labelTooltip && (
              <span className="group relative inline-flex items-center">
                <Info className="size-3.5 cursor-default text-icon-tertiary transition-colors group-hover:text-icon-secondary" />
                {/* Tooltip bubble */}
                <span
                  role="tooltip"
                  className={cn(
                    "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2",
                    "w-max max-w-52 rounded-sm bg-popover px-3 py-2",
                    "border border-border text-xs text-popover-foreground shadow-md",
                    "opacity-0 transition-opacity duration-150 group-hover:opacity-100",
                    // Arrow
                    "after:absolute after:left-1/2 after:top-full after:-translate-x-1/2",
                    "after:border-4 after:border-transparent after:border-t-border after:content-['']",
                    "before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:-mt-px",
                    "before:border-4 before:border-transparent before:border-t-popover before:content-['']"
                  )}
                >
                  {labelTooltip}
                </span>
              </span>
            )}
          </div>
        )}

        {/* Input with optional icon slots */}
        <div className="relative flex items-center">
          {iconLeft && (
            <div className={cn(
              "pointer-events-none absolute left-4 flex items-center transition-colors duration-150",
              isFilled ? "text-icon-secondary" : "text-icon-tertiary"
            )}>
              {iconLeft}
            </div>
          )}
          <Input
            ref={inputRef}
            id={inputId}
            aria-invalid={hasError || undefined}
            className={cn(
              iconLeft && "pl-10",
              iconRight && "pr-10",
              className
            )}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {iconRight && (
            <div className={cn(
              "pointer-events-none absolute right-4 flex items-center transition-colors duration-150",
              isFilled ? "text-icon-secondary" : "text-icon-tertiary"
            )}>
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
