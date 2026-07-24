import { unlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const studies = [
  {
    folder: 'boots_horse_site',
    crops: [
      ['01-fundamentos-paleta.webp', { left: 20, top: 120, width: 250, height: 260 }],
      ['02-fundamentos-tipografia.webp', { left: 20, top: 360, width: 250, height: 400 }],
      ['03-interface-principal.webp', { left: 280, top: 120, width: 1000, height: 640 }],
      ['04-componentes-raios.webp', { left: 1280, top: 100, width: 306, height: 340 }],
      ['05-componentes-navegacao.webp', { left: 1280, top: 440, width: 306, height: 310 }],
      ['06-grid-aplicacoes.webp', { left: 0, top: 760, width: 1586, height: 232 }],
    ],
    obsolete: [
      '01-direcao-visual.png',
      '02-sistema-responsivo.png',
      '03-aplicacao-comercial.png',
      '01-fundamentos-visuais.webp',
      '02-interface-principal.webp',
      '03-componentes-sistema.webp',
      '04-grid-aplicacoes.webp',
    ],
  },
  {
    folder: 'tomahawk_collection_site',
    crops: [
      ['01-fundamentos-identidade.webp', { left: 0, top: 0, width: 310, height: 500 }],
      ['02-fundamentos-tipografia.webp', { left: 0, top: 500, width: 310, height: 503 }],
      ['03-interface-principal.webp', { left: 300, top: 60, width: 950, height: 780 }],
      ['04-componentes-paleta.webp', { left: 1250, top: 0, width: 318, height: 500 }],
      ['05-componentes-grid.webp', { left: 1250, top: 500, width: 318, height: 503 }],
      ['06-navegacao-aplicada.webp', { left: 245, top: 825, width: 1030, height: 150 }],
    ],
    obsolete: [
      '01-direcao-visual.png',
      '02-sistema-responsivo.png',
      '03-composicao-editorial.png',
      '01-fundamentos-visuais.webp',
      '02-interface-principal.webp',
      '03-componentes-sistema.webp',
      '04-navegacao-aplicada.webp',
    ],
  },
]

for (const study of studies) {
  const folder = path.join(
    root,
    'public',
    'servicos',
    'design_de_produto',
    study.folder,
  )
  const source = path.join(folder, '00-prancha-sistema-visual.png')

  for (const [filename, crop] of study.crops) {
    await sharp(source)
      .extract(crop)
      .webp({ quality: 90, smartSubsample: true })
      .toFile(path.join(folder, filename))
  }

  for (const filename of study.obsolete) {
    await unlink(path.join(folder, filename)).catch(() => {})
  }
}
