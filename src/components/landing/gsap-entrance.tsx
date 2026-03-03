"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, ReactNode, isValidElement, cloneElement } from "react";

interface GSAPEntranceProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    y?: number;
}

export function GSAPEntrance({
    children,
    delay = 0,
    duration = 1,
    y = 40
}: GSAPEntranceProps) {
    const ref = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        gsap.set(ref.current, { y, opacity: 0, visibility: "hidden" });

        gsap.to(ref.current, {
            y: 0,
            opacity: 1,
            visibility: "visible",
            duration,
            delay,
            ease: "power4.out",
            clearProps: "all" // Important: Clear GSAP styles after animation to let CSS hover work
        });
    }, { scope: ref });

    if (isValidElement(children)) {
        // @ts-ignore - we're attaching a ref to a child element
        return cloneElement(children as any, { ref });
    }

    return <div ref={ref as any}>{children}</div>;
}
