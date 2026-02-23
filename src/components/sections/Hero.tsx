import { useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";
import { whatsappUrl } from "@/config/contact";

// ── Imagem fullscreen — caminhão em rodovia, perspectiva grandiosa
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1519003300449-424ad0405076?q=80&w=2940&auto=format&fit=crop";

const WHATSAPP = whatsappUrl("Olá! Gostaria de solicitar um orçamento para transporte.");

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({ containerRef, imageRef });

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-fiuza-dark flex flex-col"
    >
      {/* ── Imagem fullscreen com parallax ── */}
      <div ref={imageRef} className="hero-image-wrap absolute inset-0 w-full h-[115%]">
        <img
          src={HERO_IMAGE}
          alt="Caminhão Fiuza Transportes em rodovia — logística de alto desempenho"
          className="w-full h-full object-cover object-center"
          style={{ willChange: "transform" }}
          fetchPriority="high"
          decoding="sync"
        />
      </div>

      {/* ── Overlay em gradiente — legibilidade do texto ── */}
      <div
        className="hero-overlay absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.25) 40%, rgba(10,10,15,0.72) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Ruído de textura para profundidade ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* ── Top bar ── */}
      <div className="relative z-10 flex justify-between items-start px-6 md:px-10 pt-28 hero-bottom">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 mb-1">
            Logística & Transporte
          </p>
          <p className="text-sm font-display font-medium tracking-wide text-white/80">
            Fiuza Transportes — Est. 2009
          </p>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="text-right">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-1">Sede</p>
            <p className="text-sm text-white/70 font-light">São Paulo, BR</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Operacional</span>
          </div>
        </div>
      </div>

      {/* ── Headline principal — coração do Hero ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-10 pb-36 md:pb-40">

        {/* Eyebrow */}
        <div className="overflow-hidden mb-6 md:mb-8">
          <p className="hero-eyebrow text-[10px] font-mono uppercase tracking-[0.35em] text-fiuza-cream/60">
            Conectando o Brasil desde 2009
          </p>
        </div>

        {/* H1 — tipografia mista: Display + Serif italic */}
        <h1 className="text-fiuza-cream">
          {/* Linha 1 */}
          <div className="overflow-hidden">
            <span className="hero-line block font-display font-bold text-[13vw] md:text-[10vw] lg:text-[8.5vw] leading-[0.86] tracking-tight uppercase">
              Transportamos
            </span>
          </div>

          {/* Linha 2 — combina dois pesos */}
          <div className="overflow-hidden flex flex-wrap items-baseline gap-x-4 md:gap-x-6">
            <span className="hero-line block font-serif italic font-light text-[12vw] md:text-[9.5vw] lg:text-[8vw] leading-[0.9] text-fiuza-cream/90">
              com
            </span>
            <span className="hero-line block font-display font-bold text-[13vw] md:text-[10vw] lg:text-[8.5vw] leading-[0.86] tracking-tight uppercase">
              Confiança
            </span>
          </div>

          {/* Linha 3 — destaque em azul */}
          <div className="overflow-hidden mt-1 md:mt-2">
            <span
              className="hero-line block font-serif italic font-light text-[10vw] md:text-[7.5vw] lg:text-[6.5vw] leading-[1]"
              style={{ color: "hsl(220 90% 72%)" }}
            >
              — do produtor ao consumidor.
            </span>
          </div>
        </h1>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 px-6 md:px-10 pb-10 border-t border-white/8 pt-6">

        {/* Descrição */}
        <p className="hero-bottom max-w-sm text-sm text-white/60 font-light leading-relaxed">
          +800 empresas confiam na Fiuza para suas operações logísticas em todo o território nacional.
        </p>

        {/* CTAs */}
        <div className="hero-bottom flex items-center gap-4 md:gap-6">
          {/* CTA Primário */}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-white text-fiuza-dark text-[11px] font-mono uppercase tracking-[0.2em] px-7 py-4 rounded-full hover:bg-fiuza-cream transition-colors duration-300"
          >
            Solicitar Cotação
            <ArrowDownRight className="w-4 h-4 rotate-[-45deg] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Scroll hint */}
          <button
            className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Rolar para explorar"
            onClick={() => document.getElementById("social-proof")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-white hidden md:block">
              Explorar
            </span>
            <div className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowDownRight className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </div>

      {/* ── Linha decorativa inferior ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />
    </section>
  );
}
