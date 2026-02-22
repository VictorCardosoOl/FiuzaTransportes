import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Initial Reveal
      tl.from(imageRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
      })
      .from(".hero-char", {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      }, "-=1.5")
      .from(".hero-meta-reveal", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.5");

      // Scroll Parallax
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

      gsap.to(textRef.current, {
        yPercent: -30,
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
      className="relative h-screen w-full bg-[#111] text-white overflow-hidden flex flex-col"
    >
      {/* Background Image (Truck) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/30 z-10" /> {/* Dimmer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10" />
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2940&auto=format&fit=crop"
          alt="Truck Hero"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Top Bar */}
      <div className="relative z-20 flex justify-between items-start w-full px-4 md:px-8 pt-8 hero-meta-reveal">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-80">Logistics Partner</span>
          <span className="text-sm font-medium tracking-wide">Fiuza Transportes ©2024</span>
        </div>
        <div className="hidden md:flex gap-12">
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-80">Location</span>
            <span className="text-sm font-medium tracking-wide">São Paulo, BR</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-80">Status</span>
            <div className="flex items-center gap-2 justify-end">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium tracking-wide">Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content (Centered Text) */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center w-full">
        <h1 ref={textRef} className="font-display font-bold text-[22vw] leading-[0.8] tracking-tighter uppercase text-center mix-blend-overlay opacity-90 select-none pointer-events-none">
          <div className="overflow-hidden flex justify-center">
            {"FIUZA".split("").map((char, i) => (
              <span key={i} className="hero-char block">{char}</span>
            ))}
          </div>
        </h1>
        
        {/* Foreground Text (Solid) to create depth/layering effect if needed, 
            or just keep the mix-blend one. Let's add a smaller solid one for readability 
            if the blend is too subtle, or just rely on the massive one. 
            The user asked for "Thumbnail style", which usually means high contrast.
            Let's add a stroke version on top.
        */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
             <h1 className="font-display font-bold text-[22vw] leading-[0.8] tracking-tighter uppercase text-center text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
              <div className="overflow-hidden flex justify-center">
                {"FIUZA".split("").map((char, i) => (
                  <span key={i} className="hero-char block">{char}</span>
                ))}
              </div>
            </h1>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-20 flex justify-between items-end w-full px-4 md:px-8 pb-8 hero-meta-reveal">
        <div className="max-w-xs">
          <p className="text-xs md:text-sm leading-relaxed opacity-90 font-medium text-shadow-sm">
            Conectando pontos estratégicos com inteligência e precisão. 
            Sua carga, nosso compromisso absoluto.
          </p>
        </div>
        
        <button className="group flex items-center gap-4 cursor-pointer">
          <span className="text-xs font-mono uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">Scroll to Explore</span>
          <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all backdrop-blur-sm">
            <ArrowDownRight className="w-5 h-5" />
          </div>
        </button>
      </div>

    </section>
  );
}
