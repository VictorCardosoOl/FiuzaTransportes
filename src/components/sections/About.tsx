import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Shield, Clock, MapPin } from "lucide-react";

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
    title: "Segurança Total",
    desc: "RCTR-C e RCF-DC em todas as cargas. Monitoramento 24h via satélite.",
  },
  {
    id: "pontualidade",
    Icon: Clock,
    title: "Pontualidade",
    desc: "99.7% das entregas no prazo. SLA garantido em contrato.",
  },
  {
    id: "cobertura",
    Icon: MapPin,
    title: "Cobertura Nacional",
    desc: "26 estados + DF. Bases próprias no eixo SP–MG–RJ.",
  },
] as const;

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-anim", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
      });

      gsap.from(".stat-item", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".stats-row", start: "top 82%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="sobre"
      ref={containerRef}
      className="py-32 bg-fiuza-cream text-fiuza-dark"
    >
      <div className="container mx-auto px-4 md:px-8">

        {/* Label */}
        <span className="about-anim block text-[10px] font-mono uppercase tracking-[0.3em] text-fiuza-blue mb-8">
          Sobre nós
        </span>

        {/* Headline grande */}
        <div className="about-anim flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-24">
          <h2 className="font-serif text-6xl md:text-8xl lg:text-[9rem] leading-[0.88] font-light">
            Tradição em<br />
            <em className="text-fiuza-blue not-italic">conectar o Brasil</em>
          </h2>
          <p className="text-sm text-fiuza-dark/50 max-w-xs leading-relaxed font-light md:pb-3 md:text-right">
            Desde 2009, conectamos produtores e consumidores em todo o território nacional com responsabilidade e pontualidade.
          </p>
        </div>

        {/* Faixa de estatísticas */}
        <div className="stats-row grid grid-cols-2 md:grid-cols-4 gap-px bg-fiuza-dark/6 mb-24">
          {STATS.map((s) => (
            <div key={s.label} className="stat-item bg-fiuza-cream text-center py-12 px-4">
              <span className="block font-serif text-5xl md:text-6xl text-fiuza-dark mb-2 font-light">
                {s.value}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-fiuza-dark/35">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Layout duas colunas — imagem + texto */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Imagem */}
          <div className="about-anim w-full lg:w-1/2 relative">
            <div className="aspect-[3/4] md:aspect-square w-full overflow-hidden bg-fiuza-light">
              <img
                src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1200&auto=format&fit=crop"
                alt="Motorista da equipe Fiuza Transportes — profissionalismo e comprometimento"
                width={1200}
                height={1200}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-fiuza-blue text-fiuza-cream p-8 max-w-[180px]">
              <span className="block font-serif text-4xl font-light mb-1">15+</span>
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-80 leading-tight">
                Anos de estrada
              </span>
            </div>
          </div>

          {/* Texto + pilares */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div className="about-anim space-y-6">
              <p className="font-serif text-2xl md:text-3xl font-light text-fiuza-dark leading-relaxed">
                O que começou com um único caminhão, hoje é uma operação com mais de{" "}
                <strong className="font-semibold text-fiuza-blue">2.100 rotas mensais</strong>{" "}
                em todo o território nacional.
              </p>
              <p className="text-base text-fiuza-dark/55 font-light leading-relaxed">
                Cada quilômetro é planejado para garantir a integridade do seu patrimônio e a pontualidade que seu negócio exige.
              </p>
            </div>

            {/* Pilares */}
            <div className="about-anim space-y-6">
              {PILLARS.map(({ id, Icon, title, desc }) => (
                <div key={id} className="flex items-start gap-5 group">
                  <div className="mt-0.5 w-10 h-10 border border-fiuza-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-fiuza-blue group-hover:border-fiuza-blue transition-all duration-300">
                    <Icon className="w-4 h-4 text-fiuza-blue group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm text-fiuza-dark mb-1">{title}</h4>
                    <p className="text-sm text-fiuza-dark/50 font-light leading-relaxed">{desc}</p>
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
