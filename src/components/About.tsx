import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef } from 'react'

const tools = [
  { name: 'Figma', color: '#F24E1E', icon: 'Fg' },
  { name: 'Photoshop', color: '#31A8FF', icon: 'Ps' },
  { name: 'Illustrator', color: '#FF9A00', icon: 'Ai' },
  { name: 'InDesign', color: '#FF3366', icon: 'Id' },
  { name: 'Dimension', color: '#00C8FF', icon: 'Dn' },
  { name: 'Lightroom', color: '#31A8FF', icon: 'Lr' },
  { name: 'Premiere Pro', color: '#9999FF', icon: 'Pr' },
  { name: 'After Effects', color: '#9999FF', icon: 'Ae' },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-24 bg-[#0c0b0b] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#5700ef]/8 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="flex flex-col gap-8">
            {/* Label */}
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-dm text-xs text-[#5700ef] tracking-[0.2em] uppercase"
            >
              Softwares de trabalho
            </motion.span>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="section-title text-[clamp(1.8rem,4vw,3rem)] text-white leading-tight"
            >
              Transformo ideias em sistemas visuais vivos
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-dm text-sm text-white/50 leading-relaxed"
            >
              Da essência da marca à experiência digital. Navego entre identidade e interface, construindo cada detalhe com ferramentas como Figma, Photoshop, Illustrator, InDesign, Dimension, Lightroom, Premiere Pro e After Effects. Do primeiro insight ao acabamento final, cada projeto nasce com propósito e ganha forma com precisão.
            </motion.p>

            {/* Tools grid */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-4 gap-3"
            >
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                  className="glass-card rounded-xl p-3 flex flex-col items-center gap-1.5 cursor-default"
                  title={tool.name}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-geist font-bold text-sm text-white"
                    style={{ backgroundColor: tool.color + '22', border: `1px solid ${tool.color}44` }}
                  >
                    <span style={{ color: tool.color }}>{tool.icon}</span>
                  </div>
                  <span className="font-dm text-[10px] text-white/40 text-center leading-tight">{tool.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glass border border-white/8 aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=750&fit=crop"
                alt="Design workspace"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0b]/80 via-[#0c0b0b]/20 to-transparent" />

              {/* Overlay text */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-geist font-bold text-white text-lg leading-tight">
                  Designer apaixonado,
                  <br />
                  baseado no Brasil
                </p>
                <p className="font-dm text-xs text-white/50 mt-2">
                  Com um olhar apurado para estética e uma obsessão saudável por criatividade.
                </p>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-[#5700ef]/30 blur-sm" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-[#5700ef]/20 blur-md" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
