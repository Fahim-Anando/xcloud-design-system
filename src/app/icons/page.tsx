"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PlaygroundNav } from "@/components/xcloud/playground-nav"
import { IconLibrary } from "@/components/xcloud/icon-library"
import { useTokenInspector, TokenInspectorPanel } from "@/components/xcloud/token-inspector"
import { ThemeToggle } from "@/components/xcloud/theme-toggle"

export default function IconsPage() {
  const { open, data, close, onPointerDown, onPointerUp, onPointerLeave } = useTokenInspector()

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <PlaygroundNav mode="router" activeSlug="" />

      <div className="flex flex-1 flex-col pl-52">
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex h-14 items-center justify-between px-6">
            <div />
            <div className="flex items-center gap-2">
              <Badge variant="muted" className="hidden sm:inline-flex">
                Hold any component to inspect tokens
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <TokenInspectorPanel data={data} open={open} onClose={close} />

        <main
          className="flex-1 px-8 py-10"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerLeave}
        >
          <div className="space-y-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Icon Library</h1>
              <p className="text-muted-foreground">
                Browse, upload, and download SVG icons for the xCloud design system.
              </p>
            </div>
            <Separator />
            <IconLibrary />
          </div>

          <footer className="pb-8 pt-12 text-center text-xs text-muted-foreground">
            xCloud Design System · shadcn/ui + Tailwind CSS v4 + Inter
          </footer>
        </main>
      </div>
    </div>
  )
}
