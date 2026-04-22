import { motion } from 'framer-motion'
import Ticker from './Ticker'
import { InstagramIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons'

const socials = [
  { icon: WhatsAppIcon, href: 'https://wa.me/', label: 'WhatsApp' },
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex flex-col overflow-hidden bg-[#0c0b0b]">

      {/* Purple glow */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full bg-[#5700ef]/12 blur-[150px] pointer-events-none z-0" />

      {/* ── MAIN AREA ─────────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden">

        {/* Text — z:1 (behind image) */}
        <div className="absolute top-[72px] left-0 right-0 z-[1] select-none">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="font-geist font-black leading-[0.88] text-white text-center tracking-[-0.03em]"
            style={{ fontSize: 'clamp(80px, 17vw, 280px)' }}
          >
            GABRIEL
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08, duration: 0.7 }}
            className="font-geist font-black leading-[0.88] text-white text-center tracking-[-0.03em]"
            style={{ fontSize: 'clamp(80px, 17vw, 280px)' }}
          >
            TEIXEIRA
          </motion.h1>
        </div>

        {/* Person image — z:2 (in front of text, behind bottom bar) */}
        <motion.img
          src="/1.png"
          alt="Gabriel Teixeira"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          style={{ zIndex: 2 }}
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

            {/* Left: social icons + tagline */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
              <p className="font-geist font-bold text-[11px] text-white uppercase tracking-[0.08em] leading-tight">
                TRABALHE COM PROPÓSITO,<br />ALIMENTE-SE DE PAIXÃO
              </p>
            </div>

            {/* Right: description + buttons */}
            <div className="flex flex-col gap-3 max-w-[270px] items-end">
              <p className="font-dm text-[11px] text-white/55 leading-relaxed text-right">
                Cada Projeto Que Assumo É Motivado Por Um Propósito,
                Orientado Pela Paixão E Elaborado Para Gerar Um Impacto
                Significativo É Duradouro.
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
