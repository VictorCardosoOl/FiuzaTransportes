import React, { useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";

// ─── Constantes fora do componente (não recriadas a cada render) ───────────
const HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop&sat=-100";

/** Posição e tamanho da imagem vertical (9:16) posicionada à direita do centro.
 *  Usado tanto no div da imagem quanto no clip-path da Layer 3.
 *  left = 54% → left = IMAGE_LEFT
 *  right clip = 100% - 54% - 30% = 16% → IMAGE_RIGHT_CLIP
 */
const HERO_LAYOUT = {
  imageLeft: "54%",
  imageRightClip: "16%",
} as const;

// ─── Sub-componentes ───────────────────────────────────────────────────────

/** Renderiza os caracteres animáveis de uma string como <span>s individuais. */
function AnimatedChars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span key={i} className="hero-char block">
          {char}
        </span>
      ))}
    </>
  );
}

interface HeroTitleProps {
  /** Quando true, aplica aria-hidden e estilos de texto transparente com borda. */
  isClipLayer?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Tipografia do Hero.
 * Compartilhada entre a Layer 1 (texto sólido) e a Layer 3 (texto transparente clipped),
 * eliminando a duplicação de JSX que existia anteriormente.
 */
function HeroTitle({ isClipLayer = false, className = "", style }: HeroTitleProps) {
  return (
    <h1
      aria-hidden={isClipLayer}
      className={`font-display text-[16vw] leading-[0.8] font-medium tracking-tighter uppercase pointer-events-none select-none ${className}`}
      style={style}
    >
      <div className="overflow-hidden flex">
        <AnimatedChars text="LOGISTICS" />
      </div>
      <div className="overflow-hidden flex items-center gap-4 md:gap-12">
        <span
          className="hero-char block text-fiuza-blue italic font-serif tracking-normal text-[0.4em] normal-case transform -translate-y-4 md:-translate-y-8"
          style={isClipLayer ? { color: "transparent", WebkitTextStroke: "1px white" } : undefined}
        >
          Solutions
        </span>
        <AnimatedChars text="REDEFINED" />
      </div>
    </h1>
  );
}

// ─── Componente principal ──────────────────────────────────────────────────

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // I1 fix: gsap.registerPlugin centralizado no SmoothScrollWrapper — não registrado aqui.
  // D3 fix: lógica de animação extraída para hook customizado.
  useHeroAnimation({ containerRef, imageRef });

  const { imageLeft, imageRightClip } = HERO_LAYOUT;

  return (
    <section
      id="inicio"
      ref={containerRef}
      // I2 fix: tokens do design system no lugar de magic strings de cor.
      className="relative min-h-screen w-full bg-fiuza-cream text-fiuza-dark pt-32 pb-12 px-4 md:px-8 flex flex-col justify-between overflow-hidden"
    >
      {/* Grid Lines decorativo */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <div className="w-full h-full border-x border-fiuza-dark/5 mx-auto max-w-[1800px] grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-1 md:col-span-3 border-r border-fiuza-dark/5 h-full" />
          <div className="col-span-1 md:col-span-3 border-r border-fiuza-dark/5 h-full" />
          <div className="col-span-1 md:col-span-3 border-r border-fiuza-dark/5 h-full" />
        </div>
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex justify-between items-start max-w-[1800px] mx-auto w-full hero-meta-reveal">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">Logistics Partner</span>
          <span className="text-sm font-medium tracking-wide">
            Fiuza Transportes ©{new Date().getFullYear()}
          </span>
        </div>
        <div className="hidden md:flex gap-12">
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">Location</span>
            <span className="text-sm font-medium tracking-wide">São Paulo, BR</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">Status</span>
            <div className="flex items-center gap-2 justify-end">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
              <span className="text-sm font-medium tracking-wide">Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content — Técnica: 3 camadas com clip-path */}
      <div
        className="relative flex-1 flex flex-col justify-center max-w-[1800px] mx-auto w-full mt-12 md:mt-0"
        style={{ zIndex: 20 }}
      >
        <div className="relative">

          {/* ── LAYER 1: Texto sólido escuro (z-10) — visível fora da imagem ── */}
          <HeroTitle
            className="text-fiuza-dark"
            style={{ position: "relative", zIndex: 10 }}
          />

          {/* ── LAYER 2: Imagem 9:16 (z-20) — posicionada à direita do centro ── */}
          <div
            className="hero-image-mask overflow-hidden"
            style={{
              position: "absolute",
              top: "50%",
              left: imageLeft,
              transform: "translateY(-50%)",
              width: "30vw",
              aspectRatio: "9 / 16",
              zIndex: 20,
            }}
          >
            <img
              ref={imageRef}
              src={HERO_IMAGE_SRC}
              alt="Veículo de logística Fiuza Transportes em operação"
              style={{ width: "100%", height: "120%", objectFit: "cover", objectPosition: "center" }}
              className="grayscale contrast-150"
            />
            {/* Overlay escuro → aumenta contraste para as bordas brancas se destacarem */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} aria-hidden="true" />
          </div>

          {/* ── LAYER 3: Texto transparente + borda branca, recortado (z-30) ──
              clip-path inset recorta o h1 para cobrir exatamente a área da imagem.
              Resultado: apenas as letras SOBRE a imagem ficam ocas com contorno branco.
          */}
          <HeroTitle
            isClipLayer
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 30,
              color: "transparent",
              WebkitTextStroke: "3px white",
              clipPath: `inset(0 ${imageRightClip} 0 ${imageLeft})`,
              filter: "drop-shadow(0 0 6px rgba(255,255,255,0.5))",
            }}
          />

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 flex justify-between items-end max-w-[1800px] mx-auto w-full hero-meta-reveal pb-8">
        <div className="max-w-xs">
          <p className="text-xs md:text-sm leading-relaxed opacity-70 font-medium">
            Conectando pontos estratégicos com inteligência e precisão.
            Sua carga, nosso compromisso absoluto.
          </p>
        </div>
        <button
          className="group flex items-center gap-4"
          aria-label="Rolar para explorar o conteúdo"
          onClick={() => document.getElementById("social-proof")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-xs font-mono uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
            Scroll to Explore
          </span>
          <div className="w-10 h-10 rounded-full border border-fiuza-dark/20 flex items-center justify-center group-hover:bg-fiuza-dark group-hover:text-white transition-all">
            <ArrowDownRight className="w-4 h-4" />
          </div>
        </button>
      </div>
    </section>
  );
}
