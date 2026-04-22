import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface StatProps {
  value: number
  label: string
  description: string
  delay: number
  isInView: boolean
}

function AnimatedNumber({ value, isInView, delay }: { value: number; isInView: boolean; delay: number }) {
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 })
  const display = useTransform(spring, (v) => `+${Math.round(v)}`)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (isInView) {
      setTimeout(() => motionValue.set(value), delay * 1000)
    }
  }, [isInView, value, delay, motionValue])

  return <motion.span ref={ref}>{display}</motion.span>
}

function StatCard({ value, label, description, delay, isInView }: StatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="glass-card rounded-2xl p-6 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <span className="font-geist font-bold text-4xl text-white">
          <AnimatedNumber value={value} isInView={isInView} delay={delay} />
        </span>
        <div className="w-8 h-8 rounded-full bg-[#5700ef]/20 border border-[#5700ef]/30 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#5700ef]" />
        </div>
      </div>
      <div>
        <p className="font-geist font-bold text-sm text-white/90">{label}</p>
        <p className="font-dm text-xs text-white/40 mt-1 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
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
    <section ref={ref} className="py-24 bg-[#0c0b0b] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#5700ef]/6 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="font-dm text-xs text-[#5700ef] tracking-[0.2em] uppercase mb-4"
          >
            Números que falam
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="section-title text-[clamp(1.8rem,4vw,3.5rem)] text-white max-w-2xl leading-tight"
          >
            Do conceito à criação, transformo visões em realidade com um design que é
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              {...stat}
              delay={0.2 + i * 0.15}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="font-dm text-sm text-white/40 mt-12 max-w-2xl leading-relaxed"
        >
          Do conceito à criação, transformo visões em realidade com um design criado para inspirar, conectar e deixar uma impressão duradoura, permitindo que as marcas cresçam e que as histórias realmente brilhem.
        </motion.p>
      </div>
    </section>
  )
}
