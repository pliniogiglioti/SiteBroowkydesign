import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Ticker from './Ticker'
import { GithubIcon, InstagramIcon, LinkedinIcon } from './SocialIcons'

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: 'easeOut' },
  }),
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-[#0c0b0b]">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#5700ef]/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-[#5700ef]/8 blur-[80px] pointer-events-none" />

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 pt-28 pb-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 glass-purple rounded-full px-4 py-2 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-[#5700ef] glow-pulse" />
              <span className="font-dm text-xs text-white/70 tracking-wide">Disponível para projetos</span>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden">
              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="section-title text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] text-white"
              >
                GABRIEL
                <br />
                <span className="gradient-text">TEIXEIRA</span>
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-geist font-bold text-lg text-white/90 leading-tight max-w-xs"
            >
              Trabalhe com propósito,
              <br />
              alimente-se de paixão
            </motion.p>

            {/* Description */}
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-dm text-sm text-white/50 leading-relaxed max-w-sm"
            >
              Cada projeto que assumo é motivado por um propósito, orientado pela paixão e elaborado para gerar um impacto significativo e duradouro.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-4 flex-wrap"
            >
              <a href="#contact" className="btn-primary">
                Contato
              </a>
              <a href="#projects" className="btn-outline flex items-center gap-2">
                Veja os projetos
                <ArrowDown size={14} />
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/50 hover:text-white hover:border-[#5700ef]/50 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow behind photo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full bg-[#5700ef]/20 blur-[60px]" />
            </div>

            {/* Photo frame */}
            <div className="relative w-72 h-96 lg:w-80 lg:h-[480px] float-animation">
              <div className="w-full h-full rounded-2xl overflow-hidden glass border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face"
                  alt="Gabriel Teixeira"
                  className="w-full h-full object-cover object-top opacity-90"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0b]/60 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -right-4 top-8 glass-purple rounded-xl px-4 py-3"
              >
                <p className="font-geist font-bold text-2xl text-white">+5</p>
                <p className="font-dm text-xs text-white/60">Anos de exp.</p>
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -left-4 bottom-12 glass rounded-xl px-4 py-3"
              >
                <p className="font-geist font-bold text-2xl text-white">+320</p>
                <p className="font-dm text-xs text-white/60">Projetos</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ticker */}
      <div className="border-t border-b border-white/5 py-3 bg-[#5700ef]/5">
        <Ticker />
      </div>
    </section>
  )
}
