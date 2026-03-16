"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { X, Palette, Type, BoxSelect, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

// ── Token lookup table — complete Figma primitive + semantic map ──
// Maps hex → { primitive token, semantic alias, category }
const COLOR_TOKEN_MAP: Record<string, { name: string; category: string }> = {

  // ── Blue scale ────────────────────────────────────────────────
  "#DDECFF": { name: "--surface-info", category: "Blue" },
  "#BCD9FF": { name: "--blue-50", category: "Blue" },
  "#9AC6FF": { name: "--blue-100", category: "Blue" },
  "#79B3FF": { name: "--blue-200", category: "Blue" },
  "#57A0FF": { name: "--blue-300", category: "Blue" },
  "#368DFF": { name: "--text-info", category: "Blue" },
  "#147AFF": { name: "--primary", category: "Brand" },
  "#1169DB": { name: "--primary-hover", category: "Brand" },
  "#0E57B6": { name: "--primary-hover", category: "Brand" },
  "#0B4692": { name: "--blue-800", category: "Blue" },
  "#09346D": { name: "--blue-900", category: "Blue" },
  "#062349": { name: "--surface-info", category: "Blue" },

  // ── Light shades ──────────────────────────────────────────────
  "#FFFFFF": { name: "--background", category: "Surface" },
  "#FAFBFC": { name: "--card", category: "Surface" },
  "#F2F5F7": { name: "--secondary / --muted", category: "Surface" },
  "#EDF0F2": { name: "--accent", category: "Surface" },
  "#E4E7EB": { name: "--border", category: "Border" },
  "#8B939E": { name: "--muted-foreground-em", category: "Text" },
  "#737985": { name: "--ls-500", category: "Text" },
  "#535865": { name: "--muted-foreground", category: "Text" },
  "#40444F": { name: "--secondary-foreground", category: "Text" },
  "#2D313B": { name: "--ls-800", category: "Text" },
  "#1F2128": { name: "--foreground", category: "Text" },
  "#181A1F": { name: "--ls-950", category: "Text" },

  // ── Dark shades ───────────────────────────────────────────────
  "#E9EBED": { name: "--foreground", category: "Text" },
  "#CBCFD5": { name: "--secondary-foreground", category: "Text" },
  "#B0B6BF": { name: "--ds-100", category: "Text" },
  "#89909D": { name: "--muted-foreground", category: "Text" },
  "#737A85": { name: "--ds-300", category: "Text" },
  "#515A67": { name: "--ds-400", category: "Text" },
  "#373E4A": { name: "--border", category: "Border" },
  "#333842": { name: "--border-secondary", category: "Border" },
  "#292E39": { name: "--muted / --popover", category: "Surface" },
  "#23272D": { name: "--card", category: "Surface" },
  "#1F2328": { name: "--background", category: "Surface" },
  "#181B1F": { name: "--ds-950", category: "Surface" },

  // ── Green (success) ───────────────────────────────────────────
  "#C0E4CD": { name: "--surface-success", category: "Status · Success" },
  "#3ABB6D": { name: "--text-success", category: "Status · Success" },
  "#1DC35A": { name: "--green-500", category: "Status · Success" },
  "#18AD4F": { name: "--success", category: "Status · Success" },
  "#149744": { name: "--text-success", category: "Status · Success" },
  "#1E3F30": { name: "--surface-success", category: "Status · Success" },

  // ── Orange (warning) ──────────────────────────────────────────
  "#FEEEDC": { name: "--surface-warning", category: "Status · Warning" },
  "#F47C18": { name: "--orange-400", category: "Status · Warning" },
  "#F2870D": { name: "--warning", category: "Status · Warning" },
  "#DB790B": { name: "--text-warning", category: "Status · Warning" },
  "#AB5C07": { name: "--orange-800", category: "Status · Warning" },
  "#633101": { name: "--surface-warning", category: "Status · Warning" },

  // ── Red (destructive / error) ─────────────────────────────────
  "#FDE9E6": { name: "--surface-error", category: "Status · Error" },
  "#EB5851": { name: "--text-error", category: "Status · Error" },
  "#E24C3C": { name: "--destructive", category: "Status · Error" },
  "#CC4436": { name: "--text-error", category: "Status · Error" },
  "#A0352A": { name: "--red-800", category: "Status · Error" },
  "#5D1F18": { name: "--surface-error", category: "Status · Error" },
}

// Font size → token name
const FONT_SIZE_MAP: Record<string, string> = {
  "8px":  "font-size-50",
  "10px": "font-size-75",
  "12px": "font-size-100 / text-xsmall / text-paragraph-xsmall",
  "13px": "text-[0.8rem] / text-sm-override",
  "14px": "font-size-125 / text-small / text-paragraph-small",
  "16px": "font-size-150 / text-medium / text-paragraph-medium",
  "18px": "font-size-175 / text-large / text-heading-small",
  "20px": "font-size-200 / text-heading-medium",
  "22px": "font-size-225 / text-heading-large",
  "24px": "font-size-250 / text-heading-xlarge",
  "32px": "font-size-350",
  "36px": "font-size-400 / text-heading-xxlarge",
  "40px": "font-size-450",
}

