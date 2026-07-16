import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const root = process.cwd()
const servicesRoot = path.join(root, 'public', 'servicos')
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const coverNames = new Set(['capa', 'cover'])
const maxWidth = Number(process.env.COVER_MAX_WIDTH || 1400)
const quality = Number(process.env.COVER_WEBP_QUALITY || 78)

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(fullPath)
    if (!entry.isFile()) return []
    return [fullPath]
  })
}

function formatKb(bytes) {
  return `${Math.round(bytes / 1024)} KB`
}

function isCover(filePath) {
  const extension = path.extname(filePath).toLowerCase()
  const basename = path.basename(filePath, extension).toLowerCase()

  return imageExtensions.has(extension) && coverNames.has(basename)
}

const covers = walk(servicesRoot).filter(isCover)

for (const coverPath of covers) {
  if (path.extname(coverPath).toLowerCase() === '.webp') continue

  const outputPath = path.join(path.dirname(coverPath), 'capa.webp')
  const before = fs.statSync(coverPath).size

  await sharp(coverPath)
    .rotate()
    .resize({
      width: maxWidth,
      withoutEnlargement: true,
    })
    .webp({
      quality,
      effort: 6,
    })
    .toFile(outputPath)

  const after = fs.statSync(outputPath).size
  const relativeInput = path.relative(root, coverPath)
  const relativeOutput = path.relative(root, outputPath)

  if (after < before) {
    fs.rmSync(coverPath)
    console.log(`${relativeInput} -> ${relativeOutput}: ${formatKb(before)} -> ${formatKb(after)}`)
  } else {
    fs.rmSync(outputPath)
    console.log(`${relativeInput}: mantida (${formatKb(before)}; webp gerou ${formatKb(after)})`)
  }
}
