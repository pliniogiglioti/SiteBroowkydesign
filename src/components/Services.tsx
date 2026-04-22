import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const services = [
  {
    number: '01',
    title: 'Design de Produto',
    description:
      'O design de produtos combina criatividade e funcionalidade, transformando ideias em soluções tangíveis que são fáceis de usar, visualmente atraentes e criadas para melhorar as experiências do dia a dia de forma significativa.',
  },
  {
    number: '02',
    title: 'UI/UX Design',
    description:
      'Criamos interfaces intuitivas e experiências digitais que colocam o usuário no centro. Cada tela é pensada para guiar, engajar e converter, unindo estética e usabilidade em harmonia perfeita.',
  },
  {
    number: '03',
    title: 'Identidade Visual',
    description:
      'Construímos marcas que comunicam, conectam e ficam na memória. Da paleta de cores à tipografia, cada elemento é escolhido com intenção para criar uma identidade coesa e poderosa.',
  },
  {
    number: '04',
    title: 'Catálogos',
    description:
      'Desenvolvemos catálogos impressos e digitais que apresentam seus produtos e serviços com elegância. Design editorial que equilibra informação e estética para encantar e converter.',
  },
]

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number>(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" ref={ref} className="py-20 bg-[#0c0b0b] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#5700ef]/6 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: title + description + cta */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-title text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight max-w-md"
            >
              SERVIÇOS CRIATIVOS QUE ESTIMULAM O CRESCIMENTO
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-dm text-sm text-white/45 leading-relaxed max-w-sm"
            >
              Gabriel Teixeira — designer apaixonado, baseado no Brasil, com um olhar apurado
              para estética e uma obsessão saudável por criatividade. Não me contento apenas em
              criar coisas bonitas; quero que cada projeto conte uma história, resolva um problema
              real e deixe uma impressão final, cada detalhe fruto das minhas experiências visuais
              que movem pessoas — esse é a contribuição do meu trabalho.
            </motion.p>

            <motion.a
              href="#projects"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="font-dm text-sm text-white/60 hover:text-white flex items-center gap-1.5 w-fit transition-colors duration-200 border-b border-white/20 pb-0.5"
            >
              Ver projeto
              <span>→</span>
            </motion.a>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col">
            {/* Small intro text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-dm text-xs text-white/35 leading-relaxed mb-6"
            >
              Criamos designs bem pensados e inovadores que transformam visões em realidades
              significativas, combinando criatividade e estratégia para inspirar, envolver e
              causar impacto.
            </motion.p>

            {/* Accordion */}
            <div className="flex flex-col">
              {services.map((service, i) => (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
                  className="border-b border-white/8"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-dm text-xs text-[#5700ef] tracking-widest">
                        {service.number}.
                      </span>
                      <span
                        className={`font-geist font-bold text-base transition-colors duration-200 ${
                          openIndex === i ? 'text-white' : 'text-white/60 group-hover:text-white'
                        }`}
                      >
                        {service.title}
                      </span>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
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
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="font-dm text-sm text-white/50 leading-relaxed pb-5 pr-8">
                          {service.description}
                        </p>

                        {/* Image placeholders */}
                        <div className="grid grid-cols-2 gap-3 pb-6">
                          <div className="aspect-[4/3] rounded-xl bg-white/5 border border-white/6" />
                          <div className="aspect-[4/3] rounded-xl bg-white/5 border border-white/6" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
