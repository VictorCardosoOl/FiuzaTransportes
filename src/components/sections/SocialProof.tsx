import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const testimonials = [
  {
    id: "santos",
    name: "Ricardo Santos",
    role: "Diretor de Logística",
    company: "Metalplex Indústrias",
    text: "Três anos de parceria, zero atrasos. A Fiuza não é apenas um prestador — é parte do nosso processo produtivo.",
    rating: 5,
  },
  {
    id: "almeida",
    name: "Fernanda Almeida",
    role: "Gerente de Suprimentos",
    company: "Construtora Alvorada",
    text: "Transportaram maquinário de R$ 2M sem um arranhão. O cuidado e a comunicação durante todo o trajeto foram impecáveis.",
    rating: 5,
  },
  {
    id: "costa",
    name: "Paulo Costa",
    role: "CEO",
    company: "Costa Distribuidora",
    text: "Na logística, tempo é dinheiro. Com a Fiuza, rastreamento em tempo real e entregas sempre dentro do prazo negociado.",
    rating: 5,
  },
] as const;

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

  useGSAP(
    () => {
      gsap.from(".testimonial-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".testimonials-grid", start: "top 75%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="social-proof"
      ref={containerRef}
      className="py-32 bg-fiuza-light overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 mb-24">
        {/* Header */}
        <div className="mb-20">
          <span className="block text-[10px] font-mono uppercase tracking-[0.3em] text-fiuza-blue mb-6">
            Depoimentos
          </span>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] font-light text-fiuza-dark">
            O que dizem<br />
            <em className="text-fiuza-blue not-italic">quem confia</em>
          </h2>
        </div>

        {/* Grid de depoimentos */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-px bg-fiuza-dark/8">
          {testimonials.map((t, i) => (
            <article
              key={t.id}
              className="testimonial-card bg-fiuza-light p-10 flex flex-col gap-8"
            >
              {/* Número decorativo */}
              <span className="font-serif text-[80px] leading-none text-fiuza-dark/6 select-none" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Depoimento */}
              <blockquote className="flex-1">
                <p className="font-serif text-xl md:text-2xl font-light text-fiuza-dark leading-relaxed">
                  "{t.text}"
                </p>
              </blockquote>

              {/* Autor */}
              <footer className="border-t border-fiuza-dark/10 pt-6">
                <cite className="not-italic">
                  <p className="font-display font-semibold text-sm text-fiuza-dark">{t.name}</p>
                  <p className="text-xs text-fiuza-dark/40 mt-0.5 font-light">
                    {t.role} · {t.company}
                  </p>
                </cite>
              </footer>
            </article>
          ))}
        </div>
      </div>

      {/* Marquee de parceiros/certificações */}
      <div className="relative overflow-hidden border-t border-b border-fiuza-dark/6 py-5 bg-fiuza-cream">
        <div
          className="flex gap-20 items-center animate-[marquee_25s_linear_infinite] w-max"
          aria-label="Certificações e parcerias"
        >
          {[...partners, ...partners].map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="text-[10px] font-mono uppercase tracking-[0.25em] text-fiuza-dark/25 whitespace-nowrap select-none"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
