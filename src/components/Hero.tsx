import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
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

  // Amortece a leitura da rolagem para o parallax acompanhar o mouse sem trancos.
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    mass: 0.35,
    restDelta: 0.001,
  })

  // Começa a responder imediatamente à rolagem, com distância de saída reduzida.
  const gabrielX = useTransform(smoothScrollProgress, [0, 1], [0, -150])
  
  // TEIXEIRA moves right (+300px)
  const teixeiraX = useTransform(smoothScrollProgress, [0, 1], [0, 150])
  
  // Image zooms in (scale 1 → 1.3) — zoom mais forte
  const imageScale = useTransform(smoothScrollProgress, [0, 1], [1, 1.14])

  return (
    <section ref={ref} id="hero" className="relative flex min-h-[760px] h-screen flex-col overflow-hidden bg-[#07070a]">
      <img
        src="/hero-background-v2.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* ── MAIN AREA ─────────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden">

        {/* Text — z:1 (behind image) — dentro do container 1520px */}
        <div className="absolute left-0 right-0 top-[130px] z-[1] flex select-none justify-center overflow-hidden md:top-[185px]">
          <div className="w-full max-w-[1600px] px-5 md:px-10">
            {/* GABRIEL — alinhado à esquerda, move para esquerda no scroll */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              style={{ fontSize: 'clamp(76px, 14.7vw, 282px)', x: gabrielX }}
              className="font-geist font-black leading-[0.88] text-white text-left tracking-[-0.03em]"
            >
              GABRIEL
            </motion.h1>
            
            {/* TEIXEIRA — alinhado à direita, move para direita no scroll */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.7 }}
              style={{ fontSize: 'clamp(76px, 14.7vw, 282px)', x: teixeiraX }}
              className="font-geist font-black leading-[0.88] text-white text-right tracking-[-0.03em]"
            >
              TEIXEIRA
            </motion.h1>
          </div>
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
          className="absolute bottom-0 left-0 right-0 pb-7 md:pb-11"
          style={{ zIndex: 3 }}
        >
          {/* Container alinhado ao max-width do site — 1520px */}
          <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-end md:px-10">

            {/* Left: tagline + social icons (embaixo) */}
            <div className="flex flex-col gap-3 md:gap-4">
              <p className="max-w-[560px] font-geist text-[20px] font-bold uppercase leading-[1.14] tracking-[0.01em] text-white md:text-[34px]">
                TRABALHE COM PROPÓSITO,<br />ALIMENTE-SE DE PAIXÃO
              </p>
              <div className="flex items-center gap-2 md:gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="glass flex h-10 w-10 items-center justify-center rounded-full text-white/65 transition-colors duration-200 hover:text-white md:h-12 md:w-12"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: description + buttons */}
            <div className="flex max-w-[440px] flex-col items-start gap-10 md:items-start">
              <p className="text-left font-dm text-[14px] leading-[1.35] text-white md:text-[16px]">
                Cada Projeto Que Assumo É Motivado Por Um Propósito, Orientado Pela Paixão E
                Elaborado Para Gerar Um Impacto Significativo E Duradouro.
              </p>
              <div className="flex flex-wrap items-center gap-10">
                <a
                  href="#contact"
                  className="flex h-[52px] items-center gap-5 rounded-full bg-[#5700ef] py-1 pl-6 pr-1 font-dm text-[15px] text-white transition-all duration-300 hover:bg-[#7b2fff]"
                  style={{ boxShadow: '0 0 18px rgba(87,0,239,0.5)' }}
                >
                  Contato
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5700ef]">
                    <ArrowUpRight size={18} strokeWidth={1.6} />
                  </span>
                </a>
                <a
                  href="#projects"
                  className="glass flex h-[52px] items-center gap-8 rounded-full py-1 pl-6 pr-1 font-dm text-[15px] text-white transition-colors duration-200"
                >
                  Veja os projetos
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08]">
                    <ArrowUpRight size={18} strokeWidth={1.6} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
