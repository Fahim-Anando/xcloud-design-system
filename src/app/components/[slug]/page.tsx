"use client"

import { useState } from "react"
import { notFound, useParams } from "next/navigation"
import Link from "next/link"
import {
  Plus, Trash2, Server, Globe, RefreshCw,
  ChevronDown, Settings, User, LogOut, Bell,
  Check, Copy, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  ChevronRight, Download, Upload, Filter,
  Share2, ExternalLink, Info, XCircle, Database,
  ArrowLeft, Search,
} from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { CircleIcon } from "@/components/icons/circle-icon"
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
import { InputField } from "@/components/xcloud/input-field"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
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
import { Item, ItemGroup, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/components/ui/item"
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"

import { PlaygroundNav } from "@/components/xcloud/playground-nav"
import { COMPONENT_CATEGORIES } from "@/components/xcloud/component-grid"
import { useTokenInspector, TokenInspectorPanel } from "@/components/xcloud/token-inspector"
import { ThemeToggle } from "@/components/xcloud/theme-toggle"

// ── helpers ──────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>
}

const servers = [
  { id: 1, name: "prod-server-01", status: "active",   region: "Frankfurt", cpu: "4 vCPU", ram: "8 GB" },
  { id: 2, name: "prod-server-02", status: "warning",  region: "New York",  cpu: "8 vCPU", ram: "16 GB" },
  { id: 3, name: "staging-01",     status: "muted",    region: "Singapore", cpu: "2 vCPU", ram: "4 GB" },
  { id: 4, name: "dev-sandbox",    status: "offline",  region: "London",    cpu: "1 vCPU", ram: "2 GB" },
]

// ── valid slugs ───────────────────────────────────────────────
const VALID_SLUGS = new Set(COMPONENT_CATEGORIES.map(c => c.id))

