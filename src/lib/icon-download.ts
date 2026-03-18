/**
 * Client-side icon download helpers.
 * SVG: fetches raw source → Blob → anchor download
 * PNG: loads SVG in <img> → draws to <canvas> at target size → PNG blob download
 */

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function downloadSVG(url: string, name: string, size: number): Promise<void> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch icon: ${res.statusText}`)
  let svgText = await res.text()

  // Inject explicit width/height so the downloaded SVG has the requested size
  svgText = svgText.replace(/<svg([^>]*)>/, (match, attrs: string) => {
    // Remove existing width/height attrs then add the requested ones
    const cleaned = attrs
      .replace(/\s*width="[^"]*"/g, "")
      .replace(/\s*height="[^"]*"/g, "")
    return `<svg${cleaned} width="${size}" height="${size}">`
  })

  const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" })
  triggerDownload(blob, `${name}-${size}.svg`)
}

export async function downloadPNG(url: string, name: string, size: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Could not get 2D context"))
        return
      }
      ctx.drawImage(img, 0, 0, size, size)
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas toBlob returned null"))
          return
        }
        triggerDownload(blob, `${name}-${size}.png`)
        resolve()
      }, "image/png")
    }

    img.onerror = () => reject(new Error("Failed to load SVG as image"))

    // Append a size hint to the URL to force the browser to re-render at that size
    img.src = `${url}?size=${size}`
  })
}

export async function copySVG(url: string, size: number): Promise<void> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch icon: ${res.statusText}`)
  let svgText = await res.text()

  // Inject explicit width/height
  svgText = svgText.replace(/<svg([^>]*)>/, (match, attrs: string) => {
    const cleaned = attrs
      .replace(/\s*width="[^"]*"/g, "")
      .replace(/\s*height="[^"]*"/g, "")
    return `<svg${cleaned} width="${size}" height="${size}">`
  })

  await navigator.clipboard.writeText(svgText)
}

export async function copyPNG(url: string, size: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Could not get 2D context"))
        return
      }
      ctx.drawImage(img, 0, 0, size, size)
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas toBlob returned null"))
          return
        }
        navigator.clipboard
          .write([new ClipboardItem({ "image/png": blob })])
          .then(resolve)
          .catch(reject)
      }, "image/png")
    }

    img.onerror = () => reject(new Error("Failed to load SVG as image"))
    img.src = `${url}?size=${size}`
  })
}
