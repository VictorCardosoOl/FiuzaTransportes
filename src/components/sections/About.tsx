import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Shield, Clock, MapPin } from "lucide-react";

// S2 fix: Estatísticas quantificadas — proposta de valor racional para decisor B2B
const STATS = [
  { value: "15+", label: "Anos de operação" },
  { value: "800+", label: "Empresas atendidas" },
  { value: "99.7%", label: "Entregas no prazo" },
  { value: "2.100", label: "Rotas por mês" },
] as const;

const PILLARS = [
  {
    id: "seguranca",
    Icon: Shield,
    title: "Segurança",
    desc: "RCTR-C e RCF-DC em todas as cargas. Rastreamento 24h via satélite.",
  },
  {
    id: "pontualidade",
    Icon: Clock,
    title: "Pontualidade",
    desc: "99.7% de entregas dentro do prazo. SLA garantido em contrato.",
  },
  {
    id: "cobertura",
    Icon: MapPin,
    title: "Cobertura Nacional",
    desc: "26 estados + DF atendidos. Bases próprias no eixo SP-MG-RJ.",
  },
] as const;

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
      });

      gsap.from(".stat-item", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: { trigger: ".stats-row", start: "top 80%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="sobre" ref={containerRef} className="py-24 bg-white text-fiuza-dark">
      <div className="container mx-auto px-4 md:px-6">

        {/* Estatísticas em faixa horizontal — S2 fix */}
        <div className="stats-row grid grid-cols-2 md:grid-cols-4 gap-px bg-fiuza-light mb-24">
          {STATS.map((s) => (
            <div key={s.label} className="stat-item bg-white text-center py-10 px-4">
              <span className="block font-display text-4xl md:text-5xl font-bold text-fiuza-blue mb-2">
                {s.value}
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Layout editorial duas colunas */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Coluna imagem */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[3/4] md:aspect-square w-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1000&auto=format&fit=crop"
                alt="Motorista Fiuza Transportes ao volante — profissionalismo e comprometimento"
                width={1000}
                height={1000}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge flutuante */}
            <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-fiuza-blue text-white p-8 rounded-2xl shadow-xl max-w-[200px]">
              <span className="block text-4xl font-bold mb-1" aria-label="15 anos ou mais">15+</span>
              <span className="text-sm font-medium opacity-90">Anos de estrada e dedicação</span>
            </div>
          </div>

          {/* Coluna texto */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-fiuza-blue mb-4 block">
                Nossa história
              </span>
              <h2 className="about-text text-4xl md:text-5xl font-bold leading-tight mb-6">
                Tradição em <br />
                <span className="text-fiuza-blue">Conectar o Brasil</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p className="about-text">
                A Fiuza Transportes nasceu da paixão pela logística e do compromisso com a palavra dada. O que começou com um único caminhão, hoje é uma operação robusta com mais de 2.100 rotas mensais conectando produtores e consumidores em todo o território nacional.
              </p>
              <p className="about-text">
                Nossa missão vai além de transportar cargas — nós transportamos confiança. Com 99.7% de entregas no prazo e seguro total em toda a frota, garantimos a integridade do seu patrimônio em cada quilômetro.
              </p>
            </div>

            {/* Pilares com ícones — E9 fix: key semântico */}
            <div className="about-text pt-4 grid grid-cols-1 gap-5">
              {PILLARS.map(({ id, Icon, title, desc }) => (
                <div key={id} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-fiuza-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-fiuza-blue group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5 text-fiuza-blue group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-fiuza-dark mb-0.5">{title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
