import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const tools = [
  { name: 'Figma', icon: 'Figma', background: '#191919', color: '#ffffff' },
  {
    name: 'Adobe Photoshop',
    icon: 'Ps',
    source: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg',
  },
  {
    name: 'Adobe Illustrator',
    icon: 'Ai',
    source: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg',
  },
  {
    name: 'Adobe InDesign',
    icon: 'Id',
    source: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg',
  },
  { name: 'Adobe Dimension', icon: 'Ds', background: '#183900', color: '#99e83f' },
  {
    name: 'Adobe Lightroom',
    icon: 'Lr',
    source: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg',
  },
  {
    name: 'Adobe Premiere Pro',
    icon: 'Pr',
    source: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg',
  },
  {
    name: 'Adobe After Effects',
    icon: 'Ae',
    source: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg',
  },
]

function FigmaIcon() {
  return (
    <svg viewBox="0 0 38 57" className="h-[60px] w-[40px] md:h-[66px] md:w-[44px]" aria-hidden="true">
      <path fill="#F24E1E" d="M9.5 0H19v19H9.5A9.5 9.5 0 0 1 9.5 0Z" />
      <path fill="#FF7262" d="M19 0h9.5a9.5 9.5 0 1 1 0 19H19V0Z" />
      <path fill="#A259FF" d="M9.5 19H19v19H9.5a9.5 9.5 0 1 1 0-19Z" />
      <circle cx="28.5" cy="28.5" r="9.5" fill="#1ABCFE" />
      <path fill="#0ACF83" d="M9.5 38H19v9.5A9.5 9.5 0 1 1 9.5 38Z" />
    </svg>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-[#0c0b0b] py-16 md:py-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:min-h-[410px] lg:grid-cols-[1fr_632px] lg:gap-20">

          {/* Left: title + description */}
          <div className="flex max-w-[820px] flex-col gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-title text-[clamp(2.7rem,4vw,4rem)] uppercase leading-none text-white"
            >
              SOFTWARES DE TRABALHO
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="max-w-[800px] font-geist text-[18px] font-normal leading-[1.45] text-white/50"
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
            className="glass-tools-panel relative flex min-h-[342px] items-center justify-center overflow-hidden rounded-[20px] p-7 sm:rounded-[24px] md:p-[42px] lg:rounded-[30px]"
          >
            <div className="relative grid grid-cols-2 gap-[22px] sm:grid-cols-4 sm:gap-[26px] md:gap-[34px]">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                  className="flex h-[92px] w-[92px] cursor-default items-center justify-center rounded-[9px] md:h-[110px] md:w-[110px]"
                  title={tool.name}
                  style={tool.source ? undefined : {
                    backgroundColor: tool.background,
                    border: '1px solid rgba(255,255,255,0.018)',
                  }}
                >
                  {tool.source ? (
                    <img
                      src={tool.source}
                      alt=""
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  ) : tool.icon === 'Figma' ? (
                    <FigmaIcon />
                  ) : (
                    <span
                      className="text-[42px] font-bold leading-none tracking-[-0.075em] md:text-[54px]"
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
