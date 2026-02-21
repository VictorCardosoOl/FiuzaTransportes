import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Truck, Box, Container, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const vehicles = [
  {
    name: "Carreta",
    description: "Foco em grandes volumes e longas distâncias. Ideal para cargas pesadas e lotação completa.",
    capacity: "Até 27 toneladas",
    icon: Container,
    image: "https://images.unsplash.com/photo-1586191582118-274277497833?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Truck",
    description: "Ideal para volumes médios a grandes com agilidade interestadual.",
    capacity: "Até 14 toneladas",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Toco",
    description: "Equilíbrio entre capacidade e versatilidade para centros urbanos e rodovias.",
    capacity: "Até 6 toneladas",
    icon: Box,
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "VUC / Bongo",
    description: "Perfeito para entregas rápidas, áreas com restrição de circulação e volumes moderados.",
    capacity: "Até 1.5 toneladas",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1506306488026-b67509124810?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function Fleet() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".fleet-card");
      
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 bg-white text-fiuza-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-fiuza-blue">
            Nossa Frota
          </h2>
          <p className="text-lg text-gray-600">
            Tecnologia e diversidade para atender qualquer demanda logística. 
            Do urbano ao rodoviário, temos o veículo certo para sua carga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="fleet-card group relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-fiuza-light p-2 text-fiuza-blue">
                    <vehicle.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{vehicle.name}</h3>
                </div>
                
                <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                  {vehicle.description}
                </p>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs font-semibold text-fiuza-blue bg-fiuza-light px-2 py-1 rounded">
                    {vehicle.capacity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" onClick={() => window.open("https://wa.me/5511999999999", "_blank")}>
            Consultar Disponibilidade
          </Button>
        </div>
      </div>
    </section>
  );
}
