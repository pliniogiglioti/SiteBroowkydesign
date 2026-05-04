import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { Rocket, Lock, ClipboardList } from 'lucide-react'

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
    value: 20,
    label: 'Projetos Entregues',
    description: 'Soluções de design simples e eficazes que ajudam as marcas a se destacarem e a alcançarem o sucesso.',
    icon: Rocket,
  },
  {
    value: 12,
    label: 'Interfaces Criadas',
    description: 'Criamos interfaces fáceis de usar, com navegação intuitiva e projetadas pensando nas pessoas.',
    icon: Lock,
  },
  {
    value: 18,
    label: 'Clientes Satisfeitos',
    description: 'Criamos projetos fáceis de gerenciar, de execução tranquila e pensados para as pessoas.',
    icon: ClipboardList,
  },
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-12 md:py-20 bg-[#0c0b0b] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#5700ef]/6 blur-[100px] pointer-events-none" />

      <div className="max-w-[1520px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">

          {/* Left: stats vertical list */}
          <div className="flex flex-col gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
                className="flex flex-col gap-4"
              >
                {/* Number and Icon in horizontal layout */}
                <div className="flex items-center gap-4">
                  <span className="font-geist font-black text-[clamp(2rem,5vw,4rem)] text-white leading-none">
                    <AnimatedNumber value={stat.value} isInView={isInView} delay={0.2 + i * 0.12} />
                  </span>
                  
                  <div className="glass-card rounded-lg p-3 flex items-center justify-center w-[60px] h-[60px]">
                    <stat.icon size={28} className="text-white/60" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Text below */}
                <p className="font-geist font-normal text-[14px] md:text-[16px] text-white/50 leading-relaxed max-w-[400px]">
                  {stat.description}
                </p>
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
              className="font-dm text-[16px] text-white/40 leading-relaxed"
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
