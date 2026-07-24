import { useEffect, useState, useRef, type PointerEvent, type WheelEvent } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FileText, Plus, Minus, ArrowLeft, ArrowRight, X, ArrowUpRight } from 'lucide-react'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import type { PDFDocumentLoadingTask, RenderTask } from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { serviceWorks, type ProjectFile } from '../data/serviceProjects'

GlobalWorkerOptions.workerSrc = pdfWorker

const pdfDocumentOptions = (path: string) => ({
  url: path,
  wasmUrl: '/pdfjs/wasm/',
})

const services = [
  {
    number: '01',
    title: 'Design de Produto',
    description:
      'O design de produtos combina criatividade e funcionalidade, transformando ideias em soluções tangíveis, intuitivas e visualmente atraentes.',
  },
  {
    number: '02',
    title: 'UI/UX Design',
    description:
      'Criamos interfaces intuitivas e experiências digitais centradas nas pessoas. Cada tela é pensada para orientar, envolver e converter.',
  },
  {
    number: '03',
    title: 'Identidade Visual',
    description:
      'Construímos marcas que comunicam, conectam e permanecem na memória. Cada elemento é escolhido com intenção para formar uma identidade consistente.',
  },
  {
    number: '04',
    title: 'Catálogos',
    description:
      'Desenvolvemos catálogos impressos e digitais que apresentam produtos e serviços com clareza, elegância e uma direção editorial marcante.',
  },
]

function PdfPreview({ file }: { file: ProjectFile }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Carregando PDF...')

  useEffect(() => {
    let cancelled = false
    let loadingTask: PDFDocumentLoadingTask | null = null
    const renderTasks = new Set<RenderTask>()
    const pageObservers: IntersectionObserver[] = []
    const container = containerRef.current

    if (!container) return

    container.innerHTML = ''
    setStatus('Carregando PDF...')

    const renderPdf = async () => {
      try {
        loadingTask = getDocument(pdfDocumentOptions(file.path))
        const pdf = await loadingTask.promise

        if (cancelled) return

        setStatus('')
        const firstPage = await pdf.getPage(1)
        const firstViewport = firstPage.getViewport({ scale: 1 })
        const isVerticalPdf = firstViewport.height >= firstViewport.width
        const pageGap = 16

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const spreadWrapper = document.createElement('div')
          spreadWrapper.className = isVerticalPdf
            ? 'mb-4 grid grid-cols-1 gap-4 last:mb-0 sm:grid-cols-2'
            : 'mb-4 flex justify-center last:mb-0'
          container.appendChild(spreadWrapper)

          const pagesInRow = isVerticalPdf && pageNumber < pdf.numPages
            ? [pageNumber, pageNumber + 1]
            : [pageNumber]

          if (isVerticalPdf && pageNumber < pdf.numPages) {
            pageNumber += 1
          }

          for (const spreadPageNumber of pagesInRow) {
            const page = await pdf.getPage(spreadPageNumber)

            if (cancelled) return

            const baseViewport = page.getViewport({ scale: 1 })
            const containerWidth = container.clientWidth || 900
            const isMobile = window.matchMedia('(max-width: 639px)').matches
            const availableWidth = isVerticalPdf && !isMobile
              ? (containerWidth - pageGap) / 2
              : containerWidth
            const scale = Math.min(availableWidth / baseViewport.width, isMobile ? 2.25 : 1.65)
            const viewport = page.getViewport({ scale })
            const canvas = document.createElement('canvas')
            canvas.style.width = `${viewport.width}px`
            canvas.style.height = `${viewport.height}px`
            canvas.className = 'max-w-full rounded-xl bg-white'

            const pageWrapper = document.createElement('div')
            pageWrapper.className = 'flex justify-center'
            pageWrapper.appendChild(canvas)
            spreadWrapper.appendChild(pageWrapper)

            const observer = new IntersectionObserver(
              (entries) => {
                if (!entries.some((entry) => entry.isIntersecting) || cancelled) return

                observer.disconnect()

                const context = canvas.getContext('2d', { alpha: false })
                if (!context) return

                // Mantem textos e detalhes nitidos sem alterar o peso do arquivo PDF.
                const outputScale = Math.min(Math.max(window.devicePixelRatio || 1, 2), 2.5)
                canvas.width = Math.floor(viewport.width * outputScale)
                canvas.height = Math.floor(viewport.height * outputScale)

                const task = page.render({
                  canvas,
                  canvasContext: context,
                  viewport,
                  transform: [outputScale, 0, 0, outputScale, 0, 0],
                })

                renderTasks.add(task)
                task.promise
                  .catch((error) => {
                    if (error instanceof Error && error.name === 'RenderingCancelledException') return
                    if (!cancelled) canvas.classList.add('opacity-60')
                  })
                  .finally(() => renderTasks.delete(task))
              },
              {
                root: container.parentElement,
                rootMargin: '700px 0px',
                threshold: 0.01,
              },
            )

            pageObservers.push(observer)
            observer.observe(pageWrapper)
          }
        }
      } catch (error) {
        if (!cancelled) {
          if (error instanceof Error && error.name === 'RenderingCancelledException') return
          setStatus('Nao foi possivel exibir este PDF no modal.')
        }
      }
    }

    renderPdf()

    return () => {
      cancelled = true
      pageObservers.forEach((observer) => observer.disconnect())
      renderTasks.forEach((task) => task.cancel())
      loadingTask?.destroy()
      container.innerHTML = ''
    }
  }, [file.path])

  return (
    <div className="h-full sm:col-span-2 overflow-hidden rounded-none border-0 bg-black/20 md:rounded-2xl md:border md:border-white/10">
      <div className="h-full min-h-0 overflow-y-auto px-0 pb-4 pt-16 md:h-[78vh] md:min-h-[520px] md:px-4 md:py-4">
        {status && (
          <div className="flex h-full items-center justify-center text-center">
            <span className="font-dm text-sm text-white/40">{status}</span>
          </div>
        )}
        <div ref={containerRef} />
      </div>
    </div>
  )
}

