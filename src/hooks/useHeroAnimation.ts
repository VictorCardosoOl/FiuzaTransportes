import { useRef, RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UseHeroAnimationOptions {
    containerRef: RefObject<HTMLDivElement | null>;
    imageRef: RefObject<HTMLImageElement | null>;
}

/**
 * Encapsula toda a lógica de animação do Hero.
 * Mantém o componente Hero focado apenas na estrutura JSX.
 */
export function useHeroAnimation({ containerRef, imageRef }: UseHeroAnimationOptions) {
    useGSAP(
        () => {
            const tl = gsap.timeline();

            tl.from(".hero-char", {
                yPercent: 100,
                duration: 1.5,
                stagger: 0.02,
                ease: "power4.out",
            })
                .from(
                    ".hero-meta-reveal",
                    { opacity: 0, y: 20, duration: 1, stagger: 0.1, ease: "power3.out" },
                    "-=1"
                )
                .from(
                    ".hero-image-mask",
                    { scaleY: 0, transformOrigin: "bottom", duration: 1.5, ease: "expo.inOut" },
                    "-=1.2"
                )
                .from(imageRef.current, { scale: 1.5, duration: 2, ease: "power2.out" }, "-=1.5");

            gsap.to(imageRef.current, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        },
        { scope: containerRef }
    );
}
