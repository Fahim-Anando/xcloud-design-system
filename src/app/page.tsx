"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import { useTokenInspector, TokenInspectorPanel } from "@/components/xcloud/token-inspector"
import { ThemeToggle } from "@/components/xcloud/theme-toggle"
import { ColorPalettes } from "@/components/xcloud/color-palettes"
import { SemanticTokenTable } from "@/components/xcloud/semantic-tokens"
import { PlaygroundNav, type NavSection } from "@/components/xcloud/playground-nav"
import { ComponentGrid } from "@/components/xcloud/component-grid"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}

export default function Playground() {
  const { open, data, close, onPointerDown, onPointerUp, onPointerLeave } = useTokenInspector()
  const [activeSection, setActiveSection] = useState<NavSection>("color")

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <PlaygroundNav
        mode="spa"
        active={activeSection}
        onSelect={setActiveSection}
      />

      <div className="flex flex-1 flex-col pl-52">
        {/* Header */}
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

          {/* ── COLOR ── */}
          {activeSection === "color" && (
            <div className="space-y-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Color System</h1>
                <p className="text-muted-foreground">Primitive palettes and semantic token reference for the xCloud design system.</p>
              </div>
              <Separator />
              <Section title="Color Palettes">
                <ColorPalettes />
              </Section>
              <Separator />
              <Section title="Color Tokens">
                <SemanticTokenTable />
              </Section>
            </div>
          )}

          {/* ── TYPOGRAPHY ── */}
          {activeSection === "typography" && (
            <div className="space-y-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Typography</h1>
                <p className="text-muted-foreground">Type scale tokens used across the xCloud design system.</p>
              </div>
              <Separator />
              <Section title="Typography">
                <div className="space-y-6">

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Headings</p>
                    <div className="rounded-md border border-border overflow-hidden">
                      <div className="grid grid-cols-[200px_56px_56px_1fr] gap-x-4 border-b border-border bg-muted/40 px-4 py-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Token</span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Size</span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Weight</span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Preview</span>
                      </div>
                      {[
                        { token: "text-heading-xxlarge", size: "36px", weight: "600", cls: "text-[36px] font-semibold leading-tight" },
                        { token: "text-heading-xlarge",  size: "24px", weight: "600", cls: "text-[24px] font-semibold leading-tight" },
                        { token: "text-heading-large",   size: "22px", weight: "600", cls: "text-[22px] font-semibold leading-tight" },
                        { token: "text-heading-medium",  size: "20px", weight: "600", cls: "text-[20px] font-semibold leading-snug" },
                        { token: "text-heading-small",   size: "18px", weight: "500", cls: "text-[18px] font-medium leading-snug" },
                        { token: "text-heading-xsmall",  size: "16px", weight: "500", cls: "text-base font-medium leading-snug" },
                      ].map((row, i, arr) => (
                        <div
                          key={row.token}
                          className={`grid grid-cols-[200px_56px_56px_1fr] items-center gap-x-4 px-4 py-3 ${i < arr.length - 1 ? "border-b border-border" : ""}`}
                        >
                          <span className="font-mono text-[11px] text-muted-foreground">{row.token}</span>
                          <span className="text-xs text-muted-foreground">{row.size}</span>
                          <span className="text-xs text-muted-foreground">{row.weight}</span>
                          <p className={row.cls}>The quick brown fox</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Body</p>
                    <div className="rounded-md border border-border overflow-hidden">
                      <div className="grid grid-cols-[200px_56px_56px_1fr] gap-x-4 border-b border-border bg-muted/40 px-4 py-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Token</span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Size</span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Weight</span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Preview</span>
                      </div>
                      {[
                        { token: "text-large",   size: "18px", weight: "500", cls: "text-[18px] font-medium" },
                        { token: "text-medium",  size: "16px", weight: "400", cls: "text-base font-normal" },
                        { token: "text-small",   size: "14px", weight: "400", cls: "text-sm font-normal" },
                        { token: "text-xsmall",  size: "12px", weight: "400", cls: "text-xs font-normal" },
                        { token: "text-xxsmall", size: "10px", weight: "400", cls: "text-[10px] font-normal" },
                      ].map((row, i, arr) => (
                        <div
                          key={row.token}
                          className={`grid grid-cols-[200px_56px_56px_1fr] items-center gap-x-4 px-4 py-3 ${i < arr.length - 1 ? "border-b border-border" : ""}`}
                        >
                          <span className="font-mono text-[11px] text-muted-foreground">{row.token}</span>
                          <span className="text-xs text-muted-foreground">{row.size}</span>
                          <span className="text-xs text-muted-foreground">{row.weight}</span>
                          <p className={row.cls}>Last updated 5 minutes ago · Frankfurt datacenter</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Paragraph</p>
                    <div className="rounded-md border border-border overflow-hidden">
                      <div className="grid grid-cols-[200px_56px_56px_1fr] gap-x-4 border-b border-border bg-muted/40 px-4 py-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Token</span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Size</span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Weight</span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Preview</span>
                      </div>
                      {[
                        { token: "text-paragraph-medium", size: "16px", weight: "400", cls: "text-base font-normal leading-relaxed" },
                        { token: "text-paragraph-small",  size: "14px", weight: "400", cls: "text-sm font-normal leading-relaxed" },
                        { token: "text-paragraph-xsmall", size: "12px", weight: "400", cls: "text-xs font-normal leading-relaxed" },
                      ].map((row, i, arr) => (
                        <div
                          key={row.token}
                          className={`grid grid-cols-[200px_56px_56px_1fr] items-center gap-x-4 px-4 py-3 ${i < arr.length - 1 ? "border-b border-border" : ""}`}
                        >
                          <span className="font-mono text-[11px] text-muted-foreground">{row.token}</span>
                          <span className="text-xs text-muted-foreground">{row.size}</span>
                          <span className="text-xs text-muted-foreground">{row.weight}</span>
                          <p className={`${row.cls} text-muted-foreground`}>xCloud helps teams deploy, manage, and scale WordPress sites with confidence.</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </Section>
            </div>
          )}

          {/* ── COMPONENTS grid — cards link to /components/[slug] ── */}
          {activeSection === "components" && (
            <ComponentGrid />
          )}

          <footer className="pb-8 pt-12 text-center text-xs text-muted-foreground">
            xCloud Design System · shadcn/ui + Tailwind CSS v4 + Inter
          </footer>
        </main>
      </div>
    </div>
  )
}
