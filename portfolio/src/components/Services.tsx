import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const services = [
  {
    number: '01',
    title: 'Design de Produto',
    description:
      'O design de produtos combina criatividade e funcionalidade, transformando ideias em soluções tangíveis que são fáceis de usar, visualmente atraentes e criadas para melhorar as experiências do dia a dia de forma significativa.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop',
  },
  {
    number: '02',
    title: 'UI/UX Design',
    description:
      'Criamos interfaces intuitivas e experiências digitais que colocam o usuário no centro. Cada tela é pensada para guiar, engajar e converter, unindo estética e usabilidade em harmonia perfeita.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
  },
  {
    number: '03',
    title: 'Identidade Visual',
    description:
      'Construímos marcas que comunicam, conectam e ficam na memória. Da paleta de cores à tipografia, cada elemento é escolhido com intenção para criar uma identidade coesa e poderosa.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop',
  },
  {
    number: '04',
    title: 'Catálogos',
    description:
      'Desenvolvemos catálogos impressos e digitais que apresentam seus produtos e serviços com elegância. Design editorial que equilibra informação e estética para encantar e converter.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop',
  },
]

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number>(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" ref={ref} className="py-24 bg-[#0c0b0b] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#5700ef]/8 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-dm text-xs text-[#5700ef] tracking-[0.2em] uppercase mb-4"
          >
            O que eu faço
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="section-title text-[clamp(1.8rem,4vw,3.5rem)] text-white max-w-xl leading-tight"
          >
            Serviços criativos que estimulam o crescimento
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Accordion */}
          <div className="flex flex-col gap-0">
            {services.map((service, i) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className="border-b border-white/8"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-dm text-xs text-[#5700ef] tracking-widest">{service.number}</span>
                    <span
                      className={`font-geist font-bold text-base transition-colors duration-200 ${
                        openIndex === i ? 'text-white' : 'text-white/60 group-hover:text-white'
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === i
                        ? 'bg-[#5700ef] text-white'
                        : 'glass text-white/40 group-hover:text-white'
                    }`}
                  >
                    {openIndex === i ? <Minus size={13} /> : <Plus size={13} />}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="font-dm text-sm text-white/50 leading-relaxed pb-5 pr-8">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="sticky top-28"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={openIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden glass border border-white/8 aspect-[4/3]"
              >
                <img
                  src={services[openIndex >= 0 ? openIndex : 0]?.image}
                  alt={services[openIndex >= 0 ? openIndex : 0]?.title}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0b]/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="font-dm text-xs text-[#5700ef] tracking-widest">
                    {services[openIndex >= 0 ? openIndex : 0]?.number}
                  </span>
                  <p className="font-geist font-bold text-white text-lg mt-1">
                    {services[openIndex >= 0 ? openIndex : 0]?.title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Ver projeto link */}
            <div className="mt-6 flex items-center justify-between">
              <p className="font-dm text-xs text-white/40">
                Gabriel Teixeira — designer apaixonado, baseado no Brasil, com um olhar apurado para estética e uma obsessão saudável por criatividade.
              </p>
              <a
                href="#projects"
                className="font-dm text-xs text-[#5700ef] hover:text-white transition-colors whitespace-nowrap ml-4"
              >
                Ver projeto →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
