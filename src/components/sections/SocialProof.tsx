import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Star, Quote } from "lucide-react";

// E9 fix: key semântico pelo nome do cliente (campo estável, não índice)
const testimonials = [
  {
    id: "santos",
    name: "Ricardo Santos",
    role: "Diretor de Logística",
    company: "Indústrias Metalplex",
    text: "A Fiuza transformou nossa operação logística. São 3 anos de parceria e nunca tivemos um atraso sequer. A equipe é incrivelmente profissional e a frota, sempre impecável.",
    rating: 5,
  },
  {
    id: "almeida",
    name: "Fernanda Almeida",
    role: "Gerente de Suprimentos",
    company: "Construtora Alvorada",
    text: "Contratamos para transportar maquinário industrial de alto valor. O cuidado com a carga e a comunicação durante todo o trajeto nos deu total tranquilidade. Nota 10.",
    rating: 5,
  },
  {
    id: "costa",
    name: "Paulo Costa",
    role: "CEO",
    company: "Costa Distribuidora",
    text: "Na logística, tempo é dinheiro. A Fiuza entende isso como ninguém. Rotas otimizadas, rastreamento em tempo real e sempre dentro do prazo. Parceiro indispensável.",
    rating: 5,
  },
] as const;

// D6 fix: parceiros logísticos plausíveis, não big techs genéricas
const partners = [
  "ANTT Homologada",
  "SASSMAQ Certificada",
  "Mercado Livre Full",
  "GKO Logística",
  "Tegma Parceira",
  "Randon Conecta",
  "RODOVIÁRIO SP",
  "CNT Associada",
] as const;

export default function SocialProof() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animação de entrada dos cards
      gsap.from(".testimonial-card", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-grid",
          start: "top 75%",
        },
      });

      gsap.from(".partners-row", {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".partners-row",
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  // Marquee CSS puro (mais performático que GSAP para loop contínuo)
  return (
    <section
      id="social-proof"
      ref={containerRef}
      className="py-24 bg-white border-b border-fiuza-dark/5 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 mb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-fiuza-blue mb-4 block">
            Prova Social
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-fiuza-dark mb-4">
            O que dizem{" "}
            <span className="font-serif italic text-fiuza-blue">nossos clientes</span>
          </h2>
          <p className="text-fiuza-dark/50 max-w-md mx-auto text-sm">
            +800 empresas em todo o Brasil confiam na Fiuza para suas operações logísticas.
          </p>
        </div>

        {/* Grid de depoimentos */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="testimonial-card bg-fiuza-cream rounded-2xl p-8 flex flex-col gap-6 hover:shadow-lg hover:shadow-fiuza-dark/5 transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1" aria-label={`${t.rating} de 5 estrelas`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-fiuza-blue text-fiuza-blue" aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative flex-1">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-fiuza-blue/10" aria-hidden="true" />
                <p className="text-fiuza-dark/80 text-sm md:text-base leading-relaxed pl-4 font-light">
                  {t.text}
                </p>
              </div>

              {/* Author */}
              <footer className="border-t border-fiuza-dark/10 pt-4">
                <p className="font-display font-medium text-fiuza-dark">{t.name}</p>
                <p className="text-xs text-fiuza-dark/50 mt-0.5">
                  {t.role} · {t.company}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>

      {/* Marquee de parceiros */}
      <div className="partners-row relative overflow-hidden border-t border-b border-fiuza-dark/5 py-6">
        <div
          ref={marqueeRef}
          className="flex gap-16 items-center animate-[marquee_25s_linear_infinite] w-max"
          aria-label="Certificações e parceiros"
        >
          {/* Duplicado para loop seamless */}
          {[...partners, ...partners].map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="text-xs font-mono uppercase tracking-[0.2em] text-fiuza-dark/30 whitespace-nowrap select-none"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
