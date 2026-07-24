import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

function VectorNodesIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <path d="M6 8h6M20 8h6" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
      <circle cx="5" cy="8" r="2.8" fill="currentColor" />
      <circle cx="27" cy="8" r="2.8" fill="currentColor" />
      <rect x="11" y="5" width="10" height="6" rx="2.7" fill="currentColor" />
      <path d="M16 11v2.5M8 23v-3.2c0-4.1 2.5-6.3 8-6.3s8 2.2 8 6.3V23" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
      <rect x="5" y="21" width="7" height="8" rx="2.3" fill="currentColor" />
      <rect x="20" y="21" width="7" height="8" rx="2.3" fill="currentColor" />
    </svg>
  )
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <rect x="6" y="7" width="20" height="22" rx="5" fill="currentColor" />
      <rect x="10" y="3" width="12" height="7" rx="3" fill="#0c0b0b" stroke="currentColor" strokeWidth="2" />
      <path d="M11 17h10M11 22h8" stroke="#0c0b0b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function BrandToolsIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <rect x="4.5" y="3" width="10" height="26" rx="4.5" fill="currentColor" />
      <circle cx="9.5" cy="24.2" r="2.1" fill="#0c0b0b" />
      <path
        d="M17 9.3c0-1.1.43-2.16 1.2-2.94l1.25-1.26a4.15 4.15 0 0 1 5.87 0l2.57 2.58a4.15 4.15 0 0 1 0 5.87l-7.36 7.38c-1.3 1.3-3.53.38-3.53-1.47V9.3Z"
        fill="currentColor"
      />
      <path
        d="m18.14 25.45 7.31-7.32c1.3-1.3 3.52-.38 3.52 1.46v5.26A4.15 4.15 0 0 1 24.82 29h-5.21c-1.85 0-2.78-2.24-1.47-3.55Z"
        fill="currentColor"
      />
    </svg>
  )
}

function AnimatedNumber({ value, isInView, delay }: { value: number; isInView: boolean; delay: number }) {
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 })
  const display = useTransform(spring, (current) => `+${Math.round(current)}`)

  useEffect(() => {
    if (!isInView) return

    const timer = window.setTimeout(() => motionValue.set(value), delay * 1000)
    return () => window.clearTimeout(timer)
  }, [isInView, value, delay, motionValue])

  return <motion.span>{display}</motion.span>
}

const stats = [
  {
    value: 20,
    description:
      'Soluções de design claras e eficazes que ajudam marcas a se destacar e alcançar novos resultados.',
    icon: VectorNodesIcon,
  },
  {
    value: 12,
    description:
      'Interfaces intuitivas, acessíveis e construídas para tornar cada interação mais simples.',
    icon: ClipboardIcon,
  },
  {
    value: 18,
    description:
      'Projetos desenvolvidos em parceria, com processos transparentes e experiências memoráveis.',
    icon: BrandToolsIcon,
  },
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0c0b0b] py-16 md:py-24">
      <div className="site-container mx-auto max-w-[1600px] px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-5 text-center font-dm text-[12px] font-medium uppercase tracking-[0.24em] text-[#7b2fff]"
        >
          Do conceito à criação
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.7 }}
          className="section-title mx-auto max-w-[1120px] text-center text-[clamp(2.5rem,4.6vw,4.8rem)] leading-[1.02] text-white"
        >
          Transformo visões em experiências que conectam.
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-16 xl:mt-20 xl:grid-cols-[0.86fr_1.14fr_0.9fr]">
          <div className="flex flex-col justify-between gap-9 py-1 xl:min-h-[560px]">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, x: -28 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.12 + index * 0.12, duration: 0.6 }}
                className="grid grid-cols-[1fr_auto] gap-6 border-b border-white/10 pb-8 last:border-0 last:pb-0"
              >
                <div>
                  <span className="font-geist text-[clamp(2.5rem,4vw,3.8rem)] font-medium leading-none text-white">
                    <AnimatedNumber value={stat.value} isInView={isInView} delay={0.2 + index * 0.12} />
                  </span>
                  <p className="mt-5 max-w-[360px] font-dm text-[15px] leading-relaxed text-white/[0.48]">
                    {stat.description}
                  </p>
                </div>

                <div className="glass-icon flex h-[62px] w-[62px] items-center justify-center rounded-full text-white">
                  <stat.icon />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.7 }}
            className="glass-panel min-h-[360px] overflow-hidden rounded-[20px] sm:min-h-[420px] sm:rounded-[24px] xl:min-h-[560px] xl:rounded-[30px]"
            aria-label="Espaço reservado para conteúdo futuro"
          >
            <div className="h-full bg-gradient-to-br from-white/[0.035] via-transparent to-[#5700ef]/[0.035]" />
          </motion.div>

          <div className="flex flex-col gap-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.24, duration: 0.6 }}
              className="font-dm text-[16px] leading-relaxed text-white/55"
            >
              Do conceito à criação, transformo visões em experiências que inspiram, conectam e
              permanecem. Cada escolha une estética e estratégia para fortalecer marcas e dar
              espaço a histórias que merecem ser lembradas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="glass-panel min-h-[330px] flex-1 overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-[30px]"
              aria-label="Segundo espaço reservado para conteúdo futuro"
            >
              <div className="h-full bg-gradient-to-br from-white/[0.035] via-transparent to-[#5700ef]/[0.035]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
