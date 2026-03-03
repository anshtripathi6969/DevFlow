"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const sunRef = useRef<HTMLDivElement>(null);
    const moonRef = useRef<HTMLDivElement>(null);

    useEffect(() => setMounted(true), []);

    useGSAP(() => {
        if (!mounted) return;

        const isDark = resolvedTheme === "dark";

        if (isDark) {
            gsap.to(sunRef.current, {
                y: 40,
                opacity: 0,
                rotate: 90,
                duration: 0.5,
                ease: "back.in(1.7)"
            });
            gsap.fromTo(moonRef.current,
                { y: -40, opacity: 0, rotate: -90 },
                { y: 0, opacity: 1, rotate: 0, duration: 0.5, delay: 0.2, ease: "back.out(1.7)" }
            );
        } else {
            gsap.to(moonRef.current, {
                y: 40,
                opacity: 0,
                rotate: 90,
                duration: 0.5,
                ease: "back.in(1.7)"
            });
            gsap.fromTo(sunRef.current,
                { y: -40, opacity: 0, rotate: -90 },
                { y: 0, opacity: 1, rotate: 0, duration: 0.5, delay: 0.2, ease: "back.out(1.7)" }
            );
        }
    }, { dependencies: [resolvedTheme, mounted], scope: containerRef });

    if (!mounted) return (
        <div className={cn("size-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800", className)} />
    );

    return (
        <div
            ref={containerRef}
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className={cn(
                "size-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-zinc-900 transition-all border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm overflow-hidden relative group",
                className
            )}
        >
            <div ref={sunRef} className="absolute inset-0 flex items-center justify-center text-amber-500">
                <Sun size={20} strokeWidth={2.5} />
            </div>
            <div ref={moonRef} className="absolute inset-0 flex items-center justify-center text-blue-400">
                <Moon size={20} strokeWidth={2.5} />
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 to-amber-500/0 group-hover:from-blue-500/5 group-hover:to-amber-500/5 transition-colors" />
        </div>
    );
}
