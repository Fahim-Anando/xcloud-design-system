"use client"

import { Badge } from "@/components/ui/badge"
import { PlaygroundNav } from "@/components/xcloud/playground-nav"
import { ComponentGrid } from "@/components/xcloud/component-grid"
import { useTokenInspector, TokenInspectorPanel } from "@/components/xcloud/token-inspector"
import { ThemeToggle } from "@/components/xcloud/theme-toggle"

export default function ComponentsIndexPage() {
  const { open, data, close, onPointerDown, onPointerUp, onPointerLeave } = useTokenInspector()

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <PlaygroundNav mode="router" activeSlug="" />

      <div className="flex flex-1 flex-col pl-52">
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex h-14 items-center justify-between px-6">
            <div />
            <div className="flex items-center gap-2">
              <Badge variant="muted" className="hidden sm:inline-flex">Hold any component to inspect tokens</Badge>
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
          <ComponentGrid />
        </main>
      </div>
    </div>
  )
}
