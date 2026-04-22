import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Ticker from './Ticker'
import { InstagramIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons'

const socials = [
  { icon: WhatsAppIcon, href: 'https://wa.me/', label: 'WhatsApp' },
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  
  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // GABRIEL moves left (-300px)
  const gabrielX = useTransform(scrollYProgress, [0, 1], [0, -300])
  
  // TEIXEIRA moves right (+300px)
  const teixeiraX = useTransform(scrollYProgress, [0, 1], [0, 300])
  
  // Image zooms in (scale 1 → 1.3) — zoom mais forte
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])

  return (
    <section ref={ref} id="hero" className="relative h-screen flex flex-col overflow-hidden bg-[#0c0b0b]">

      {/* Purple glow */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full bg-[#5700ef]/12 blur-[150px] pointer-events-none z-0" />

      {/* ── MAIN AREA ─────────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden">

        {/* Text — z:1 (behind image) */}
        <div className="absolute top-[72px] left-0 right-0 z-[1] select-none overflow-hidden">
          {/* GABRIEL — alinhado à esquerda, move para esquerda no scroll */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            style={{ fontSize: 'clamp(80px, 17vw, 280px)', x: gabrielX }}
            className="font-geist font-black leading-[0.88] text-white text-left pl-10 tracking-[-0.03em]"
          >
            GABRIEL
          </motion.h1>
          
          {/* TEIXEIRA — alinhado à direita, move para direita no scroll */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08, duration: 0.7 }}
            style={{ fontSize: 'clamp(80px, 17vw, 280px)', x: teixeiraX }}
            className="font-geist font-black leading-[0.88] text-white text-right pr-10 tracking-[-0.03em]"
          >
            TEIXEIRA
          </motion.h1>
        </div>

        {/* Person image — z:2 (in front of text, behind bottom bar) — zoom in no scroll */}
        <motion.img
          src="/1.png"
          alt="Gabriel Teixeira"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 1 }}
          style={{ scale: imageScale, zIndex: 2, transformOrigin: 'center center' }}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          draggable={false}
        />

        {/* Bottom bar — z:3 (front of everything) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="absolute bottom-0 left-0 right-0 pb-6"
          style={{ zIndex: 3 }}
        >
          {/* Container alinhado ao max-width do site */}
          <div className="max-w-[1360px] mx-auto px-10 flex items-end justify-between">

            {/* Left: tagline + social icons (embaixo) */}
            <div className="flex flex-col gap-4">
              <p className="font-geist font-bold text-[40px] text-white uppercase tracking-[0.02em] leading-[1.1] max-w-[500px]">
                TRABALHE COM PROPÓSITO,<br />ALIMENTE-SE DE PAIXÃO
              </p>
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: description + buttons */}
            <div className="flex flex-col gap-3 max-w-[400px] items-end">
              <p className="font-dm text-[18px] text-white/55 leading-relaxed text-right">
                Cada Projeto Que Assumo É Motivado Por Um Propósito, Orientado Pela Paixão E Elaborado Para Gerar Um Impacto Significativo É Duradouro.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  className="bg-[#5700ef] hover:bg-[#7b2fff] text-white font-dm text-xs px-5 py-2.5 rounded-full transition-all duration-300"
                  style={{ boxShadow: '0 0 18px rgba(87,0,239,0.5)' }}
                >
                  Contato
                </a>
                <a
                  href="#projects"
                  className="font-dm text-xs text-white/60 hover:text-white flex items-center gap-1 transition-colors duration-200"
                >
                  Veja os projetos
                  <span className="text-base leading-none ml-0.5">→</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── TICKER ───────────────────────────────────── */}
      <div className="border-t border-b border-white/5 py-3 bg-[#5700ef]/5 relative z-10">
        <Ticker />
      </div>
    </section>
  )
}
