"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { X, Palette, Type, BoxSelect, Layers } from "lucide-react"
// Palette + Type kept — used in State subsection headers
import { cn } from "@/lib/utils"

// ── Token lookup table ─────────────────────────────────────────────────────
const COLOR_TOKEN_MAP: Record<string, { name: string; category: string }> = {
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
  "#FFFFFF": { name: "--background", category: "Surface" },
  "#FAFBFC": { name: "--card", category: "Surface" },
  "#F2F5F7": { name: "--secondary / --muted", category: "Surface" },
  "#EDF0F2": { name: "--accent", category: "Surface" },
  "#E4E7EB": { name: "--border", category: "Border" },
  "#8B939E": { name: "--muted-foreground-em", category: "Text" },
  "#737985": { name: "--border-active", category: "Border" },
  "#535865": { name: "--muted-foreground", category: "Text" },
  "#40444F": { name: "--secondary-foreground", category: "Text" },
  "#2D313B": { name: "--ls-800", category: "Text" },
  "#1F2128": { name: "--foreground", category: "Text" },
  "#181A1F": { name: "--ls-950", category: "Text" },
  "#E9EBED": { name: "--foreground", category: "Text" },
  "#CBCFD5": { name: "--secondary-foreground", category: "Text" },
  "#B0B6BF": { name: "--ds-100", category: "Text" },
  "#89909D": { name: "--muted-foreground", category: "Text" },
  "#737A85": { name: "--ds-300", category: "Text" },
  "#515A67": { name: "--border-active", category: "Border" },
  "#373E4A": { name: "--border", category: "Border" },
  "#333842": { name: "--border-secondary", category: "Border" },
  "#292E39": { name: "--muted / --popover", category: "Surface" },
  "#23272D": { name: "--card", category: "Surface" },
  "#1F2328": { name: "--background", category: "Surface" },
  "#181B1F": { name: "--ds-950", category: "Surface" },
  "#C0E4CD": { name: "--surface-success", category: "Status · Success" },
  "#3ABB6D": { name: "--text-success", category: "Status · Success" },
  "#1DC35A": { name: "--green-500", category: "Status · Success" },
  "#18AD4F": { name: "--success", category: "Status · Success" },
  "#149744": { name: "--text-success", category: "Status · Success" },
  "#1E3F30": { name: "--surface-success", category: "Status · Success" },
  "#FEEEDC": { name: "--surface-warning", category: "Status · Warning" },
  "#F47C18": { name: "--orange-400", category: "Status · Warning" },
  "#F2870D": { name: "--warning", category: "Status · Warning" },
  "#DB790B": { name: "--text-warning", category: "Status · Warning" },
  "#AB5C07": { name: "--orange-800", category: "Status · Warning" },
  "#633101": { name: "--surface-warning", category: "Status · Warning" },
  "#FDE9E6": { name: "--surface-error", category: "Status · Error" },
  "#EB5851": { name: "--text-error", category: "Status · Error" },
  "#E24C3C": { name: "--destructive", category: "Status · Error" },
  "#CC4436": { name: "--text-error", category: "Status · Error" },
  "#A0352A": { name: "--red-800", category: "Status · Error" },
  "#5D1F18": { name: "--surface-error", category: "Status · Error" },
}

const FONT_SIZE_MAP: Record<string, string> = {
  "12px": "text-xsmall",
  "14px": "text-small",
  "16px": "text-medium",
  "18px": "text-large",
  "20px": "text-heading-md",
  "24px": "text-heading-xl",
}

const FONT_WEIGHT_MAP: Record<string, string> = {
  "400": "regular",
  "500": "medium",
  "600": "semibold",
  "700": "bold",
}

const RADIUS_MAP: Record<string, string> = {
  "0px": "none",
  "2px": "rounded-[2px]",
  "4px": "radius-component",
  "8px": "radius-container",
  "12px": "radius-sm",
  "16px": "radius-md",
  "9999px": "radius-full",
}

const SPACING_TOKEN_MAP: Record<string, string> = {
  "4px": "spacing-xxs",
  "8px": "spacing-xs",
  "12px": "spacing-sm",
  "16px": "spacing-md",
  "24px": "spacing-lg",
  "32px": "spacing-xxl",
}

// ── CSS var resolver ───────────────────────────────────────────────────────
function resolveCssVarToHex(varName: string): string | null {
  try {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(varName.startsWith("--") ? varName : `--${varName}`)
      .trim()
    if (!raw) return null
    return labToHex(raw)
  } catch {
    return null
  }
}

