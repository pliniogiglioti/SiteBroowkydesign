import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={ref} className="py-24 bg-[#0c0b0b] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #5700ef 0%, #3d00a8 50%, #1a0060 100%)',
          }}
        >
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Glow orbs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/10 blur-[80px]" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-[#7b2fff]/40 blur-[60px]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center py-20 px-8">
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
              className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-8"
            >
              <Sparkles size={24} className="text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="section-title text-[clamp(2rem,5vw,4rem)] text-white leading-tight max-w-2xl"
            >
              Vamos criar algo divertido e inovador!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-dm text-sm text-white/60 mt-4 max-w-md leading-relaxed"
            >
              Transformo suas ideias em experiências visuais que movem pessoas. Vamos conversar sobre o seu próximo projeto.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-4 mt-10 flex-wrap justify-center"
            >
              <a
                href="mailto:gabriel@example.com"
                className="flex items-center gap-2 bg-white text-[#5700ef] font-dm font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg"
              >
                Comece agora
                <ArrowRight size={16} />
              </a>
              <a
                href="#projects"
                className="flex items-center gap-2 border border-white/30 text-white font-dm text-sm px-7 py-3.5 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Saiba mais
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