const FONT_WEIGHT_MAP: Record<string, string> = {
  "400": "font-weight-regular",
  "500": "font-weight-medium",
  "600": "font-weight-semibold",
  "700": "font-weight-bold",
}

const RADIUS_MAP: Record<string, string> = {
  "0px":    "none",
  "2px":    "rounded-[2px]",
  "4px":    "radius-component — buttons / inputs / badges / chips",
  "8px":    "radius-container — cards / panels / modals / dropdowns",
  "12px":   "radius-sm",
  "16px":   "radius-md",
  "24px":   "radius-lg",
  "28px":   "radius-xl",
  "32px":   "radius-xxl",
  "9999px": "radius-full — pill / avatar",
}

// spacing token values → token name
const SPACING_TOKEN_MAP: Record<string, string> = {
  "4px":  "spacing-xxs",
  "8px":  "spacing-xs",
  "12px": "spacing-sm",
  "16px": "spacing-md",
  "24px": "spacing-lg",
  "28px": "spacing-xl",
  "32px": "spacing-xxl",
}

// Convert browser lab()/oklch() color to nearest hex from our token map
function labToHex(labStr: string): string | null {
  // Try to match against known patterns by creating a temporary element
  try {
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = 1
    const ctx = canvas.getContext("2d")
    if (!ctx) return null
    ctx.fillStyle = labStr
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase()
  } catch {
    return null
  }
}

