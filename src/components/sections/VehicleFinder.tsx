import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Check, RefreshCw, Package, Truck, Box, Factory } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Step = "type" | "weight" | "result";

const loadTypes = [
  { id: "furniture", label: "Móveis / Mudança", icon: Package },
  { id: "boxes", label: "Caixas / Pallets", icon: Box },
  { id: "industrial", label: "Maquinário", icon: Factory },
  { id: "documents", label: "Pequenos Volumes", icon: Truck },
];

const weightRanges = [
  { id: "small", label: "Até 500kg", desc: "Cargas leves e rápidas" },
  { id: "medium", label: "500kg a 3 Ton", desc: "Volume médio" },
  { id: "large", label: "3 Ton a 14 Ton", desc: "Carga pesada" },
  { id: "xl", label: "Acima de 14 Ton", desc: "Grandes operações" },
];

export default function VehicleFinder() {
  const [step, setStep] = useState<Step>("type");
  const [selection, setSelection] = useState({ type: "", weight: "" });
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleNext = (key: string, value: string) => {
    const tl = gsap.timeline();
    
    tl.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setSelection((prev) => ({ ...prev, [key]: value }));
        if (key === "type") setStep("weight");
        if (key === "weight") setStep("result");
      },
    })
    .set(contentRef.current, { y: 20 })
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const reset = () => {
    const tl = gsap.timeline();
    
    tl.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setStep("type");
        setSelection({ type: "", weight: "" });
      },
    })
    .set(contentRef.current, { scale: 1 })
    .to(contentRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  };

  const getRecommendation = () => {
    const { weight } = selection;
    if (weight === "small") return { name: "Saveiro ou Bongo", desc: "Agilidade máxima para centros urbanos." };
    if (weight === "medium") return { name: "Caminhão Toco", desc: "Equilíbrio ideal entre capacidade e acesso." };
    if (weight === "large") return { name: "Caminhão Truck", desc: "Alta capacidade para rotas interestaduais." };
    return { name: "Carreta LS", desc: "Potência total para grandes volumes industriais." };
  };

  const result = getRecommendation();

  return (
    <section ref={containerRef} className="py-32 bg-fiuza-cream relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-fiuza-blue mb-4 block">
              Simulador Inteligente
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-fiuza-dark mb-6">
              Descubra o veículo <span className="font-serif italic text-fiuza-blue">ideal</span>
            </h2>
            <p className="text-fiuza-dark/60 max-w-lg mx-auto font-light">
              Responda algumas perguntas rápidas e nossa inteligência logística recomendará a melhor opção para sua carga.
            </p>
          </div>

          {/* Wizard Card */}
          <div className="bg-white rounded-2xl shadow-2xl shadow-fiuza-dark/5 p-8 md:p-16 border border-fiuza-dark/5 relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-fiuza-light">
              <div 
                className="h-full bg-fiuza-blue transition-all duration-500 ease-out"
                style={{ width: step === "type" ? "33%" : step === "weight" ? "66%" : "100%" }}
              />
            </div>

            <div ref={contentRef} className="min-h-[400px] flex flex-col justify-center">
              
              {/* STEP 1: TYPE */}
              {step === "type" && (
                <div className="space-y-12">
                  <h3 className="font-display text-2xl md:text-3xl text-center">
                    O que você precisa transportar?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {loadTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleNext("type", type.id)}
                        className="group flex items-center gap-6 p-6 rounded-xl border border-fiuza-dark/10 hover:border-fiuza-blue hover:bg-fiuza-blue/5 transition-all duration-300 text-left"
                      >
                        <div className="w-12 h-12 rounded-full bg-fiuza-light flex items-center justify-center text-fiuza-blue group-hover:scale-110 transition-transform duration-300">
                          <type.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="font-display text-lg block mb-1 group-hover:text-fiuza-blue transition-colors">{type.label}</span>
                          <span className="text-xs text-fiuza-dark/40 uppercase tracking-wider">Selecionar</span>
                        </div>
                        <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-fiuza-blue" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: WEIGHT */}
              {step === "weight" && (
                <div className="space-y-12">
                  <h3 className="font-display text-2xl md:text-3xl text-center">
                    Qual o peso aproximado da carga?
                  </h3>
                  <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto w-full">
                    {weightRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => handleNext("weight", range.id)}
                        className="group flex items-center justify-between p-6 rounded-xl border border-fiuza-dark/10 hover:border-fiuza-blue hover:bg-fiuza-blue/5 transition-all duration-300 text-left"
                      >
                        <div>
                          <span className="font-display text-xl block mb-1 group-hover:text-fiuza-blue transition-colors">{range.label}</span>
                          <span className="text-sm text-fiuza-dark/50 font-light">{range.desc}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-fiuza-dark/20 flex items-center justify-center group-hover:border-fiuza-blue group-hover:bg-fiuza-blue group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={reset}
                    className="w-full text-center text-xs font-mono uppercase tracking-widest text-fiuza-dark/40 hover:text-fiuza-blue transition-colors"
                  >
                    Voltar ao início
                  </button>
                </div>
              )}

              {/* STEP 3: RESULT */}
              {step === "result" && (
                <div className="text-center space-y-8 max-w-xl mx-auto">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 text-green-600 mb-4">
                    <Check className="w-10 h-10" />
                  </div>
                  
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-fiuza-dark/40 mb-4 block">Recomendação Fiuza</span>
                    <h2 className="font-display text-5xl md:text-6xl font-bold text-fiuza-blue mb-6">
                      {result.name}
                    </h2>
                    <p className="text-xl text-fiuza-dark/70 font-light leading-relaxed">
                      {result.desc}
                    </p>
                  </div>

                  <div className="pt-8 flex flex-col gap-4">
                    <Button 
                      size="lg" 
                      className="w-full bg-fiuza-blue text-white hover:bg-fiuza-dark rounded-full py-8 text-sm tracking-widest uppercase"
                      onClick={() => window.open(`https://wa.me/5511999999999?text=Olá, fiz a simulação no site. Preciso de um ${result.name} para transportar carga tipo ${selection.type}.`, "_blank")}
                    >
                      Solicitar Cotação Agora
                    </Button>
                    
                    <button
                      onClick={reset}
                      className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-fiuza-dark/40 hover:text-fiuza-blue py-4 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Refazer Simulação
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
