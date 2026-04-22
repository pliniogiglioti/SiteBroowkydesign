import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={ref} className="py-20 bg-[#0c0b0b] relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative rounded-3xl overflow-hidden py-20 px-8"
          style={{
            background: 'linear-gradient(135deg, #4400c8 0%, #5700ef 40%, #7b2fff 100%)',
          }}
        >
          {/* Left blob decoration */}
          <div
            className="absolute -left-16 top-1/2 -translate-y-1/2 w-72 h-72 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(100,0,255,0.5) 0%, rgba(60,0,180,0.7) 60%, transparent 100%)',
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            }}
          />

          {/* Right blob decoration */}
          <div
            className="absolute -right-16 top-1/2 -translate-y-1/2 w-72 h-72 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(100,0,255,0.5) 0%, rgba(60,0,180,0.7) 60%, transparent 100%)',
              borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%',
            }}
          />

          {/* Subtle noise */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="section-title text-[clamp(2rem,5vw,4rem)] text-white leading-tight max-w-xl"
            >
              Vamos criar algo divertido e inovador!
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
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
                className="flex items-center gap-2 border border-white/40 text-white font-dm text-sm px-7 py-3.5 rounded-full hover:bg-white/10 transition-all duration-300"
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
