import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Star, Quote } from "lucide-react";


const testimonials = [
  {
    name: "Carlos Mendes",
    role: "Gerente de Logística, Indústria ABC",
    text: "A pontualidade da Fiuza é impressionante. Nossas cargas chegam sempre no prazo e intactas.",
  },
  {
    name: "Fernanda Oliveira",
    role: "Proprietária, E-commerce Beauty",
    text: "Facilidade de comunicação e rastreamento em tempo real. Recomendo para quem precisa de segurança.",
  },
  {
    name: "Roberto Santos",
    role: "Diretor, Construtora RS",
    text: "Parceiros de longa data. A flexibilidade da frota nos atende desde pequenas entregas até grandes volumes.",
  },
];

const partners = [
  "Amazon", "Google", "Slack", "Netflix", "Apple", "Microsoft", "Tesla", "SpaceX"
];

export default function SocialProof() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Marquee Animation
      const marquee = marqueeRef.current;
      if (marquee) {
        const content = marquee.querySelector(".marquee-content");
        if (content) {
          const clone = content.cloneNode(true);
          marquee.appendChild(clone);

          gsap.to(marquee.children, {
            xPercent: -100,
            repeat: -1,
            duration: 20,
            ease: "linear",
          });
        }
      }

      // Testimonial Reveal
      gsap.from(".testimonial-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="social-proof" ref={containerRef} className="py-24 bg-white border-b border-fiuza-dark/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-20">
        <div className="text-center mb-12">
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-fiuza-blue mb-4 block">
            Confiança
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-fiuza-dark">
            Parceiros que <span className="font-serif italic text-fiuza-blue">movem o mundo</span>
          </h2>
        </div>

        {/* Marquee */}
        <div className="relative w-full overflow-hidden py-8 border-y border-fiuza-dark/5">
          <div ref={marqueeRef} className="flex gap-16 w-max items-center">
            <div className="marquee-content flex gap-16 items-center">
              {partners.map((partner, i) => (
                <span key={i} className="text-4xl md:text-6xl font-display font-bold text-fiuza-dark/10 uppercase tracking-tighter hover:text-fiuza-blue/20 transition-colors cursor-default">
                  {partner}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div key={i} className="testimonial-card group bg-[#F8FAFC] p-10 rounded-sm hover:bg-fiuza-dark hover:text-white transition-all duration-500 cursor-default">
              <Quote className="w-8 h-8 text-fiuza-blue mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
              <p className="text-lg font-serif italic mb-8 leading-relaxed opacity-80">"{item.text}"</p>
              <div className="border-t border-current/10 pt-6 mt-auto">
                <h4 className="font-display font-bold tracking-wide uppercase text-sm mb-1">{item.name}</h4>
                <p className="text-xs opacity-50 font-mono uppercase tracking-wider">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