function PdfCover({ file, fit = 'cover' }: { file: ProjectFile; fit?: 'cover' | 'contain' }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (file.cover) return

    let cancelled = false
    let renderTask: RenderTask | null = null
    let loadingTask: PDFDocumentLoadingTask | null = null
    const frame = frameRef.current
    const canvas = canvasRef.current

    if (!frame || !canvas) return

    setLoaded(false)
    setFailed(false)

    const renderCover = async () => {
      try {
        loadingTask = getDocument(pdfDocumentOptions(file.path))
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(1)

        if (cancelled) return

        const baseViewport = page.getViewport({ scale: 1 })
        const frameWidth = frame.clientWidth || 320
        const frameHeight = frame.clientHeight || 420
          const fitScale = fit === 'contain'
            ? Math.min(frameWidth / baseViewport.width, frameHeight / baseViewport.height)
            : Math.max(frameWidth / baseViewport.width, frameHeight / baseViewport.height)
          const scale = fit === 'contain' ? fitScale : fitScale * 1.08
        const viewport = page.getViewport({ scale })
        const outputScale = window.devicePixelRatio || 1
        const context = canvas.getContext('2d')

        if (!context) return

        canvas.width = Math.floor(viewport.width * outputScale)
        canvas.height = Math.floor(viewport.height * outputScale)
        canvas.style.width = `${viewport.width}px`
        canvas.style.height = `${viewport.height}px`
        canvas.style.left = `${(frameWidth - viewport.width) / 2}px`
        canvas.style.top = `${(frameHeight - viewport.height) / 2}px`
        context.save()
        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.restore()

        renderTask = page.render({
          canvas,
          canvasContext: context,
          viewport,
          transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined,
        })

        await renderTask.promise
        renderTask = null

        if (!cancelled) {
          setFailed(false)
          setLoaded(true)
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'RenderingCancelledException') return

        if (!cancelled) {
          setFailed(true)
          setLoaded(false)
        }
      }
    }

    renderCover()

    return () => {
      cancelled = true
      renderTask?.cancel()
      loadingTask?.destroy()
    }
  }, [file.path, fit])

  if (file.cover) {
    return (
      <img
        src={file.cover}
        alt=""
        loading="lazy"
        className={`absolute inset-0 h-full w-full transition-transform duration-300 group-hover/pdf:scale-[1.02] ${
          fit === 'contain' ? 'object-contain' : 'object-cover'
        }`}
      />
    )
  }

  return (
    <div ref={frameRef} className="absolute inset-0 overflow-hidden bg-[#111]">
      {!loaded && !failed && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <span className="font-dm text-xs text-white/35">Carregando</span>
        </div>
      )}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/5 text-white/45">
          <FileText size={28} strokeWidth={1.5} />
          <span className="font-dm text-xs uppercase tracking-[0.16em]">PDF</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`absolute transition-transform duration-300 group-hover/pdf:scale-[1.02] ${
          failed || !loaded ? 'opacity-0' : 'opacity-100'
        }`}
        aria-label="Capa do PDF"
      />
    </div>
  )
}

