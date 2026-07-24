import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Boots Horse',
    description:
      'Plataforma institucional e comercial para o universo equestre, focada na apresentação de produtos e na captação de revendedores.',
  },
  {
    id: 2,
    title: 'Gepam',
    description:
      'Plataforma de consultoria para gestão pública, com orientação técnica e suporte especializado para órgãos municipais.',
  },
  {
    id: 3,
    title: 'Real Estate Website',
    description:
      'Experiência digital para apresentar imóveis com clareza, navegação intuitiva e uma comunicação visual envolvente.',
  },
  {
    id: 4,
    title: 'CRM Dashboard',
    description:
      'Painel inteligente para organizar informações, acompanhar resultados e tornar decisões complexas mais simples.',
  },
  {
    id: 5,
    title: 'Boots Horse',
    description:
      'Plataforma institucional e comercial para o universo equestre, focada na apresentação de produtos e na captação de revendedores.',
  },
  {
    id: 6,
    title: 'Gepam',
    description:
      'Plataforma de consultoria para gestão pública, com orientação técnica e suporte especializado para órgãos municipais.',
  },
  {
    id: 7,
    title: 'Real Estate Website',
    description:
      'Experiência digital para apresentar imóveis com clareza, navegação intuitiva e uma comunicação visual envolvente.',
  },
  {
    id: 8,
    title: 'CRM Dashboard',
    description:
      'Painel inteligente para organizar informações, acompanhar resultados e tornar decisões complexas mais simples.',
  },
]

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.05 + index * 0.06, duration: 0.6, ease: 'easeOut' }}
      className="group"
    >
      <div
        className="glass-panel relative aspect-square overflow-hidden rounded-[20px] transition-all duration-500 group-hover:border-[#5700ef]/50 group-hover:shadow-[0_24px_70px_rgba(87,0,239,0.16)] sm:rounded-[24px] lg:rounded-[30px]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-black/10" />
        <div className="glass-icon absolute bottom-5 right-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full text-white/70 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="mt-4 font-geist text-[21px] font-semibold leading-tight text-white">
        {project.title}
      </h3>
      <p className="mt-2 font-dm text-[14px] leading-relaxed text-white/45">
        {project.description}
      </p>
    </motion.article>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="relative overflow-hidden bg-[#0c0b0b] py-14 md:py-20">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-9 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_440px] lg:items-start">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-title max-w-[760px] text-[clamp(2.25rem,3.7vw,3.75rem)] uppercase leading-[1.13] text-white"
          >
            Design que transforma
            <br />
            ideias em realidade
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.14, duration: 0.65 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Projetos anteriores"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/55 text-white transition-colors hover:border-white"
              >
                <ArrowLeft size={19} strokeWidth={1.4} />
              </button>
              <span className="h-px min-w-10 flex-1 bg-white/35" />
              <button
                type="button"
                aria-label="Próximos projetos"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/55 text-white transition-colors hover:border-white"
              >
                <ArrowRight size={19} strokeWidth={1.4} />
              </button>
              <a
                href="#projects"
                className="ml-8 whitespace-nowrap font-dm text-[16px] text-white transition-colors hover:text-white/70"
              >
                Ver tudo
              </a>
            </div>

            <p className="font-dm text-[16px] leading-relaxed text-white/55">
              Criamos designs bem pensados e inovadores que transformam visões em realidades
              significativas, combinando criatividade e estratégia para inspirar, envolver e causar impacto.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