function labToHex(labStr: string): string | null {
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
  const upper = hex.toUpperCase()
  if (COLOR_TOKEN_MAP[upper]) return COLOR_TOKEN_MAP[upper]
  let best: { name: string; category: string } | null = null
  let bestDist = Infinity
  const r1 = parseInt(upper.slice(1, 3), 16)
  const g1 = parseInt(upper.slice(3, 5), 16)
  const b1 = parseInt(upper.slice(5, 7), 16)
  for (const [tokenHex, token] of Object.entries(COLOR_TOKEN_MAP)) {
    const r2 = parseInt(tokenHex.slice(1, 3), 16)
    const g2 = parseInt(tokenHex.slice(3, 5), 16)
    const b2 = parseInt(tokenHex.slice(5, 7), 16)
    const dist = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
    if (dist < bestDist) { bestDist = dist; best = token }
  }
  return bestDist < 20 ? best : null
}

// ── State token definitions — per component ────────────────────────────────
type StateProp = {
  property: string
  token: string        // CSS var name e.g. "--border"
  isColor?: boolean    // render a live swatch
  isTypo?: boolean     // typography property
  note?: string
}

type StateEntry = {
  state: string
  colors: StateProp[]
  typography?: StateProp[]
}

const STATE_TOKENS: Record<string, StateEntry[]> = {
  input: [
    {
      state: "Default",
      colors: [
        { property: "Background", token: "--card", isColor: true },
        { property: "Border", token: "--border", isColor: true },
        { property: "Placeholder", token: "--muted-foreground", isColor: true },
        { property: "Text (filled)", token: "--foreground", isColor: true },
        { property: "Icon", token: "--icon-tertiary", isColor: true },
      ],
      typography: [
        { property: "Font Size", token: "14px", note: "text-small", isTypo: true },
        { property: "Font Weight", token: "400", note: "regular", isTypo: true },
        { property: "Line Height", token: "1.2", isTypo: true },
      ],
    },
    {
      state: "Hover",
      colors: [
        { property: "Background", token: "--card", isColor: true },
        { property: "Border", token: "--border-active", isColor: true, note: "border-primary-active" },
        { property: "Placeholder", token: "--muted-foreground", isColor: true },
        { property: "Text (filled)", token: "--foreground", isColor: true },
        { property: "Icon", token: "--icon-tertiary", isColor: true },
      ],
      typography: [
        { property: "Font Size", token: "14px", note: "text-small", isTypo: true },
        { property: "Font Weight", token: "400", note: "regular", isTypo: true },
        { property: "Line Height", token: "1.2", isTypo: true },
      ],
    },
    {
      state: "Focus",
      colors: [
        { property: "Background", token: "--card", isColor: true },
        { property: "Border", token: "--border-active", isColor: true, note: "border-primary-active" },
        { property: "Placeholder", token: "--muted-foreground", isColor: true },
        { property: "Text (filled)", token: "--foreground", isColor: true },
        { property: "Icon", token: "--icon-secondary", isColor: true, note: "brighter when filled" },
      ],
      typography: [
        { property: "Font Size", token: "14px", note: "text-small", isTypo: true },
        { property: "Font Weight", token: "400", note: "regular", isTypo: true },
        { property: "Line Height", token: "1.2", isTypo: true },
      ],
    },
    {
      state: "Error",
      colors: [
        { property: "Background", token: "--card", isColor: true },
        { property: "Border", token: "--destructive", isColor: true },
        { property: "Placeholder", token: "--muted-foreground", isColor: true },
        { property: "Text (filled)", token: "--foreground", isColor: true },
        { property: "Helper Text", token: "--destructive", isColor: true },
      ],
      typography: [
        { property: "Font Size", token: "14px", note: "text-small", isTypo: true },
        { property: "Font Weight", token: "400", note: "regular", isTypo: true },
        { property: "Helper Size", token: "12px", note: "text-xsmall", isTypo: true },
      ],
    },
    {
      state: "Disabled",
      colors: [
        { property: "Background", token: "--card", isColor: true },
        { property: "Border", token: "--border", isColor: true },
        { property: "Opacity", token: "30%", note: "opacity-30" },
      ],
      typography: [
        { property: "Font Size", token: "14px", note: "text-small", isTypo: true },
        { property: "Font Weight", token: "400", note: "regular", isTypo: true },
      ],
    },
  ],
  button: [
    {
      state: "Default",
      colors: [
        { property: "Background", token: "--primary", isColor: true },
        { property: "Text", token: "--primary-foreground", isColor: true },
        { property: "Border", token: "transparent" },
      ],
      typography: [
        { property: "Font Size", token: "14px", note: "text-small", isTypo: true },
        { property: "Font Weight", token: "500", note: "medium", isTypo: true },
        { property: "Border Radius", token: "4px", note: "radius-component", isTypo: true },
      ],
    },
    {
      state: "Hover",
      colors: [
        { property: "Background", token: "--primary-hover", isColor: true, note: "light #1169DB · dark #0E57B6" },
        { property: "Text", token: "--primary-foreground", isColor: true },
        { property: "Border", token: "transparent" },
      ],
      typography: [
        { property: "Font Size", token: "14px", note: "text-small", isTypo: true },
        { property: "Font Weight", token: "500", note: "medium", isTypo: true },
        { property: "Border Radius", token: "4px", note: "radius-component", isTypo: true },
      ],
    },
    {
      state: "Focus",
      colors: [
        { property: "Background", token: "--primary", isColor: true },
        { property: "Text", token: "--primary-foreground", isColor: true },
        { property: "Ring", token: "--ring", isColor: true },
      ],
      typography: [
        { property: "Font Size", token: "14px", note: "text-small", isTypo: true },
        { property: "Font Weight", token: "500", note: "medium", isTypo: true },
        { property: "Border Radius", token: "4px", note: "radius-component", isTypo: true },
      ],
    },
    {
      state: "Disabled",
      colors: [
        { property: "Background", token: "--primary", isColor: true },
        { property: "Text", token: "--primary-foreground", isColor: true },
        { property: "Opacity", token: "30%", note: "opacity-30" },
      ],
      typography: [
        { property: "Font Size", token: "14px", note: "text-small", isTypo: true },
        { property: "Font Weight", token: "500", note: "medium", isTypo: true },
      ],
    },
  ],
  select: [
    {
      state: "Default",
      colors: [
        { property: "Background", token: "--card", isColor: true },
        { property: "Border", token: "--border", isColor: true },
        { property: "Text", token: "--foreground", isColor: true },
        { property: "Chevron", token: "--icon-tertiary", isColor: true },
      ],
      typography: [
        { property: "Font Size", token: "14px", note: "text-small", isTypo: true },
        { property: "Font Weight", token: "400", note: "regular", isTypo: true },
      ],
    },
    {
      state: "Open / Focus",
      colors: [
        { property: "Background", token: "--card", isColor: true },
        { property: "Border", token: "--border-active", isColor: true },
        { property: "Text", token: "--foreground", isColor: true },
        { property: "Dropdown bg", token: "--popover", isColor: true },
      ],
      typography: [
        { property: "Font Size", token: "14px", note: "text-small", isTypo: true },
        { property: "Font Weight", token: "400", note: "regular", isTypo: true },
      ],
    },
    {
      state: "Selected",
      colors: [
        { property: "Background", token: "--card", isColor: true },
        { property: "Border", token: "--border", isColor: true },
        { property: "Text", token: "--foreground", isColor: true },
        { property: "Indicator", token: "--primary", isColor: true },
      ],
      typography: [
        { property: "Font Size", token: "14px", note: "text-small", isTypo: true },
        { property: "Font Weight", token: "500", note: "medium", isTypo: true },
      ],
    },
  ],
  badge: [
    {
      state: "Default (Info)",
      colors: [
        { property: "Background", token: "--surface-info", isColor: true },
        { property: "Text", token: "--text-info", isColor: true },
      ],
      typography: [
        { property: "Font Size", token: "12px", note: "text-xsmall", isTypo: true },
        { property: "Font Weight", token: "500", note: "medium", isTypo: true },
        { property: "Border Radius", token: "4px", note: "radius-component", isTypo: true },
      ],
    },
    {
      state: "Success",
      colors: [
        { property: "Background", token: "--surface-success", isColor: true },
        { property: "Text", token: "--text-success", isColor: true },
      ],
      typography: [
        { property: "Font Size", token: "12px", note: "text-xsmall", isTypo: true },
        { property: "Font Weight", token: "500", note: "medium", isTypo: true },
        { property: "Border Radius", token: "4px", note: "radius-component", isTypo: true },
      ],
    },
    {
      state: "Warning",
      colors: [
        { property: "Background", token: "--surface-warning", isColor: true },
        { property: "Text", token: "--text-warning", isColor: true },
      ],
      typography: [
        { property: "Font Size", token: "12px", note: "text-xsmall", isTypo: true },
        { property: "Font Weight", token: "500", note: "medium", isTypo: true },
        { property: "Border Radius", token: "4px", note: "radius-component", isTypo: true },
      ],
    },
    {
      state: "Destructive",
      colors: [
        { property: "Background", token: "--surface-error", isColor: true },
        { property: "Text", token: "--text-error", isColor: true },
      ],
      typography: [
        { property: "Font Size", token: "12px", note: "text-xsmall", isTypo: true },
        { property: "Font Weight", token: "500", note: "medium", isTypo: true },
        { property: "Border Radius", token: "4px", note: "radius-component", isTypo: true },
      ],
    },
  ],
}