function PdfChoiceCard({ file, onSelect }: { file: ProjectFile; onSelect: () => void }) {
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical')

  useEffect(() => {
    if (file.cover) return

    let cancelled = false
    const loadingTask = getDocument(pdfDocumentOptions(file.path))

    const detectOrientation = async () => {
      try {
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(1)
        const viewport = page.getViewport({ scale: 1 })

        if (!cancelled) {
          setOrientation(viewport.width > viewport.height ? 'horizontal' : 'vertical')
        }
      } catch {
        if (!cancelled) setOrientation('vertical')
      }
    }

    detectOrientation()

    return () => {
      cancelled = true
      loadingTask.destroy()
    }
  }, [file.cover, file.path])

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`glass-card rounded-xl overflow-hidden relative text-left group/pdf ${
        orientation === 'horizontal' ? 'aspect-[842/595]' : 'aspect-[3/4]'
      }`}
    >
      <PdfCover file={file} fit={orientation === 'horizontal' ? 'contain' : 'cover'} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover/pdf:opacity-100 transition-opacity" />
      <div className="absolute right-4 top-4 w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 opacity-0 group-hover/pdf:opacity-100 transition-opacity">
        <FileText size={17} strokeWidth={1.7} />
      </div>
    </button>
  )
}

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number>(0)
  const [selectedProject, setSelectedProject] = useState<{ serviceIndex: number; workIndex: number } | null>(null)
  const [selectedPdf, setSelectedPdf] = useState<ProjectFile | null>(null)
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string } | null>(null)
  const [activeProductSection, setActiveProductSection] = useState(0)
  const carouselRefs = useRef<Array<HTMLDivElement | null>>([])
  const carouselState = useRef<Array<{
    current: number
    target: number
    raf: number | null
    isDragging: boolean
    isTouching: boolean
    gestureLocked: 'horizontal' | 'vertical' | null
    startX: number
    startY: number
    startTarget: number
    dragDelta: number
    didDrag: boolean
    suppressClickUntil: number
  }>>([])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!expandedImage) return

    const closeExpandedImage = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpandedImage(null)
    }

    window.addEventListener('keydown', closeExpandedImage)
    return () => window.removeEventListener('keydown', closeExpandedImage)
  }, [expandedImage])

  const modalService = selectedProject ? services[selectedProject.serviceIndex] : null
  const modalWork = selectedProject
    ? serviceWorks[selectedProject.serviceIndex][selectedProject.workIndex]
    : null
  const modalFiles = modalWork
    ? modalWork.files.filter((file) => {
        if (modalWork.modal === 'pdf') return file.type === 'pdf'
        if (modalWork.modal === 'image') return file.type === 'image'
        return true
      })
    : []
  const relatedWorks = selectedProject
    ? serviceWorks[selectedProject.serviceIndex].filter((_, index) => index !== selectedProject.workIndex)
    : []
  const productCaseSections = selectedProject?.serviceIndex === 0
    ? [
        {
          title: 'Direção visual',
          description:
            'As escolhas de cor, tipografia e direção de imagem estabelecem personalidade, contraste e reconhecimento para o produto.',
          files: modalFiles.filter((file) => {
            const name = file.name.toLowerCase()
            return name.includes('prancha') || name.includes('fundamentos')
          }),
        },
        {
          title: 'Sistema',
          description:
            'Grid, espaçamento, raios e componentes transformam a direção criativa em uma linguagem consistente e escalável.',
          files: modalFiles.filter((file) => {
            const name = file.name.toLowerCase()
            return (
              name.includes('interface') ||
              name.includes('componentes') ||
              name.includes('grid') ||
              name.includes('navegacao')
            )
          }),
        },
        {
          title: 'Aplicações',
          description:
            'O sistema ganha vida em contextos reais, mantendo hierarquia, acabamento e coerência no desktop e no mobile.',
          files: modalFiles.filter((file) => file.name.toLowerCase().includes('aplicacao')),
        },
      ]
    : []
  const uxCaseSections = selectedProject?.serviceIndex === 1
    ? [
        {
          title: 'Descoberta',
          description:
            'A experiência apresenta proposta, identidade e caminhos principais com hierarquia suficiente para orientar sem sobrecarregar.',
          files: modalFiles.filter((file) => {
            const name = file.name.toLowerCase()
            return (
              name.includes('home desktop') ||
              name.includes('experiencia produto') ||
              name.includes('historia marca')
            )
          }),
        },
        {
          title: 'Responsividade',
          description:
            'Conteúdo, navegação e ações são reorganizados para preservar contexto, legibilidade e continuidade em telas menores.',
          files: modalFiles.filter((file) => file.name.toLowerCase().includes('mobile')),
        },
        {
          title: 'Conversão',
          description:
            'Benefícios, prova de valor e chamadas para ação reduzem incertezas e conduzem o usuário ao próximo passo.',
          files: modalFiles.filter((file) => {
            const name = file.name.toLowerCase()
            return name.includes('revendedor') || name.includes('beneficios')
          }),
        },
      ]
    : []
  const activeCaseSections = selectedProject?.serviceIndex === 0
    ? productCaseSections
    : selectedProject?.serviceIndex === 1
      ? uxCaseSections
      : []

  const getCarouselState = (serviceIndex: number) => {
    if (!carouselState.current[serviceIndex]) {
      carouselState.current[serviceIndex] = {
        current: 0,
        target: 0,
        raf: null,
        isDragging: false,
        isTouching: false,
        gestureLocked: null,
        startX: 0,
        startY: 0,
        startTarget: 0,
        dragDelta: 0,
        didDrag: false,
        suppressClickUntil: 0,
      }
    }

    return carouselState.current[serviceIndex]
  }

  const getMaxCarouselScroll = (carousel: HTMLDivElement) =>
    Math.max(carousel.scrollWidth - carousel.clientWidth, 0)

  const animateCarousel = (serviceIndex: number) => {
    const carousel = carouselRefs.current[serviceIndex]
    const state = getCarouselState(serviceIndex)

    if (!carousel) return

    state.current += (state.target - state.current) * 0.12

    if (Math.abs(state.target - state.current) < 0.45) {
      state.current = state.target
      carousel.scrollLeft = state.current
      state.raf = null
      return
    }

    carousel.scrollLeft = state.current
    state.raf = window.requestAnimationFrame(() => animateCarousel(serviceIndex))
  }

  const setCarouselTarget = (serviceIndex: number, target: number) => {
    const carousel = carouselRefs.current[serviceIndex]
    const state = getCarouselState(serviceIndex)

    if (!carousel) return

    state.target = Math.min(Math.max(target, 0), getMaxCarouselScroll(carousel))

    if (state.raf === null) {
      state.current = carousel.scrollLeft
      state.raf = window.requestAnimationFrame(() => animateCarousel(serviceIndex))
    }
  }

  const scrollWorks = (serviceIndex: number, direction: -1 | 1) => {
    const carousel = carouselRefs.current[serviceIndex]
    const state = getCarouselState(serviceIndex)

    if (!carousel) return

    setCarouselTarget(serviceIndex, state.target + direction * carousel.clientWidth * 0.86)
  }

  const handleCarouselWheel = (serviceIndex: number, event: WheelEvent<HTMLDivElement>) => {
    const carousel = carouselRefs.current[serviceIndex]
    const state = getCarouselState(serviceIndex)

    if (!carousel) return

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY

    if (Math.abs(delta) < 1) return

    event.preventDefault()
    setCarouselTarget(serviceIndex, state.target + delta * 1.18)
  }

  const handleCarouselPointerDown = (serviceIndex: number, event: PointerEvent<HTMLDivElement>) => {
    const carousel = carouselRefs.current[serviceIndex]
    const state = getCarouselState(serviceIndex)

    if (!carousel) return

    if (state.raf !== null) {
      window.cancelAnimationFrame(state.raf)
      state.raf = null
    }

    state.isDragging = true
    state.isTouching = event.pointerType === 'touch'
    state.gestureLocked = null
    state.didDrag = false
    state.startX = event.clientX
    state.startY = event.clientY
    state.startTarget = carousel.scrollLeft
    state.dragDelta = 0
    state.current = carousel.scrollLeft
    state.target = carousel.scrollLeft
  }

  const handleCarouselPointerMove = (serviceIndex: number, event: PointerEvent<HTMLDivElement>) => {
    const carousel = carouselRefs.current[serviceIndex]
    const state = getCarouselState(serviceIndex)

    if (!carousel || !state.isDragging) return

    const nextTarget = state.startTarget - (event.clientX - state.startX)
    const deltaX = event.clientX - state.startX
    const deltaY = event.clientY - state.startY

    if (!state.gestureLocked) {
      if (Math.abs(deltaX) < 6 && Math.abs(deltaY) < 6) return
      state.gestureLocked = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical'
    }

    if (state.gestureLocked === 'vertical') return

    if (event.cancelable) event.preventDefault()
    state.didDrag = Math.abs(deltaX) > 6
    state.target = Math.min(Math.max(nextTarget, 0), getMaxCarouselScroll(carousel))
    state.dragDelta = state.target - state.startTarget
    state.current = state.target
    carousel.scrollLeft = state.current
  }

  const handleCarouselPointerUp = (serviceIndex: number) => {
    const carousel = carouselRefs.current[serviceIndex]
    const state = getCarouselState(serviceIndex)

    if (!carousel) return

    if (state.didDrag) {
      state.suppressClickUntil = Date.now() + 220
      const afterMove = Math.max(-72, Math.min(72, state.dragDelta * 0.18))

      if (Math.abs(afterMove) > 2) {
        setCarouselTarget(serviceIndex, state.target + afterMove)
      }
    }

    state.isDragging = false
    state.isTouching = false
    state.gestureLocked = null
    state.dragDelta = 0
    state.didDrag = false

  }

  const openProject = (serviceIndex: number, workIndex: number) => {
    const state = getCarouselState(serviceIndex)
    const project = serviceWorks[serviceIndex]?.[workIndex]

    if (!project || Date.now() < state.suppressClickUntil || state.didDrag) return

    setActiveProductSection(0)
    setSelectedPdf(serviceIndex === 2 ? project.files.find((file) => file.type === 'pdf') ?? null : null)
    setSelectedProject({ serviceIndex, workIndex })
  }

  const renderProjectFile = (file: ProjectFile, fileIndex = 0) => {
    if (file.type === 'pdf') {
      return <PdfPreview key={file.path} file={file} />
    }

    if (file.type === 'image') {
      const normalizedName = file.name.toLowerCase()
      const isMobile = normalizedName.includes('mobile') || normalizedName.includes('responsivo')
      const isMainJourney =
        fileIndex === 0 ||
        normalizedName.includes('desktop') ||
        normalizedName.includes('interface principal') ||
        normalizedName.includes('aplicacao home') ||
        normalizedName.includes('aplicacao comercial') ||
        normalizedName.includes('experiencia produto') ||
        normalizedName.includes('historia marca') ||
        normalizedName.includes('beneficios') ||
        normalizedName.includes('revendedor')
      const isProductDesign = selectedProject?.serviceIndex === 0
      const isWideDetail =
        isProductDesign &&
        (normalizedName.includes('grid') || normalizedName.includes('navegacao'))
      let experienceLabel = 'Jornada principal'
      let explanation =
        'A primeira dobra comunica valor rapidamente e oferece caminhos claros para descoberta e conversão.'

      if (isProductDesign) {
        if (normalizedName.includes('aplicacao mobile')) {
          experienceLabel = 'Aplicação mobile'
          explanation =
            'A linguagem visual se adapta ao formato vertical sem perder hierarquia, identidade ou clareza dos elementos principais.'
        } else if (normalizedName.includes('aplicacao home')) {
          experienceLabel = 'Aplicação principal'
          explanation =
            'A aplicação principal reúne fotografia, mensagem, navegação e ações dentro do sistema definido para a marca.'
        } else if (normalizedName.includes('aplicacao comercial')) {
          experienceLabel = 'Aplicação comercial'
          explanation =
            'A direção visual acompanha a jornada comercial e preserva consistência nos pontos de maior intenção.'
        } else if (normalizedName.includes('fundamentos paleta')) {
          experienceLabel = 'Paleta cromática'
          explanation =
            'A seleção de cores cria unidade com o universo da marca e estabelece contraste entre superfícies, conteúdo e ações.'
        } else if (normalizedName.includes('fundamentos tipografia')) {
          experienceLabel = 'Sistema tipográfico'
          explanation =
            'Pesos e escalas tipográficas organizam leitura, hierarquia e personalidade sem comprometer a clareza.'
        } else if (normalizedName.includes('fundamentos identidade')) {
          experienceLabel = 'Identidade e mensagem'
          explanation =
            'Assinatura, linguagem e mensagem principal trabalham juntas para construir uma presença reconhecível.'
        } else if (normalizedName.includes('interface')) {
          experienceLabel = 'Interface principal'
          explanation =
            'A composição principal equilibra fotografia, mensagem e ações para transformar identidade em produto digital.'
        } else if (normalizedName.includes('componentes raios')) {
          experienceLabel = 'Raios e superfícies'
          explanation =
            'Os raios e tratamentos de superfície repetem uma lógica consistente em diferentes escalas.'
        } else if (normalizedName.includes('componentes navegacao')) {
          experienceLabel = 'Componente de navegação'
          explanation =
            'A navegação concentra identidade, hierarquia e ações dentro de um componente reutilizável.'
        } else if (normalizedName.includes('componentes paleta')) {
          experienceLabel = 'Tokens de cor'
          explanation =
            'Os tokens transformam a paleta em regras aplicáveis e consistentes em toda a interface.'
        } else if (normalizedName.includes('componentes grid')) {
          experienceLabel = 'Grid e medidas'
          explanation =
            'Colunas e medidas definem alinhamento, ritmo e relações proporcionais entre os elementos.'
        } else if (normalizedName.includes('grid')) {
          experienceLabel = 'Grid e espaçamento'
          explanation =
            'O sistema de espaçamento organiza ritmo, alinhamento e respiro entre conteúdo, imagem e interação.'
        } else if (normalizedName.includes('navegacao')) {
          experienceLabel = 'Navegação aplicada'
          explanation =
            'A navegação traduz o sistema visual em um componente funcional, claro e coerente com a marca.'
        } else {
          experienceLabel = 'Direção visual'
          explanation =
            'A prancha conecta identidade, hierarquia, componentes e aplicações em um sistema visual único.'
        }
      } else if (isMobile) {
        experienceLabel = 'Experiência responsiva'
        explanation =
          'A experiência reorganiza conteúdo e ações para preservar clareza, leitura e navegação em telas menores.'
      } else if (normalizedName.includes('revendedor')) {
        experienceLabel = 'Jornada de conversão'
        explanation =
          'A jornada reduz dúvidas, apresenta benefícios e conduz o usuário até a ação comercial principal.'
      } else if (normalizedName.includes('historia')) {
        experienceLabel = 'Narrativa de marca'
        explanation =
          'A narrativa institucional transforma história, propósito e credibilidade em uma sequência visual fácil de compreender.'
      } else if (normalizedName.includes('beneficios')) {
        experienceLabel = 'Benefícios e decisão'
        explanation =
          'Benefícios são agrupados e priorizados para apoiar comparação, reduzir incerteza e aproximar o usuário da decisão.'
      } else if (normalizedName.includes('produto')) {
        experienceLabel = 'Descoberta e produto'
        explanation =
          'A hierarquia ajuda o usuário a entender a proposta, explorar a oferta e encontrar o próximo passo.'
      }

      return (
        <figure
          key={file.path}
          role="button"
          tabIndex={0}
          aria-label={`Ampliar ${experienceLabel}`}
          onClick={() => setExpandedImage({ src: file.path, alt: `${experienceLabel} — ${file.name}` })}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setExpandedImage({ src: file.path, alt: `${experienceLabel} — ${file.name}` })
            }
          }}
          className={`glass-card group/experience relative overflow-hidden rounded-2xl border border-white/10 ${
            isMainJourney || isWideDetail ? 'sm:col-span-2' : ''
          } self-start cursor-zoom-in outline-none transition-colors hover:border-white/25 focus-visible:ring-2 focus-visible:ring-[#5700ef]`}
        >
          <div className="flex items-center justify-center bg-black/25 p-2 sm:p-3">
            <img
              src={file.path}
              alt={`${experienceLabel} — ${file.name}`}
              className="block h-auto w-full rounded-[14px] object-contain object-top shadow-2xl"
            />
          </div>
          <figcaption className="relative border-t border-white/8 bg-black/35 px-5 py-4 text-left">
            <span className="font-dm text-[10px] uppercase tracking-[0.2em] text-white/50">
              {isProductDesign ? 'Estudo de design' : 'Estudo de experiência'}
            </span>
            <p className="mt-1 font-geist text-sm font-semibold text-white sm:text-base">
              {experienceLabel}
            </p>
            <p className="mt-1.5 max-w-2xl font-dm text-[11px] leading-relaxed text-white/55 sm:text-xs">
              {explanation}
            </p>
          </figcaption>
        </figure>
      )
    }

    return (
      <a
        key={file.path}
        href={file.path}
        target="_blank"
        rel="noreferrer"
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 font-dm text-sm text-white/60 hover:text-white transition-colors"
      >
        {file.name}
      </a>
    )
  }

  return (
    <section id="services" ref={ref} className="relative overflow-hidden bg-[#0c0b0b] py-14 md:py-20">
      <div className="site-container mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid grid-cols-1 items-start gap-12 xl:grid-cols-[1.15fr_1fr] xl:gap-14">

          {/* Left: title + description + cta */}
          <div className="flex flex-col gap-8 xl:sticky xl:top-28">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-title max-w-[720px] text-[clamp(2.5rem,4.2vw,4.25rem)] uppercase leading-[1.08] text-white"
            >
              Serviços criativos que
              <br />
              estimulam o
              <br />
              crescimento
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="max-w-[680px] font-dm text-[16px] leading-relaxed text-white/50"
            >
              Gabriel Teixeira — designer brasileiro movido por estética, estratégia e criatividade.
              Meu trabalho vai além de criar algo bonito: cada projeto precisa contar uma história,
              resolver um problema real e construir uma experiência que permaneça na memória.
            </motion.p>

            <motion.a
              href="#projects"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="glass flex h-[52px] w-fit items-center gap-8 rounded-full py-1 pl-6 pr-1 font-dm text-[16px] text-white transition-colors"
            >
              Ver projeto
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <ArrowUpRight size={18} strokeWidth={1.5} />
              </span>
            </motion.a>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col">
            {/* Accordion */}
            <div className="flex flex-col">
              {services.map((service, i) => (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
                  className="border-b border-white/10"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className="group flex w-full items-center justify-between py-6 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-dm text-[24px] font-light text-white">
                        {service.number}.
                      </span>
                      <span
                        className={`font-geist text-[clamp(1.35rem,2vw,1.8rem)] font-medium transition-colors duration-200 ${
                          openIndex === i ? 'text-white' : 'text-white/60 group-hover:text-white'
                        }`}
                      >
                        {service.title}
                      </span>
                    </div>
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        openIndex === i
                          ? 'border-[#5700ef]/70 bg-[#5700ef]/20 text-white'
                          : 'border-white/15 bg-white/[0.03] text-white/55 group-hover:border-white/35 group-hover:text-white'
                      }`}
                    >
                      {openIndex === i ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-2 pb-5 sm:gap-3">
                          <button
                            type="button"
                            onClick={() => scrollWorks(i, -1)}
                            aria-label="Ver trabalhos anteriores"
                            className="flex h-10 w-8 shrink-0 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/[0.05] hover:text-white"
                          >
                            <ArrowLeft size={17} strokeWidth={1.6} />
                          </button>

                          <div className="flex-1 min-w-0 overflow-hidden">
                            {serviceWorks[i].length > 0 ? (
                              <div
                                ref={(node) => {
                                  carouselRefs.current[i] = node
                                }}
                                onWheel={(event) => handleCarouselWheel(i, event)}
                                onPointerDown={(event) => handleCarouselPointerDown(i, event)}
                                onPointerMove={(event) => handleCarouselPointerMove(i, event)}
                                onPointerUp={() => handleCarouselPointerUp(i)}
                                onPointerCancel={() => handleCarouselPointerUp(i)}
                                className="-mx-1.5 flex cursor-grab gap-0 overflow-x-auto pb-1 touch-pan-y select-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                              >
                                {serviceWorks[i].map((work, workIndex) => (
                                  <div
                                    key={`${service.number}-${work.title}-${work.category}`}
                                    className="w-1/2 min-w-[50%] shrink-0 px-1.5"
                                  >
                                    <button
                                      type="button"
                                      aria-label={`Abrir ${work.title}`}
                                      onClick={(event) => {
                                        event.stopPropagation()
                                        openProject(i, workIndex)
                                      }}
                                      className={`service-carousel-card glass-card group/project relative flex w-full flex-col justify-end overflow-hidden rounded-[18px] bg-[#111] p-4 text-left sm:rounded-[22px] lg:rounded-[26px] ${
                                        i === 2 ? 'aspect-video' : i <= 1 ? 'aspect-[3/2]' : 'aspect-square'
                                      }`}
                                    >
                                      {work.logo ? (
                                        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-5 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.055),transparent_54%)] px-8">
                                          <div className="absolute inset-[1px] rounded-[inherit] bg-black/20 backdrop-blur-xl" />
                                          <img
                                            src={work.logo}
                                            alt=""
                                            className="relative z-10 h-16 w-auto max-w-[58%] object-contain brightness-0 invert sm:h-20"
                                          />
                                          <span className="relative z-10 font-dm text-[10px] tracking-[0.22em] text-white/42 sm:text-xs">
                                            {work.domain}
                                          </span>
                                        </div>
                                      ) : work.coverPdf ? (
                                        <div className="service-carousel-card-bg absolute inset-0 z-0">
                                          <PdfCover file={work.coverPdf} fit={i === 2 ? 'contain' : 'cover'} />
                                        </div>
                                      ) : (
                                        <div
                                          className={`service-carousel-card-bg absolute inset-0 z-0 bg-center ${
                                            i === 2 ? 'bg-contain bg-no-repeat' : 'bg-cover'
                                          }`}
                                          style={{ backgroundImage: `url(${work.image})` }}
                                        />
                                      )}
                                      {!work.logo && i !== 2 && (
                                        <>
                                          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none transition-opacity duration-300 group-hover/project:opacity-90" />
                                          <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full glass flex items-center justify-center text-white/60 opacity-0 transition-all duration-300 group-hover/project:opacity-100 group-hover/project:text-white">
                                            <ArrowUpRight size={14} />
                                          </div>
                                          <span className="relative z-20 font-dm text-[11px] uppercase tracking-[0.16em] text-white/55 transition-colors duration-300 group-hover/project:text-white/70">
                                            {work.category}
                                          </span>
                                          <strong className="relative z-20 font-geist text-sm text-white mt-1 leading-tight transition-transform duration-300 group-hover/project:translate-x-1">
                                            {work.title}
                                          </strong>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="glass-card flex aspect-square items-center justify-center rounded-[18px] px-5 text-center sm:rounded-[22px] lg:rounded-[26px]">
                                <span className="font-dm text-sm text-white/35">
                                  Adicione subpastas com capa.png e config.txt em public/servicos para criar cards.
                                </span>
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => scrollWorks(i, 1)}
                            aria-label="Ver mais trabalhos"
                            className="flex h-10 w-8 shrink-0 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/[0.05] hover:text-white"
                          >
                            <ArrowRight size={17} strokeWidth={1.6} />
                          </button>
                        </div>

                        <p className="pb-6 pr-8 font-dm text-[16px] leading-relaxed text-white/50">
                          {service.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalService && modalWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[80] bg-[#0c0b0b]/70 backdrop-blur-sm overflow-hidden md:py-8"
            onClick={() => {
              setSelectedPdf(null)
              setSelectedProject(null)
            }}
          >
            <div className="mx-auto flex h-full max-w-[1520px] items-center px-0 md:px-10">
              <motion.div
                initial={{ y: 18, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 18, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                onClick={(event) => event.stopPropagation()}
                className="glass-panel relative h-full w-full overflow-hidden rounded-none md:h-auto md:max-h-full md:rounded-[30px]"
              >
                <div className="absolute top-0 right-0 w-[360px] h-[260px] bg-[#5700ef]/18 blur-[100px] pointer-events-none" />

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPdf(null)
                    setSelectedProject(null)
                  }}
                  aria-label="Fechar modal"
                  className="absolute right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full glass text-white/75 transition-colors hover:text-white md:right-9 md:top-9 md:h-10 md:w-10"
                >
                  <X size={16} />
                </button>

                {modalWork.modal === 'pdf' ? (
                  <div className="relative z-10 h-full overflow-hidden p-0 md:h-auto md:max-h-[calc(100vh-4rem)] md:p-6">
                    {selectedPdf ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedProject?.serviceIndex === 2) {
                              setSelectedPdf(null)
                              setSelectedProject(null)
                              return
                            }

                            setSelectedPdf(null)
                          }}
                          aria-label="Voltar para a lista de PDFs"
                          className="glass absolute left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full text-white/75 hover:text-white md:left-9 md:top-9 md:h-10 md:w-10"
                        >
                          <ArrowLeft size={18} strokeWidth={1.7} />
                        </button>
                      <div className="grid h-full grid-cols-1 gap-4 pt-0">
                        <PdfPreview file={selectedPdf} />
                      </div>
                      </>
                    ) : (
                      <div className="flex h-full flex-col gap-8 overflow-y-auto px-5 pb-8 pt-20 md:max-h-[calc(100vh-7rem)] md:min-h-[70vh] md:px-0 md:pb-0 md:pt-0 md:pr-1">
                        <div className="max-w-3xl">
                          <span className="font-dm text-xs text-[#5700ef] tracking-[0.22em] uppercase">
                            {modalService.number}. {modalService.title}
                          </span>
                          <h3 className="section-title text-[clamp(2rem,5vw,4.2rem)] text-white mt-4 leading-none">
                            {modalWork.title}
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {modalFiles.length > 0 ? (
                            modalFiles.map((file) => (
                              <PdfChoiceCard
                                key={file.path}
                                file={file}
                                onSelect={() => setSelectedPdf(file)}
                              />
                            ))
                          ) : (
                            <div className="glass-card rounded-xl px-5 py-8">
                              <span className="font-dm text-sm text-white/40">
                                Adicione PDFs nesta pasta para exibir as opcoes.
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative z-10 flex h-full flex-col gap-10 overflow-y-auto px-5 pb-8 pt-20 md:h-auto md:max-h-[calc(100vh-4rem)] md:gap-12 md:p-10 lg:p-12">
                    <div className="flex w-full flex-col gap-8">
                      <div>
                        <span className="font-dm text-xs text-[#5700ef] tracking-[0.22em] uppercase">
                          {modalService.number}. {modalService.title}
                        </span>
                        <h3 className="section-title text-[clamp(2rem,5vw,4.2rem)] text-white mt-4 leading-none">
                          {modalWork.title}
                        </h3>
                        <p className="mt-6 w-full max-w-6xl font-dm text-[16px] leading-relaxed text-white/55 md:text-[18px]">
                          {modalWork.description ??
                            `Projeto de ${modalWork.category.toLowerCase()} criado para apresentar a direção visual,
                            organizar aplicações e transformar a ideia em uma experiência clara, consistente e memorável.`}
                        </p>
                      </div>

                      {selectedProject && selectedProject.serviceIndex <= 1 ? (
                        <div className="grid w-full grid-cols-3 gap-2 sm:gap-4">
                          {activeCaseSections.map((section, sectionIndex) => (
                            <button
                              key={section.title}
                              type="button"
                              onClick={() => setActiveProductSection(sectionIndex)}
                              aria-pressed={activeProductSection === sectionIndex}
                              className={`relative min-h-20 overflow-hidden rounded-b-[14px] border-t px-3 py-4 text-left transition-all duration-300 sm:min-h-24 sm:px-5 sm:py-5 ${
                                activeProductSection === sectionIndex
                                  ? 'border-[#7c3cff]/80 bg-[#5700ef]/15 shadow-[inset_0_1px_0_rgba(151,92,255,0.2),inset_0_0_34px_rgba(87,0,239,0.1)]'
                                  : 'border-white/35 hover:border-white/70 hover:bg-gradient-to-b hover:from-white/[0.025] hover:to-transparent'
                              }`}
                            >
                              <span
                                className={`font-dm text-[9px] font-medium uppercase tracking-[0.12em] transition-colors sm:text-xs sm:tracking-[0.16em] ${
                                  activeProductSection === sectionIndex
                                    ? 'text-white/95'
                                    : 'text-white/35'
                                }`}
                              >
                                {section.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="grid w-full grid-cols-3 gap-3">
                          {['Conceito', modalWork.category, 'Aplicações'].map((item) => (
                            <div key={item} className="border-t border-white/12 pt-3">
                              <span className="font-dm text-xs uppercase tracking-[0.14em] text-white/35">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className={selectedProject && selectedProject.serviceIndex <= 1 ? 'flex flex-col gap-14' : 'grid grid-cols-1 gap-4 sm:grid-cols-2'}>
                      {selectedProject && selectedProject.serviceIndex <= 1 && activeCaseSections.length > 0
                        ? (
                          <AnimatePresence mode="wait">
                            <motion.section
                              key={activeCaseSections[activeProductSection].title}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.22, ease: 'easeOut' }}
                            >
                              <p className="mb-7 max-w-4xl font-dm text-sm leading-relaxed text-white/48 md:text-base">
                                {activeCaseSections[activeProductSection].description}
                              </p>
                              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {activeCaseSections[activeProductSection].files.map((file) =>
                                  renderProjectFile(file, modalFiles.indexOf(file)),
                                )}
                              </div>
                            </motion.section>
                          </AnimatePresence>
                        )
                        : modalFiles.length > 0
                          ? modalFiles.map((file, fileIndex) => renderProjectFile(file, fileIndex))
                        : modalWork.image
                          ? (
                            <div
                              className="sm:col-span-2 aspect-[16/10] rounded-2xl overflow-hidden relative border border-white/10 bg-cover bg-top"
                              style={{ backgroundImage: `url(${modalWork.image})` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            </div>
                          )
                        : relatedWorks.slice(0, 2).map((work) => (
                            <div
                              key={work.title}
                              className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-white/10 bg-cover bg-center"
                              style={{ backgroundImage: `url(${work.image})` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                              <div className="absolute left-4 bottom-4 right-4">
                                <span className="font-dm text-[10px] uppercase tracking-[0.16em] text-white/50">
                                  {work.category}
                                </span>
                                <p className="font-geist font-bold text-white text-sm mt-1">
                                  {work.title}
                                </p>
                              </div>
                            </div>
                          ))}

                      <a
                        href={modalWork.url ?? '#projects'}
                        target={modalWork.url ? '_blank' : undefined}
                        rel={modalWork.url ? 'noreferrer' : undefined}
                        onClick={() => {
                          if (!modalWork.url) setSelectedProject(null)
                        }}
                        className="sm:col-span-2 font-dm text-sm text-white/60 hover:text-white transition-colors flex items-center justify-end gap-1.5"
                      >
                        {modalWork.url ? 'Visitar projeto publicado' : 'Ver projetos relacionados'}
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/92 p-3 backdrop-blur-xl sm:p-8"
            onClick={() => setExpandedImage(null)}
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              src={expandedImage.src}
              alt={expandedImage.alt}
              className="max-h-[94vh] max-w-[96vw] rounded-xl object-contain shadow-[0_30px_100px_rgba(0,0,0,0.8)] sm:rounded-2xl"
              onClick={(event) => event.stopPropagation()}
            />
            <button
              type="button"
              aria-label="Fechar imagem ampliada"
              onClick={() => setExpandedImage(null)}
              className="glass absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-white/75 transition-colors hover:text-white sm:right-8 sm:top-8"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
