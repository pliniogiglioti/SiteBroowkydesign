import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Boots Horse',
    description:
      'Plataforma institucional e comercial voltada ao universo equestre, com foco na apresentação de produtos e captação de revendedores.',
  },
  {
    id: 2,
    title: 'Gepam',
    description:
      'Plataforma institucional de consultoria para gestão pública, com foco em orientação técnica e suporte especializado para órgãos municipais.',
  },
  {
    id: 3,
    title: 'Real Estate Website',
    description:
      'A modern platform showcasing AI solutions with clear visuals, engaging content, and an easy-to-use design.',
  },
  {
    id: 4,
    title: 'CRM Dashboard',
    description:
      'A modern platform showcasing AI solutions with clear visuals, engaging content, and an easy-to-use design.',
  },
  {
    id: 5,
    title: 'Boots Horse',
    description:
      'Plataforma institucional e comercial voltada ao universo equestre, com foco na apresentação de produtos e captação de revendedores.',
  },
  {
    id: 6,
    title: 'Gepam',
    description:
      'Plataforma institucional de consultoria para gestão pública, com foco em orientação técnica e suporte especializado para órgãos municipais.',
  },
  {
    id: 7,
    title: 'Real Estate Website',
    description:
      'A modern platform showcasing AI solutions with clear visuals, engaging content, and an easy-to-use design.',
  },
  {
    id: 8,
    title: 'CRM Dashboard',
    description:
      'A modern platform showcasing AI solutions with clear visuals, engaging content, and an easy-to-use design.',
  },
]

function ProjectCard({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.05 + index * 0.07, duration: 0.6, ease: 'easeOut' }}
      className="group cursor-pointer"
    >
      {/* Image placeholder */}
      <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-white/4 border border-white/6 mb-3 group-hover:border-[#5700ef]/30 transition-colors duration-300">
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 rounded-full bg-[#5700ef] flex items-center justify-center">
            <ArrowUpRight size={16} className="text-white" />
          </div>
        </div>
      </div>

      {/* Text */}
      <h3 className="font-geist font-bold text-white text-sm mb-1">{project.title}</h3>
      <p className="font-dm text-xs text-white/40 leading-relaxed line-clamp-2">{project.description}</p>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="py-20 bg-[#0c0b0b] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-[#5700ef]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1520px] mx-auto px-10">

        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-title text-[clamp(1.8rem,4vw,3.5rem)] text-white leading-tight max-w-sm"
          >
            DESIGN QUE TRANSFORMA IDEIAS EM REALIDADE
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-3 shrink-0 pt-2"
          >
            <a href="#" className="font-dm text-xs text-white/50 hover:text-white flex items-center gap-1 transition-colors">
              Ver tudo <ArrowUpRight size={12} />
            </a>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-dm text-sm text-white/40 max-w-md leading-relaxed mb-10"
        >
          Criamos designs bem pensados e inovadores que transformam visões em realidades
          significativas, combinando criatividade e estratégia para inspirar, envolver e causar impacto.
        </motion.p>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
