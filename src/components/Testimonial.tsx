import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function Testimonial() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 bg-[#0c0b0b] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-[#5700ef]/6 blur-[100px] pointer-events-none" />

      <div className="max-w-[1520px] mx-auto px-10">

        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title text-[clamp(1.8rem,4vw,3rem)] text-white leading-tight max-w-lg mb-10"
        >
          Serviços criativos que estimulam o crescimento
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left: quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="flex flex-col gap-5"
          >
            {/* Quote mark */}
            <span className="font-geist font-black text-5xl text-white/90 leading-none">"</span>

            <p className="font-dm text-[16px] text-white/70 leading-relaxed">
              Trabalhar com eles foi uma alegria imensa; a paixão, o profissionalismo e a
              criatividade deles.
            </p>

            <a
              href="#projects"
              className="font-dm text-sm text-white/50 hover:text-white flex items-center gap-1.5 w-fit transition-colors duration-200"
            >
              Ver projeto
              <ArrowUpRight size={14} />
            </a>
          </motion.div>

          {/* Right: image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-white/4 border border-white/6">
              {/* Footer note inside image */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-dm text-[16px] text-white/40 leading-relaxed">
                  Fundado na confiança, aprimorando valor e criando laços que as pessoas valorizam.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
