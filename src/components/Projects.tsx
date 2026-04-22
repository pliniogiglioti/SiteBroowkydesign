import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Boots Horse',
    category: 'Branding · Web Design',
    description:
      'Plataforma institucional e comercial voltada ao universo equestre, com foco na apresentação de produtos e captação de revendedores.',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop',
    color: '#8B5E3C',
  },
  {
    id: 2,
    title: 'Gepam',
    category: 'UI/UX · Institucional',
    description:
      'Plataforma institucional de consultoria para gestão pública, com foco em orientação técnica e suporte especializado para órgãos municipais.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    color: '#1a3a5c',
  },
  {
    id: 3,
    title: 'Real Estate Website',
    category: 'Web Design · UI/UX',
    description:
      'A modern platform showcasing AI solutions with clear visuals, engaging content, and an easy-to-use design.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    color: '#2d4a3e',
  },
  {
    id: 4,
    title: 'CRM Dashboard',
    category: 'Product Design · UI',
    description:
      'A modern platform showcasing AI solutions with clear visuals, engaging content, and an easy-to-use design.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    color: '#1a1a3e',
  },
]

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
  isInView: boolean
}

function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.12, duration: 0.7, ease: "easeOut" }}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
        />
        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-20"
          style={{ background: `linear-gradient(135deg, ${project.color}88, transparent)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0b]/80 via-transparent to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-[#5700ef] flex items-center justify-center">
            <ArrowUpRight size={20} className="text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-dm text-xs text-[#5700ef] tracking-wide">{project.category}</span>
            <h3 className="font-geist font-bold text-white text-lg mt-1">{project.title}</h3>
            <p className="font-dm text-xs text-white/40 mt-2 leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>
          <button className="shrink-0 w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-[#5700ef]/50 transition-all duration-300 mt-1">
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="py-24 bg-[#0c0b0b] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-[#5700ef]/6 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-dm text-xs text-[#5700ef] tracking-[0.2em] uppercase mb-4"
            >
              Portfólio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="section-title text-[clamp(1.8rem,4vw,3.5rem)] text-white max-w-lg leading-tight"
            >
              Design que transforma ideias em realidade
            </motion.h2>
          </div>

          <motion.a
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            href="#"
            className="btn-outline flex items-center gap-2 text-xs"
          >
            Ver tudo
            <ArrowUpRight size={14} />
          </motion.a>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-dm text-sm text-white/40 max-w-2xl leading-relaxed mb-12"
        >
          Criamos designs bem pensados e inovadores que transformam visões em realidades significativas, combinando criatividade e estratégia para inspirar, envolver e causar impacto.
        </motion.p>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
