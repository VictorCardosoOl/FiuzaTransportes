import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Package, Factory, Home, Truck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Carga Lotação",
    description: "Veículo exclusivo para sua mercadoria. Maior segurança, agilidade e zero risco de avarias por manuseio excessivo.",
    icon: Truck,
  },
  {
    title: "Carga Seca",
    description: "Transporte especializado de industrializados, materiais de construção e não-perecíveis com proteção total contra intempéries.",
    icon: Package,
  },
  {
    title: "Logística Industrial",
    description: "Soluções B2B para abastecimento de linhas de produção e distribuição de produtos acabados entre fábricas e CDs.",
    icon: Factory,
  },
  {
    title: "Mudanças e Fretes",
    description: "Equipe treinada para mudanças comerciais e residenciais, com embalagens especiais e desmontagem inclusa.",
    icon: Home,
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".service-item", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 bg-fiuza-dark text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Soluções Logísticas <br />
              <span className="text-fiuza-blue">Sob Medida</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-md">
              Não apenas transportamos. Entendemos a necessidade do seu negócio e adaptamos nossa operação para garantir eficiência máxima.
            </p>
            
            <div className="h-1 w-20 bg-fiuza-blue rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-item group rounded-2xl bg-white/5 p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-fiuza-blue text-white shadow-lg shadow-fiuza-blue/20 group-hover:scale-110 transition-transform">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{service.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
