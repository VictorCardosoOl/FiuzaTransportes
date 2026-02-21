import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/2560px-Slack_Technologies_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
];

export default function SocialProof() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".testimonial-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Partners Marquee (Static for now, could be animated) */}
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">
            Empresas que confiam na Fiuza Transportes
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {partners.map((logo, i) => (
              <img key={i} src={logo} alt="Partner Logo" className="h-8 md:h-10 object-contain" />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div key={i} className="testimonial-card bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{item.text}"</p>
              <div>
                <h4 className="font-bold text-fiuza-dark">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
