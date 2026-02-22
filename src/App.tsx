import { lazy, Suspense } from "react";
import SmoothScrollWrapper from "@/components/layout/SmoothScrollWrapper";
import Navbar from "@/components/layout/Navbar";

// D4 fix: React.lazy + Suspense para code splitting.
// O bundle inicial carrega apenas o Hero (acima da dobra); as demais sections
// são baixadas de forma assíncrona, reduzindo o tempo de interatividade (TTI).
const Hero = lazy(() => import("@/components/sections/Hero"));
const SocialProof = lazy(() => import("@/components/sections/SocialProof"));
const Fleet = lazy(() => import("@/components/sections/Fleet"));
const Services = lazy(() => import("@/components/sections/Services"));
const VehicleFinder = lazy(() => import("@/components/sections/VehicleFinder"));
const FAQ = lazy(() => import("@/components/sections/FAQ"));
const About = lazy(() => import("@/components/sections/About"));
const Contact = lazy(() => import("@/components/sections/Contact"));

// UI components pequenos — carregados no bundle principal (sem overhead perceptível)
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import ScrollProgress from "@/components/ui/ScrollProgress";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import Preloader from "@/components/ui/Preloader";

/** Fallback mínimo enquanto os chunks assíncronos carregam. */
function SectionSkeleton() {
  return <div className="min-h-screen bg-fiuza-cream" aria-hidden="true" />;
}

export default function App() {
  return (
    <SmoothScrollWrapper>
      <main className="bg-fiuza-cream min-h-screen font-sans">
        <Preloader />
        <NoiseOverlay />
        <ScrollProgress />
        <Navbar />
        <Suspense fallback={<SectionSkeleton />}>
          <Hero />
          <SocialProof />
          <Fleet />
          <Services />
          <VehicleFinder />
          <FAQ />
          <About />
          <Contact />
        </Suspense>
        <FloatingWhatsApp />
      </main>
    </SmoothScrollWrapper>
  );
}
