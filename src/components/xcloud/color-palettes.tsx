"use client"

import { cn } from "@/lib/utils"

type Swatch = {
  step: string
  cssVar: string
  hex: string
}

type Palette = {
  name: string
  swatches: Swatch[]
}

type PaletteGroup = {
  group: string
  palettes: Palette[]
}

const PALETTE_GROUPS: PaletteGroup[] = [
  {
    group: "Brand",
    palettes: [
      {
        name: "Blue",
        swatches: [
          { step: "25",   cssVar: "--primitive-blue-25",   hex: "#DDECFF" },
          { step: "50",   cssVar: "--primitive-blue-50",   hex: "#BCD9FF" },
          { step: "100",  cssVar: "--primitive-blue-100",  hex: "#9AC6FF" },
          { step: "200",  cssVar: "--primitive-blue-200",  hex: "#79B3FF" },
          { step: "300",  cssVar: "--primitive-blue-300",  hex: "#57A0FF" },
          { step: "400",  cssVar: "--primitive-blue-400",  hex: "#368DFF" },
          { step: "500",  cssVar: "--primitive-blue-500",  hex: "#147AFF" },
          { step: "600",  cssVar: "--primitive-blue-600",  hex: "#1169DB" },
          { step: "700",  cssVar: "--primitive-blue-700",  hex: "#0E57B6" },
          { step: "800",  cssVar: "--primitive-blue-800",  hex: "#0B4692" },
          { step: "900",  cssVar: "--primitive-blue-900",  hex: "#09346D" },
          { step: "950",  cssVar: "--primitive-blue-950",  hex: "#062349" },
          { step: "A100", cssVar: "--primitive-blue-A100", hex: "#031124" },
        ],
      },
    ],
  },
  {
    group: "Neutrals",
    palettes: [
      {
        name: "Light Shades",
        swatches: [
          { step: "25",  cssVar: "--primitive-ls-25",  hex: "#FFFFFF" },
          { step: "50",  cssVar: "--primitive-ls-50",  hex: "#FAFBFC" },
          { step: "100", cssVar: "--primitive-ls-100", hex: "#F2F5F7" },
          { step: "200", cssVar: "--primitive-ls-200", hex: "#EDF0F2" },
          { step: "300", cssVar: "--primitive-ls-300", hex: "#E4E7EB" },
          { step: "400", cssVar: "--primitive-ls-400", hex: "#8B939E" },
          { step: "500", cssVar: "--primitive-ls-500", hex: "#737985" },
          { step: "600", cssVar: "--primitive-ls-600", hex: "#535865" },
          { step: "700", cssVar: "--primitive-ls-700", hex: "#40444F" },
          { step: "800", cssVar: "--primitive-ls-800", hex: "#2D313B" },
          { step: "900", cssVar: "--primitive-ls-900", hex: "#1F2128" },
          { step: "950", cssVar: "--primitive-ls-950", hex: "#181A1F" },
        ],
      },
      {
        name: "Dark Shades",
        swatches: [
          { step: "25",  cssVar: "--primitive-ds-25",  hex: "#E9EBED" },
          { step: "50",  cssVar: "--primitive-ds-50",  hex: "#CBCFD5" },
          { step: "100", cssVar: "--primitive-ds-100", hex: "#B0B6BF" },
          { step: "200", cssVar: "--primitive-ds-200", hex: "#89909D" },
          { step: "300", cssVar: "--primitive-ds-300", hex: "#737A85" },
          { step: "400", cssVar: "--primitive-ds-400", hex: "#515A67" },
          { step: "500", cssVar: "--primitive-ds-500", hex: "#373E4A" },
          { step: "600", cssVar: "--primitive-ds-600", hex: "#333842" },
          { step: "700", cssVar: "--primitive-ds-700", hex: "#292E39" },
          { step: "800", cssVar: "--primitive-ds-800", hex: "#23272D" },
          { step: "900", cssVar: "--primitive-ds-900", hex: "#1F2328" },
          { step: "950", cssVar: "--primitive-ds-950", hex: "#181B1F" },
        ],
      },
    ],
  },
  {
    group: "Status",
    palettes: [
      {
        name: "Green",
        swatches: [
          { step: "25",   cssVar: "--primitive-green-25",   hex: "#C0E4CD" },
          { step: "50",   cssVar: "--primitive-green-50",   hex: "#A5DCB9" },
          { step: "100",  cssVar: "--primitive-green-100",  hex: "#8BD4A6" },
          { step: "200",  cssVar: "--primitive-green-200",  hex: "#70CC93" },
          { step: "300",  cssVar: "--primitive-green-300",  hex: "#55C480" },
          { step: "400",  cssVar: "--primitive-green-400",  hex: "#3ABB6D" },
          { step: "500",  cssVar: "--primitive-green-500",  hex: "#1DC35A" },
          { step: "600",  cssVar: "--primitive-green-600",  hex: "#18AD4F" },
          { step: "700",  cssVar: "--primitive-green-700",  hex: "#149744" },
          { step: "800",  cssVar: "--primitive-green-800",  hex: "#10813A" },
          { step: "900",  cssVar: "--primitive-green-900",  hex: "#0C6A2F" },
          { step: "950",  cssVar: "--primitive-green-950",  hex: "#095525" },
          { step: "A100", cssVar: "--primitive-green-A100", hex: "#1E3F30" },
        ],
      },
      {
        name: "Orange",
        swatches: [
          { step: "25",   cssVar: "--primitive-orange-25",   hex: "#FEEEDC" },
          { step: "50",   cssVar: "--primitive-orange-50",   hex: "#FFDEBB" },
          { step: "100",  cssVar: "--primitive-orange-100",  hex: "#FDC68C" },
          { step: "200",  cssVar: "--primitive-orange-200",  hex: "#FCB264" },
          { step: "300",  cssVar: "--primitive-orange-300",  hex: "#F5923F" },
          { step: "400",  cssVar: "--primitive-orange-400",  hex: "#F47C18" },
          { step: "500",  cssVar: "--primitive-orange-500",  hex: "#F2870D" },
          { step: "600",  cssVar: "--primitive-orange-600",  hex: "#DB790B" },
          { step: "700",  cssVar: "--primitive-orange-700",  hex: "#C36B09" },
          { step: "800",  cssVar: "--primitive-orange-800",  hex: "#AB5C07" },
          { step: "900",  cssVar: "--primitive-orange-900",  hex: "#934E05" },
          { step: "950",  cssVar: "--primitive-orange-950",  hex: "#7B4003" },
          { step: "A100", cssVar: "--primitive-orange-A100", hex: "#633101" },
        ],
      },
      {
        name: "Red",
        swatches: [
          { step: "25",   cssVar: "--primitive-red-25",   hex: "#FDE9E6" },
          { step: "50",   cssVar: "--primitive-red-50",   hex: "#FBCDCB" },
          { step: "100",  cssVar: "--primitive-red-100",  hex: "#F7B0AD" },
          { step: "200",  cssVar: "--primitive-red-200",  hex: "#F3938F" },
          { step: "300",  cssVar: "--primitive-red-300",  hex: "#EF756F" },
          { step: "400",  cssVar: "--primitive-red-400",  hex: "#EB5851" },
          { step: "500",  cssVar: "--primitive-red-500",  hex: "#E24C3C" },
          { step: "600",  cssVar: "--primitive-red-600",  hex: "#CC4436" },
          { step: "700",  cssVar: "--primitive-red-700",  hex: "#B63C30" },
          { step: "800",  cssVar: "--primitive-red-800",  hex: "#A0352A" },
          { step: "900",  cssVar: "--primitive-red-900",  hex: "#8A2D24" },
          { step: "950",  cssVar: "--primitive-red-950",  hex: "#73261E" },
          { step: "A100", cssVar: "--primitive-red-A100", hex: "#5D1F18" },
        ],
      },
    ],
  },
]