function getStateTokens(tagName: string, dataSlot?: string): StateEntry[] | null {
  const slot = dataSlot?.toLowerCase() || ""
  const tag = tagName.toLowerCase()
  if (tag === "input" || slot === "input") return STATE_TOKENS.input
  if (tag === "button" || slot === "button") return STATE_TOKENS.button
  if (slot === "select" || slot === "select-trigger") return STATE_TOKENS.select
  if (slot === "badge") return STATE_TOKENS.badge
  return null
}

// ── Diff helpers ───────────────────────────────────────────────────────────
function buildTokenMap(entry: StateEntry): Record<string, string> {
  const map: Record<string, string> = {}
  for (const p of entry.colors) map[p.property] = p.token
  for (const p of (entry.typography ?? [])) map[p.property] = p.token
  return map
}

// ── Types ──────────────────────────────────────────────────────────────────
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
  const tag = el.tagName.toLowerCase()
  const role = el.getAttribute("role") || el.getAttribute("data-slot") || tag
  const ariaLabel = el.getAttribute("aria-label") || ""
  const text = (el.textContent || "").trim().slice(0, 30)
  const componentName = ariaLabel || text || role

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
      property, hex,
      token: tokenMatch?.name || "unknown",
      category: tokenMatch?.category || "—",
      raw,
    })
  }

  const fontSize = styles.fontSize
  const fontWeight = styles.fontWeight
  const lineHeight = styles.lineHeight
  const fontFamily = styles.fontFamily.split(",")[0].replace(/['"]/g, "").trim()

  const typography = [
    { property: "Font Family", value: fontFamily, token: fontFamily.toLowerCase().includes("inter") ? "font-family-primary (Inter)" : fontFamily },
    { property: "Font Size", value: fontSize, token: FONT_SIZE_MAP[fontSize] || fontSize },
    { property: "Font Weight", value: fontWeight, token: FONT_WEIGHT_MAP[fontWeight] || fontWeight },
    { property: "Line Height", value: lineHeight, token: lineHeight },
  ]

  const borderRadius = styles.borderRadius
  const pt = styles.paddingTop, pr = styles.paddingRight
  const pb = styles.paddingBottom, pl = styles.paddingLeft
  const paddingTokens = [pt, pr, pb, pl]
    .map(v => SPACING_TOKEN_MAP[v] ? `${v} (${SPACING_TOKEN_MAP[v]})` : v)
    .join(" · ")
  const spacing = [
    { property: "Border Radius", value: RADIUS_MAP[borderRadius] ? `${borderRadius} — ${RADIUS_MAP[borderRadius]}` : borderRadius },
    { property: "Padding", value: paddingTokens },
    { property: "Height", value: styles.height },
    { property: "Width", value: styles.width },
  ]

  return { componentName, tagName: tag, colors, typography, spacing }
}

// ── UI helpers ─────────────────────────────────────────────────────────────
function ColorSwatch({ hex, cssVar }: { hex?: string; cssVar?: string }) {
  const resolvedHex = hex ?? (cssVar ? resolveCssVarToHex(cssVar) : null)
  if (!resolvedHex) return null
  return (
    <span
      className="inline-block h-3 w-3 shrink-0 rounded-[2px] border border-border/50 align-middle"
      style={{ backgroundColor: resolvedHex }}
    />
  )
}

function ChangedBadge() {
  return (
    <span className="inline-flex items-center rounded-[3px] bg-warning/15 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-warning">
      Changed
    </span>
  )
}

// ── Panel ──────────────────────────────────────────────────────────────────
interface TokenInspectorProps {
  data: InspectorData | null
  open: boolean
  onClose: () => void
}

export function TokenInspectorPanel({ data, open, onClose }: TokenInspectorProps) {
  const [activeStateIdx, setActiveStateIdx] = useState(0)

  // Reset tab when component changes
  useEffect(() => { setActiveStateIdx(0) }, [data?.tagName, data?.componentName])

  const stateEntries = data
    ? getStateTokens(data.tagName)
    : null
  const defaultMap = stateEntries ? buildTokenMap(stateEntries[0]) : {}
  const activeEntry = stateEntries?.[activeStateIdx]

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

          {/* Component chip */}
          <div className="border-b border-border bg-muted/30 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="rounded-[3px] bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-primary">
                &lt;{data.tagName}&gt;
              </span>
              {data.componentName && data.componentName !== data.tagName && (
                <span className="truncate text-xs text-muted-foreground">{data.componentName}</span>
              )}
            </div>
          </div>

          {/* Spacing & Shape */}
          <section className="border-b border-border px-4 py-3">
            <div className="mb-2 flex items-center gap-1.5">
              <BoxSelect className="size-3.5 text-muted-foreground" />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Spacing & Shape</p>
            </div>
            <div className="space-y-2">
              {data.spacing.map((row) => (
                <div key={row.property} className="flex items-start justify-between gap-2">
                  <span className="text-xs text-muted-foreground shrink-0">{row.property}</span>
                  <span className="text-right font-mono text-xs text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* State Tokens — tabbed */}
          {stateEntries && activeEntry && (
            <section className="px-4 py-3">
              <div className="mb-3 flex items-center gap-1.5">
                <Layers className="size-3.5 text-muted-foreground" />
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">States</p>
              </div>

              {/* State tabs */}
              <div className="mb-3 flex flex-wrap gap-1">
                {stateEntries.map((entry, idx) => (
                  <button
                    key={entry.state}
                    onClick={() => setActiveStateIdx(idx)}
                    className={cn(
                      "rounded-[4px] px-2 py-1 text-[10px] font-medium transition-colors",
                      activeStateIdx === idx
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    )}
                  >
                    {entry.state}
                  </button>
                ))}
              </div>

              {/* Colors for active state */}
              <div className="mb-3">
                <p className="mb-1.5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                  <Palette className="size-2.5" /> Colors
                </p>
                <div className="space-y-1.5 rounded-md border border-border/60 bg-muted/20 px-3 py-2">
                  {activeEntry.colors.map((prop) => {
                    const defaultToken = defaultMap[prop.property]
                    const changed = activeStateIdx !== 0 && defaultToken !== undefined && prop.token !== defaultToken
                    const resolvedHex = prop.isColor ? resolveCssVarToHex(prop.token) : null
                    return (
                      <div key={prop.property} className="flex items-start justify-between gap-2">
                        <div className="flex shrink-0 flex-col">
                          <span className="text-[10px] text-muted-foreground">{prop.property}</span>
                          {prop.note && (
                            <span className="text-[9px] text-muted-foreground/50">{prop.note}</span>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                          {changed && <ChangedBadge />}
                          <div className="flex items-center gap-1">
                            {resolvedHex && <ColorSwatch hex={resolvedHex} />}
                            <span className="font-mono text-[10px] text-foreground">{prop.token}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Typography for active state */}
              {activeEntry.typography && activeEntry.typography.length > 0 && (
                <div>
                  <p className="mb-1.5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                    <Type className="size-2.5" /> Typography
                  </p>
                  <div className="space-y-1.5 rounded-md border border-border/60 bg-muted/20 px-3 py-2">
                    {activeEntry.typography.map((prop) => {
                      const defaultToken = defaultMap[prop.property]
                      const changed = activeStateIdx !== 0 && defaultToken !== undefined && prop.token !== defaultToken
                      return (
                        <div key={prop.property} className="flex items-start justify-between gap-2">
                          <span className="shrink-0 text-[10px] text-muted-foreground">{prop.property}</span>
                          <div className="flex flex-col items-end gap-0.5">
                            {changed && <ChangedBadge />}
                            <div className="flex items-center gap-1">
                              <span className="font-mono text-[10px] text-foreground">{prop.token}</span>
                              {prop.note && (
                                <span className="text-[9px] text-muted-foreground/50">({prop.note})</span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-lg bg-muted/40">
            <Layers className="size-5 text-muted-foreground/40" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">No component selected</p>
            <p className="text-xs text-muted-foreground">Long-press any component to inspect its design tokens</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Hook ───────────────────────────────────────────────────────────────────
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

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  return { open, data, close, onPointerDown, onPointerUp, onPointerLeave }
}
