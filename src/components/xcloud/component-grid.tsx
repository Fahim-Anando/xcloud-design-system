"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

export type ComponentCategory = {
  id: string
  name: string
  count: number
  group: string
  preview: React.ReactNode
}

// ── Thumbnail previews ──────────────────────────────────────
function Row({ className }: { className?: string }) {
  return <div className={cn("h-7 rounded-sm border border-border/60 bg-background flex items-center px-2 gap-2", className)} />
}
function Bar({ w, dark }: { w: string; dark?: boolean }) {
  return <div className={cn("h-2 rounded-full", dark ? "bg-foreground/20" : "bg-foreground/10", w)} />
}
function Pill({ color }: { color: string }) {
  return <div className={cn("h-4 w-10 rounded-full", color)} />
}
function Btn({ solid, w }: { solid?: boolean; w?: string }) {
  return (
    <div className={cn(
      "h-7 rounded-sm flex items-center justify-center",
      w ?? "w-16",
      solid ? "bg-blue-500" : "border border-border/60 bg-background"
    )}>
      <div className={cn("h-1.5 w-8 rounded-full", solid ? "bg-white/70" : "bg-foreground/20")} />
    </div>
  )
}

const PREVIEWS: Record<string, React.ReactNode> = {
  accordion: (
    <div className="w-full space-y-2 p-4">
      {[0,1,2].map(i => (
        <div key={i} className="flex items-center justify-between rounded-sm border border-border/60 bg-background px-3 h-8">
          <Bar w="w-24" />
          <div className="size-3 rounded-sm bg-foreground/10" />
        </div>
      ))}
    </div>
  ),
  alert: (
    <div className="w-full space-y-2 p-4">
      <div className="rounded-sm border border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800 p-3 flex gap-2">
        <div className="size-3.5 rounded-full bg-blue-400 shrink-0 mt-1" />
        <div className="space-y-2 flex-1"><Bar w="w-20" /><Bar w="w-full" /></div>
      </div>
      <div className="rounded-sm border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800 p-3 flex gap-2">
        <div className="size-3.5 rounded-full bg-red-400 shrink-0 mt-1" />
        <div className="space-y-2 flex-1"><Bar w="w-16" /><Bar w="w-full" /></div>
      </div>
    </div>
  ),
  avatar: (
    <div className="flex items-end justify-center gap-3 w-full p-4">
      {[6,8,10,12].map(s => (
        <div key={s} className={`size-${s} rounded-full bg-blue-500 flex items-center justify-center shrink-0`}>
          <span className="text-white font-semibold" style={{ fontSize: s * 2 + 2 }}>A</span>
        </div>
      ))}
    </div>
  ),
  badge: (
    <div className="flex flex-wrap items-center justify-center gap-2 p-4">
      {[
        "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
        "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
        "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
        "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
        "bg-muted text-muted-foreground",
        "border border-border text-foreground",
      ].map((cls, i) => (
        <div key={i} className={cn("h-5 w-10 rounded-full", cls)} />
      ))}
    </div>
  ),
  breadcrumb: (
    <div className="flex items-center justify-center gap-2 p-4">
      {["Home", ">", "Servers", ">", "prod-01"].map((t, i) => (
        <span key={i} className={cn("text-xs", i === 4 ? "text-foreground font-medium" : "text-muted-foreground")}>{t}</span>
      ))}
    </div>
  ),
  button: (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className="flex gap-2">
        <Btn solid w="w-16" /><Btn w="w-16" />
      </div>
      <div className="flex gap-2">
        <Btn solid w="w-20" /><Btn w="w-20" />
      </div>
    </div>
  ),
  calendar: (
    <div className="p-3 w-full">
      <div className="flex justify-between mb-2 px-1">
        <Bar w="w-16" /><div className="flex gap-1"><div className="size-4 rounded bg-foreground/10" /><div className="size-4 rounded bg-foreground/10" /></div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["S","M","T","W","T","F","S"].map((d, i) => <div key={i} className="text-center text-[9px] text-muted-foreground">{d}</div>)}
        {Array.from({length:30},(_,i) => (
          <div key={i} className={cn("h-5 w-full rounded text-center text-[9px] leading-5", i===10 ? "bg-blue-500 text-white" : "text-muted-foreground hover:bg-muted")}>{i+1}</div>
        ))}
      </div>
    </div>
  ),
  card: (
    <div className="space-y-2 p-4 w-full">
      <div className="rounded-md border border-border bg-card p-3 space-y-2">
        <div className="flex justify-between items-center"><Bar w="w-20" /><Pill color="bg-green-100 dark:bg-green-900/40" /></div>
        <Bar w="w-full" /><Bar w="w-3/4" />
        <div className="flex gap-2 pt-1"><Btn w="w-20" /><div className="size-7 rounded-sm border border-border/60" /></div>
      </div>
    </div>
  ),
  checkbox: (
    <div className="space-y-3 p-4">
      {[true, false, false].map((checked, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={cn("size-4 rounded-sm border", checked ? "bg-blue-500 border-blue-500 flex items-center justify-center" : "border-border bg-background")}>
            {checked && <div className="size-2 text-white text-[8px] font-bold">✓</div>}
          </div>
          <Bar w="w-24" />
        </div>
      ))}
    </div>
  ),
  collapsible: (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-2"><Bar w="w-28" /><div className="size-5 rounded bg-foreground/10" /></div>
      <div className="rounded-sm border border-border bg-background p-3 space-y-2">
        <div className="flex items-center gap-2"><div className="size-8 rounded-full bg-foreground/10 shrink-0" /><Bar w="w-full" /></div>
        <div className="flex items-center gap-2"><div className="size-8 rounded-full bg-foreground/10 shrink-0" /><Bar w="w-3/4" /></div>
      </div>
    </div>
  ),
  command: (
    <div className="p-3 w-full">
      <div className="rounded-sm border border-border overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border px-3 h-9 bg-background">
          <div className="size-3.5 rounded-full bg-foreground/20" /><Bar w="w-32" />
        </div>
        <div className="bg-card p-2 space-y-1">
          <div className="text-[9px] text-muted-foreground px-2 pb-1">Servers</div>
          {[1,2].map(i => <div key={i} className="flex gap-2 items-center rounded px-2 py-2 hover:bg-muted"><div className="size-3 rounded bg-foreground/10" /><Bar w="w-24" /></div>)}
        </div>
      </div>
    </div>
  ),
  dialog: (
    <div className="flex items-center justify-center p-4 w-full">
      <div className="w-44 rounded-md border border-border bg-card shadow-lg p-4 space-y-3">
        <Bar w="w-28" dark /><Bar w="w-full" /><Bar w="w-3/4" />
        <div className="flex gap-2 pt-1 justify-end"><Btn w="w-12" /><Btn solid w="w-16" /></div>
      </div>
    </div>
  ),
  drawer: (
    <div className="flex flex-col justify-end w-full h-full p-2">
      <div className="rounded-t-xl border border-b-0 border-border bg-card p-4 space-y-3">
        <div className="flex justify-center"><div className="h-1 w-8 rounded-full bg-border" /></div>
        <Bar w="w-24" dark /><Bar w="w-full" /><Bar w="w-3/4" />
        <Btn solid w="w-full" />
      </div>
    </div>
  ),
  dropdown: (
    <div className="flex flex-col items-center p-4 gap-2 w-full">
      <Btn w="w-24" />
      <div className="w-36 rounded-sm border border-border bg-card shadow-md p-1 space-y-1">
        {[0,1,2].map(i => <div key={i} className={cn("flex gap-2 items-center rounded-sm px-2 py-2", i===0 && "bg-muted")}><div className="size-3 rounded bg-foreground/10" /><Bar w="w-16" /></div>)}
      </div>
    </div>
  ),
  "context-menu": (
    <div className="flex flex-col items-center justify-center p-4 w-full gap-2">
      <div className="w-36 rounded border border-dashed border-border flex items-center justify-center h-10 text-xs text-muted-foreground">Right-click me</div>
      <div className="w-32 rounded-sm border border-border bg-card shadow-md p-1 space-y-1">
        {[0,1,2].map(i => <div key={i} className="flex gap-2 items-center rounded-sm px-2 py-1"><div className="size-3 rounded bg-foreground/10" /><Bar w="w-16" /></div>)}
      </div>
    </div>
  ),
  "alert-dialog": (
    <div className="flex items-center justify-center p-3 w-full">
      <div className="w-44 rounded-md border border-border bg-card shadow-lg p-4 space-y-3">
        <Bar w="w-28" dark /><Bar w="w-full" /><Bar w="w-3/4" />
        <div className="flex gap-2 pt-1 justify-end"><Btn w="w-12" /><div className="h-7 w-16 rounded-sm bg-red-500" /></div>
      </div>
    </div>
  ),
  empty: (
    <div className="flex flex-col items-center justify-center gap-2 p-4 w-full">
      <div className="size-10 rounded-full border-2 border-dashed border-border flex items-center justify-center">
        <div className="size-4 rounded bg-foreground/10" />
      </div>
      <Bar w="w-24" /><Bar w="w-32" />
      <Btn solid w="w-24" />
    </div>
  ),
  field: (
    <div className="space-y-3 p-4 w-full">
      {[false, true, false].map((invalid, i) => (
        <div key={i} className="space-y-1">
          <Bar w="w-16" />
          <div className={cn("h-8 rounded-sm border bg-background px-2", invalid ? "border-red-400" : "border-border")} />
          {invalid && <div className="h-1.5 w-28 rounded-full bg-red-300" />}
        </div>
      ))}
    </div>
  ),
  "form-controls": (
    <div className="space-y-3 p-4">
      {[true, false, true].map((on, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={cn("h-5 w-9 rounded-full transition-colors", on ? "bg-blue-500" : "bg-muted border border-border")}>
            <div className={cn("size-4 rounded-full bg-white shadow transition-transform m-0.5", on ? "translate-x-4" : "")} />
          </div>
          <Bar w="w-20" />
        </div>
      ))}
    </div>
  ),
  input: (
    <div className="space-y-2 p-4 w-full">
      <div className="space-y-1"><Bar w="w-12" /><div className="h-8 rounded-sm border border-border bg-background" /></div>
      <div className="space-y-1"><Bar w="w-16" /><div className="h-8 rounded-sm border border-red-400 bg-background" /></div>
    </div>
  ),
  "input-otp": (
    <div className="flex items-center justify-center gap-2 p-4">
      {[...Array(3)].map((_, i) => <div key={i} className="size-9 rounded-sm border-2 border-border bg-background flex items-center justify-center"><div className="size-4 rounded-sm bg-foreground/15" /></div>)}
      <div className="w-4 h-px bg-border mx-1" />
      {[...Array(3)].map((_, i) => <div key={i} className={cn("size-9 rounded-sm border bg-background flex items-center justify-center", i===0 ? "border-blue-500 ring-2 ring-blue-500/20" : "border-border")}><div className="size-4 rounded-sm bg-foreground/15" /></div>)}
    </div>
  ),
  item: (
    <div className="space-y-2 p-4 w-full">
      {[0,1,2].map(i => (
        <div key={i} className="flex items-center gap-3 rounded-sm border border-border bg-card px-3 py-2">
          <div className="size-6 rounded-sm bg-muted shrink-0" />
          <div className="flex-1 space-y-1"><Bar w="w-20" /><Bar w="w-28" /></div>
          <Pill color="bg-green-100 dark:bg-green-900/40" />
        </div>
      ))}
    </div>
  ),
  kbd: (
    <div className="flex flex-col items-center gap-3 p-4">
      {[["⌘","K"], ["⌘","N"], ["Esc"]].map((keys, i) => (
        <div key={i} className="flex items-center gap-2">
          {keys.map((k, j) => <div key={j} className="px-2 py-1 rounded border border-border bg-muted text-xs font-mono text-foreground shadow-sm">{k}</div>)}
          <Bar w="w-20" />
        </div>
      ))}
    </div>
  ),
  menubar: (
    <div className="p-4 w-full">
      <div className="flex gap-1 rounded-sm border border-border bg-background p-1">
        {["Servers","Sites","Help"].map(t => (
          <div key={t} className="px-3 py-1 rounded-sm text-xs text-foreground hover:bg-muted">{t}</div>
        ))}
      </div>
    </div>
  ),
  "navigation-menu": (
    <div className="p-4 w-full">
      <div className="flex gap-2 items-center">
        <div className="flex items-center gap-1 px-2 py-1 rounded-sm hover:bg-muted text-xs"><Bar w="w-14" /><div className="size-2 border border-foreground/30 rounded-sm" /></div>
        <div className="px-2 py-1 text-xs text-muted-foreground">Pricing</div>
        <div className="px-2 py-1 text-xs text-muted-foreground">Docs</div>
      </div>
      <div className="mt-2 rounded-md border border-border bg-card p-3 space-y-2 w-40">
        {[0,1,2].map(i => <div key={i} className="flex gap-2"><div className="size-4 rounded bg-blue-100 dark:bg-blue-900/30 shrink-0" /><div className="space-y-1"><Bar w="w-16" /><Bar w="w-20" /></div></div>)}
      </div>
    </div>
  ),
  pagination: (
    <div className="flex items-center justify-center gap-1 p-4">
      {["‹","1","2","3","…","›"].map((t,i) => (
        <div key={i} className={cn("size-7 rounded-sm flex items-center justify-center text-xs", i===2 ? "bg-blue-500 text-white" : "border border-border bg-background text-foreground")}>{t}</div>
      ))}
    </div>
  ),
  popover: (
    <div className="flex flex-col items-center p-4 gap-2 w-full">
      <Btn w="w-28" />
      <div className="w-40 rounded-sm border border-border bg-card shadow-md p-3 space-y-2">
        <Bar w="w-24" dark />
        {[0,1,2].map(i => <div key={i} className="flex gap-2 items-center"><div className="size-3.5 rounded-sm border border-border" /><Bar w="w-16" /></div>)}
      </div>
    </div>
  ),
  progress: (
    <div className="space-y-4 p-4 w-full">
      {[68, 35, 90].map((v, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between"><Bar w="w-16" /><Bar w="w-8" /></div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-blue-500" style={{ width: `${v}%` }} />
          </div>
        </div>
      ))}
    </div>
  ),
  radio: (
    <div className="space-y-3 p-4">
      {[true, false, false].map((checked, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={cn("size-4 rounded-full border-2 flex items-center justify-center", checked ? "border-blue-500" : "border-border")}>
            {checked && <div className="size-2 rounded-full bg-blue-500" />}
          </div>
          <Bar w="w-24" />
        </div>
      ))}
    </div>
  ),
  resizable: (
    <div className="p-3 w-full">
      <div className="flex h-24 rounded-sm border border-border overflow-hidden">
        <div className="w-2/5 border-r border-border bg-card p-2 space-y-1">
          {[0,1,2].map(i => <Bar key={i} w="w-full" />)}
        </div>
        <div className="flex-1 bg-background flex items-center justify-center">
          <Bar w="w-20" />
        </div>
      </div>
    </div>
  ),
  "scroll-area": (
    <div className="p-3 w-full">
      <div className="relative h-28 rounded-sm border border-border overflow-hidden">
        <div className="p-3 space-y-2">
          {Array.from({length:6}, (_,i) => (
            <div key={i} className="flex justify-between items-center"><Bar w="w-24" /><Pill color="bg-muted" /></div>
          ))}
        </div>
        <div className="absolute right-1 top-1 bottom-1 w-1 rounded-full bg-border" />
      </div>
    </div>
  ),
  select: (
    <div className="flex flex-col items-center gap-2 p-4 w-full">
      <div className="w-40 h-9 rounded-sm border border-border bg-background flex items-center justify-between px-3">
        <Bar w="w-20" /><div className="size-3 border border-foreground/30 rounded-sm" />
      </div>
      <div className="w-40 rounded-sm border border-border bg-card shadow-md p-1">
        {["Frankfurt","New York","Singapore"].map((t,i) => (
          <div key={i} className={cn("px-2 py-2 rounded-sm text-xs text-foreground", i===0 && "bg-muted")}>{t}</div>
        ))}
      </div>
    </div>
  ),
  sheet: (
    <div className="flex justify-end w-full h-full p-2">
      <div className="w-32 rounded-l-lg border border-r-0 border-border bg-card h-full flex flex-col p-4 gap-3">
        <Bar w="w-20" dark /><Bar w="w-full" /><Bar w="w-3/4" />
        <div className="mt-auto"><Btn solid w="w-full" /></div>
      </div>
    </div>
  ),
  skeleton: (
    <div className="space-y-3 p-4 w-full">
      <div className="flex gap-3 items-center">
        <div className="size-9 rounded-full bg-muted animate-pulse shrink-0" />
        <div className="flex-1 space-y-2"><div className="h-2.5 rounded-full bg-muted animate-pulse w-3/4" /><div className="h-2.5 rounded-full bg-muted animate-pulse w-1/2" /></div>
      </div>
      <div className="h-16 rounded-md bg-muted animate-pulse w-full" />
      <div className="space-y-2"><div className="h-2.5 rounded-full bg-muted animate-pulse" /><div className="h-2.5 rounded-full bg-muted animate-pulse w-5/6" /></div>
    </div>
  ),
  slider: (
    <div className="space-y-4 p-4 w-full">
      {[40, 70].map((v, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between"><Bar w="w-16" /><Bar w="w-8" /></div>
          <div className="relative h-2 rounded-full bg-muted">
            <div className="absolute inset-y-0 left-0 rounded-full bg-blue-500" style={{ width: `${v}%` }} />
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-4 rounded-full bg-white border-2 border-blue-500 shadow" style={{ left: `${v}%` }} />
          </div>
        </div>
      ))}
    </div>
  ),
  spinner: (
    <div className="flex items-center justify-center gap-4 p-4">
      {[3,4,6,8].map(s => (
        <div key={s} className={`size-${s} rounded-full border-2 border-blue-500 border-t-transparent animate-spin`} />
      ))}
    </div>
  ),
  switch: (
    <div className="space-y-3 p-4">
      {[true, false, true].map((on, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={cn("h-5 w-9 rounded-full flex items-center px-1 transition-colors", on ? "bg-blue-500 justify-end" : "bg-muted border border-border justify-start")}>
            <div className="size-4 rounded-full bg-white shadow" />
          </div>
          <Bar w="w-20" />
        </div>
      ))}
    </div>
  ),
  table: (
    <div className="p-3 w-full">
      <div className="rounded-sm border border-border overflow-hidden">
        <div className="grid grid-cols-3 gap-0 border-b border-border bg-muted/50">
          {["Name","Region","Status"].map(h => <div key={h} className="px-2 py-2 text-[9px] font-semibold text-muted-foreground">{h}</div>)}
        </div>
        {[0,1,2].map(i => (
          <div key={i} className={cn("grid grid-cols-3 gap-0", i < 2 && "border-b border-border/60")}>
            <div className="px-2 py-2"><Bar w="w-full" /></div>
            <div className="px-2 py-2"><Bar w="w-3/4" /></div>
            <div className="px-2 py-2"><Pill color={i===0 ? "bg-green-100 dark:bg-green-900/40" : i===1 ? "bg-amber-100 dark:bg-amber-900/40" : "bg-red-100 dark:bg-red-900/40"} /></div>
          </div>
        ))}
      </div>
    </div>
  ),
  tabs: (
    <div className="p-4 w-full">
      <div className="flex gap-1 rounded-sm bg-muted p-1 mb-3">
        {["Overview","Backups","SSL"].map((t,i) => (
          <div key={t} className={cn("flex-1 py-1 rounded-sm text-center text-xs", i===0 ? "bg-background shadow-sm text-foreground font-medium" : "text-muted-foreground")}>{t}</div>
        ))}
      </div>
      <div className="rounded-sm border border-border bg-card p-3 space-y-2"><Bar w="w-full" /><Bar w="w-3/4" /></div>
    </div>
  ),
  textarea: (
    <div className="p-4 w-full">
      <div className="space-y-2">
        <Bar w="w-12" />
        <div className="h-20 rounded-sm border border-border bg-background p-2 space-y-2">
          <Bar w="w-full" /><Bar w="w-4/5" /><Bar w="w-3/5" />
        </div>
      </div>
    </div>
  ),
  toggle: (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="flex gap-1">
        {[true,false,false].map((on,i) => (
          <div key={i} className={cn("size-9 rounded-sm border flex items-center justify-center", on ? "bg-blue-500/10 border-blue-500/40 text-blue-500" : "border-border bg-background text-foreground/40")}>
            <div className="size-3.5 rounded-sm bg-current opacity-60" />
          </div>
        ))}
      </div>
      <div className="flex gap-1 rounded-sm border border-border overflow-hidden">
        {[true,false,false].map((on,i) => (
          <div key={i} className={cn("h-8 w-9 flex items-center justify-center border-r last:border-r-0 border-border", on && "bg-muted")}>
            <div className="size-3.5 rounded-sm bg-foreground/20" />
          </div>
        ))}
      </div>
    </div>
  ),
  tooltip: (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <div className="relative">
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-foreground/90 text-[9px] text-background whitespace-nowrap">View docs</div>
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 size-1.5 rotate-45 bg-foreground/90" />
        <Btn w="w-24" />
      </div>
    </div>
  ),
}

