import { NextRequest, NextResponse } from "next/server"
import { writeFile, readFile } from "fs/promises"
import path from "path"

const ICONS_DIR = path.join(process.cwd(), "public", "icons")
const MANIFEST_PATH = path.join(ICONS_DIR, "manifest.json")
const MAX_SIZE_BYTES = 200 * 1024 // 200 KB

interface IconMeta {
  id: string
  name: string
  category: string
  filename: string
  url: string
  uploadedAt: string
}

async function readManifest(): Promise<IconMeta[]> {
  try {
    const raw = await readFile(MANIFEST_PATH, "utf-8")
    return JSON.parse(raw) as IconMeta[]
  } catch {
    return []
  }
}

async function writeManifest(icons: IconMeta[]): Promise<void> {
  await writeFile(MANIFEST_PATH, JSON.stringify(icons, null, 2), "utf-8")
}

function sanitizeName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

// GET /api/icons — return icon list
export async function GET() {
  const icons = await readManifest()
  return NextResponse.json(icons)
}

// POST /api/icons — upload a new SVG icon
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const rawName = (formData.get("name") as string | null) ?? ""
    const category = ((formData.get("category") as string | null) ?? "Uncategorized").trim()

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate SVG
    const isSvgType = file.type === "image/svg+xml"
    const isSvgExt = file.name.toLowerCase().endsWith(".svg")
    if (!isSvgType && !isSvgExt) {
      return NextResponse.json({ error: "Only SVG files are supported" }, { status: 400 })
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "File too large (max 200 KB)" }, { status: 400 })
    }

    const name = sanitizeName(rawName || file.name.replace(/\.svg$/i, ""))
    if (!name) {
      return NextResponse.json({ error: "Invalid icon name" }, { status: 400 })
    }

    const filename = `${name}.svg`
    const filePath = path.join(ICONS_DIR, filename)

    // Read and basic-validate SVG content
    const buffer = Buffer.from(await file.arrayBuffer())
    const content = buffer.toString("utf-8")
    if (!content.includes("<svg")) {
      return NextResponse.json({ error: "File does not appear to be a valid SVG" }, { status: 400 })
    }

    // Save SVG file
    await writeFile(filePath, buffer)

    // Update manifest
    const icons = await readManifest()
    const existing = icons.findIndex((i) => i.filename === filename)
    const meta: IconMeta = {
      id: name,
      name,
      category,
      filename,
      url: `/icons/${filename}`,
      uploadedAt: new Date().toISOString(),
    }
    if (existing >= 0) {
      icons[existing] = meta
    } else {
      icons.push(meta)
    }
    await writeManifest(icons)

    return NextResponse.json({ success: true, icon: meta })
  } catch (err) {
    console.error("[POST /api/icons]", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
