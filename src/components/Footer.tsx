import { GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from './SocialIcons'
import Ticker from './Ticker'

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
]

const footerLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#about' },
  { label: 'Serviços', href: '#services' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Contato', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0c0b0b] border-t border-white/5">
      {/* Ticker */}
      <div className="border-b border-white/5 py-3 bg-[#5700ef]/5">
        <Ticker direction="right" speed={25} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a href="#hero" className="font-geist font-bold text-3xl text-white tracking-tight">
              Broowky
              <br />
              <span className="font-dm font-normal text-sm text-white/30 tracking-[0.3em]">DESIGN</span>
            </a>
            <p className="font-dm text-xs text-white/40 leading-relaxed max-w-xs">
              I bring innovative ideas to life through my designs and collaborations.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <p className="font-geist font-bold text-xs text-white/30 tracking-widest uppercase mb-2">Navegação</p>
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-dm text-sm text-white/50 hover:text-white transition-colors duration-200 w-fit"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <p className="font-geist font-bold text-xs text-white/30 tracking-widest uppercase mb-2">Redes Sociais</p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-[#5700ef]/50 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="font-dm text-xs text-white/30 mt-4 leading-relaxed">
              Baseado no Brasil 🇧🇷
              <br />
              Disponível para projetos remotos
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex items-center justify-between flex-wrap gap-4">
          <p className="font-dm text-xs text-white/25">
            Copyright © Gabriel Teixeira {new Date().getFullYear()}
          </p>
          <p className="font-dm text-xs text-white/25">
            Feito com paixão e propósito
          </p>
        </div>
      </div>
    </footer>
  )
}
