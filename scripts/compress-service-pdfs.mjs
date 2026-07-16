import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { execFileSync } from 'node:child_process'
import { PDFDocument } from 'pdf-lib'

const root = process.cwd()
const catalogRoot = path.join(root, 'public', 'servicos', 'catalogos')
const popplerBin = process.env.POPPLER_BIN
  || path.join(process.env.LOCALAPPDATA || '', 'Microsoft', 'WinGet', 'Packages', 'oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe', 'poppler-25.07.0', 'Library', 'bin', 'pdftocairo.exe')
const maxLongEdge = String(process.env.PDF_MAX_EDGE || 1800)
const jpegQuality = String(process.env.PDF_JPEG_QUALITY || 82)
const folders = new Set(['collection', 'tomahawk_ropes', 'american_courntry', 'selecao_nacional', 'outdoor'])

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(fullPath)
    if (!entry.isFile()) return []
    return [fullPath]
  })
}

function formatMb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function pageNumber(filePath) {
  const match = path.basename(filePath).match(/-(\d+)\.(jpe?g|png)$/i)
  return match ? Number(match[1]) : 0
}

async function buildPdfFromImages(inputPath, imagePaths, outputPath, format) {
  const sourcePdf = await PDFDocument.load(fs.readFileSync(inputPath), { ignoreEncryption: true })
  const outputPdf = await PDFDocument.create()
  const pages = sourcePdf.getPages()

  for (let index = 0; index < imagePaths.length; index += 1) {
    const sourcePage = pages[index]
    const { width, height } = sourcePage.getSize()
    const imageBytes = fs.readFileSync(imagePaths[index])
    const image = format === 'png'
      ? await outputPdf.embedPng(imageBytes)
      : await outputPdf.embedJpg(imageBytes)
    const page = outputPdf.addPage([width, height])

    page.drawImage(image, {
      x: 0,
      y: 0,
      width,
      height,
    })
  }

  fs.writeFileSync(outputPath, await outputPdf.save({ useObjectStreams: true }))
}

async function renderPages(inputPath, tempDir, format) {
  const imagePrefix = path.join(tempDir, 'page')
  const args = format === 'png'
    ? ['-png', '-scale-to', maxLongEdge, inputPath, imagePrefix]
    : [
        '-jpeg',
        '-scale-to',
        maxLongEdge,
        '-jpegopt',
        `quality=${jpegQuality},optimize=y,progressive=y`,
        inputPath,
        imagePrefix,
      ]

  execFileSync(popplerBin, args, { stdio: 'pipe' })

  return fs.readdirSync(tempDir)
    .filter((name) => {
      const lower = name.toLowerCase()
      return format === 'png' ? lower.endsWith('.png') : lower.endsWith('.jpg') || lower.endsWith('.jpeg')
    })
    .map((name) => path.join(tempDir, name))
    .sort((a, b) => pageNumber(a) - pageNumber(b))
}

async function compressPdf(inputPath, format = 'jpeg') {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'service-pdf-'))
  const outputPath = path.join(tempDir, 'compressed.pdf')

  try {
    const imagePaths = await renderPages(inputPath, tempDir, format)

    if (imagePaths.length === 0) {
      throw new Error('Nenhuma pagina foi renderizada.')
    }

    await buildPdfFromImages(inputPath, imagePaths, outputPath, format)
    return outputPath
  } catch (error) {
    fs.rmSync(tempDir, { recursive: true, force: true })
    throw error
  }
}

if (!fs.existsSync(popplerBin)) {
  throw new Error(`pdftocairo nao encontrado em: ${popplerBin}`)
}

const pdfs = walk(catalogRoot).filter((filePath) => {
  const relative = path.relative(catalogRoot, filePath)
  const folder = relative.split(path.sep)[0]

  return folders.has(folder)
    && filePath.toLowerCase().endsWith('.pdf')
    && !filePath.toLowerCase().endsWith('_compressed.pdf')
})

for (const pdf of pdfs) {
  const before = fs.statSync(pdf).size
  let output
  let format = 'jpeg'

  try {
    output = await compressPdf(pdf, format)
  } catch (error) {
    format = 'png'
    output = await compressPdf(pdf, format)
  }

  const after = fs.statSync(output).size
  const relativeInput = path.relative(root, pdf)

  if (after < before) {
    fs.copyFileSync(output, pdf)
    console.log(`${relativeInput}: ${formatMb(before)} -> ${formatMb(after)} (${format})`)
  } else {
    console.log(`${relativeInput}: mantido (${formatMb(before)}; teste gerou ${formatMb(after)} com ${format})`)
  }

  fs.rmSync(path.dirname(output), { recursive: true, force: true })
}
