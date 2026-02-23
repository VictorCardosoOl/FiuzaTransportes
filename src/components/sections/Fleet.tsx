import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { whatsappUrl } from "@/config/contact";

const fleet = [
  {
    name: "Carreta LS",
    slug: "carreta-ls",
    description:
      "Grandes volumes, longas distâncias. A solução definitiva para operações interestaduais de alta capacidade.",
    capacity: "Até 27 t",
    tag: "Grande Porte",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Truck / Semipesado",
    slug: "truck",
    description:
      "Ideal para volumes médios a grandes com agilidade interestadual e acesso facilitado.",
    capacity: "Até 14 t",
    tag: "Médio-Grande",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Toco",
    slug: "toco",
    description:
      "Equilíbrio entre capacidade e versatilidade. Acesso a centros urbanos e rodovias com eficiência.",
    capacity: "Até 6 t",
    tag: "Médio Porte",
    image:
      "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "VUC / Bongo",
    slug: "vuc",
    description:
      "Entregas rápidas, áreas com restrição de circulação, volumes moderados. Agilidade urbana.",
    capacity: "Até 1,5 t",
    tag: "Leve",
    image:
      "https://images.unsplash.com/photo-1506306488026-b67509124810?q=80&w=1600&auto=format&fit=crop",
  },
] as const;

const CTA_HREF = whatsappUrl(
  "Olá! Gostaria de saber mais sobre a frota da Fiuza Transportes."
);

export default function Fleet() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".fleet-label, .fleet-title, .fleet-subtitle", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.from(".fleet-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".fleet-grid", start: "top 80%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="frota"
      ref={sectionRef}
      /* Fundo claro — estética awards light */
      className="py-32 bg-fiuza-cream text-fiuza-dark overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">

        {/* Header editorial — grande, arejado */}
        <div className="mb-20 md:mb-28">
          <span className="fleet-label block text-[10px] font-mono uppercase tracking-[0.3em] text-fiuza-blue mb-6">
            Nossa Frota
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="fleet-title font-serif text-6xl md:text-8xl lg:text-[9rem] leading-[0.88] text-fiuza-dark font-light">
              Veículos para<br />
              <em className="text-fiuza-blue not-italic">cada missão</em>
            </h2>
            <p className="fleet-subtitle text-sm text-fiuza-dark/50 max-w-xs leading-relaxed md:text-right font-light md:pb-3">
              Frota moderna, rastreada em tempo real e com seguro total em cada operação.
            </p>
          </div>
        </div>

        {/* Grid de veículos — editorial, muito espaço branco */}
        <div className="fleet-grid grid grid-cols-1 md:grid-cols-2 gap-1">
          {fleet.map((vehicle, i) => (
            <article
              key={vehicle.slug}
              className="fleet-card group cursor-pointer"
            >
              {/* Imagem fullbleed com aspecto elegante */}
              <div className="relative overflow-hidden bg-fiuza-light">
                <div
                  className={`aspect-[4/3] ${i === 0 ? "md:aspect-[16/9]" : ""
                    } overflow-hidden`}
                >
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.name} — frota Fiuza Transportes`}
                    width={1600}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>

                {/* Badge flutuante no canto */}
                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-fiuza-dark text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full border border-fiuza-dark/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-fiuza-blue inline-block" aria-hidden="true" />
                    {vehicle.tag}
                  </span>
                </div>
              </div>

              {/* Rodapé do card — limpo, tipográfico */}
              <div className="py-6 px-0 flex items-start justify-between gap-4 border-b border-fiuza-dark/8">
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium text-fiuza-dark group-hover:text-fiuza-blue transition-colors duration-300 mb-1">
                    {vehicle.name}
                  </h3>
                  <p className="text-sm text-fiuza-dark/50 font-light leading-snug max-w-sm">
                    {vehicle.description}
                  </p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-end gap-2 pt-1">
                  <span className="text-xs font-mono font-medium text-fiuza-blue border border-fiuza-blue/30 px-3 py-1 rounded-full">
                    {vehicle.capacity}
                  </span>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-fiuza-dark/30 group-hover:text-fiuza-blue group-hover:bg-fiuza-blue/10 transition-all duration-300 border border-transparent group-hover:border-fiuza-blue/20">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA final — elegante, light */}
        <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-fiuza-dark/8">
          <div>
            <p className="font-serif text-3xl md:text-4xl font-light text-fiuza-dark mb-2">
              Operação especial ou carga indivisível?
            </p>
            <p className="text-sm text-fiuza-dark/50 font-light">
              Desenvolvemos soluções logísticas completamente sob medida.
            </p>
          </div>
          <a
            href={CTA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 inline-flex items-center gap-3 border border-fiuza-dark text-fiuza-dark px-8 py-4 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-fiuza-dark hover:text-fiuza-cream transition-all duration-400"
          >
            Falar com Consultor
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
