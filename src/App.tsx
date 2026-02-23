import { lazy, Suspense } from "react";
import SmoothScrollWrapper from "@/components/layout/SmoothScrollWrapper";
import Navbar from "@/components/layout/Navbar";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import ScrollProgress from "@/components/ui/ScrollProgress";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import Preloader from "@/components/ui/Preloader";
import LgpdBanner from "@/components/ui/LgpdBanner";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

// Code splitting — cada section é um chunk independente no bundle
const Hero = lazy(() => import("@/components/sections/Hero"));
const SocialProof = lazy(() => import("@/components/sections/SocialProof"));
const Fleet = lazy(() => import("@/components/sections/Fleet"));
const Services = lazy(() => import("@/components/sections/Services"));
const VehicleFinder = lazy(() => import("@/components/sections/VehicleFinder"));
const FAQ = lazy(() => import("@/components/sections/FAQ"));
const About = lazy(() => import("@/components/sections/About"));
const Contact = lazy(() => import("@/components/sections/Contact"));

function SectionSkeleton() {
  return <div className="min-h-[50dvh] bg-fiuza-cream" aria-hidden="true" />;
}

export default function App() {
  return (
    <SmoothScrollWrapper>
      <main className="bg-fiuza-cream min-h-screen font-sans">
        <Preloader />
        <NoiseOverlay />
        <ScrollProgress />
        <Navbar />

        <ErrorBoundary>
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
        </ErrorBoundary>

        <FloatingWhatsApp />
        {/* D9 — Banner de consentimento LGPD */}
        <LgpdBanner />
      </main>
    </SmoothScrollWrapper>
  );
}