function findClosestToken(hex: string): { name: string; category: string } | null {
  // Exact match first
  const upper = hex.toUpperCase()
  if (COLOR_TOKEN_MAP[upper]) return COLOR_TOKEN_MAP[upper]

  // Fuzzy match: find closest hex by RGB distance
  let best: { name: string; category: string } | null = null
  let bestDist = Infinity
  const r1 = parseInt(upper.slice(1, 3), 16)
  const g1 = parseInt(upper.slice(3, 5), 16)
  const b1 = parseInt(upper.slice(5, 7), 16)

  for (const [tokenHex, token] of Object.entries(COLOR_TOKEN_MAP)) {
    const r2 = parseInt(tokenHex.slice(1, 3), 16)
    const g2 = parseInt(tokenHex.slice(3, 5), 16)
    const b2 = parseInt(tokenHex.slice(5, 7), 16)
    const dist = Math.sqrt((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2)
    if (dist < bestDist) { bestDist = dist; best = token }
  }

  return bestDist < 20 ? best : null
}

interface TokenRow {
  property: string
  hex: string
  token: string
  category: string
  raw: string
}

interface InspectorData {
  componentName: string
  tagName: string
  colors: TokenRow[]
  typography: { property: string; value: string; token: string }[]
  spacing: { property: string; value: string }[]
}

function inspectElement(el: Element): InspectorData {
  const styles = getComputedStyle(el)

  // Determine component name
  const tag = el.tagName.toLowerCase()
  const role = el.getAttribute("role") || el.getAttribute("data-slot") || tag
  const ariaLabel = el.getAttribute("aria-label") || ""
  const text = (el.textContent || "").trim().slice(0, 30)
  const componentName = ariaLabel || text || role

  // Color properties to inspect
  const colorProps: [string, string][] = [
    ["Background", styles.backgroundColor],
    ["Text Color", styles.color],
    ["Border Color", styles.borderColor],
    ["Outline Color", styles.outlineColor],
  ]

  const colors: TokenRow[] = []
  for (const [property, raw] of colorProps) {
    if (!raw || raw === "rgba(0, 0, 0, 0)" || raw === "transparent") continue
    const hex = labToHex(raw)
    if (!hex) continue
    const tokenMatch = findClosestToken(hex)
    colors.push({
      property,
      hex,
      token: tokenMatch?.name || "unknown",
      category: tokenMatch?.category || "—",
      raw,
    })
  }

  // Typography
  const fontSize = styles.fontSize
  const fontWeight = styles.fontWeight
  const lineHeight = styles.lineHeight
  const fontFamily = styles.fontFamily.split(",")[0].replace(/['"]/g, "").trim()

  const typography = [
    {
      property: "Font Family",
      value: fontFamily,
      token: fontFamily.toLowerCase().includes("inter") ? "font-family-primary (Inter)" : fontFamily,
    },
    {
      property: "Font Size",
      value: fontSize,
      token: FONT_SIZE_MAP[fontSize] || fontSize,
    },
    {
      property: "Font Weight",
      value: fontWeight,
      token: FONT_WEIGHT_MAP[fontWeight] || fontWeight,
    },
    {
      property: "Line Height",
      value: lineHeight,
      token: lineHeight,
    },
  ]

  // Spacing
  const borderRadius = styles.borderRadius
  const pt = styles.paddingTop, pr = styles.paddingRight
  const pb = styles.paddingBottom, pl = styles.paddingLeft
  const paddingTokens = [pt, pr, pb, pl]
    .map(v => SPACING_TOKEN_MAP[v] ? `${v}(${SPACING_TOKEN_MAP[v]})` : v)
    .join(" ")
  const spacing = [
    {
      property: "Border Radius",
      value: RADIUS_MAP[borderRadius] ? `${borderRadius} — ${RADIUS_MAP[borderRadius]}` : borderRadius,
    },
    { property: "Padding", value: paddingTokens },
    { property: "Height", value: styles.height },
    { property: "Width", value: styles.width },
  ]

  return { componentName, tagName: tag, colors, typography, spacing }
}

// ── TokenInspector panel ─────────────────────────────────────
interface TokenInspectorProps {
  data: InspectorData | null
  open: boolean
  onClose: () => void
}

function ColorSwatch({ hex }: { hex: string }) {
  return (
    <span
      className="inline-block h-3.5 w-3.5 shrink-0 rounded-[2px] border border-border/50 align-middle"
      style={{ backgroundColor: hex }}
    />
  )
}

export function TokenInspectorPanel({ data, open, onClose }: TokenInspectorProps) {
  return (
    <div
      className={cn(
        "fixed right-0 top-0 z-50 flex h-full w-80 flex-col border-l border-border bg-card shadow-xl transition-transform duration-300 ease-out",
        open ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Token Inspector</span>
        </div>
        <button
          onClick={onClose}
          className="flex size-6 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      </div>

      {data ? (
        <div className="flex-1 overflow-y-auto">
          {/* Component info */}
          <div className="border-b border-border px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Component</p>
            <p className="mt-1 font-mono text-sm font-medium text-foreground">&lt;{data.tagName}&gt;</p>
            {data.componentName && data.componentName !== data.tagName && (
              <p className="mt-0.5 text-xs text-muted-foreground">{data.componentName}</p>
            )}
          </div>

          {/* Colors */}
          {data.colors.length > 0 && (
            <section className="border-b border-border px-4 py-3">
              <div className="mb-2 flex items-center gap-1.5">
                <Palette className="size-3.5 text-muted-foreground" />
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Colors</p>
              </div>
              <div className="space-y-2.5">
                {data.colors.map((row) => (
                  <div key={row.property}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{row.property}</span>
                      <div className="flex items-center gap-1.5">
                        <ColorSwatch hex={row.hex} />
                        <span className="font-mono text-xs text-foreground">{row.hex}</span>
                      </div>
                    </div>
                    <p className="mt-0.5 font-mono text-[10px] leading-relaxed text-primary/80 break-all">{row.token}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Typography */}
          <section className="border-b border-border px-4 py-3">
            <div className="mb-2 flex items-center gap-1.5">
              <Type className="size-3.5 text-muted-foreground" />
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Typography</p>
            </div>
            <div className="space-y-2">
              {data.typography.map((row) => (
                <div key={row.property}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{row.property}</span>
                    <span className="font-mono text-xs text-foreground">{row.value}</span>
                  </div>
                  {row.token !== row.value && (
                    <p className="mt-0.5 font-mono text-[10px] text-primary/80">{row.token}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Spacing & Shape */}
          <section className="px-4 py-3">
            <div className="mb-2 flex items-center gap-1.5">
              <BoxSelect className="size-3.5 text-muted-foreground" />
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Spacing & Shape</p>
            </div>
            <div className="space-y-2">
              {data.spacing.map((row) => (
                <div key={row.property} className="flex items-start justify-between gap-2">
                  <span className="text-xs text-muted-foreground">{row.property}</span>
                  <span className="text-right font-mono text-xs text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center">
          <Layers className="size-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">Long-press any component to inspect its tokens</p>
        </div>
      )}
    </div>
  )
}

// ── Hook ─────────────────────────────────────────────────────
const LONG_PRESS_DURATION = 500

export function useTokenInspector() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<InspectorData | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const targetRef = useRef<Element | null>(null)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return
    targetRef.current = e.target as Element
    timerRef.current = setTimeout(() => {
      const el = targetRef.current
      if (!el) return
      // Walk up to find the nearest meaningful component
      let inspectable: Element = el
      const tags = ["button", "input", "select", "textarea", "a", "label", "li"]
      const slots = ["button", "badge", "card", "input", "select", "tab", "switch", "checkbox", "avatar"]
      let cursor: Element | null = el
      while (cursor) {
        const slot = cursor.getAttribute("data-slot")
        if (slot && slots.includes(slot)) { inspectable = cursor; break }
        if (tags.includes(cursor.tagName.toLowerCase())) { inspectable = cursor; break }
        cursor = cursor.parentElement
      }
      setData(inspectElement(inspectable))
      setOpen(true)
    }, LONG_PRESS_DURATION)
  }, [])

  const onPointerUp = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const onPointerLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const close = useCallback(() => setOpen(false), [])

  // Cleanup
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  return { open, data, close, onPointerDown, onPointerUp, onPointerLeave }
}