export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  // Inputs
  { id: "button",        name: "Button",         count: 20, group: "Inputs",     preview: PREVIEWS.button },
  { id: "input",         name: "Input",           count: 4,  group: "Inputs",     preview: PREVIEWS.input },
  { id: "select",        name: "Select",          count: 2,  group: "Inputs",     preview: PREVIEWS.select },
  { id: "textarea",      name: "Textarea",        count: 1,  group: "Inputs",     preview: PREVIEWS.textarea },
  { id: "checkbox",      name: "Checkbox",        count: 3,  group: "Inputs",     preview: PREVIEWS.checkbox },
  { id: "switch",        name: "Switch",          count: 3,  group: "Inputs",     preview: PREVIEWS.switch },
  { id: "radio",         name: "Radio Group",     count: 2,  group: "Inputs",     preview: PREVIEWS.radio },
  { id: "toggle",        name: "Toggle",          count: 3,  group: "Inputs",     preview: PREVIEWS.toggle },
  { id: "slider",        name: "Slider",          count: 2,  group: "Inputs",     preview: PREVIEWS.slider },
  { id: "input-otp",     name: "Input OTP",       count: 1,  group: "Inputs",     preview: PREVIEWS["input-otp"] },
  // Display
  { id: "badge",         name: "Badge",           count: 11, group: "Display",    preview: PREVIEWS.badge },
  { id: "avatar",        name: "Avatar",          count: 4,  group: "Display",    preview: PREVIEWS.avatar },
  { id: "card",          name: "Card",            count: 3,  group: "Display",    preview: PREVIEWS.card },
  { id: "table",         name: "Table",           count: 1,  group: "Display",    preview: PREVIEWS.table },
  { id: "tabs",          name: "Tabs",            count: 2,  group: "Display",    preview: PREVIEWS.tabs },
  { id: "skeleton",      name: "Skeleton",        count: 3,  group: "Display",    preview: PREVIEWS.skeleton },
  { id: "progress",      name: "Progress",        count: 2,  group: "Display",    preview: PREVIEWS.progress },
  { id: "spinner",       name: "Spinner",         count: 4,  group: "Display",    preview: PREVIEWS.spinner },
  // Overlays
  { id: "dialog",        name: "Dialog",          count: 1,  group: "Overlays",   preview: PREVIEWS.dialog },
  { id: "sheet",         name: "Sheet",           count: 1,  group: "Overlays",   preview: PREVIEWS.sheet },
  { id: "drawer",        name: "Drawer",          count: 1,  group: "Overlays",   preview: PREVIEWS.drawer },
  { id: "popover",       name: "Popover",         count: 1,  group: "Overlays",   preview: PREVIEWS.popover },
  { id: "tooltip",       name: "Tooltip",         count: 2,  group: "Overlays",   preview: PREVIEWS.tooltip },
  { id: "dropdown",      name: "Dropdown Menu",   count: 1,  group: "Overlays",   preview: PREVIEWS.dropdown },
  { id: "context-menu",  name: "Context Menu",    count: 1,  group: "Overlays",   preview: PREVIEWS["context-menu"] },
  { id: "alert-dialog",  name: "Alert Dialog",    count: 1,  group: "Overlays",   preview: PREVIEWS["alert-dialog"] },
  // Navigation
  { id: "breadcrumb",    name: "Breadcrumb",      count: 1,  group: "Navigation", preview: PREVIEWS.breadcrumb },
  { id: "pagination",    name: "Pagination",      count: 1,  group: "Navigation", preview: PREVIEWS.pagination },
  { id: "navigation-menu", name: "Navigation Menu", count: 1, group: "Navigation", preview: PREVIEWS["navigation-menu"] },
  { id: "menubar",       name: "Menubar",         count: 1,  group: "Navigation", preview: PREVIEWS.menubar },
  // Layout
  { id: "accordion",     name: "Accordion",       count: 3,  group: "Layout",     preview: PREVIEWS.accordion },
  { id: "collapsible",   name: "Collapsible",     count: 1,  group: "Layout",     preview: PREVIEWS.collapsible },
  { id: "resizable",     name: "Resizable",       count: 1,  group: "Layout",     preview: PREVIEWS.resizable },
  { id: "scroll-area",   name: "Scroll Area",     count: 1,  group: "Layout",     preview: PREVIEWS["scroll-area"] },
  // Feedback
  { id: "alert",         name: "Alert",           count: 2,  group: "Feedback",   preview: PREVIEWS.alert },
  { id: "empty",         name: "Empty State",     count: 1,  group: "Feedback",   preview: PREVIEWS.empty },
  { id: "command",       name: "Command",         count: 1,  group: "Feedback",   preview: PREVIEWS.command },
  // Forms
  { id: "field",         name: "Field",           count: 3,  group: "Forms",      preview: PREVIEWS.field },
  { id: "form-controls", name: "Form Controls",   count: 6,  group: "Forms",      preview: PREVIEWS["form-controls"] },
  { id: "item",          name: "Item",            count: 4,  group: "Forms",      preview: PREVIEWS.item },
  // Misc
  { id: "calendar",      name: "Calendar",        count: 1,  group: "Misc",       preview: PREVIEWS.calendar },
  { id: "kbd",           name: "Keyboard",        count: 3,  group: "Misc",       preview: PREVIEWS.kbd },
]

const GROUPS = Array.from(new Set(COMPONENT_CATEGORIES.map(c => c.group)))

export function ComponentGrid() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Components</h1>
        <p className="mt-1 text-sm text-text-secondary">Reusable UI components for your application.</p>
      </div>

      {GROUPS.map(group => (
        <div key={group}>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{group}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {COMPONENT_CATEGORIES.filter(c => c.group === group).map(cat => (
              <Link
                key={cat.id}
                href={`/components/${cat.id}`}
                className="group rounded-xl border border-border bg-card overflow-hidden text-left transition-all hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Preview */}
                <div className="h-40 bg-muted/30 flex items-center justify-center overflow-hidden border-b border-border/60">
                  {cat.preview}
                </div>
                {/* Info */}
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{cat.name}</p>
                  <p className="text-xs text-text-secondary mt-1">{cat.count} {cat.count === 1 ? "variant" : "variants"}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
