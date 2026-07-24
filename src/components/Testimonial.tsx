import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react'

export default function Testimonial() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0c0b0b] py-14 md:py-20">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[minmax(390px,1.18fr)_1fr_1fr] lg:gap-y-9">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-title text-[clamp(2.35rem,4vw,4rem)] leading-[1.12] text-white lg:col-span-1"
          >
            Serviços criativos que
            <br />
            estimulam o crescimento
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="flex flex-col gap-6 lg:col-span-2 lg:w-[440px] lg:justify-self-end"
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Depoimento anterior"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/55 text-white transition-colors hover:border-white"
              >
                <ArrowLeft size={19} strokeWidth={1.4} />
              </button>
              <span className="h-px min-w-10 flex-1 bg-white/35" />
              <button
                type="button"
                aria-label="Próximo depoimento"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/55 text-white transition-colors hover:border-white"
              >
                <ArrowRight size={19} strokeWidth={1.4} />
              </button>
              <a
                href="#projects"
                className="ml-8 whitespace-nowrap font-dm text-[16px] text-white transition-colors hover:text-white/70"
              >
                Ver tudo
              </a>
            </div>

            <p className="max-w-[460px] font-dm text-[16px] leading-relaxed text-white/55">
              Fundado na confiança, agregando valor e criando laços que as pessoas valorizam.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.7 }}
            className="flex min-h-[500px] flex-col items-start lg:min-h-[620px]"
          >
            <span className="font-geist text-[74px] font-black leading-[0.55] text-white">“</span>

            <p className="mt-8 max-w-[340px] font-dm text-[clamp(1.75rem,2.35vw,2.55rem)] leading-[1.3] text-white">
              Trabalhar com eles foi uma alegria imensa; a paixão, o profissionalismo e a criatividade deles.
            </p>

            <a
              href="#projects"
              className="glass mt-9 flex h-[52px] items-center gap-8 rounded-full py-1 pl-6 pr-1 font-dm text-[16px] text-white transition-colors"
            >
              Ver projeto
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <ArrowUpRight size={18} strokeWidth={1.5} />
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.24, duration: 0.7 }}
            className="glass-panel min-h-[500px] overflow-hidden rounded-[20px] sm:rounded-[24px] lg:min-h-[620px] lg:rounded-[30px]"
            aria-label="Imagem do projeto em destaque"
          />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.32, duration: 0.7 }}
            className="glass-panel min-h-[500px] overflow-hidden rounded-[20px] sm:rounded-[24px] lg:min-h-[620px] lg:rounded-[30px]"
            aria-label="Segunda imagem do projeto em destaque"
          />
        </div>
      </div>
    </section>
  )
}
