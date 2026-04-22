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
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      {/* Pill container com glass + bordas 30px */}
      <div
        className="w-full max-w-[1520px] relative flex items-center justify-between px-8 py-3"
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.10)',
          borderRadius: '30px',
        }}
      >
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
              className="font-dm font-normal text-[15px] text-white/55 hover:text-white transition-colors duration-200 tracking-normal whitespace-nowrap"
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
            className="absolute top-[calc(100%+8px)] left-4 right-4 md:hidden overflow-hidden"
            style={{
              background: 'rgba(12, 11, 11, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px',
            }}
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
