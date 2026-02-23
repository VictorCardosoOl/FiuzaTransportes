import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface UseHeroAnimationOptions {
    containerRef: RefObject<HTMLDivElement | null>;
    imageRef: RefObject<HTMLDivElement | null>;
}

export function useHeroAnimation({ containerRef, imageRef }: UseHeroAnimationOptions) {
    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // 1. Imagem sobe de baixo (reveal)
            tl.from(".hero-image-wrap", {
                scale: 1.08,
                duration: 2.2,
                ease: "power2.out",
            })

                // 2. Overlay escurece suavemente
                .from(".hero-overlay", {
                    opacity: 0,
                    duration: 1.8,
                    ease: "power2.out",
                }, "<")

                // 3. Eyebrow + headline entram linha a linha
                .from(".hero-eyebrow", {
                    yPercent: 120,
                    opacity: 0,
                    duration: 1.2,
                }, "-=1.0")

                .from(".hero-line", {
                    yPercent: 100,
                    opacity: 0,
                    duration: 1.4,
                    stagger: 0.12,
                    ease: "expo.out",
                }, "-=0.9")

                // 4. Meta info e CTA entram por último
                .from(".hero-bottom", {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                }, "-=0.6");

            // Parallax suave na imagem com scroll
            gsap.to(imageRef.current, {
                yPercent: 18,
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
