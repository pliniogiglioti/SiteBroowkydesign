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
      'O design de produtos combina criatividade e funcionalidade, transformando ideias em soluções tangíveis que são fáceis de usar, visualmente atraentes e criadas para melhorar as experiências do dia a dia de forma significativa.',
  },
  {
    number: '02',
    title: 'UI/UX Design',
    description:
      'Criamos interfaces intuitivas e experiências digitais que colocam o usuário no centro. Cada tela é pensada para guiar, engajar e converter, unindo estética e usabilidade em harmonia perfeita.',
  },
  {
    number: '03',
    title: 'Identidade Visual',
    description:
      'Construímos marcas que comunicam, conectam e ficam na memória. Da paleta de cores à tipografia, cada elemento é escolhido com intenção para criar uma identidade coesa e poderosa.',
  },
  {
    number: '04',
    title: 'Catálogos',
    description:
      'Desenvolvemos catálogos impressos e digitais que apresentam seus produtos e serviços com elegância. Design editorial que equilibra informação e estética para encantar e converter.',
  },
]

function PdfPreview({ file }: { file: ProjectFile }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Carregando PDF...')

  useEffect(() => {
    let cancelled = false
    let renderTask: RenderTask | null = null
    let loadingTask: PDFDocumentLoadingTask | null = null
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
            const availableWidth = isVerticalPdf
              ? (containerWidth - pageGap) / 2
              : containerWidth
            const scale = Math.min(availableWidth / baseViewport.width, 1.65)
            const viewport = page.getViewport({ scale })
            const outputScale = window.devicePixelRatio || 1
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')

            if (!context) continue

            canvas.width = Math.floor(viewport.width * outputScale)
            canvas.height = Math.floor(viewport.height * outputScale)
            canvas.style.width = `${viewport.width}px`
            canvas.style.height = `${viewport.height}px`
            canvas.className = 'max-w-full rounded-xl bg-white'

            const pageWrapper = document.createElement('div')
            pageWrapper.className = 'flex justify-center'
            pageWrapper.appendChild(canvas)
            spreadWrapper.appendChild(pageWrapper)

            renderTask = page.render({
              canvas,
              canvasContext: context,
              viewport,
              transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined,
            })

            await renderTask.promise
            renderTask = null
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
      renderTask?.cancel()
      loadingTask?.destroy()
      container.innerHTML = ''
    }
  }, [file.path])

  return (
    <div className="h-full sm:col-span-2 overflow-hidden rounded-none border-0 bg-black/20 md:rounded-2xl md:border md:border-white/10">
      <div className="h-full min-h-0 overflow-y-auto px-2 pb-4 pt-16 md:h-[78vh] md:min-h-[520px] md:px-4 md:py-4">
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

    setSelectedPdf(serviceIndex === 2 ? project.files.find((file) => file.type === 'pdf') ?? null : null)
    setSelectedProject({ serviceIndex, workIndex })
  }

  const renderProjectFile = (file: ProjectFile) => {
    if (file.type === 'pdf') {
      return <PdfPreview key={file.path} file={file} />
    }

    if (file.type === 'image') {
      return (
        <img
          key={file.path}
          src={file.path}
          alt={file.name}
          className="aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover"
        />
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
    <section id="services" ref={ref} className="py-12 md:py-20 bg-[#0c0b0b] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#5700ef]/6 blur-[120px] pointer-events-none" />

      <div className="max-w-[1520px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">

          {/* Left: title + description + cta */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-title text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight max-w-md"
            >
              SERVIÇOS CRIATIVOS<br />QUE ESTIMULAM O CRESCIMENTO
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-dm text-[16px] text-white/45 leading-relaxed max-w-sm"
            >
              Gabriel Teixeira — designer apaixonado, baseado no Brasil, com um olhar apurado
              para estética e uma obsessão saudável por criatividade. Não me contento apenas em
              criar coisas bonitas; quero que cada projeto conte uma história, resolva um problema
              real e deixe uma impressão final, cada detalhe fruto das minhas experiências visuais
              que movem pessoas — esse é a contribuição do meu trabalho.
            </motion.p>

            <motion.a
              href="#projects"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="font-dm text-sm text-white/60 hover:text-white flex items-center gap-1.5 w-fit transition-colors duration-200 border-b border-white/20 pb-0.5"
            >
              Ver projeto
              <span>→</span>
            </motion.a>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col">
            {/* Small intro text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-dm text-[16px] text-white/35 leading-relaxed mb-6"
            >
              Criamos designs bem pensados e inovadores que transformam visões em realidades
              significativas, combinando criatividade e estratégia para inspirar, envolver e
              causar impacto.
            </motion.p>

            {/* Accordion */}
            <div className="flex flex-col">
              {services.map((service, i) => (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
                  className="border-b border-white/8"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-dm text-xs text-[#5700ef] tracking-widest">
                        {service.number}.
                      </span>
                      <span
                        className={`font-geist font-bold text-base transition-colors duration-200 ${
                          openIndex === i ? 'text-white' : 'text-white/60 group-hover:text-white'
                        }`}
                      >
                        {service.title}
                      </span>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        openIndex === i
                          ? 'bg-[#5700ef] text-white'
                          : 'glass text-white/40 group-hover:text-white'
                      }`}
                    >
                      {openIndex === i ? <Minus size={13} /> : <Plus size={13} />}
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
                        <p className="font-dm text-[16px] text-white/50 leading-relaxed pb-5 pr-8">
                          {service.description}
                        </p>

                        <div className="flex items-center gap-2 sm:gap-3 pb-6">
                          <button
                            type="button"
                            onClick={() => scrollWorks(i, -1)}
                            aria-label="Ver trabalhos anteriores"
                            className="w-7 h-10 flex items-center justify-center text-white/35 hover:text-white transition-colors shrink-0"
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
                                      className={`service-carousel-card glass-card w-full rounded-xl p-4 flex flex-col justify-end overflow-hidden relative bg-[#111] text-left group/project ${
                                        i === 2 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                                      }`}
                                    >
                                      {work.coverPdf ? (
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
                                      {i !== 2 && (
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
                              <div className="glass-card aspect-[4/3] rounded-xl flex items-center justify-center px-5 text-center">
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
                            className="w-7 h-10 flex items-center justify-center text-white/35 hover:text-white transition-colors shrink-0"
                          >
                            <ArrowRight size={17} strokeWidth={1.6} />
                          </button>
                        </div>
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
                className="relative h-full w-full overflow-hidden rounded-none md:h-auto md:max-h-full md:rounded-[30px]"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                }}
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
                          className="absolute left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full text-white/75 hover:text-white md:left-9 md:top-9 md:h-10 md:w-10"
                          style={{
                            background: 'rgba(12, 11, 11, 0.48)',
                            backdropFilter: 'blur(18px)',
                            WebkitBackdropFilter: 'blur(18px)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                          }}
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
                  <div className="relative z-10 grid h-full grid-cols-1 gap-8 overflow-y-auto px-5 pb-8 pt-20 md:h-auto md:max-h-[calc(100vh-4rem)] md:gap-12 md:p-10 lg:grid-cols-[0.82fr_1.18fr] lg:p-12">
                    <div className="flex flex-col justify-between gap-8 lg:sticky lg:top-0 lg:self-start">
                      <div>
                        <span className="font-dm text-xs text-[#5700ef] tracking-[0.22em] uppercase">
                          {modalService.number}. {modalService.title}
                        </span>
                        <h3 className="section-title text-[clamp(2rem,5vw,4.2rem)] text-white mt-4 leading-none">
                          {modalWork.title}
                        </h3>
                        <p className="font-dm text-[16px] text-white/55 leading-relaxed max-w-xl mt-6">
                          Projeto de {modalWork.category.toLowerCase()} criado para apresentar a direcao visual,
                          organizar aplicacoes e transformar a ideia em uma experiencia clara, consistente e memoravel.
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-3 max-w-xl">
                        {['Conceito', modalWork.category, 'Aplicacoes'].map((item) => (
                          <div key={item} className="border-t border-white/12 pt-3">
                            <span className="font-dm text-xs text-white/35 uppercase tracking-[0.14em]">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {modalFiles.length > 0
                        ? modalFiles.map(renderProjectFile)
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
                        href="#projects"
                        onClick={() => setSelectedProject(null)}
                        className="sm:col-span-2 font-dm text-sm text-white/60 hover:text-white transition-colors flex items-center justify-end gap-1.5"
                      >
                        Ver projetos relacionados
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
    </section>
  )
}
