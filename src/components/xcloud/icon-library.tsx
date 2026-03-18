"use client"

import { useState, useCallback, useEffect } from "react"
import { Search, Download, Copy, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { downloadSVG, downloadPNG, copySVG, copyPNG } from "@/lib/icon-download"
import { toast } from "sonner"

// ── Types ──────────────────────────────────────────────────────────────────

interface IconMeta {
  id: string
  name: string
  category: string
  filename: string
  url: string
  uploadedAt: string
}

const SIZES = [16, 24, 32, 48, 64, 128] as const
type IconSize = (typeof SIZES)[number]
type IconFormat = "svg" | "png"

// ── SVG icon rendered via CSS mask (inherits --icon-primary color) ──────────

function SvgIcon({ url, size = 32, color, className }: { url: string; size?: number; color?: string; className?: string }) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        backgroundColor: color || "var(--icon-primary)",
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        flexShrink: 0,
      }}
    />
  )
}

// ── Download Modal ─────────────────────────────────────────────────────────

function DownloadModal({
  icon,
  onClose,
}: {
  icon: IconMeta
  onClose: () => void
}) {
  const [size, setSize] = useState<IconSize>(24)
  const [format, setFormat] = useState<IconFormat>("svg")
  const [color, setColor] = useState("#E4E7EB")
  const [downloading, setDownloading] = useState(false)
  const [copying, setCopying] = useState(false)

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  const handleDownload = async () => {
    setDownloading(true)
    try {
      if (format === "svg") {
        await downloadSVG(icon.url, icon.name, size)
      } else {
        await downloadPNG(icon.url, icon.name, size)
      }
      toast.success(`Downloaded ${icon.name}-${size}.${format}`)
    } catch {
      toast.error("Download failed")
    } finally {
      setDownloading(false)
    }
  }

  const handleCopy = async () => {
    setCopying(true)
    try {
      if (format === "svg") {
        await copySVG(icon.url, size)
      } else {
        await copyPNG(icon.url, size)
      }
      toast.success(`Copied ${icon.name} ${format.toUpperCase()} to clipboard`)
    } catch {
      toast.error("Copy failed")
    } finally {
      setCopying(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-80 rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-foreground">{icon.name}</p>
            <p className="text-xs text-muted-foreground">{icon.category}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Preview */}
          <div className="flex items-center justify-center rounded-lg bg-muted/40 py-8">
            <SvgIcon url={icon.url} size={Math.min(size, 64)} color={color} />
          </div>

          {/* Color */}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Color</p>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-16 rounded-md border border-border cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1 h-10 rounded-md border border-border bg-muted px-2 text-xs font-mono text-foreground"
              />
            </div>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Size</p>
            <div className="grid grid-cols-6 gap-1.5">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "rounded-md py-1.5 text-xs font-mono font-medium transition-colors",
                    size === s
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Format */}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Format</p>
            <div className="grid grid-cols-2 gap-1.5">
              {(["svg", "png"] as IconFormat[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={cn(
                    "rounded-md py-2 text-xs font-mono font-semibold uppercase transition-colors",
                    format === f
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  )}
                >
                  .{f}
                </button>
              ))}
            </div>
          </div>

          {/* Download & Copy buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading || copying}
              className="flex flex-1 h-10 items-center justify-center gap-2 rounded-lg bg-secondary text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80 disabled:opacity-40"
            >
              {downloading ? (
                <><Loader2 className="size-4 animate-spin" /> Downloading…</>
              ) : (
                <><Download className="size-4" /> Download</>
              )}
            </button>
            <button
              onClick={handleCopy}
              disabled={copying || downloading}
              className="flex flex-1 h-10 items-center justify-center gap-2 rounded-lg bg-secondary text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80 disabled:opacity-40"
            >
              {copying ? (
                <><Loader2 className="size-4 animate-spin" /> Copying…</>
              ) : (
                <><Copy className="size-4" /> Copy</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Icon Card ──────────────────────────────────────────────────────────────

function IconCard({ icon }: { icon: IconMeta }) {
  const [showDownload, setShowDownload] = useState(false)

  return (
    <div className="relative flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-md">
      {/* Icon preview */}
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted/40">
        <SvgIcon url={icon.url} size={32} />
      </div>

      {/* Name */}
      <span className="w-full truncate text-center text-[10px] font-mono text-muted-foreground" title={icon.name}>
        {icon.name}
      </span>

      {/* Download trigger */}
      <button
        onClick={() => setShowDownload(true)}
        className="flex h-7 w-full items-center justify-center gap-1.5 rounded-sm bg-primary text-white text-[10px] font-medium transition-colors hover:bg-primary/90"
      >
        <Download className="size-3.5" />
        Download
      </button>

      {/* Download modal */}
      {showDownload && (
        <DownloadModal icon={icon} onClose={() => setShowDownload(false)} />
      )}
    </div>
  )
}

// ── Icon Library (main export) ─────────────────────────────────────────────

export function IconLibrary() {
  const [icons, setIcons] = useState<IconMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const fetchIcons = useCallback(async () => {
    try {
      const res = await fetch("/api/icons")
      const data: IconMeta[] = await res.json()
      setIcons(data)
    } catch {
      toast.error("Failed to load icons")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchIcons() }, [fetchIcons])

  const categories = ["All", ...Array.from(new Set(icons.map((i) => i.category))).sort()]

  const filtered = icons.filter((icon) => {
    const matchesSearch = icon.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === "All" || icon.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* Browse */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons…"
              className="w-full rounded-sm border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {filtered.length} icon{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Category tabs */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-sm px-3 py-1 text-xs font-medium transition-colors",
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground gap-2">
            <Loader2 className="size-4 animate-spin" />
            <span className="text-sm">Loading icons…</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border py-20 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Search className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {icons.length === 0 ? "No icons yet" : "No icons found"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {icons.length === 0
                  ? "Upload your first SVG icon above to get started."
                  : "Try a different search or category."}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3">
            {filtered.map((icon) => (
              <IconCard key={icon.id} icon={icon} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
