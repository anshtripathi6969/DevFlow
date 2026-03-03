"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, ReactNode } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
    children: ReactNode;
    stagger?: number;
}

export function ScrollReveal({ children, stagger = 0.15 }: ScrollRevealProps) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const elements = container.current?.children;
        if (!elements || elements.length === 0) return;

        gsap.set(elements, { y: 60, opacity: 0, visibility: "hidden" });

        gsap.to(elements, {
            scrollTrigger: {
                trigger: container.current,
                start: "top 90%",
                toggleActions: "play none none none",
            },
            y: 0,
            opacity: 1,
            visibility: "visible",
            duration: 1.2,
            stagger,
            ease: "power3.out",
            onComplete: () => {
                // Clear transforms so CSS hover-transitions can work properly
                gsap.set(elements, { clearProps: "transform,opacity,visibility" });
            }
        });
    }, { scope: container });

    return (
        <div ref={container} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {children}
        </div>
    );
}
