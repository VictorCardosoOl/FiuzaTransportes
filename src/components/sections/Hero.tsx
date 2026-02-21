import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Initial Reveal Animation
      tl.fromTo(
        ".hero-text-line",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        }
      )
        .fromTo(
          ".hero-image-reveal",
          { scale: 1.1, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .fromTo(
          ".hero-fade-in",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=1"
        );

      // Parallax Effect
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-fiuza-dark text-white"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 h-[120%] w-full" ref={imageRef}>
        <div className="hero-image-reveal absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2940&auto=format&fit=crop"
          alt="Caminhão Fiuza Transportes na estrada"
          className="hero-image-reveal h-full w-full object-cover object-center"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-20 container mx-auto flex min-h-screen flex-col justify-center px-4 py-20 md:px-6 lg:px-8">
        <div ref={textRef} className="max-w-3xl space-y-8">
          {/* Badge */}
          <div className="hero-fade-in inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Disponível para todo o Brasil
          </div>

          {/* Headline */}
          <div className="space-y-2 overflow-hidden">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-white">
              <div className="overflow-hidden">
                <span className="hero-text-line block text-fiuza-blue">
                  Fiuza Transportes:
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="hero-text-line block">
                  Transporte de Cargas
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="hero-text-line block">para todo o Brasil.</span>
              </div>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="hero-fade-in max-w-xl text-lg md:text-xl text-gray-300 leading-relaxed">
            Soluções completas em logística com frota diversificada e segurança garantida. 
            Qualquer tipo de carga, em qualquer lugar.
          </p>

          {/* CTA Buttons */}
          <div className="hero-fade-in flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="group bg-green-600 hover:bg-green-500 text-white border-none shadow-lg shadow-green-900/20"
              onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
            >
              <span className="mr-2">Solicitar Orçamento</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:border-white/40">
              Conhecer a Frota
            </Button>
          </div>

          {/* Social Proof / Trust Indicators */}
          <div className="hero-fade-in pt-12 border-t border-white/10 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, text: "Frota Própria" },
              { icon: CheckCircle2, text: "Seguro de Carga" },
              { icon: CheckCircle2, text: "Rastreamento 24h" },
              { icon: CheckCircle2, text: "Atendimento Nacional" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-400">
                <item.icon className="h-5 w-5 text-fiuza-blue" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-fade-in absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
