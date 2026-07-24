import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')
const servicesDir = path.join(publicDir, 'servicos')
const pdfjsWasmDir = path.join(root, 'node_modules', 'pdfjs-dist', 'wasm')
const publicPdfjsWasmDir = path.join(publicDir, 'pdfjs', 'wasm')
const outputDir = path.join(root, 'src', 'data')
const outputFile = path.join(outputDir, 'serviceProjects.ts')

const categoryMap = new Map([
  ['design_de_produto', 0],
  ['ui_ux_design', 1],
  ['Identidade_visual', 2],
  ['catalogos', 3],
])

const projectOrder = new Map([
  ['boots_horse', 0],
  ['collection', 1],
])

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

const toPublicPath = (filePath) =>
  `/${path.relative(publicDir, filePath).replaceAll(path.sep, '/')}`

const toTitle = (filename) =>
  path
    .basename(filename, path.extname(filename))
    .replaceAll('_', ' ')
    .replaceAll('-', ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getFileOrder = (filename) => {
  const basename = path.basename(filename, path.extname(filename)).toLowerCase()
  const numberedPdf = basename.match(/^pdf[_\s-]*(\d+)$/)

  if (numberedPdf) return Number(numberedPdf[1])
  return Number.MAX_SAFE_INTEGER
}

const parseConfig = (content) => {
  const config = {}

  for (const line of content.split(/\r?\n/)) {
    const [key, ...value] = line.split('=')
    if (!key || value.length === 0) continue
    config[key.trim().toLowerCase()] = value.join('=').trim()
  }

  return config
}

const normalizeModal = (value) => {
  const modal = (value || 'files').toLowerCase()
  if (modal.includes('pdf')) return 'pdf'
  if (modal.includes('image') || modal.includes('imagem')) return 'image'
  return 'files'
}

const getProject = async (categoryName, projectName) => {
  const projectDir = path.join(servicesDir, categoryName, projectName)
  const entries = await readdir(projectDir, { withFileTypes: true })
  const files = entries.filter((entry) => entry.isFile())
  const configEntry = files.find((file) => file.name.toLowerCase() === 'config.txt')
  const cover = files.find((file) => file.name.toLowerCase() === 'capa.png')
    || files.find((file) => imageExtensions.has(path.extname(file.name).toLowerCase()))
  const excludedFiles = new Set(['config.txt'])

  if (cover) excludedFiles.add(cover.name.toLowerCase())

  const config = configEntry
    ? parseConfig(await readFile(path.join(projectDir, configEntry.name), 'utf8'))
    : {}

  const projectFiles = files
    .filter((file) => !excludedFiles.has(file.name.toLowerCase()))
    .sort((first, second) => {
      const firstOrder = getFileOrder(first.name)
      const secondOrder = getFileOrder(second.name)

      if (firstOrder !== secondOrder) return firstOrder - secondOrder
      return first.name.localeCompare(second.name, 'pt-BR', { numeric: true })
    })
    .map((file) => {
      const extension = path.extname(file.name).toLowerCase()
      const type = extension === '.pdf' ? 'pdf' : imageExtensions.has(extension) ? 'image' : 'file'
      const basename = path.basename(file.name, extension).toLowerCase()
      const fileCover = type === 'pdf'
        ? files.find((candidate) => {
            const candidateExtension = path.extname(candidate.name).toLowerCase()
            const candidateBasename = path.basename(candidate.name, candidateExtension).toLowerCase()

            return imageExtensions.has(candidateExtension) && candidateBasename === basename
          })
        : null

      return {
        name: toTitle(file.name),
        path: toPublicPath(path.join(projectDir, file.name)),
        type,
        ...(fileCover ? { cover: toPublicPath(path.join(projectDir, fileCover.name)) } : {}),
      }
    })
  const firstPdf = projectFiles.find((file) => file.type === 'pdf')
  const modal = config.modal ? normalizeModal(config.modal) : firstPdf ? 'pdf' : 'files'

  if (!cover && !firstPdf) return null

  return {
    title: config.nome || toTitle(projectName),
    category: config.tipo || categoryName,
    modal,
    ...(config.url ? { url: config.url } : {}),
    ...(config.logo ? { logo: config.logo } : {}),
    ...(config.dominio ? { domain: config.dominio } : {}),
    ...(config.descricao ? { description: config.descricao } : {}),
    ...(cover ? { image: toPublicPath(path.join(projectDir, cover.name)) } : {}),
    ...(!cover && firstPdf ? { coverPdf: firstPdf } : {}),
    folder: toPublicPath(projectDir),
    files: projectFiles,
  }
}

const serviceWorks = [[], [], [], []]

for (const [categoryName, serviceIndex] of categoryMap) {
  const categoryDir = path.join(servicesDir, categoryName)
  let entries = []

  try {
    entries = await readdir(categoryDir, { withFileTypes: true })
  } catch {
    continue
  }

  const projectEntries = entries
    .filter((item) => item.isDirectory())
    .sort((first, second) => {
      const firstOrder = projectOrder.get(first.name) ?? 100
      const secondOrder = projectOrder.get(second.name) ?? 100

      if (firstOrder !== secondOrder) return firstOrder - secondOrder
      return first.name.localeCompare(second.name)
    })

  for (const entry of projectEntries) {
    const project = await getProject(categoryName, entry.name)
    if (project) serviceWorks[serviceIndex].push(project)
  }
}

const content = `export type ProjectFile = {
  name: string
  path: string
  type: 'image' | 'pdf' | 'text' | 'file'
  cover?: string
}

export type ServiceProject = {
  title: string
  category: string
  modal: 'pdf' | 'image' | 'files'
  url?: string
  logo?: string
  domain?: string
  description?: string
  image?: string
  coverPdf?: ProjectFile
  folder: string
  files: ProjectFile[]
}

export const serviceWorks: ServiceProject[][] = ${JSON.stringify(serviceWorks, null, 2)}
`

await mkdir(outputDir, { recursive: true })
await mkdir(publicPdfjsWasmDir, { recursive: true })

for (const wasmFile of ['jbig2.wasm', 'openjpeg.wasm', 'qcms_bg.wasm']) {
  await copyFile(path.join(pdfjsWasmDir, wasmFile), path.join(publicPdfjsWasmDir, wasmFile))
}

await writeFile(outputFile, content)