// Determine if a swatch needs dark text
function needsDarkText(hex: string): boolean {
  const c = hex.replace("#", "")
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.55
}

function SwatchStrip({ palette }: { palette: Palette }) {
  return (
    <div className="space-y-2">
      {/* Palette name */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">{palette.name}</span>
        <span className="text-xs font-mono text-muted-foreground">
          {palette.swatches.length} steps
        </span>
      </div>

      {/* Swatch row */}
      <div className="flex rounded-md overflow-hidden border border-border/40">
        {palette.swatches.map((s) => {
          const dark = needsDarkText(s.hex.startsWith("#C") ? "#C0E4CD" : s.hex)
          return (
            <div
              key={s.cssVar + s.step}
              className="flex-1 group relative cursor-default"
              style={{ backgroundColor: `var(${s.cssVar}, ${s.hex})` }}
              title={`${palette.name}/${s.step} · ${s.hex}`}
            >
              {/* Swatch block */}
              <div className="h-14" />
              {/* Step label */}
              <div
                className={cn(
                  "px-1 pb-2 pt-1 text-center",
                  "text-[9px] font-mono leading-none",
                  dark ? "text-black/60" : "text-white/70"
                )}
                style={{ backgroundColor: `var(${s.cssVar}, ${s.hex})` }}
              >
                {s.step}
              </div>
            </div>
          )
        })}
      </div>

      {/* Hex value row */}
      <div
        className="grid text-[9px] font-mono text-muted-foreground"
        style={{ gridTemplateColumns: `repeat(${palette.swatches.length}, 1fr)` }}
      >
        {palette.swatches.map((s) => (
          <span
            key={s.step + "-hex"}
            className="text-center truncate px-px leading-tight"
            title={s.hex}
          >
            {s.hex}
          </span>
        ))}
      </div>
    </div>
  )
}

export function ColorPalettes() {
  return (
    <div className="space-y-10">
      {PALETTE_GROUPS.map((group) => (
        <div key={group.group}>
          <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            {group.group}
          </h3>
          <div className="space-y-6">
            {group.palettes.map((palette) => (
              <SwatchStrip key={palette.name} palette={palette} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
