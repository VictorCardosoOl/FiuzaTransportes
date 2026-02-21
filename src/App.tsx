import SmoothScrollWrapper from "@/components/layout/SmoothScrollWrapper";
import Hero from "@/components/sections/Hero";
import Fleet from "@/components/sections/Fleet";
import Services from "@/components/sections/Services";
import VehicleFinder from "@/components/sections/VehicleFinder";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function App() {
  return (
    <SmoothScrollWrapper>
      <main className="bg-fiuza-cream min-h-screen font-sans">
        <Hero />
        <Fleet />
        <Services />
        <VehicleFinder />
        <About />
        <Contact />
      </main>
    </SmoothScrollWrapper>
  );
}
