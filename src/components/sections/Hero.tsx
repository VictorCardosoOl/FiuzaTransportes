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

      // Scroll Parallax
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
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase opacity-60">
            <Globe className="w-4 h-4" />
            <span>Logística Nacional</span>
          </div>
          <div className="hidden md:flex flex-col text-right text-xs font-bold tracking-widest uppercase opacity-60">
            <span>Est. 2008</span>
            <span>São Paulo — Brasil</span>
          </div>
        </div>

        {/* Main Typography */}
        <div className="relative z-20 mb-12">
          <h1 className="font-display font-bold text-[13vw] leading-[0.8] tracking-tighter uppercase mix-blend-darken">
            <div className="overflow-hidden"><span className="hero-line block">Fiuza</span></div>
            <div className="overflow-hidden"><span className="hero-line block text-fiuza-blue">Transportes</span></div>
          </h1>
          <div className="mt-6 md:mt-0 md:absolute md:top-2 md:right-0 max-w-sm overflow-hidden">
             <p className="hero-line text-lg md:text-xl leading-relaxed text-gray-600 font-serif italic">
               "Conectando indústrias e mercados com precisão cirúrgica e frota de alta performance."
             </p>
          </div>
        </div>

        {/* Image & CTA Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          
          {/* CTA Column */}
          <div className="md:col-span-4 hero-meta space-y-8">
            <div className="flex flex-col gap-4 border-t border-black/10 pt-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-fiuza-blue" />
                <span className="text-sm font-medium">Seguro RCTR-C e RCF-DC incluso</span>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                Monitoramento 24h via satélite para garantir a integridade total da sua carga.
              </p>
            </div>
            <Button size="lg" className="w-full md:w-auto bg-fiuza-dark text-white hover:bg-fiuza-blue rounded-none">
              Solicitar Cotação <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Hero Image */}
          <div className="md:col-span-8 relative">
            <div className="hero-image-wrapper aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg md:rounded-tl-[4rem] shadow-2xl">
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop"
                alt="Logística Fiuza"
                className="hero-image w-full h-[120%] object-cover object-center -mt-[10%]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
