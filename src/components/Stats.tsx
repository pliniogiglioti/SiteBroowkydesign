import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

function AnimatedNumber({ value, isInView, delay }: { value: number; isInView: boolean; delay: number }) {
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 })
  const display = useTransform(spring, (v) => `+${Math.round(v)}`)

  useEffect(() => {
    if (isInView) setTimeout(() => motionValue.set(value), delay * 1000)
  }, [isInView, value, delay, motionValue])

  return <motion.span>{display}</motion.span>
}

const stats = [
  {
    value: 320,
    label: 'Projetos Entregues',
    description: 'Soluções de design simples e eficazes que ajudam as marcas a se destacarem e a alcançarem o sucesso.',
  },
  {
    value: 280,
    label: 'Interfaces Criadas',
    description: 'Criamos interfaces fáceis de usar, com navegação intuitiva e projetadas pensando nas pessoas.',
  },
  {
    value: 420,
    label: 'Clientes Satisfeitos',
    description: 'Criamos projetos fáceis de gerenciar, de execução tranquila e pensados para as pessoas.',
  },
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 bg-[#0c0b0b] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#5700ef]/6 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: stats vertical list */}
          <div className="flex flex-col gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
                className="flex items-start gap-5 border-b border-white/5 pb-8 last:border-0 last:pb-0"
              >
                {/* Number */}
                <span className="font-geist font-black text-[clamp(2.5rem,5vw,4rem)] text-white leading-none shrink-0">
                  <AnimatedNumber value={stat.value} isInView={isInView} delay={0.2 + i * 0.12} />
                </span>

                {/* Icon + texts */}
                <div className="flex flex-col gap-1 pt-2">
                  <div className="w-6 h-6 rounded-full bg-[#5700ef]/20 border border-[#5700ef]/40 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5700ef]" />
                  </div>
                  <p className="font-geist font-bold text-sm text-white/80 mt-1">{stat.label}</p>
                  <p className="font-dm text-xs text-white/40 leading-relaxed max-w-[220px]">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: large title + description */}
          <div className="flex flex-col gap-6 lg:pt-2">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="section-title text-[clamp(1.8rem,3.5vw,3rem)] text-white leading-tight"
            >
              DO CONCEITO À CRIAÇÃO, TRANSFORMO VISÕES EM REALIDADE COM UM DESIGN QUE É
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="font-dm text-sm text-white/40 leading-relaxed"
            >
              Do conceito à criação, transformo visões em realidade com um design criado para
              inspirar, conectar e deixar uma impressão duradoura, permitindo que as marcas
              cresçam e que as histórias realmente brilhem.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
