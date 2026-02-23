import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { whatsappUrl } from "@/config/contact";

const fleet = [
  {
    name: "Carreta LS",
    slug: "carreta-ls",
    description: "Foco em grandes volumes e longas distâncias. Ideal para cargas paletizadas e pesadas.",
    capacity: "Até 27 t",
    tag: "Grande Porte",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Truck / Semipesado",
    slug: "truck",
    description: "Ideal para volumes médios a grandes com agilidade interestadual.",
    capacity: "Até 14 t",
    tag: "Médio-Grande",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Toco / Médio",
    slug: "toco",
    description: "Equilíbrio entre capacidade e versatilidade para centros urbanos e rodovias.",
    capacity: "Até 6 t",
    tag: "Médio Porte",
    image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "VUC / Bongo",
    slug: "vuc",
    description: "Perfeito para entregas rápidas, áreas com restrição de circulação e volumes moderados.",
    capacity: "Até 1,5 t",
    tag: "Leve",
    image: "https://images.unsplash.com/photo-1506306488026-b67509124810?q=80&w=1200&auto=format&fit=crop",
  },
] as const;

const CTA_HREF = whatsappUrl("Olá! Gostaria de saber mais sobre a frota da Fiuza Transportes.");

export default function Fleet() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header entra primeiro
      gsap.from(".fleet-header > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Cards entram em cascata
      gsap.from(".fleet-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fleet-grid",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="frota"
      ref={sectionRef}
      className="py-32 bg-fiuza-dark text-fiuza-cream relative overflow-hidden"
    >
      {/* Ruído de fundo sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full">
          <filter id="noise-fleet">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-fleet)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Header da seção */}
        <div className="fleet-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-fiuza-blue mb-4 block">
              Nossa Frota
            </span>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.9]">
              Veículos para <br />
              <span className="font-serif italic text-fiuza-blue">cada missão</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-xs text-sm md:text-base leading-relaxed md:text-right">
            Frota moderna, rastreada 24h e com seguro total. Escolhemos o veículo certo para cada tipo de carga.
          </p>
        </div>

        {/* Grid de veículos */}
        <div className="fleet-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {fleet.map((vehicle) => (
            <article
              key={vehicle.slug}
              className="fleet-card group relative overflow-hidden bg-fiuza-dark"
            >
              {/* Imagem */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.name} — frota Fiuza Transportes`}
                  width={1200}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-fiuza-dark/90 via-fiuza-dark/20 to-transparent" />

                {/* Badge de capacidade */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest bg-fiuza-blue/90 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                    {vehicle.tag}
                  </span>
                </div>
              </div>

              {/* Conteúdo do card */}
              <div className="p-6 md:p-8 border-t border-white/5 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="font-display text-xl md:text-2xl font-medium group-hover:text-fiuza-blue transition-colors duration-300">
                      {vehicle.name}
                    </h3>
                    <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-0.5 rounded-full">
                      {vehicle.capacity}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
                    {vehicle.description}
                  </p>
                </div>

                {/* Ícone de ação */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:border-fiuza-blue group-hover:text-fiuza-blue group-hover:bg-fiuza-blue/10 transition-all duration-300 mt-1">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA final */}
        <div className="mt-px bg-white/5 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-display text-3xl md:text-4xl font-medium mb-2">
              Frota Personalizada?
            </h3>
            <p className="text-gray-400 max-w-md">
              Para operações especiais, cargas indivisíveis ou rotas fora do padrão — temos soluções sob medida.
            </p>
          </div>
          <a
            href={CTA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-3 bg-fiuza-blue text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-fiuza-dark transition-all duration-300 group"
          >
            Falar com Consultor
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
