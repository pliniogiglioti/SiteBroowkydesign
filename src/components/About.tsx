import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const tools = [
  { name: 'Figma',        color: '#F24E1E', icon: 'Fg' },
  { name: 'Photoshop',    color: '#31A8FF', icon: 'Ps' },
  { name: 'Illustrator',  color: '#FF9A00', icon: 'Ai' },
  { name: 'InDesign',     color: '#FF3366', icon: 'Id' },
  { name: 'Dimension',    color: '#00C8FF', icon: 'Ds' },
  { name: 'Lightroom',    color: '#31A8FF', icon: 'Lr' },
  { name: 'Premiere Pro', color: '#9999FF', icon: 'Pr' },
  { name: 'After Effects',color: '#9999FF', icon: 'Ae' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-20 bg-[#0c0b0b] relative overflow-hidden">
      <div className="max-w-[1520px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: title + description */}
          <div className="flex flex-col gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-title text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight"
            >
              SOFTWARES DE TRABALHO
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-geist font-normal text-[16px] text-white/50 leading-relaxed max-w-md"
            >
              Transformo ideias em sistemas visuais vivos — da essência da marca à experiência
              digital. Navego entre identidade e interface, construindo cada detalhe com
              ferramentas como Figma, Photoshop, Illustrator, InDesign, Dimension, Lightroom,
              Premiere Pro e After Effects. Do primeiro insight ao acabamento final, cada projeto
              nasce com propósito e ganha forma com precisão.
            </motion.p>
          </div>

          {/* Right: icons 4×2 grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="glass-card rounded-[8px] p-8"
          >
            <div className="grid grid-cols-4 gap-x-4 gap-y-4">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                  className="w-[104px] h-[104px] rounded-[8px] flex items-center justify-center cursor-default"
                  title={tool.name}
                  style={{
                    backgroundColor: tool.color + '22',
                    border: `1px solid ${tool.color}44`,
                  }}
                >
                  <span
                    className="font-geist font-bold text-4xl"
                    style={{ color: tool.color }}
                  >
                    {tool.icon}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
