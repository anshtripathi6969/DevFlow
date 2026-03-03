"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";

interface StatsCounterProps {
    end: number;
    suffix?: string;
    duration?: number;
}

export function StatsCounter({ end, suffix = "", duration = 2 }: StatsCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useGSAP(() => {
        const obj = { value: 0 };
        gsap.to(obj, {
            value: end,
            duration,
            ease: "power2.out",
            onUpdate: () => {
                setCount(Math.floor(obj.value));
            },
            scrollTrigger: {
                trigger: ref.current,
                start: "top 90%",
            },
        });
    }, { scope: ref });

    return (
        <span ref={ref} className="tabular-nums">
            {count.toLocaleString()}{suffix}
        </span>
    );
}
