"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Palette, Type, LayoutGrid, ChevronRight, Shapes } from "lucide-react"
import { cn } from "@/lib/utils"
import { COMPONENT_CATEGORIES } from "@/components/xcloud/component-grid"

export type NavSection = "color" | "typography" | "components" | "icons"

const GROUPS = Array.from(new Set(COMPONENT_CATEGORIES.map(c => c.group)))

// ── SPA mode (main / page) ───────────────────────────────────
interface SpaNavProps {
  mode: "spa"
  active: NavSection
  onSelect: (s: NavSection) => void
  activeComponent?: null
}

// ── Router mode (component detail pages + icons page) ────────
interface RouterNavProps {
  mode: "router"
  activeSlug: string
}

type PlaygroundNavProps = SpaNavProps | RouterNavProps

export function PlaygroundNav(props: PlaygroundNavProps) {
  const pathname = usePathname()
  const isRouterMode = props.mode === "router"
  const activeSlug = isRouterMode ? props.activeSlug : null

  // Derive active section from pathname in router mode
  const isOnIconsPage = pathname === "/icons"
  const isOnComponentsPage = pathname?.startsWith("/components") ?? false
  const showComponentsSubMenu =
    isOnComponentsPage ||
    (!isRouterMode && (props as SpaNavProps).active === "components")

  function navLinkClass(active: boolean) {
    return cn(
      "flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-primary/10 text-primary"
        : "text-text-secondary hover:bg-muted hover:text-foreground"
    )
  }

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-52 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <span className="text-xs font-bold text-white">xC</span>
          </div>
          <span className="text-sm font-semibold text-foreground">xCloud DS</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="h-[calc(100vh-3.5rem)] overflow-y-auto p-3 space-y-1">

        {/* Color */}
        {isRouterMode ? (
          <Link href="/" className={navLinkClass(false)}>
            <Palette className="size-4 shrink-0" />
            Color
          </Link>
        ) : (
          <button
            onClick={() => (props as SpaNavProps).onSelect("color")}
            className={navLinkClass((props as SpaNavProps).active === "color")}
          >
            <Palette className="size-4 shrink-0" />
            Color
          </button>
        )}

        {/* Typography */}
        {isRouterMode ? (
          <Link href="/" className={navLinkClass(false)}>
            <Type className="size-4 shrink-0" />
            Typography
          </Link>
        ) : (
          <button
            onClick={() => (props as SpaNavProps).onSelect("typography")}
            className={navLinkClass((props as SpaNavProps).active === "typography")}
          >
            <Type className="size-4 shrink-0" />
            Typography
          </button>
        )}

        {/* Components + sub-menu */}
        <div>
          {isRouterMode ? (
            <Link
              href="/components"
              className={navLinkClass(isOnComponentsPage)}
            >
              <LayoutGrid className="size-4 shrink-0" />
              Components
              {isOnComponentsPage && (
                <ChevronRight className="ml-auto size-3.5 rotate-90 text-muted-foreground" />
              )}
            </Link>
          ) : (
            <button
              onClick={() => (props as SpaNavProps).onSelect("components")}
              className={navLinkClass((props as SpaNavProps).active === "components")}
            >
              <LayoutGrid className="size-4 shrink-0" />
              Components
              {(props as SpaNavProps).active === "components" && (
                <ChevronRight className="ml-auto size-3.5 rotate-90 text-muted-foreground" />
              )}
            </button>
          )}

          {/* Sub-menu with fixed height */}
          {showComponentsSubMenu && (
            <div className="scrollbar-hide-hover mt-1 max-h-80 overflow-y-auto space-y-3 pb-1 pl-2 rounded-sm border border-border/50 bg-muted/30">
              {GROUPS.map(group => (
                <div key={group}>
                  <p className="sticky top-0 bg-muted/30 px-2 pb-1 pt-2 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                    {group}
                  </p>
                  {COMPONENT_CATEGORIES.filter(c => c.group === group).map(cat => (
                    <Link
                      key={cat.id}
                      href={`/components/${cat.id}`}
                      className={cn(
                        "flex w-full items-center rounded-sm px-2 py-2 text-xs transition-colors",
                        activeSlug === cat.id
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-text-secondary hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Icons */}
        {isRouterMode ? (
          <Link href="/icons" className={navLinkClass(isOnIconsPage)}>
            <Shapes className="size-4 shrink-0" />
            Icons
          </Link>
        ) : (
          <Link
            href="/icons"
            className={navLinkClass((props as SpaNavProps).active === "icons")}
          >
            <Shapes className="size-4 shrink-0" />
            Icons
          </Link>
        )}

      </nav>
    </aside>
  )
}
