import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const tools = [
  { name: 'Figma',        color: '#ffffff', icon: 'Figma', background: '#171717' },
  { name: 'Photoshop',    color: '#31A8FF', icon: 'Ps',    background: '#00253D' },
  { name: 'Illustrator',  color: '#FF9A00', icon: 'Ai',    background: '#351313' },
  { name: 'InDesign',     color: '#FF3366', icon: 'Id',    background: '#45001F' },
  { name: 'Dimension',    color: '#99E83F', icon: 'Ds',    background: '#173700' },
  { name: 'Lightroom',    color: '#31A8FF', icon: 'Lr',    background: '#00253D' },
  { name: 'Premiere Pro', color: '#9999FF', icon: 'Pr',    background: '#0C0064' },
  { name: 'After Effects',color: '#9999FF', icon: 'Ae',    background: '#0C0064' },
]

function FigmaIcon() {
  return (
    <div className="grid grid-cols-2 w-[40px] h-[60px] md:w-[44px] md:h-[66px]" aria-hidden="true">
      <span className="bg-[#F24E1E] rounded-l-full" />
      <span className="bg-[#FF7262] rounded-r-full" />
      <span className="bg-[#A259FF] rounded-l-full" />
      <span className="bg-[#1ABCFE] rounded-full" />
      <span className="bg-[#0ACF83] rounded-l-full rounded-br-full" />
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-12 md:py-20 bg-[#0c0b0b] relative overflow-hidden">
      <div className="max-w-[1520px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">

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
            className="relative overflow-hidden rounded-[32px] md:rounded-[44px] p-7 md:p-11 flex justify-center bg-white/[0.025] border border-white/[0.12] backdrop-blur-[24px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_55px_rgba(0,0,0,0.28)]"
          >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/[0.045] via-transparent to-black/20" />
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                  className="w-[84px] h-[84px] md:w-[100px] md:h-[100px] rounded-[9px] flex items-center justify-center cursor-default"
                  title={tool.name}
                  style={{
                    backgroundColor: tool.background,
                    border: '1px solid rgba(255,255,255,0.018)',
                  }}
                >
                  {tool.icon === 'Figma' ? (
                    <FigmaIcon />
                  ) : (
                    <span
                      className="font-bold text-[38px] md:text-[46px] tracking-[-0.075em] leading-none"
                      style={{
                        color: tool.color,
                        fontFamily: 'Arial, Helvetica, sans-serif',
                      }}
                    >
                      {tool.icon}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
