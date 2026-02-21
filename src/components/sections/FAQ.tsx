import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const FAQ_ITEMS = [
  {
    question: "Como solicito um orçamento?",
    answer: "Você pode solicitar um orçamento diretamente pelo nosso site clicando no botão 'Solicitar Orçamento' ou entrando em contato via WhatsApp. Nossa equipe responderá em até 30 minutos com uma proposta personalizada.",
  },
  {
    question: "Quais regiões vocês atendem?",
    answer: "Atendemos todo o território nacional. Possuímos bases operacionais estratégicas e parceiros em todos os estados, garantindo cobertura completa para coletas e entregas.",
  },
  {
    question: "Minha carga possui seguro?",
    answer: "Sim, todas as cargas transportadas pela Fiuza possuem seguro total (RCTR-C e RCF-DC) desde o momento da coleta até a entrega final, garantindo tranquilidade para sua operação.",
  },
  {
    question: "Vocês realizam transporte de cargas perigosas?",
    answer: "Sim, possuímos todas as licenças e certificações necessárias (SASSMAQ, IBAMA, Polícia Federal) para o transporte de produtos químicos e cargas perigosas, com motoristas treinados (MOPP).",
  },
  {
    question: "É possível rastrear minha carga?",
    answer: "Absolutamente. Oferecemos rastreamento em tempo real 24/7. Você receberá um link exclusivo para acompanhar o status e a localização exata do seu pedido a qualquer momento.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useGSAP(
    () => {
      // Animate Sticky Header
      gsap.from(".faq-header", {
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // Animate List Items
      gsap.from(".faq-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-32 bg-fiuza-cream text-fiuza-dark relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN (Sticky Header) */}
          <div className="lg:col-span-4 relative">
            <div className="faq-header lg:sticky lg:top-32 space-y-8">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-fiuza-blue mb-4 block">
                  Suporte
                </span>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] mb-6">
                  Dúvidas <br /> 
                  <span className="italic opacity-50 font-light">Frequentes</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-sm">
                  Respostas claras para as perguntas mais comuns sobre nossos serviços logísticos.
                </p>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
                  className="bg-fiuza-dark text-white hover:bg-fiuza-blue"
                >
                  Falar com Especialista
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Accordion List) */}
          <div className="lg:col-span-7 lg:col-start-6">
            {FAQ_ITEMS.map((item, idx) => (
              <div 
                key={idx} 
                className="faq-item border-b border-black/10 last:border-none"
              >
                <button 
                  onClick={() => toggleItem(idx)}
                  className="w-full py-8 flex justify-between items-start text-left group transition-colors hover:bg-black/5 px-4 -mx-4 rounded-lg"
                  aria-expanded={openIndex === idx}
                >
                  <h3 className={`text-2xl md:text-3xl font-serif pr-8 transition-all duration-500 ${openIndex === idx ? 'translate-x-4 text-fiuza-blue' : 'text-fiuza-dark'}`}>
                    {item.question}
                  </h3>
                  <div className={`flex-shrink-0 mt-1 transition-transform duration-500 ${openIndex === idx ? 'rotate-180 text-fiuza-blue' : 'text-gray-400'}`}>
                    {openIndex === idx ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </div>
                </button>
                
                <div 
                  className={`grid transition-all duration-500 ease-in-out overflow-hidden ${openIndex === idx ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-lg text-gray-600 leading-relaxed max-w-2xl pl-4 border-l-2 border-fiuza-blue/20 ml-4">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
