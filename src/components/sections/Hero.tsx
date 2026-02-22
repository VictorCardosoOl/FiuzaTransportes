import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Globe, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Initial Reveal
      tl.from(".hero-line", {
        yPercent: 100,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      })
      .from(".hero-meta", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.8")
      .from(".hero-image-wrapper", {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
      }, "-=1");

      // Scroll Parallax & Blur
      gsap.to(".hero-image", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-title-container", {
        yPercent: 50,
        opacity: 0,
        filter: "blur(10px)",
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
      className="relative min-h-[110vh] w-full bg-fiuza-cream text-fiuza-dark pt-32 pb-20 overflow-hidden flex flex-col justify-between"
    >
      {/* Background Grid Lines */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="container mx-auto h-full border-x border-black/5 grid grid-cols-1 md:grid-cols-12 h-full">
          <div className="hidden md:block col-span-3 border-r border-black/5 h-full" />
          <div className="hidden md:block col-span-3 border-r border-black/5 h-full" />
          <div className="hidden md:block col-span-3 border-r border-black/5 h-full" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col h-full">
        
        {/* Top Meta Info */}
        <div className="flex justify-between items-start mb-12 md:mb-24 hero-meta">
          <div className="flex items-center gap-3 text-[10px] font-medium tracking-[0.2em] uppercase opacity-50">
            <Globe className="w-3 h-3" />
            <span>Logística Nacional</span>
          </div>
          <div className="hidden md:flex flex-col text-right text-[10px] font-medium tracking-[0.2em] uppercase opacity-50">
            <span>Est. 2008</span>
            <span>São Paulo — Brasil</span>
          </div>
        </div>

        {/* Main Typography */}
        <div className="relative z-20 mb-16 md:mb-24 hero-title-container">
          <h1 className="font-display font-medium text-[13vw] leading-[0.85] tracking-[-0.04em] uppercase text-fiuza-dark mix-blend-multiply">
            <div className="overflow-hidden"><span className="hero-line block">Fiuza</span></div>
            <div className="overflow-hidden"><span className="hero-line block text-fiuza-blue italic font-serif tracking-normal transform translate-x-4">Transportes</span></div>
          </h1>
          <div className="mt-8 md:mt-0 md:absolute md:top-4 md:right-0 max-w-xs overflow-hidden">
             <p className="hero-line text-lg leading-relaxed text-fiuza-dark/70 font-serif italic">
               "Conectando indústrias e mercados com precisão cirúrgica e frota de alta performance."
             </p>
          </div>
        </div>

        {/* Image & CTA Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-fiuza-dark/5 pt-8">
          
          {/* CTA Column */}
          <div className="md:col-span-4 hero-meta space-y-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-fiuza-blue" />
                <span className="text-xs font-medium tracking-wide uppercase opacity-70">Seguro RCTR-C e RCF-DC incluso</span>
              </div>
              <p className="text-sm text-fiuza-dark/60 max-w-xs leading-relaxed font-light">
                Monitoramento 24h via satélite para garantir a integridade total da sua carga.
              </p>
            </div>
            <Button size="lg" className="w-full md:w-auto bg-fiuza-blue text-white hover:bg-fiuza-dark rounded-full px-8 py-6 text-sm tracking-widest uppercase font-medium transition-all duration-500">
              Solicitar Cotação <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Hero Image */}
          <div className="md:col-span-8 relative">
            <div className="hero-image-wrapper aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm shadow-2xl shadow-fiuza-blue/10">
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop&sat=-20"
                alt="Logística Fiuza"
                className="hero-image w-full h-[120%] object-cover object-center -mt-[10%] filter contrast-[1.1] brightness-[0.95]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
