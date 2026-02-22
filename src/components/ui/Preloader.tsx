import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useGSAP(
    () => {
      if (progress === 100) {
        const tl = gsap.timeline();

        tl.to(".preloader-text", {
          y: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.in",
          stagger: 0.1,
        })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
        })
        .set(containerRef.current, { display: "none" });
      }
    },
    { scope: containerRef, dependencies: [progress] }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-fiuza-dark text-white flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flex items-center gap-4 overflow-hidden">
        <span className="preloader-text font-display text-6xl md:text-8xl font-bold tracking-tighter">
          FIUZA
        </span>
        <span className="preloader-text font-serif text-6xl md:text-8xl italic text-fiuza-blue">
          Transportes
        </span>
      </div>
      
      <div className="absolute bottom-12 right-12 flex flex-col items-end overflow-hidden">
        <span className="preloader-text font-mono text-4xl md:text-6xl font-bold">
          {Math.min(progress, 100)}%
        </span>
        <span className="preloader-text text-xs uppercase tracking-widest opacity-50 mt-2">
          Loading Experience
        </span>
      </div>
    </div>
  );
}