export default function ComponentPage() {
  const params = useParams()
  const slug = params.slug as string

  const { open, data, close, onPointerDown, onPointerUp, onPointerLeave } = useTokenInspector()

  const [loading, setLoading]           = useState(false)
  const [progress]                      = useState(68)
  const [sliderValue, setSliderValue]   = useState([40])
  const [switchOn, setSwitchOn]         = useState(true)
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date())
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)
  const [alignment, setAlignment]       = useState<string[]>(["left"])

  if (!VALID_SLUGS.has(slug)) notFound()

  const cat = COMPONENT_CATEGORIES.find(c => c.id === slug)!

  function handleLoadingDemo() {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <PlaygroundNav mode="router" activeSlug={slug} />

      <div className="flex flex-1 flex-col pl-52">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex h-14 items-center justify-between px-6">
            <Link
              href="/components"
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              <span>Components</span>
              <ChevronRight className="size-3.5" />
              <span className="text-foreground font-medium">{cat.name}</span>
            </Link>
            <div className="flex items-center gap-2">
              <Badge variant="muted" className="hidden sm:inline-flex">Hold any component to inspect tokens</Badge>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <TokenInspectorPanel data={data} open={open} onClose={close} />

        {/* Content */}
        <main
          className="flex-1 px-8 py-10 space-y-10"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerLeave}
        >
          {/* Page header */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{cat.name}</h1>
            <p className="text-sm text-muted-foreground">
              {cat.group} · {cat.count} {cat.count === 1 ? "variant" : "variants"}
            </p>
          </div>
          <Separator />

          {/* ── BUTTON ── */}
          {slug === "button" && (
            <Section title="Button">
              <div className="grid grid-cols-[96px_56px_70px_88px_99px_107px] items-center gap-x-3 gap-y-2.5">
                <span /><span />
                {["XS","SM","MD","LG"].map(s => (
                  <span key={s} className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">{s}</span>
                ))}

                <span className="text-xs font-semibold text-foreground row-span-3 self-center">Primary</span>
                <span className="text-xs text-muted-foreground">Icon L</span>
                <Button variant="default" size="xs" iconLeft={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="default" size="sm" iconLeft={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="default" size="default" iconLeft={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="default" size="lg" iconLeft={<CircleIcon />} className="w-full">Button</Button>

                <span className="text-xs text-muted-foreground">Icon R</span>
                <Button variant="default" size="xs" iconRight={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="default" size="sm" iconRight={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="default" size="default" iconRight={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="default" size="lg" iconRight={<CircleIcon />} className="w-full">Button</Button>

                <span className="text-xs text-muted-foreground/50">Disabled</span>
                <Button variant="default" size="xs" iconLeft={<CircleIcon />} className="w-full" disabled>Button</Button>
                <Button variant="default" size="sm" iconLeft={<CircleIcon />} className="w-full" disabled>Button</Button>
                <Button variant="default" size="default" iconLeft={<CircleIcon />} className="w-full" disabled>Button</Button>
                <Button variant="default" size="lg" iconLeft={<CircleIcon />} className="w-full" disabled>Button</Button>

                <span className="col-span-6 border-b border-border/50 my-1" />

                <span className="text-xs font-semibold text-foreground row-span-3 self-center">Secondary</span>
                <span className="text-xs text-muted-foreground">Icon L</span>
                <Button variant="secondary" size="xs" iconLeft={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="secondary" size="sm" iconLeft={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="secondary" size="default" iconLeft={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="secondary" size="lg" iconLeft={<CircleIcon />} className="w-full">Button</Button>

                <span className="text-xs text-muted-foreground">Icon R</span>
                <Button variant="secondary" size="xs" iconRight={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="secondary" size="sm" iconRight={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="secondary" size="default" iconRight={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="secondary" size="lg" iconRight={<CircleIcon />} className="w-full">Button</Button>

                <span className="text-xs text-muted-foreground/50">Disabled</span>
                <Button variant="secondary" size="xs" iconLeft={<CircleIcon />} className="w-full" disabled>Button</Button>
                <Button variant="secondary" size="sm" iconLeft={<CircleIcon />} className="w-full" disabled>Button</Button>
                <Button variant="secondary" size="default" iconLeft={<CircleIcon />} className="w-full" disabled>Button</Button>
                <Button variant="secondary" size="lg" iconLeft={<CircleIcon />} className="w-full" disabled>Button</Button>

                <span className="col-span-6 border-b border-border/50 my-1" />

                <span className="text-xs font-semibold text-foreground row-span-3 self-center">Outline</span>
                <span className="text-xs text-muted-foreground">Icon L</span>
                <Button variant="outline" size="xs" iconLeft={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="outline" size="sm" iconLeft={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="outline" size="default" iconLeft={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="outline" size="lg" iconLeft={<CircleIcon />} className="w-full">Button</Button>

                <span className="text-xs text-muted-foreground">Icon R</span>
                <Button variant="outline" size="xs" iconRight={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="outline" size="sm" iconRight={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="outline" size="default" iconRight={<CircleIcon />} className="w-full">Button</Button>
                <Button variant="outline" size="lg" iconRight={<CircleIcon />} className="w-full">Button</Button>

                <span className="text-xs text-muted-foreground/50">Disabled</span>
                <Button variant="outline" size="xs" iconLeft={<CircleIcon />} className="w-full" disabled>Button</Button>
                <Button variant="outline" size="sm" iconLeft={<CircleIcon />} className="w-full" disabled>Button</Button>
                <Button variant="outline" size="default" iconLeft={<CircleIcon />} className="w-full" disabled>Button</Button>
                <Button variant="outline" size="lg" iconLeft={<CircleIcon />} className="w-full" disabled>Button</Button>

                <span className="col-span-6 border-b border-border/50 my-1" />

                <span className="text-xs font-semibold text-foreground row-span-3 self-center">Icon</span>
                <span className="text-xs text-muted-foreground">Primary</span>
                <Button variant="default" size="icon-xs"><CircleIcon /></Button>
                <Button variant="default" size="icon-sm"><CircleIcon /></Button>
                <Button variant="default" size="icon"><CircleIcon /></Button>
                <Button variant="default" size="icon-lg"><CircleIcon /></Button>

                <span className="text-xs text-muted-foreground">Outline</span>
                <Button variant="outline" size="icon-xs"><CircleIcon /></Button>
                <Button variant="outline" size="icon-sm"><CircleIcon /></Button>
                <Button variant="outline" size="icon"><CircleIcon /></Button>
                <Button variant="outline" size="icon-lg"><CircleIcon /></Button>

                <span className="text-xs text-muted-foreground/50">Disabled</span>
                <Button variant="default" size="icon-xs" disabled><CircleIcon /></Button>
                <Button variant="default" size="icon-sm" disabled><CircleIcon /></Button>
                <Button variant="default" size="icon" disabled><CircleIcon /></Button>
                <Button variant="default" size="icon-lg" disabled><CircleIcon /></Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/50 pt-4">
                <Button variant="ghost" iconLeft={<CircleIcon />}>Ghost</Button>
                <Button variant="destructive" iconLeft={<CircleIcon />}>Destructive</Button>
                <Button variant="destructive-soft" iconLeft={<CircleIcon />}>Destructive Soft</Button>
                <Button variant="link" iconRight={<CircleIcon />}>Link Button</Button>
                <Button loading={loading} variant="default" onClick={handleLoadingDemo}>
                  {loading ? "Deploying…" : "Loading demo"}
                </Button>
              </div>
            </Section>
          )}

          {/* ── BADGE ── */}
          {slug === "badge" && (
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
          )}

          {/* ── ALERT ── */}
          {slug === "alert" && (
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
          )}

          {/* ── ACCORDION ── */}
          {slug === "accordion" && (
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
          )}

          {/* ── INPUT / TEXTAREA ── */}
          {(slug === "input" || slug === "textarea") && (
            <Section title="Input">
              <div className="grid max-w-xl gap-6">
                {/* States */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">States</p>
                  <div className="grid gap-4">
                    <InputField label="Default" placeholder="Search servers…" />
                    <InputField label="With left icon" placeholder="Search servers…" iconLeft={<Search className="size-4" />} />
                    <InputField label="With right icon" placeholder="Search servers…" iconRight={<Server className="size-4" />} />
                  </div>
                </div>

                {/* Label variants */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Label Variants</p>
                  <div className="grid gap-4">
                    <InputField label="Domain name" placeholder="my-site.com" />
                    <InputField label="Notes" optional placeholder="Add optional notes…" />
                    <InputField label="Email address" required placeholder="name@example.com" />
                    <InputField
                      label="PHP Version"
                      labelTooltip="Changing the PHP version will restart your server. Existing processes may be interrupted."
                      placeholder="e.g. 8.3"
                    />
                    <InputField
                      label="Memory Limit"
                      required
                      labelTooltip="Maximum memory allocated per request. Recommended: 256MB for most applications."
                      placeholder="256"
                    />
                  </div>
                </div>

                {/* Helper & Error */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Helper & Error</p>
                  <div className="grid gap-4">
                    <InputField
                      label="API Key"
                      helperText="This text is a hint for user"
                      helperIcon={<Info className="size-3.5" />}
                      placeholder="sk-..."
                    />
                    <InputField
                      label="Email address"
                      required
                      error="Please enter a valid email address."
                      defaultValue="invalid@"
                    />
                  </div>
                </div>

                {/* Disabled */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Disabled</p>
                  <InputField label="Server name" placeholder="my-server" disabled />
                </div>

                {/* Textarea */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Textarea</p>
                  <div className="grid gap-2">
                    <Label htmlFor="note">Notes</Label>
                    <Textarea id="note" placeholder="Add server notes here…" rows={3} />
                  </div>
                </div>
              </div>
            </Section>
          )}

          {/* ── INPUT OTP ── */}
          {slug === "input-otp" && (
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
          )}

          {/* ── SELECT ── */}
          {slug === "select" && (
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
          )}

          {/* ── SLIDER ── */}
          {slug === "slider" && (
            <Section title="Slider">
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
              </div>
            </Section>
          )}

          {/* ── PROGRESS ── */}
          {slug === "progress" && (
            <Section title="Progress">
              <div className="max-w-md space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Disk usage</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              </div>
            </Section>
          )}

          {/* ── SWITCH ── */}
          {slug === "switch" && (
            <Section title="Switch">
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
            </Section>
          )}

          {/* ── CHECKBOX ── */}
          {slug === "checkbox" && (
            <Section title="Checkbox">
              <div className="space-y-3">
                {["Daily database backups", "Email notifications", "Two-factor authentication"].map((label) => (
                  <div key={label} className="flex items-center gap-3">
                    <Checkbox id={label} defaultChecked={label.includes("Daily")} />
                    <Label htmlFor={label}>{label}</Label>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* ── RADIO ── */}
          {slug === "radio" && (
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
          )}

          {/* ── TOGGLE ── */}
          {slug === "toggle" && (
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
          )}

          {/* ── CARD ── */}
          {slug === "card" && (
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
          )}

          {/* ── TABLE ── */}
          {slug === "table" && (
            <Section title="Table">
              <div className="rounded-md border border-border">
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
          )}

          {/* ── TABS ── */}
          {slug === "tabs" && (
            <Section title="Tabs">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="backups">Backups</TabsTrigger>
                  <TabsTrigger value="ssl">SSL</TabsTrigger>
                  <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <Card><CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Site overview content — server health, uptime, and recent activity.</p>
                  </CardContent></Card>
                </TabsContent>
                <TabsContent value="backups" className="mt-4">
                  <Card><CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Backup management — restore points and automated schedules.</p>
                  </CardContent></Card>
                </TabsContent>
              </Tabs>
            </Section>
          )}

          {/* ── SKELETON ── */}
          {slug === "skeleton" && (
            <Section title="Skeleton">
              <div className="space-y-3 max-w-sm">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-32 w-full rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/6" />
                </div>
              </div>
            </Section>
          )}

          {/* ── SPINNER ── */}
          {slug === "spinner" && (
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
          )}

          {/* ── AVATAR ── */}
          {slug === "avatar" && (
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
          )}

          {/* ── DIALOG / SHEET / DRAWER / ALERT-DIALOG ── */}
          {(slug === "dialog" || slug === "sheet" || slug === "drawer" || slug === "alert-dialog") && (
            <Section title="Dialog · Sheet · Drawer · AlertDialog">
              <Row>
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" />}>Open Dialog</DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Deploy to production?</DialogTitle>
                      <DialogDescription>This will push changes to prod-server-01 in Frankfurt.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="ghost">Cancel</Button>
                      <Button variant="brand">Deploy</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

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

                <Sheet>
                  <SheetTrigger render={<Button variant="outline" />}>Open Sheet</SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Server Settings</SheetTitle>
                      <SheetDescription>Adjust configuration for prod-server-01.</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-6">
                      <div className="grid gap-2">
                        <Label>Hostname</Label>
                        <Input defaultValue="prod-server-01" />
                      </div>
                    </div>
                    <SheetFooter>
                      <Button variant="brand" className="w-full">Save changes</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                <Drawer>
                  <DrawerTrigger className="inline-flex h-8 items-center justify-center gap-2 rounded-sm border border-border bg-background px-3 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-muted">Open Drawer</DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Add New Site</DrawerTitle>
                      <DrawerDescription>Connect a WordPress site to your server.</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 pb-4 space-y-3">
                      <div className="grid gap-2">
                        <Label>Site domain</Label>
                        <Input placeholder="my-site.com" />
                      </div>
                    </div>
                    <DrawerFooter>
                      <Button variant="brand">Create Site</Button>
                      <DrawerClose className="inline-flex h-8 w-full items-center justify-center gap-2 rounded-sm px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Cancel</DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </Row>
            </Section>
          )}

          {/* ── POPOVER / TOOLTIP ── */}
          {(slug === "popover" || slug === "tooltip") && (
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
              </Row>
            </Section>
          )}

          {/* ── DROPDOWN / CONTEXT MENU ── */}
          {(slug === "dropdown" || slug === "context-menu") && (
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
                  <ContextMenuTrigger className="flex h-20 w-48 items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground cursor-context-menu select-none">
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
          )}

          {/* ── MENUBAR ── */}
          {slug === "menubar" && (
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
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Help</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Documentation</MenubarItem>
                    <MenubarItem>Contact Support</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </Section>
          )}

          {/* ── NAVIGATION MENU ── */}
          {slug === "navigation-menu" && (
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
                            <Icon className="size-4 mt-1 text-primary" />
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
                </NavigationMenuList>
              </NavigationMenu>
            </Section>
          )}

          {/* ── BREADCRUMB / PAGINATION ── */}
          {(slug === "breadcrumb" || slug === "pagination") && (
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
          )}

          {/* ── COMMAND ── */}
          {slug === "command" && (
            <Section title="Command">
              <div className="max-w-sm rounded-md border border-border shadow-md">
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
          )}

          {/* ── CALENDAR ── */}
          {slug === "calendar" && (
            <Section title="Calendar">
              <Calendar
                mode="single"
                selected={calendarDate}
                onSelect={setCalendarDate}
                className="rounded-md border border-border w-fit"
              />
            </Section>
          )}

          {/* ── SCROLL AREA ── */}
          {slug === "scroll-area" && (
            <Section title="Scroll Area">
              <ScrollArea className="h-48 w-full max-w-sm rounded-md border border-border">
                <div className="p-4 space-y-2">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="flex items-center justify-between py-1">
                      <span className="text-sm text-foreground">Backup #{String(i + 1).padStart(3, "0")}</span>
                      <Badge variant="muted" className="text-xs">2.{i}GB</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Section>
          )}

          {/* ── COLLAPSIBLE ── */}
          {slug === "collapsible" && (
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
          )}

          {/* ── RESIZABLE ── */}
          {slug === "resizable" && (
            <Section title="Resizable">
              <ResizablePanelGroup orientation="horizontal" className="max-w-lg rounded-md border border-border min-h-[120px]">
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
          )}

          {/* ── KBD ── */}
          {slug === "kbd" && (
            <Section title="Keyboard Shortcut (Kbd)">
              <Row>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Kbd>⌘</Kbd><Kbd>K</Kbd><span>Open command palette</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Kbd>⌘</Kbd><Kbd>N</Kbd><span>New server</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Kbd>Esc</Kbd><span>Close panel</span>
                </div>
              </Row>
            </Section>
          )}

          {/* ── ITEM ── */}
          {slug === "item" && (
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
          )}

          {/* ── FIELD ── */}
          {slug === "field" && (
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
          )}

          {/* ── FORM CONTROLS ── */}
          {slug === "form-controls" && (
            <Section title="Form Controls">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Switch id="fc-backup" checked={switchOn} onCheckedChange={setSwitchOn} />
                    <Label htmlFor="fc-backup">Auto backup</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch id="fc-cdn" />
                    <Label htmlFor="fc-cdn">Enable CDN</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch id="fc-ssl" defaultChecked />
                    <Label htmlFor="fc-ssl">Auto SSL renewal</Label>
                  </div>
                </div>
                <div className="space-y-3">
                  {["Daily database backups", "Email notifications", "Two-factor authentication"].map((label) => (
                    <div key={label} className="flex items-center gap-3">
                      <Checkbox id={`fc-${label}`} defaultChecked={label.includes("Daily")} />
                      <Label htmlFor={`fc-${label}`}>{label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          )}

          {/* ── EMPTY STATE ── */}
          {slug === "empty" && (
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
          )}

        </main>
      </div>
    </div>
  )
}
