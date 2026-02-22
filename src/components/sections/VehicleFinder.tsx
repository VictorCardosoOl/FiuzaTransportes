import { useState, useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Check, RefreshCw, Package, Truck, Box, Factory } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { whatsappUrl } from "@/config/contact";

// D2 fix: Tipagem forte com discriminated unions — sem strings soltas no estado.
type LoadTypeId = "furniture" | "boxes" | "industrial" | "documents";
type WeightRangeId = "small" | "medium" | "large" | "xl";
type Step = "type" | "weight" | "result";

interface WizardSelection {
  type: LoadTypeId | null;
  weight: WeightRangeId | null;
}

// Dados estáticos fora do componente
const LOAD_TYPES: { id: LoadTypeId; label: string; icon: typeof Package }[] = [
  { id: "furniture", label: "Móveis / Mudança", icon: Package },
  { id: "boxes", label: "Caixas / Pallets", icon: Box },
  { id: "industrial", label: "Maquinário", icon: Factory },
  { id: "documents", label: "Pequenos Volumes", icon: Truck },
];

const WEIGHT_RANGES: { id: WeightRangeId; label: string; desc: string }[] = [
  { id: "small", label: "Até 500kg", desc: "Cargas leves e rápidas" },
  { id: "medium", label: "500kg a 3 Ton", desc: "Volume médio" },
  { id: "large", label: "3 Ton a 14 Ton", desc: "Carga pesada" },
  { id: "xl", label: "Acima de 14 Ton", desc: "Grandes operações" },
];

const WEIGHT_TO_VEHICLE: Record<WeightRangeId, { name: string; desc: string }> = {
  small: { name: "Saveiro ou Bongo", desc: "Agilidade máxima para centros urbanos." },
  medium: { name: "Caminhão Toco", desc: "Equilíbrio ideal entre capacidade e acesso." },
  large: { name: "Caminhão Truck", desc: "Alta capacidade para rotas interestaduais." },
  xl: { name: "Carreta LS", desc: "Potência total para grandes volumes industriais." },
};

const PROGRESS_BY_STEP: Record<Step, string> = {
  type: "33%",
  weight: "66%",
  result: "100%",
};

export default function VehicleFinder() {
  const [step, setStep] = useState<Step>("type");
  const [selection, setSelection] = useState<WizardSelection>({ type: null, weight: null });
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // I5 + D2 fix: getRecommendation com useMemo, só computado quando weight muda.
  const recommendation = useMemo(() => {
    if (!selection.weight) return null;
    return WEIGHT_TO_VEHICLE[selection.weight];
  }, [selection.weight]);

  const animateTransition = (onMidpoint: () => void) => {
    const tl = gsap.timeline();
    tl.to(contentRef.current, { opacity: 0, y: -20, duration: 0.4, ease: "power2.in", onComplete: onMidpoint })
      .set(contentRef.current, { y: 20 })
      .to(contentRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
  };

  const handleTypeSelect = (typeId: LoadTypeId) => {
    animateTransition(() => {
      setSelection((prev) => ({ ...prev, type: typeId }));
      setStep("weight");
    });
  };

  const handleWeightSelect = (weightId: WeightRangeId) => {
    animateTransition(() => {
      setSelection((prev) => ({ ...prev, weight: weightId }));
      setStep("result");
    });
  };

  const reset = () => {
    const tl = gsap.timeline();
    tl.to(contentRef.current, {
      opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in",
      onComplete: () => {
        setStep("type");
        setSelection({ type: null, weight: null });
      },
    })
      .set(contentRef.current, { scale: 1 })
      .to(contentRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
  };

  return (
    <section id="simulador" ref={containerRef} className="py-32 bg-fiuza-cream relative overflow-hidden">
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
            <div className="absolute top-0 left-0 w-full h-1 bg-fiuza-light" aria-hidden="true">
              <div
                className="h-full bg-fiuza-blue transition-all duration-500 ease-out"
                style={{ width: PROGRESS_BY_STEP[step] }}
                role="progressbar"
                aria-valuenow={step === "type" ? 33 : step === "weight" ? 66 : 100}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progresso do simulador"
              />
            </div>

            <div ref={contentRef} className="min-h-[400px] flex flex-col justify-center">

              {/* STEP 1: Tipo de carga */}
              {step === "type" && (
                <div className="space-y-12">
                  <h3 className="font-display text-2xl md:text-3xl text-center">
                    O que você precisa transportar?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {LOAD_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleTypeSelect(type.id)}
                        className="group flex items-center gap-6 p-6 rounded-xl border border-fiuza-dark/10 hover:border-fiuza-blue hover:bg-fiuza-blue/5 transition-all duration-300 text-left"
                      >
                        <div className="w-12 h-12 rounded-full bg-fiuza-light flex items-center justify-center text-fiuza-blue group-hover:scale-110 transition-transform duration-300">
                          <type.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="font-display text-lg block mb-1 group-hover:text-fiuza-blue transition-colors">
                            {type.label}
                          </span>
                          <span className="text-xs text-fiuza-dark/40 uppercase tracking-wider">Selecionar</span>
                        </div>
                        <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-fiuza-blue" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Peso */}
              {step === "weight" && (
                <div className="space-y-12">
                  <h3 className="font-display text-2xl md:text-3xl text-center">
                    Qual o peso aproximado da carga?
                  </h3>
                  <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto w-full">
                    {WEIGHT_RANGES.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => handleWeightSelect(range.id)}
                        className="group flex items-center justify-between p-6 rounded-xl border border-fiuza-dark/10 hover:border-fiuza-blue hover:bg-fiuza-blue/5 transition-all duration-300 text-left"
                      >
                        <div>
                          <span className="font-display text-xl block mb-1 group-hover:text-fiuza-blue transition-colors">
                            {range.label}
                          </span>
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

              {/* STEP 3: Resultado */}
              {step === "result" && recommendation && (
                <div className="text-center space-y-8 max-w-xl mx-auto">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 text-green-600 mb-4">
                    <Check className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-fiuza-dark/40 mb-4 block">
                      Recomendação Fiuza
                    </span>
                    <h2 className="font-display text-5xl md:text-6xl font-bold text-fiuza-blue mb-6">
                      {recommendation.name}
                    </h2>
                    <p className="text-xl text-fiuza-dark/70 font-light leading-relaxed">
                      {recommendation.desc}
                    </p>
                  </div>
                  <div className="pt-8 flex flex-col gap-4">
                    {/* I6 fix: link externo como <a> via Button polimórfico */}
                    <Button
                      as="a"
                      size="lg"
                      href={whatsappUrl(
                        `Olá, fiz a simulação no site. Preciso de um ${recommendation.name} para transportar carga tipo ${selection.type}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-fiuza-blue text-white hover:bg-fiuza-dark rounded-full py-8 text-sm tracking-widest uppercase"
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
