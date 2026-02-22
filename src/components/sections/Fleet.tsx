import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";


const fleet = [
  {
    name: "Carreta LS",
    description: "Foco em grandes volumes e longas distâncias. Ideal para cargas paletizadas e pesadas.",
    capacity: "Até 27 toneladas",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Truck / Semipesado",
    description: "Ideal para volumes médios a grandes com agilidade interestadual.",
    capacity: "Até 14 toneladas",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Toco / Médio",
    description: "Equilíbrio entre capacidade e versatilidade para centros urbanos e rodovias.",
    capacity: "Até 6 toneladas",
    image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "VUC / Bongo",
    description: "Perfeito para entregas rápidas, áreas com restrição de circulação e volumes moderados.",
    capacity: "Até 1.5 toneladas",
    image: "https://images.unsplash.com/photo-1506306488026-b67509124810?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function Fleet() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const slider = sliderRef.current;
      if (!slider) return;

      const totalWidth = slider.scrollWidth - window.innerWidth + 100; // Extra buffer

      gsap.to(slider, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="frota" className="relative h-screen bg-fiuza-dark text-fiuza-cream overflow-hidden">
      <div className="absolute top-12 left-8 md:left-16 z-10">
        <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight">
          Nossa Frota
        </h2>
        <p className="text-sm text-gray-400 mt-2 max-w-xs">
          Veículos modernos e rastreados para qualquer necessidade.
        </p>
      </div>

      <div className="h-full flex items-center">
        <div ref={sliderRef} className="flex gap-8 pl-8 md:pl-16 pr-16 w-max">
          {fleet.map((item) => (
            <div
              key={item.name}
              className="relative w-[85vw] md:w-[40vw] h-[60vh] md:h-[70vh] flex-shrink-0 group overflow-hidden bg-[#222]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                <div className="border-t border-white/20 pt-6 flex flex-col gap-4">
                  <div className="flex justify-between items-end">
                    <h3 className="font-display text-3xl md:text-4xl font-medium">{item.name}</h3>
                    <span className="text-xs font-mono border border-white/30 px-2 py-1 rounded-full">
                      {item.capacity}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base max-w-md">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* CTA Card at the end */}
          <div className="w-[85vw] md:w-[30vw] h-[60vh] md:h-[70vh] flex-shrink-0 flex items-center justify-center bg-fiuza-blue text-white">
            <div className="text-center p-8">
              <h3 className="font-display text-4xl mb-6">Frota Personalizada?</h3>
              <p className="mb-8 opacity-80">Temos soluções sob medida para sua operação.</p>
              <button className="bg-white text-fiuza-blue px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-colors">
                Falar com Consultor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
