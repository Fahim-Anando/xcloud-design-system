"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Upload, Search, Download, X, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { downloadSVG, downloadPNG } from "@/lib/icon-download"
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

function SvgIcon({ url, size = 32, className }: { url: string; size?: number; className?: string }) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        backgroundColor: "var(--icon-primary)",
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

// ── Upload Panel ───────────────────────────────────────────────────────────

function UploadPanel({ onUploaded }: { onUploaded: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)

  const accept = useCallback((f: File) => {
    if (!f.name.toLowerCase().endsWith(".svg") && f.type !== "image/svg+xml") {
      toast.error("Only SVG files are supported")
      return
    }
    if (f.size > 200 * 1024) {
      toast.error("File too large — max 200 KB")
      return
    }
    setFile(f)
    setName(f.name.replace(/\.svg$/i, ""))
    const url = URL.createObjectURL(f)
    setPreviewUrl(url)
    setSuccess(false)
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const f = e.dataTransfer.files[0]
      if (f) accept(f)
    },
    [accept]
  )

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0]
      if (f) accept(f)
    },
    [accept]
  )

  const reset = () => {
    setFile(null)
    setName("")
    setCategory("")
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setSuccess(false)
    if (inputRef.current) inputRef.current.value = ""
  }

  const upload = async () => {
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("name", name.trim() || file.name.replace(/\.svg$/i, ""))
      fd.append("category", category.trim() || "Uncategorized")
      const res = await fetch("/api/icons", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Upload failed")
      setSuccess(true)
      toast.success(`"${data.icon.name}" uploaded successfully`)
      onUploaded()
      setTimeout(reset, 1200)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 text-sm font-semibold text-foreground">Upload Icon</h3>

      <div className="flex gap-6">
        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !file && inputRef.current?.click()}
          className={cn(
            "relative flex h-32 w-32 shrink-0 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
            dragging
              ? "border-primary bg-primary/5"
              : file
              ? "cursor-default border-border bg-muted/40"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          )}
        >
          {previewUrl ? (
            <>
              <SvgIcon url={previewUrl} size={48} />
              <button
                onClick={(e) => { e.stopPropagation(); reset() }}
                className="absolute right-1.5 top-1.5 rounded-full bg-muted p-0.5 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            </>
          ) : (
            <>
              <Upload className="mb-1.5 size-5 text-muted-foreground" />
              <span className="text-center text-[10px] text-muted-foreground px-2 leading-snug">
                Drop SVG here or click to browse
              </span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".svg,image/svg+xml"
            className="hidden"
            onChange={onFileChange}
          />
        </div>

        {/* Fields */}
        <div className="flex flex-1 flex-col gap-3">
          <div>
            <label className="mb-1 block text-[11px] font-medium text-muted-foreground">
              Icon Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. arrow-right"
              className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium text-muted-foreground">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Navigation, Actions…"
              className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <button
            onClick={upload}
            disabled={!file || uploading || success}
            className={cn(
              "mt-auto flex h-9 items-center justify-center gap-2 rounded-sm px-4 text-sm font-medium transition-colors disabled:opacity-30",
              success
                ? "bg-success/20 text-success"
                : "bg-primary text-white hover:bg-primary/90"
            )}
          >
            {uploading ? (
              <><Loader2 className="size-4 animate-spin" /> Uploading…</>
            ) : success ? (
              <><Check className="size-4" /> Uploaded</>
            ) : (
              <><Upload className="size-4" /> Upload Icon</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Download Popover ───────────────────────────────────────────────────────

function DownloadPopover({
  icon,
  onClose,
}: {
  icon: IconMeta
  onClose: () => void
}) {
  const [size, setSize] = useState<IconSize>(24)
  const [format, setFormat] = useState<IconFormat>("svg")
  const [downloading, setDownloading] = useState(false)

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

  return (
    <div className="absolute inset-0 z-10 flex flex-col rounded-lg bg-card border border-border shadow-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-foreground truncate pr-2">{icon.name}</span>
        <button onClick={onClose} className="shrink-0 text-muted-foreground hover:text-foreground">
          <X className="size-3.5" />
        </button>
      </div>

      {/* Preview */}
      <div className="flex items-center justify-center rounded-md bg-muted/40 py-3 mb-3">
        <SvgIcon url={icon.url} size={Math.min(size, 64)} />
      </div>

      {/* Size */}
      <p className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/60">Size</p>
      <div className="mb-3 flex flex-wrap gap-1">
        {SIZES.map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={cn(
              "rounded px-2 py-0.5 text-[10px] font-mono transition-colors",
              size === s
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Format */}
      <p className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/60">Format</p>
      <div className="mb-4 flex gap-1">
        {(["svg", "png"] as IconFormat[]).map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={cn(
              "rounded px-3 py-0.5 text-[10px] font-mono uppercase transition-colors",
              format === f
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="flex h-8 items-center justify-center gap-2 rounded-sm bg-primary px-3 text-xs font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-30"
      >
        {downloading ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <Download className="size-3.5" />
        )}
        Download {size}px .{format}
      </button>
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
        className="flex h-6 w-full items-center justify-center gap-1 rounded-sm bg-muted text-[10px] text-muted-foreground transition-colors hover:bg-primary hover:text-white"
      >
        <Download className="size-3" />
        Download
      </button>

      {/* Download popover overlay */}
      {showDownload && (
        <DownloadPopover icon={icon} onClose={() => setShowDownload(false)} />
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
      {/* Upload */}
      <UploadPanel onUploaded={fetchIcons} />

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
