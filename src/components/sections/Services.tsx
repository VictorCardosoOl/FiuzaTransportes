import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Carga Lotação",
    description: "Veículo exclusivo para sua mercadoria. Maior segurança, agilidade e zero risco de avarias.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Carga Seca",
    description: "Transporte especializado de industrializados, materiais de construção e não-perecíveis.",
    image: "https://images.unsplash.com/photo-1565891741441-64926e441838?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Logística Industrial",
    description: "Soluções B2B para abastecimento de linhas de produção e distribuição de produtos acabados.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Mudanças e Fretes",
    description: "Equipe treinada para mudanças comerciais e residenciais, com embalagens especiais.",
    image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(services[0].image);

  useGSAP(
    () => {
      gsap.from(".service-row", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-32 bg-fiuza-dark text-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Sticky Title */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-fiuza-blue mb-6 block opacity-80">
                Nossos Serviços
              </span>
              <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-8 tracking-tight">
                Soluções <br />
                <span className="text-white/40 italic font-serif">Logísticas</span>
              </h2>
              <p className="text-white/60 max-w-sm mb-8 font-light leading-relaxed">
                Operações dedicadas e customizadas para garantir que sua carga chegue ao destino com integridade.
              </p>
              
              {/* Dynamic Image Preview (Desktop) */}
              <div className="hidden lg:block aspect-[4/3] w-full rounded-sm overflow-hidden relative mt-12 opacity-80">
                <img 
                  src={activeImage} 
                  alt="Service Preview" 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-fiuza-blue/20 mix-blend-overlay" />
              </div>
            </div>
          </div>

          {/* Right: Interactive List */}
          <div className="lg:col-span-8">
            <div className="flex flex-col">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="service-row group relative border-t border-white/5 py-16 transition-all duration-500 hover:bg-white/[0.02] cursor-pointer"
                  onMouseEnter={() => setActiveImage(service.image)}
                >
                  <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 px-4">
                    <span className="text-xs font-mono text-fiuza-blue opacity-50 tracking-widest">
                      /{service.id}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-display font-light mb-4 group-hover:text-fiuza-blue transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-white/40 max-w-xl group-hover:text-white/70 transition-colors duration-300 font-light leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <div className="md:self-center opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 duration-500 ease-out">
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-fiuza-blue/50 group-hover:text-fiuza-blue">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-white/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
