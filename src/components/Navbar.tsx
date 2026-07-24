import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Serviços', href: '#services' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Experiência', href: '#about' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed left-0 right-0 top-4 z-50 flex justify-center px-4 md:top-[34px]"
    >
      {/* Pill container com glass + bordas 30px */}
      <div className="site-container glass-navbar relative flex w-full max-w-[1520px] items-center justify-between rounded-[32px] px-5 py-4 md:px-8">
        {/* Logo — 120px */}
        <a href="#hero" className="shrink-0">
          <img src="/logobroowk.svg" alt="Broowky Design" className="h-8 w-[120px] object-contain" />
        </a>

        {/* Desktop links — posicionados absolutamente à direita */}
        <nav
          className="hidden md:flex items-center gap-7 absolute right-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-dm font-normal text-[15px] text-white hover:text-white/70 transition-colors duration-200 tracking-normal whitespace-nowrap uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass-navbar absolute left-4 right-4 top-[calc(100%+8px)] overflow-hidden rounded-[24px] md:hidden"
          >
            <nav className="flex flex-col px-6 py-5 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-dm text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
