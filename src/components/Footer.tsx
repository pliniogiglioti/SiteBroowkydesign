import Ticker from './Ticker'

export default function Footer() {
  return (
    <footer className="bg-[#0c0b0b] border-t border-white/5">

      {/* Ticker */}
      <div className="border-b border-white/5 py-3 bg-[#5700ef]/5">
        <Ticker direction="right" speed={25} />
      </div>

      {/* Logo centered */}
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <a href="#hero" className="flex flex-col items-center gap-1">
          <span className="font-geist font-black text-[clamp(3rem,10vw,8rem)] text-white tracking-tight leading-none">
            Broowky
          </span>
          <span className="font-dm text-[clamp(0.5rem,1.5vw,0.9rem)] text-white/30 tracking-[0.5em] uppercase">
            Design
          </span>
        </a>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-white/5 px-10 py-5 max-w-[1520px] mx-auto w-full flex items-center justify-between flex-wrap gap-3">
        <p className="font-dm text-[16px] text-white/25">
          I bring innovative ideas to life through my designs and collaborations.
        </p>
        <p className="font-dm text-[16px] text-white/25">
          Copyright © Gabriel Teixeira {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
