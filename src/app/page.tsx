"use client"

import { useState } from "react"
import {
  Moon, Sun, Plus, Trash2, ArrowRight, Server, Globe, RefreshCw,
  ChevronDown, Settings, User, LogOut, Bell, Search, Mail,
  Check, Copy, Terminal, Zap, Shield, BarChart3, Cloud,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Home, ChevronRight, MoreHorizontal, Download, Upload, Filter,
  Star, Heart, Bookmark, Share2, ExternalLink, Info, AlertCircle,
  CheckCircle, XCircle, Loader2, Package, Layers, Cpu, Database,
} from "lucide-react"
import { useTheme } from "next-themes"

// shadcn components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command"
import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator,
  ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter,
  DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import {
  Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator,
  MenubarShortcut, MenubarTrigger,
} from "@/components/ui/menubar"
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// Item & Field
import { Item, ItemGroup, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/components/ui/item"
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"

// xCloud token inspector
import { useTokenInspector, TokenInspectorPanel } from "@/components/xcloud/token-inspector"

// ── Layout helpers ────────────────────────────────────────────
function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>
}

// ── Sample data ───────────────────────────────────────────────
const servers = [
  { id: 1, name: "prod-server-01", status: "active",   region: "Frankfurt", cpu: "4 vCPU", ram: "8 GB" },
  { id: 2, name: "prod-server-02", status: "warning",  region: "New York",  cpu: "8 vCPU", ram: "16 GB" },
  { id: 3, name: "staging-01",     status: "muted",    region: "Singapore", cpu: "2 vCPU", ram: "4 GB" },
  { id: 4, name: "dev-sandbox",    status: "offline",  region: "London",    cpu: "1 vCPU", ram: "2 GB" },
]

