import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Quote } from 'lucide-react'

export default function Testimonial() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-[#0c0b0b] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-[#5700ef]/8 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-dm text-xs text-[#5700ef] tracking-[0.2em] uppercase mb-4"
          >
            Depoimentos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="section-title text-[clamp(1.8rem,4vw,3rem)] text-white max-w-lg leading-tight"
          >
            Serviços criativos que estimulam o crescimento
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Testimonial card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="glass-card rounded-2xl p-8 relative"
          >
            {/* Quote icon */}
            <div className="w-10 h-10 rounded-full bg-[#5700ef]/20 border border-[#5700ef]/30 flex items-center justify-center mb-6">
              <Quote size={16} className="text-[#5700ef]" />
            </div>

            <p className="font-dm text-base text-white/70 leading-relaxed mb-8 italic">
              "Trabalhar com eles foi uma alegria imensa; a paixão, o profissionalismo e a criatividade deles."
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden glass border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                  alt="Cliente"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-geist font-bold text-white text-sm">Ana Carolina</p>
                <p className="font-dm text-xs text-white/40">CEO, Boots Horse</p>
              </div>
              <div className="ml-auto">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#5700ef]" />
                  ))}
                </div>
              </div>
            </div>

            {/* Ver projeto */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2 mt-6 font-dm text-xs text-[#5700ef] hover:text-white transition-colors"
            >
              Ver projeto
              <ArrowUpRight size={12} />
            </a>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glass border border-white/8 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=500&fit=crop"
                alt="Trabalho em equipe"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0b]/70 via-transparent to-transparent" />

              {/* Floating stat */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-6 left-6 glass-purple rounded-xl px-5 py-4"
              >
                <p className="font-geist font-bold text-3xl text-white">98%</p>
                <p className="font-dm text-xs text-white/60 mt-1">Satisfação dos clientes</p>
              </motion.div>
            </div>

            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full border border-[#5700ef]/20 blur-sm" />
          </motion.div>
        </div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-dm text-xs text-white/30 text-center mt-16"
        >
          Fundado na confiança, agregando valor e criando laços que as pessoas valorizam.
        </motion.p>
      </div>
    </section>
  )
}
