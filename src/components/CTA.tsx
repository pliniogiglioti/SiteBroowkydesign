import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-[#0c0b0b] py-12 md:py-20">
      <div className="mx-auto max-w-[1550px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative min-h-[390px] overflow-hidden md:min-h-[440px]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1550 440"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <path
              fill="#5700ef"
              d="M0 390V24C0 10.75 10.75 0 24 0H305C174 94 57 238 0 390Z"
            />
            <path
              fill="#5700ef"
              d="M112 440C171 254 320 111 548 0H1013C1167 94 1247 330 1394 440H112Z"
            />
            <path
              fill="#5700ef"
              d="M1197 0H1526C1539.25 0 1550 10.75 1550 24V331C1536 359 1519 361 1491 349C1384 301 1289 104 1197 0Z"
            />
          </svg>

          <div className="relative z-10 flex min-h-[390px] flex-col items-center px-5 pt-[76px] text-center md:min-h-[440px] md:pt-[87px]">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="section-title max-w-[790px] text-[clamp(2.35rem,4.4vw,4.35rem)] leading-[1.03] text-white"
            >
              Vamos criar algo
              <br />
              divertido e inovador!
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-11 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="mailto:gabriel@example.com"
                className="flex min-h-[50px] items-center rounded-full bg-white px-6 font-dm text-[15px] font-semibold text-[#5700ef] transition-colors duration-300 hover:bg-white/90"
              >
                Comece agora
              </a>
              <a
                href="#projects"
                className="glass flex min-h-[50px] items-center rounded-full px-6 font-dm text-[15px] text-white transition-colors duration-300"
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
