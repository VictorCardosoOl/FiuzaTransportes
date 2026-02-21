import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Step = "type" | "weight" | "result";

const loadTypes = [
  { id: "furniture", label: "Móveis / Mudança", icon: "🛋️" },
  { id: "boxes", label: "Caixas / Pallets", icon: "📦" },
  { id: "industrial", label: "Maquinário", icon: "🏭" },
  { id: "documents", label: "Pequenos Volumes", icon: "📄" },
];

const weightRanges = [
  { id: "small", label: "Até 500kg", max: 500 },
  { id: "medium", label: "500kg a 3 Ton", max: 3000 },
  { id: "large", label: "3 Ton a 14 Ton", max: 14000 },
  { id: "xl", label: "Acima de 14 Ton", max: 30000 },
];

export default function VehicleFinder() {
  const [step, setStep] = useState<Step>("type");
  const [selection, setSelection] = useState({ type: "", weight: "" });
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleNext = (key: string, value: string) => {
    // Animate out
    gsap.to(contentRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      onComplete: () => {
        setSelection((prev) => ({ ...prev, [key]: value }));
        if (key === "type") setStep("weight");
        if (key === "weight") setStep("result");
        
        // Animate in
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.3 }
        );
      },
    });
  };

  const reset = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      onComplete: () => {
        setStep("type");
        setSelection({ type: "", weight: "" });
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.3 }
        );
      },
    });
  };

  const getRecommendation = () => {
    const { type, weight } = selection;
    if (weight === "small") return { name: "Saveiro ou Bongo", desc: "Agilidade para cargas leves." };
    if (weight === "medium") return { name: "Caminhão Toco", desc: "Ideal para cargas médias." };
    if (weight === "large") return { name: "Caminhão Truck", desc: "Alta capacidade para grandes volumes." };
    return { name: "Carreta LS", desc: "Máxima capacidade para grandes operações." };
  };

  const result = getRecommendation();

  return (
    <section ref={containerRef} className="py-24 bg-fiuza-cream relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-fiuza-blue rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-fiuza-dark rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-fiuza-dark">
            Encontre o Veículo Ideal
          </h2>
          <p className="text-gray-600">
            Responda 2 perguntas rápidas e descubra a melhor opção para sua carga.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-fiuza-dark/5 p-8 md:p-12 border border-white/50 backdrop-blur-sm">
          <div ref={contentRef} className="min-h-[300px] flex flex-col justify-center">
            
            {/* STEP 1: TYPE */}
            {step === "type" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-center mb-8">
                  1. O que você precisa transportar?
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {loadTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleNext("type", type.id)}
                      className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-transparent bg-fiuza-cream/50 hover:bg-fiuza-light hover:border-fiuza-blue/30 transition-all duration-200 group"
                    >
                      <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                        {type.icon}
                      </span>
                      <span className="font-medium text-fiuza-dark">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: WEIGHT */}
            {step === "weight" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-center mb-8">
                  2. Qual o peso aproximado?
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {weightRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => handleNext("weight", range.id)}
                      className="flex items-center justify-between p-4 px-6 rounded-xl border border-gray-200 hover:border-fiuza-blue hover:bg-fiuza-light transition-all duration-200 text-left group"
                    >
                      <span className="font-medium text-fiuza-dark">{range.label}</span>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-fiuza-blue transition-colors" />
                    </button>
                  ))}
                </div>
                <button 
                  onClick={reset}
                  className="w-full text-center text-sm text-gray-400 hover:text-fiuza-blue mt-4"
                >
                  Voltar ao início
                </button>
              </div>
            )}

            {/* STEP 3: RESULT */}
            {step === "result" && (
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-2">
                  <Check className="w-8 h-8" />
                </div>
                
                <div>
                  <h3 className="text-lg text-gray-500 mb-2">Recomendação Fiuza:</h3>
                  <h2 className="text-4xl font-bold text-fiuza-blue mb-2">
                    {result.name}
                  </h2>
                  <p className="text-gray-600">{result.desc}</p>
                </div>

                <div className="pt-6 flex flex-col gap-3">
                  <Button 
                    size="lg" 
                    className="w-full bg-green-600 hover:bg-green-500"
                    onClick={() => window.open(`https://wa.me/5511999999999?text=Olá, fiz a simulação no site. Preciso de um ${result.name} para transportar carga tipo ${selection.type}.`, "_blank")}
                  >
                    Cotar {result.name} Agora
                  </Button>
                  
                  <button
                    onClick={reset}
                    className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-fiuza-dark py-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refazer Simulação
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
