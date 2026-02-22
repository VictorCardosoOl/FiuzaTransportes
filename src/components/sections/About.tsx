import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="sobre" ref={containerRef} className="py-24 bg-white text-fiuza-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[3/4] md:aspect-square w-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1000&auto=format&fit=crop"
                alt="Equipe Fiuza Transportes"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-fiuza-blue text-white p-8 rounded-2xl shadow-xl max-w-[200px]">
              <span className="block text-4xl font-bold mb-1">15+</span>
              <span className="text-sm font-medium opacity-90">Anos de estrada e dedicação</span>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="about-text text-4xl md:text-5xl font-bold leading-tight">
              Tradição em <br />
              <span className="text-fiuza-blue">Conectar o Brasil</span>
            </h2>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p className="about-text">
                A Fiuza Transportes nasceu da paixão pela logística e do compromisso com a palavra dada. O que começou com um único caminhão, hoje é uma operação robusta que conecta produtores e consumidores em todo o território nacional.
              </p>
              <p className="about-text">
                Nossa missão vai além de transportar cargas; nós transportamos confiança. Cada quilômetro rodado é planejado para garantir a integridade do seu patrimônio e a pontualidade que seu negócio exige.
              </p>
            </div>

            <div className="about-text pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: "Segurança", desc: "Monitoramento 24h e seguro total." },
                { title: "Transparência", desc: "Informação clara em tempo real." },
                { title: "Pontualidade", desc: "Respeito absoluto aos prazos." },
              ].map((item, i) => (
                <div key={i} className="border-l-2 border-fiuza-blue pl-4">
                  <h4 className="font-bold text-fiuza-dark mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
