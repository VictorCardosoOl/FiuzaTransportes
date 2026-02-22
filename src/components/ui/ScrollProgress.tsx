import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      transformOrigin: "left",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      },
    });
  });

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none mix-blend-difference">
      <div 
        ref={barRef} 
        className="w-full h-full bg-fiuza-blue scale-x-0 origin-left" 
      />
    </div>
  );
}