export default function Playground() {
  const { theme, setTheme } = useTheme()
  const { open, data, close, onPointerDown, onPointerUp, onPointerLeave } = useTokenInspector()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(68)
  const [sliderValue, setSliderValue] = useState([40])
  const [switchOn, setSwitchOn] = useState(true)
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date())
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)
  const [alignment, setAlignment] = useState<string[]>(["left"])

  function handleLoadingDemo() {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <span className="text-xs font-bold text-white">xC</span>
            </div>
            <span className="text-sm font-semibold text-foreground">xCloud Design System</span>
            <Badge variant="info" className="ml-1">v1.0</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="muted" className="hidden sm:inline-flex">Hold any component to inspect tokens</Badge>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Token Inspector Panel */}
      <TokenInspectorPanel data={data} open={open} onClose={close} />

      {/* Main — long press anywhere to inspect */}
      <main
        className="mx-auto max-w-6xl space-y-12 px-6 py-12"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
      >
        {/* Hero */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Component Playground</h1>
          <p className="text-muted-foreground">
            xCloud design system — shadcn/ui + Tailwind CSS v4 + Inter · Long-press any component to inspect its tokens.
          </p>
        </div>

        <Separator />

        {/* ── COLOR TOKENS ── */}
        <Section title="Color Tokens">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {[
              { name: "primary",      cls: "bg-primary" },
              { name: "secondary",    cls: "bg-secondary border border-border" },
              { name: "muted",        cls: "bg-muted border border-border" },
              { name: "accent",       cls: "bg-accent border border-border" },
              { name: "success",      cls: "bg-success" },
              { name: "warning",      cls: "bg-warning" },
              { name: "destructive",  cls: "bg-destructive" },
              { name: "border",       cls: "bg-border" },
            ].map(({ name, cls }) => (
              <div key={name} className="space-y-1.5">
                <div className={`h-10 w-full rounded-md ${cls}`} />
                <p className="text-center text-[10px] text-muted-foreground">{name}</p>
              </div>
            ))}
          </div>
        </Section>

        <Separator />

        {/* ── TYPOGRAPHY ── */}
        <Section title="Typography">
          <div className="space-y-2 rounded-lg border border-border p-5">
            <p className="text-[36px] font-semibold leading-tight">text-heading-xxlarge · 36px / 600</p>
            <p className="text-[24px] font-semibold">text-heading-xlarge · 24px / 600</p>
            <p className="text-[22px] font-semibold">text-heading-large · 22px / 600</p>
            <p className="text-[20px] font-medium">text-heading-medium · 20px / 500</p>
            <p className="text-[18px] font-medium">text-heading-small · 18px / 500</p>
            <p className="text-[16px] font-medium">text-heading-xsmall · 16px / 500</p>
            <Separator />
            <p className="text-base text-foreground">text-medium · 16px / 400 — Body paragraph copy for xCloud.</p>
            <p className="text-sm text-muted-foreground">text-small · 14px / 400 — Last updated 5 minutes ago · Frankfurt datacenter</p>
            <p className="text-xs text-muted-foreground">text-xsmall · 12px / 400 — Version 1.0.0</p>
          </div>
        </Section>

        <Separator />

        {/* ── BUTTONS ── */}
        <Section title="Button">
          {/* Fixed-width columns: label | state | xs=96 | sm=112 | md=128 | lg=152 */}
          <div className="grid grid-cols-[96px_56px_96px_112px_128px_152px] items-center gap-x-3 gap-y-2.5">

            {/* Header */}
            <span /><span />
            {["XS","SM","MD","LG"].map(s => (
              <span key={s} className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">{s}</span>
            ))}

            {/* ── Primary ── */}
            <span className="text-xs font-semibold text-foreground row-span-3 self-center">Primary</span>
            <span className="text-[10px] text-muted-foreground">Icon L</span>
            <Button variant="default" size="xs" iconLeft={<Plus />} className="w-full">Button</Button>
            <Button variant="default" size="sm" iconLeft={<Plus />} className="w-full">Button</Button>
            <Button variant="default" size="default" iconLeft={<Plus />} className="w-full">Button</Button>
            <Button variant="default" size="lg" iconLeft={<Plus />} className="w-full">Button</Button>

            <span className="text-[10px] text-muted-foreground">Icon R</span>
            <Button variant="default" size="xs" iconRight={<ArrowRight />} className="w-full">Button</Button>
            <Button variant="default" size="sm" iconRight={<ArrowRight />} className="w-full">Button</Button>
            <Button variant="default" size="default" iconRight={<ArrowRight />} className="w-full">Button</Button>
            <Button variant="default" size="lg" iconRight={<ArrowRight />} className="w-full">Button</Button>

            <span className="text-[10px] text-muted-foreground/50">Disabled</span>
            <Button variant="default" size="xs" iconLeft={<Plus />} className="w-full" disabled>Button</Button>
            <Button variant="default" size="sm" iconLeft={<Plus />} className="w-full" disabled>Button</Button>
            <Button variant="default" size="default" iconLeft={<Plus />} className="w-full" disabled>Button</Button>
            <Button variant="default" size="lg" iconLeft={<Plus />} className="w-full" disabled>Button</Button>

            <span className="col-span-6 border-b border-border/50 my-0.5" />

            {/* ── Secondary ── */}
            <span className="text-xs font-semibold text-foreground row-span-3 self-center">Secondary</span>
            <span className="text-[10px] text-muted-foreground">Icon L</span>
            <Button variant="secondary" size="xs" iconLeft={<Plus />} className="w-full">Button</Button>
            <Button variant="secondary" size="sm" iconLeft={<Plus />} className="w-full">Button</Button>
            <Button variant="secondary" size="default" iconLeft={<Plus />} className="w-full">Button</Button>
            <Button variant="secondary" size="lg" iconLeft={<Plus />} className="w-full">Button</Button>

            <span className="text-[10px] text-muted-foreground">Icon R</span>
            <Button variant="secondary" size="xs" iconRight={<ArrowRight />} className="w-full">Button</Button>
            <Button variant="secondary" size="sm" iconRight={<ArrowRight />} className="w-full">Button</Button>
            <Button variant="secondary" size="default" iconRight={<ArrowRight />} className="w-full">Button</Button>
            <Button variant="secondary" size="lg" iconRight={<ArrowRight />} className="w-full">Button</Button>

            <span className="text-[10px] text-muted-foreground/50">Disabled</span>
            <Button variant="secondary" size="xs" iconLeft={<Plus />} className="w-full" disabled>Button</Button>
            <Button variant="secondary" size="sm" iconLeft={<Plus />} className="w-full" disabled>Button</Button>
            <Button variant="secondary" size="default" iconLeft={<Plus />} className="w-full" disabled>Button</Button>
            <Button variant="secondary" size="lg" iconLeft={<Plus />} className="w-full" disabled>Button</Button>

            <span className="col-span-6 border-b border-border/50 my-0.5" />

            {/* ── Outline ── */}
            <span className="text-xs font-semibold text-foreground row-span-3 self-center">Outline</span>
            <span className="text-[10px] text-muted-foreground">Icon L</span>
            <Button variant="outline" size="xs" iconLeft={<Plus />} className="w-full">Button</Button>
            <Button variant="outline" size="sm" iconLeft={<Plus />} className="w-full">Button</Button>
            <Button variant="outline" size="default" iconLeft={<Plus />} className="w-full">Button</Button>
            <Button variant="outline" size="lg" iconLeft={<Plus />} className="w-full">Button</Button>

            <span className="text-[10px] text-muted-foreground">Icon R</span>
            <Button variant="outline" size="xs" iconRight={<ArrowRight />} className="w-full">Button</Button>
            <Button variant="outline" size="sm" iconRight={<ArrowRight />} className="w-full">Button</Button>
            <Button variant="outline" size="default" iconRight={<ArrowRight />} className="w-full">Button</Button>
            <Button variant="outline" size="lg" iconRight={<ArrowRight />} className="w-full">Button</Button>

            <span className="text-[10px] text-muted-foreground/50">Disabled</span>
            <Button variant="outline" size="xs" iconLeft={<Plus />} className="w-full" disabled>Button</Button>
            <Button variant="outline" size="sm" iconLeft={<Plus />} className="w-full" disabled>Button</Button>
            <Button variant="outline" size="default" iconLeft={<Plus />} className="w-full" disabled>Button</Button>
            <Button variant="outline" size="lg" iconLeft={<Plus />} className="w-full" disabled>Button</Button>

            <span className="col-span-6 border-b border-border/50 my-0.5" />

            {/* ── Icon Only — Primary & Outline only ── */}
            <span className="text-xs font-semibold text-foreground row-span-3 self-center">Icon</span>
            <span className="text-[10px] text-muted-foreground">Primary</span>
            <Button variant="default" size="icon-xs"><Plus /></Button>
            <Button variant="default" size="icon-sm"><Plus /></Button>
            <Button variant="default" size="icon"><Plus /></Button>
            <Button variant="default" size="icon-lg"><Plus /></Button>

            <span className="text-[10px] text-muted-foreground">Outline</span>
            <Button variant="outline" size="icon-xs"><Plus /></Button>
            <Button variant="outline" size="icon-sm"><Plus /></Button>
            <Button variant="outline" size="icon"><Plus /></Button>
            <Button variant="outline" size="icon-lg"><Plus /></Button>

            <span className="text-[10px] text-muted-foreground/50">Disabled</span>
            <Button variant="default" size="icon-xs" disabled><Plus /></Button>
            <Button variant="default" size="icon-sm" disabled><Plus /></Button>
            <Button variant="default" size="icon" disabled><Plus /></Button>
            <Button variant="default" size="icon-lg" disabled><Plus /></Button>
          </div>

          {/* Other variants */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/50 pt-4">
            <Button variant="ghost" iconLeft={<Plus />}>Ghost</Button>
            <Button variant="destructive" iconLeft={<Trash2 />}>Destructive</Button>
            <Button variant="destructive-soft" iconLeft={<Trash2 />}>Destructive Soft</Button>
            <Button variant="link" iconRight={<ArrowRight />}>Link Button</Button>
            <Button loading={loading} variant="default" onClick={handleLoadingDemo}>
              {loading ? "Deploying…" : "Loading demo"}
            </Button>
          </div>
        </Section>

        <Separator />

        {/* ── BADGES ── */}
        <Section title="Badge — Variants">
          <Row>
            <Badge variant="default">Default</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="destructive">Offline</Badge>
            <Badge variant="muted">Draft</Badge>
            <Badge variant="outline">Outline</Badge>
          </Row>
          <Row>
            <Badge variant="success-solid">Online</Badge>
            <Badge variant="warning-solid">Warning</Badge>
            <Badge variant="destructive-solid">Error</Badge>
            <Badge variant="secondary">Secondary</Badge>
          </Row>
        </Section>

        <Separator />

        {/* ── ALERTS ── */}
        <Section title="Alert">
          <div className="space-y-3">
            <Alert>
              <Info className="size-4" />
              <AlertTitle>Deployment started</AlertTitle>
              <AlertDescription>Your site is being deployed to Frankfurt. This usually takes 2–3 minutes.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <XCircle className="size-4" />
              <AlertTitle>Deployment failed</AlertTitle>
              <AlertDescription>Could not connect to the server. Check your SSH key configuration.</AlertDescription>
            </Alert>
          </div>
        </Section>

        <Separator />

        {/* ── ACCORDION ── */}
        <Section title="Accordion">
          <Accordion className="w-full max-w-xl">
            <AccordionItem value="item-1">
              <AccordionTrigger>What regions are available?</AccordionTrigger>
              <AccordionContent>Frankfurt, New York, Singapore, London, and Sydney. New regions are added regularly.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does billing work?</AccordionTrigger>
              <AccordionContent>You are billed monthly for active servers. Servers are prorated to the hour.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I migrate an existing site?</AccordionTrigger>
              <AccordionContent>Yes — use the one-click migration tool from Settings → Migrations.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        <Separator />

        {/* ── FORM INPUTS ── */}
        <Section title="Input">
          <div className="grid max-w-xl gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="domain">Domain name</Label>
              <Input id="domain" placeholder="my-site.com" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="disabled">Server name (disabled)</Label>
              <Input id="disabled" placeholder="my-server" disabled />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="name@example.com" aria-invalid />
              <p className="text-xs text-destructive">Please enter a valid email address.</p>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="note">Notes</Label>
              <Textarea id="note" placeholder="Add server notes here…" rows={3} />
            </div>
          </div>
        </Section>

        <Section title="Input OTP">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </Section>

        <Section title="Select">
          <div className="flex flex-wrap gap-4">
            <Select defaultValue="fra">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fra">Frankfurt</SelectItem>
                <SelectItem value="nyc">New York</SelectItem>
                <SelectItem value="sin">Singapore</SelectItem>
                <SelectItem value="lon">London</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Section>

        <Section title="Slider & Progress">
          <div className="max-w-md space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>CPU Throttle</span>
                <span>{sliderValue[0]}%</span>
              </div>
              <Slider
                value={sliderValue}
                onValueChange={(val) => setSliderValue(Array.isArray(val) ? (val as number[]) : [val as number])}
                min={0} max={100} step={5}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Disk usage</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          </div>
        </Section>

        <Section title="Form Controls">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Switch id="auto-backup" checked={switchOn} onCheckedChange={setSwitchOn} />
                <Label htmlFor="auto-backup">Auto backup</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="cdn" />
                <Label htmlFor="cdn">Enable CDN</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="ssl-auto" defaultChecked />
                <Label htmlFor="ssl-auto">Auto SSL renewal</Label>
              </div>
            </div>
            <div className="space-y-3">
              {["Daily database backups", "Email notifications", "Two-factor authentication"].map((label) => (
                <div key={label} className="flex items-center gap-3">
                  <Checkbox id={label} defaultChecked={label.includes("Daily")} />
                  <Label htmlFor={label}>{label}</Label>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Radio Group">
          <RadioGroup defaultValue="monthly">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly">Monthly billing</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="annual" id="annual" />
              <Label htmlFor="annual">Annual billing (save 20%)</Label>
            </div>
          </RadioGroup>
        </Section>

        <Separator />

        {/* ── CARDS ── */}
        <Section title="Card">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Servers</CardDescription>
                <CardTitle className="text-2xl">12</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="size-4 text-muted-foreground" />
                    <CardTitle className="text-sm">prod-server-01</CardTitle>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-xs text-muted-foreground">Frankfurt · 4 vCPU · 8 GB RAM</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" size="sm" className="flex-1">Manage</Button>
                <Button variant="ghost" size="icon-sm"><RefreshCw className="size-3.5" /></Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="size-4 text-muted-foreground" />
                    <CardTitle className="text-sm">my-store.com</CardTitle>
                  </div>
                  <Badge variant="warning">Deploying</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-xs text-muted-foreground">WooCommerce · prod-server-01</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" size="sm" className="flex-1">View Site</Button>
                <Button variant="ghost" size="icon-sm"><Trash2 className="size-3.5 text-destructive" /></Button>
              </CardFooter>
            </Card>
          </div>
        </Section>

        <Separator />

        {/* ── TABLE ── */}
        <Section title="Table">
          <div className="rounded-lg border border-border">
            <Table>
              <TableCaption className="pb-3">Active servers in your account</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Specs</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {servers.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="text-muted-foreground">{s.region}</TableCell>
                    <TableCell className="text-muted-foreground">{s.cpu} · {s.ram}</TableCell>
                    <TableCell>
                      <Badge variant={
                        s.status === "active"  ? "success" :
                        s.status === "warning" ? "warning" :
                        s.status === "offline" ? "destructive" : "muted"
                      }>{s.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon-sm"><Settings className="size-3.5" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Section>

        <Separator />

        {/* ── TABS ── */}
        <Section title="Tabs">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="backups">Backups</TabsTrigger>
              <TabsTrigger value="ssl">SSL</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Site overview content — server health, uptime, and recent activity.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="backups" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Backup management — restore points and automated schedules.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Section>

        <Separator />

        {/* ── DIALOGS / OVERLAYS ── */}
        <Section title="Dialog · Sheet · Drawer · AlertDialog">
          <Row>
            {/* Dialog */}
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>Open Dialog</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Deploy to production?</DialogTitle>
                  <DialogDescription>This will push changes to prod-server-01 in Frankfurt. This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="ghost">Cancel</Button>
                  <Button variant="brand">Deploy</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Alert Dialog */}
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="destructive-soft" />}>Delete Server</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>This will permanently delete prod-server-01 and all associated data.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Sheet */}
            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>Open Sheet</SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Server Settings</SheetTitle>
                  <SheetDescription>Adjust configuration for prod-server-01.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-6">
                  <div className="grid gap-1.5">
                    <Label>Hostname</Label>
                    <Input defaultValue="prod-server-01" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Region</Label>
                    <Select defaultValue="fra">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fra">Frankfurt</SelectItem>
                        <SelectItem value="nyc">New York</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <SheetFooter>
                  <Button variant="brand" className="w-full">Save changes</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Drawer */}
            <Drawer>
              <DrawerTrigger className="inline-flex h-8 items-center justify-center gap-1.5 rounded-sm border border-border bg-background px-3 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-muted">Open Drawer</DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Add New Site</DrawerTitle>
                  <DrawerDescription>Connect a WordPress site to your server.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 pb-4 space-y-3">
                  <div className="grid gap-1.5">
                    <Label>Site domain</Label>
                    <Input placeholder="my-site.com" />
                  </div>
                </div>
                <DrawerFooter>
                  <Button variant="brand">Create Site</Button>
                  <DrawerClose className="inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-sm px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Cancel</DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Row>
        </Section>

        <Separator />

        {/* ── POPOVER / HOVER CARD / TOOLTIP ── */}
        <Section title="Popover · HoverCard · Tooltip">
          <Row>
            <Popover>
              <PopoverTrigger render={<Button variant="outline" iconLeft={<Filter />} />}>Filter servers</PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-foreground">Filter by status</p>
                  {["Active", "Warning", "Offline"].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <Checkbox id={`filter-${s}`} />
                      <Label htmlFor={`filter-${s}`}>{s}</Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <HoverCard>
              <HoverCardTrigger render={<Button variant="link" />}>@xcloud-team</HoverCardTrigger>
              <HoverCardContent className="w-64">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white">xC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">xCloud Team</p>
                    <p className="text-xs text-muted-foreground">Building the next-gen WordPress hosting platform.</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <Tooltip>
              <TooltipTrigger render={<Button variant="ghost" size="icon" />}><Info className="size-4" /></TooltipTrigger>
              <TooltipContent>View documentation</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>Hover me</TooltipTrigger>
              <TooltipContent side="bottom">This is a tooltip</TooltipContent>
            </Tooltip>
          </Row>
        </Section>

        <Separator />

        {/* ── DROPDOWN / CONTEXT MENU ── */}
        <Section title="Dropdown Menu · Context Menu">
          <Row>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" iconRight={<ChevronDown />} />}>Account</DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Fahim Anando</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><User className="size-4" />Profile</DropdownMenuItem>
                <DropdownMenuItem><Settings className="size-4" />Settings</DropdownMenuItem>
                <DropdownMenuItem><Bell className="size-4" />Notifications</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive"><LogOut className="size-4" />Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ContextMenu>
              <ContextMenuTrigger className="flex h-20 w-48 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground cursor-context-menu select-none">
                Right-click me
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem><Copy className="size-4" />Copy link<ContextMenuShortcut>⌘C</ContextMenuShortcut></ContextMenuItem>
                <ContextMenuItem><ExternalLink className="size-4" />Open in new tab</ContextMenuItem>
                <ContextMenuSub>
                  <ContextMenuSubTrigger><Share2 className="size-4" />Share</ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuItem>Email</ContextMenuItem>
                    <ContextMenuItem>Slack</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem className="text-destructive"><Trash2 className="size-4" />Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </Row>
        </Section>

        <Separator />

        {/* ── MENUBAR ── */}
        <Section title="Menubar">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Servers</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Server<MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                <MenubarItem>Import<MenubarShortcut>⌘I</MenubarShortcut></MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Settings<MenubarShortcut>⌘,</MenubarShortcut></MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Sites</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Add Site</MenubarItem>
                <MenubarItem>Clone Site</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Migrate Site</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Help</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Documentation</MenubarItem>
                <MenubarItem>Status Page</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Contact Support</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Section>

        <Separator />

        {/* ── NAVIGATION MENU ── */}
        <Section title="Navigation Menu">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-64">
                    {[
                      { icon: Server, label: "Cloud Servers", desc: "Scalable VPS hosting" },
                      { icon: Globe, label: "Managed WordPress", desc: "One-click WP setup" },
                      { icon: Database, label: "Managed Databases", desc: "MySQL & Redis clusters" },
                    ].map(({ icon: Icon, label, desc }) => (
                      <NavigationMenuLink key={label} className="flex items-start gap-3 rounded-md p-2 hover:bg-muted cursor-pointer">
                        <Icon className="size-4 mt-0.5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{label}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="px-3 py-2 text-sm hover:text-foreground text-muted-foreground cursor-pointer">Pricing</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="px-3 py-2 text-sm hover:text-foreground text-muted-foreground cursor-pointer">Docs</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Section>

        <Separator />

        {/* ── BREADCRUMB / PAGINATION ── */}
        <Section title="Breadcrumb · Pagination">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Dashboard</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator><ChevronRight className="size-3" /></BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbLink href="#">Servers</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator><ChevronRight className="size-3" /></BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbPage>prod-server-01</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </Section>

        <Separator />

        {/* ── COMMAND ── */}
        <Section title="Command">
          <div className="max-w-sm rounded-lg border border-border shadow-md">
            <Command>
              <CommandInput placeholder="Search servers, sites, backups…" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Servers">
                  <CommandItem><Server className="size-4" />prod-server-01</CommandItem>
                  <CommandItem><Server className="size-4" />prod-server-02</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                  <CommandItem><Plus className="size-4" />Add new server</CommandItem>
                  <CommandItem><Upload className="size-4" />Deploy site</CommandItem>
                  <CommandItem><Download className="size-4" />Create backup</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </Section>

        <Separator />

        {/* ── CALENDAR ── */}
        <Section title="Calendar">
          <Calendar
            mode="single"
            selected={calendarDate}
            onSelect={setCalendarDate}
            className="rounded-lg border border-border w-fit"
          />
        </Section>

        <Separator />

        {/* ── SCROLL AREA ── */}
        <Section title="Scroll Area">
          <ScrollArea className="h-48 w-full max-w-sm rounded-lg border border-border">
            <div className="p-4 space-y-2">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="flex items-center justify-between py-1">
                  <span className="text-sm text-foreground">Backup #{String(i + 1).padStart(3, "0")}</span>
                  <Badge variant="muted" className="text-[10px]">2.{i}GB</Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Section>

        <Separator />

        {/* ── COLLAPSIBLE ── */}
        <Section title="Collapsible">
          <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen} className="max-w-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Advanced server settings</p>
              <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" />}>
                <ChevronDown className={`size-4 transition-transform ${collapsibleOpen ? "rotate-180" : ""}`} />
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2 mt-3">
              <div className="rounded-md border border-border p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Switch id="swap" />
                  <Label htmlFor="swap">Enable swap memory</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="firewall" defaultChecked />
                  <Label htmlFor="firewall">Managed firewall</Label>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Section>

        <Separator />

        {/* ── RESIZABLE ── */}
        <Section title="Resizable">
          <ResizablePanelGroup orientation="horizontal" className="max-w-lg rounded-lg border border-border min-h-[120px]">
            <ResizablePanel defaultSize={35}>
              <div className="flex h-full flex-col p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Sidebar</p>
                <div className="space-y-1 text-sm text-foreground">
                  <p className="hover:text-primary cursor-pointer">Overview</p>
                  <p className="hover:text-primary cursor-pointer">Backups</p>
                  <p className="hover:text-primary cursor-pointer">SSL</p>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={65}>
              <div className="flex h-full items-center justify-center p-4">
                <p className="text-sm text-muted-foreground">Drag the handle to resize</p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Section>

        <Separator />

        {/* ── ASPECT RATIO ── */}
        <Section title="Aspect Ratio">
          <div className="max-w-sm">
            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg border border-border bg-muted">
              <div className="flex h-full items-center justify-center gap-2 text-muted-foreground">
                <Cloud className="size-8 opacity-40" />
                <span className="text-sm">16:9 · Server screenshot preview</span>
              </div>
            </AspectRatio>
          </div>
        </Section>

        <Separator />

        {/* ── SKELETON ── */}
        <Section title="Skeleton">
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-32 w-full rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/6" />
            </div>
          </div>
        </Section>

        <Separator />

        {/* ── SPINNER ── */}
        <Section title="Spinner">
          <Row>
            <Spinner className="size-3" />
            <Spinner className="size-4" />
            <Spinner className="size-6" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Spinner className="size-3.5" />
              <span>Deploying to Frankfurt…</span>
            </div>
          </Row>
        </Section>

        <Separator />

        {/* ── KBD ── */}
        <Section title="Keyboard Shortcut (Kbd)">
          <Row>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Kbd>⌘</Kbd><Kbd>K</Kbd><span>Open command palette</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Kbd>⌘</Kbd><Kbd>N</Kbd><span>New server</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Kbd>Esc</Kbd><span>Close panel</span>
            </div>
          </Row>
        </Section>

        <Separator />

        {/* ── AVATAR ── */}
        <Section title="Avatar">
          <Row>
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>FA</AvatarFallback>
            </Avatar>
            <Avatar className="size-10">
              <AvatarFallback className="bg-primary text-white text-sm">AN</AvatarFallback>
            </Avatar>
            <Avatar className="size-12">
              <AvatarFallback className="bg-success/20 text-success font-semibold">JD</AvatarFallback>
            </Avatar>
            <Avatar className="size-14">
              <AvatarFallback className="bg-warning/20 text-warning font-semibold">MK</AvatarFallback>
            </Avatar>
          </Row>
        </Section>

        <Separator />

        {/* ── TOGGLE ── */}
        <Section title="Toggle · Toggle Group">
          <div className="space-y-4">
            <Row>
              <Toggle aria-label="Toggle bold"><Bold className="size-4" /></Toggle>
              <Toggle aria-label="Toggle italic"><Italic className="size-4" /></Toggle>
              <Toggle aria-label="Toggle underline"><Underline className="size-4" /></Toggle>
            </Row>
            <ToggleGroup value={alignment} onValueChange={(v) => setAlignment(v as string[])}>
              <ToggleGroupItem value="left" aria-label="Left"><AlignLeft className="size-4" /></ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Center"><AlignCenter className="size-4" /></ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Right"><AlignRight className="size-4" /></ToggleGroupItem>
            </ToggleGroup>
          </div>
        </Section>

        <Separator />

        {/* ── ITEM ── */}
        <Section title="Item — Server List">
          <ItemGroup className="max-w-md">
            {servers.map((s) => (
              <Item key={s.id} variant="outline">
                <ItemMedia variant="icon">
                  <Server className="size-4 text-muted-foreground" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{s.name}</ItemTitle>
                  <ItemDescription>{s.region} · {s.cpu} · {s.ram}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Badge variant={
                    s.status === "active"  ? "success" :
                    s.status === "warning" ? "warning" :
                    s.status === "offline" ? "destructive" : "muted"
                  }>{s.status}</Badge>
                  <Button variant="ghost" size="icon-sm"><Settings className="size-3.5" /></Button>
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        </Section>

        <Separator />

        {/* ── FIELD ── */}
        <Section title="Field — Form with Validation">
          <FieldGroup className="max-w-md">
            <Field>
              <FieldLabel htmlFor="field-domain">Domain name</FieldLabel>
              <Input id="field-domain" placeholder="my-site.com" />
              <FieldDescription>Enter the primary domain for your WordPress site.</FieldDescription>
            </Field>
            <Field data-invalid="true">
              <FieldLabel htmlFor="field-email">Email address</FieldLabel>
              <Input id="field-email" placeholder="name@example.com" aria-invalid />
              <FieldError>Please enter a valid email address.</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="field-region">Server region</FieldLabel>
              <Select defaultValue="fra">
                <SelectTrigger id="field-region"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fra">Frankfurt</SelectItem>
                  <SelectItem value="nyc">New York</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>Choose the datacenter closest to your users.</FieldDescription>
            </Field>
          </FieldGroup>
        </Section>

        <Separator />

        {/* ── EMPTY STATE ── */}
        <Section title="Empty State">
          <div className="max-w-sm">
            <Empty className="border border-dashed border-border">
              <EmptyHeader>
                <EmptyTitle>No servers yet</EmptyTitle>
                <EmptyDescription>Get started by creating your first cloud server. It only takes a few seconds.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="brand" iconLeft={<Plus />}>Add Server</Button>
              </EmptyContent>
            </Empty>
          </div>
        </Section>

        <Separator />

        <footer className="pb-8 text-center text-xs text-muted-foreground">
          xCloud Design System · shadcn/ui + Tailwind CSS v4 + Inter · Figma key: RZ358zi905ydRzx8MYmv8o
        </footer>
      </main>
    </div>
  )
}
