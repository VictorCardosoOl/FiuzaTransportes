import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Reveal Text
      tl.from(".hero-char", {
        yPercent: 100,
        duration: 1.5,
        stagger: 0.02,
        ease: "power4.out",
      })
        .from(".hero-meta-reveal", {
          opacity: 0,
          y: 20,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        }, "-=1")
        .from(".hero-image-mask", {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 1.5,
          ease: "expo.inOut",
        }, "-=1.2")
        .from(imageRef.current, {
          scale: 1.5,
          duration: 2,
          ease: "power2.out",
        }, "-=1.5");

      // Parallax
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  // Posição e tamanho da imagem — usados tanto no div da imagem quanto no clip-path da Layer 3
  // A imagem começa em 50% da largura do container + deslocamento de 4%, largura de 30vw
  // clip-path: inset(top right bottom left) — em % do elemento pai
  // left  = 54% → borda esquerda da imagem
  // right = 100% - 54% - 30% = 16% → borda direita da imagem (30vw ≈ 30% em container full-width)
  const IMAGE_LEFT = "54%";
  const IMAGE_RIGHT_CLIP = "16%"; // 100 - 54 - 30 = 16

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#F2F2F2] text-[#111] pt-32 pb-12 px-4 md:px-8 flex flex-col justify-between overflow-hidden"
    >
      {/* Grid Lines */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="w-full h-full border-x border-[#111]/5 mx-auto max-w-[1800px] grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-1 md:col-span-3 border-r border-[#111]/5 h-full" />
          <div className="col-span-1 md:col-span-3 border-r border-[#111]/5 h-full" />
          <div className="col-span-1 md:col-span-3 border-r border-[#111]/5 h-full" />
        </div>
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex justify-between items-start max-w-[1800px] mx-auto w-full hero-meta-reveal">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">Logistics Partner</span>
          <span className="text-sm font-medium tracking-wide">Fiuza Transportes ©2024</span>
        </div>
        <div className="hidden md:flex gap-12">
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">Location</span>
            <span className="text-sm font-medium tracking-wide">São Paulo, BR</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">Status</span>
            <div className="flex items-center gap-2 justify-end">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium tracking-wide">Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="relative flex-1 flex flex-col justify-center max-w-[1800px] mx-auto w-full mt-12 md:mt-0"
        style={{ zIndex: 20 }}
      >
        {/*
          ── TÉCNICA: 3 camadas com clip-path ──
          Layer 1 (z-10): Texto sólido escuro — fica atrás da imagem, visível fora dela
          Layer 2 (z-20): Imagem 9:16, posicionada à direita do centro
          Layer 3 (z-30): Texto transparente + borda branca, recortado (clip-path)
                          exatamente para cobrir só a área da imagem.
                          Resultado: apenas as letras sobre a imagem ficam ocas com contorno branco.
        */}
        <div className="relative">

          {/* ── LAYER 1: Texto SÓLIDO (atrás, z-10) ── */}
          <h1
            className="font-display text-[16vw] leading-[0.8] font-medium tracking-tighter uppercase text-[#111] pointer-events-none select-none"
            style={{ position: "relative", zIndex: 10 }}
          >
            <div className="overflow-hidden flex">
              {"LOGISTICS".split("").map((char, i) => (
                <span key={i} className="hero-char block">{char}</span>
              ))}
            </div>
            <div className="overflow-hidden flex items-center gap-4 md:gap-12">
              <span className="hero-char block text-fiuza-blue italic font-serif tracking-normal text-[0.4em] normal-case transform -translate-y-4 md:-translate-y-8">
                Solutions
              </span>
              {"REDEFINED".split("").map((char, i) => (
                <span key={i} className="hero-char block">{char}</span>
              ))}
            </div>
          </h1>

          {/* ── LAYER 2: Imagem 9:16 (z-20) — ligeiramente à direta do centro ── */}
          <div
            className="hero-image-mask overflow-hidden"
            style={{
              position: "absolute",
              top: "50%",
              left: IMAGE_LEFT,
              transform: "translateY(-50%)",
              width: "30vw",
              aspectRatio: "9 / 16",
              zIndex: 20,
            }}
          >
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop&sat=-100"
              alt="Editorial Logistics"
              style={{ width: "100%", height: "120%", objectFit: "cover", objectPosition: "center" }}
              className="grayscale contrast-125"
            />
          </div>

          {/* ── LAYER 3: Texto TRANSPARENTE com borda branca, clipped à área da imagem (z-30) ──
              clip-path: inset(top right bottom left)
              → recorta o h1 para que só a faixa de 54% a 84% da largura seja visível,
                coincidindo exatamente com a posição da imagem.
              → Resultado: somente as letras que ficam SOBRE a imagem aparecem ocas + contorno branco.
          */}
          <h1
            aria-hidden="true"
            className="font-display text-[16vw] leading-[0.8] font-medium tracking-tighter uppercase pointer-events-none select-none"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 30,
              color: "transparent",
              WebkitTextStroke: "2px white",
              clipPath: `inset(0 ${IMAGE_RIGHT_CLIP} 0 ${IMAGE_LEFT})`,
            }}
          >
            <div className="overflow-hidden flex">
              {"LOGISTICS".split("").map((char, i) => (
                <span key={i} className="hero-char block">{char}</span>
              ))}
            </div>
            <div className="overflow-hidden flex items-center gap-4 md:gap-12">
              <span className="hero-char block italic font-serif tracking-normal text-[0.4em] normal-case transform -translate-y-4 md:-translate-y-8"
                style={{ WebkitTextStroke: "1px white" }}>
                Solutions
              </span>
              {"REDEFINED".split("").map((char, i) => (
                <span key={i} className="hero-char block">{char}</span>
              ))}
            </div>
          </h1>

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

        <button className="group flex items-center gap-4">
          <span className="text-xs font-mono uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Scroll to Explore</span>
          <div className="w-10 h-10 rounded-full border border-[#111]/20 flex items-center justify-center group-hover:bg-[#111] group-hover:text-white transition-all">
            <ArrowDownRight className="w-4 h-4" />
          </div>
        </button>
      </div>

    </section>
  );
}
