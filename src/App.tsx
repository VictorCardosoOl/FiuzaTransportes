import SmoothScrollWrapper from "@/components/layout/SmoothScrollWrapper";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Fleet from "@/components/sections/Fleet";
import Services from "@/components/sections/Services";
import VehicleFinder from "@/components/sections/VehicleFinder";
import FAQ from "@/components/sections/FAQ";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

export default function App() {
  return (
    <SmoothScrollWrapper>
      <main className="bg-fiuza-cream min-h-screen font-sans">
        <Navbar />
        <Hero />
        <SocialProof />
        <Fleet />
        <Services />
        <VehicleFinder />
        <FAQ />
        <About />
        <Contact />
        <FloatingWhatsApp />
      </main>
    </SmoothScrollWrapper>
  );
}
