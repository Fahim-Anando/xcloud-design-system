"use client"

import { cn } from "@/lib/utils"

// ── Primitive label → CSS var ─────────────────────────────────
function cssVar(label: string): string {
  if (label === "Light/25") return "var(--primitive-ls-25)"
  const [prefix, step] = label.split("-")
  switch (prefix) {
    case "light":  return `var(--primitive-ls-${step})`
    case "dark":   return `var(--primitive-ds-${step})`
    case "blue":   return `var(--primitive-blue-${step})`
    case "green":  return `var(--primitive-green-${step})`
    case "orange": return `var(--primitive-orange-${step})`
    case "red":    return `var(--primitive-red-${step})`
    default:       return "transparent"
  }
}

type TokenEntry = {
  name: string
  light: string
  dark: string
  useCase?: string
}

type TokenGroup = {
  group: string
  tokens: TokenEntry[]
}

const TOKEN_GROUPS: TokenGroup[] = [
  {
    group: "Text",
    tokens: [
      { name: "color-text-primary",       light: "light-900", dark: "dark-25",      useCase: "Text" },
      { name: "color-text-secondary",     light: "light-700", dark: "dark-50",      useCase: "Text" },
      { name: "color-text-tertiary",      light: "light-500", dark: "dark-300",     useCase: "Icon" },
      { name: "color-text-tertiary-em",   light: "light-400", dark: "dark-200",     useCase: "Text" },
      { name: "color-text-disable",       light: "light-400", dark: "dark-700",     useCase: "Icon" },
      { name: "color-text-brand",         light: "blue-500",  dark: "blue-500",     useCase: "Text" },
      { name: "color-text-success",       light: "green-700", dark: "green-700",    useCase: "Text" },
      { name: "color-text-success-light", light: "green-400", dark: "green-400"                    },
      { name: "color-text-error",         light: "red-600",   dark: "red-600",      useCase: "Text" },
      { name: "color-text-warning",       light: "orange-600",dark: "orange-600",   useCase: "Text" },
      { name: "color-text-info",          light: "blue-600",  dark: "blue-600",     useCase: "Text" },
      { name: "color-text-info-light",    light: "blue-400",  dark: "blue-400",     useCase: "Surface" },
      { name: "color-text-on-brand",      light: "Light/25",  dark: "Light/25",     useCase: "Icon" },
    ],
  },
  {
    group: "Surface",
    tokens: [
      { name: "surface-primary",      light: "light-25",    dark: "dark-900",    useCase: "Surface" },
      { name: "surface-secondary",    light: "light-50",    dark: "dark-800",    useCase: "Surface" },
      { name: "surface-tertiary",     light: "light-100",   dark: "dark-700",    useCase: "Search bar" },
      { name: "surface-brand",        light: "blue-500",    dark: "blue-500",    useCase: "Surface" },
      { name: "surface-brand-hover",  light: "blue-600",    dark: "blue-700"                       },
      { name: "surface-success",      light: "green-25",    dark: "green-A100",  useCase: "Surface" },
      { name: "surface-warning",      light: "orange-25",   dark: "orange-A100", useCase: "Surface" },
      { name: "surface-error",        light: "red-25",      dark: "red-A100",    useCase: "Surface" },
      { name: "surface-backdrop",     light: "light-950",   dark: "dark-950",    useCase: "Surface" },
      { name: "surface-disable",      light: "light-300",   dark: "dark-400"                       },
      { name: "icon-info",            light: "blue-400",    dark: "blue-400"                       },
    ],
  },
  {
    group: "Border",
    tokens: [
      { name: "border-primary",        light: "light-300", dark: "dark-500", useCase: "Border" },
      { name: "border-primary-active", light: "light-500", dark: "dark-400", useCase: "Search bar divider" },
      { name: "border-secondary",      light: "light-200", dark: "dark-600", useCase: "Border" },
      { name: "border-brand",          light: "blue-500",  dark: "blue-500", useCase: "Border" },
      { name: "border-brand-hover",    light: "blue-600",  dark: "blue-600"                   },
      { name: "border-disable",        light: "light-200", dark: "dark-600"                   },
    ],
  },
  {
    group: "Icon",
    tokens: [
      { name: "Icon-primary",   light: "light-600",  dark: "dark-25",   useCase: "Icon" },
      { name: "icon-secondary", light: "light-500",  dark: "dark-50",   useCase: "Icon" },
      { name: "icon-tertiary",  light: "light-400",  dark: "dark-300",  useCase: "Icon" },
      { name: "icon-disable",   light: "light-300",  dark: "dark-500",  useCase: "Icon" },
      { name: "icon-500",       light: "light-500",  dark: "dark-100",  useCase: "Toggle, xAI bot, Table" },
      { name: "icon-success",   light: "green-600",  dark: "green-600", useCase: "Icon" },
      { name: "icon-error",     light: "red-500",    dark: "red-500",   useCase: "Icon" },
      { name: "icon-warning",   light: "orange-500", dark: "orange-500",useCase: "Icon" },
      { name: "icon-info",      light: "blue-600",   dark: "blue-600",  useCase: "Icon" },
    ],
  },
]

function Swatch({ label }: { label: string }) {
  const isWhite = label === "Light/25"
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn("inline-block size-3.5 rounded-sm shrink-0 ring-1 ring-black/10")}
        style={{ backgroundColor: cssVar(label) }}
      />
      <span className="font-mono text-[10px] text-text-secondary">{label}</span>
    </div>
  )
}

export function SemanticTokenTable() {
  return (
    <div className="rounded-md border border-border overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[200px_1fr_1fr_140px] gap-x-4 border-b border-border bg-muted/40 px-4 py-2">
        {["Token Name", "Light", "Dark", "Use-case"].map((h) => (
          <span key={h} className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            {h}
          </span>
        ))}
      </div>

      {TOKEN_GROUPS.map((group) => (
        <div key={group.group}>
          {/* Group header */}
          <div className="grid grid-cols-[200px_1fr_1fr_140px] gap-x-4 border-b border-border bg-muted/20 px-4 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground col-span-4">
              {group.group}
            </span>
          </div>

          {/* Token rows */}
          {group.tokens.map((token, i, arr) => (
            <div
              key={token.name}
              className={cn(
                "grid grid-cols-[200px_1fr_1fr_140px] items-center gap-x-4 px-4 py-2",
                i < arr.length - 1 && "border-b border-border/50"
              )}
            >
              <span className="font-mono text-[11px] text-foreground">{token.name}</span>
              <Swatch label={token.light} />
              <Swatch label={token.dark} />
              <span className="text-[11px] text-text-secondary">{token.useCase ?? ""}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
