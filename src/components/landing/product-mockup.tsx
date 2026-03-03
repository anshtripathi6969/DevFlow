"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { LayoutDashboard, MousePointer2 } from "lucide-react";

export function ProductMockup() {
    const container = useRef(null);
    const card1 = useRef(null);
    const card2 = useRef(null);
    const cursor = useRef(null);

    useGSAP(() => {
        // Floating animation for the whole container
        gsap.to(container.current, {
            y: -20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Individual card floating
        gsap.to(card1.current, {
            y: 10,
            x: 5,
            rotation: 1,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(card2.current, {
            y: -15,
            x: -5,
            rotation: -1,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.5
        });

        // Cursor movement
        gsap.to(cursor.current, {
            x: 100,
            y: 50,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }, { scope: container });

    return (
        <div ref={container} className="relative w-full max-w-2xl aspect-[4/3] rounded-3xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden group">
            {/* Fake UI Header */}
            <div className="h-10 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                    <div className="size-2.5 rounded-full bg-red-400/20 dark:bg-red-400/10 border border-red-400/40" />
                    <div className="size-2.5 rounded-full bg-amber-400/20 dark:bg-amber-400/10 border border-amber-400/40" />
                    <div className="size-2.5 rounded-full bg-emerald-400/20 dark:bg-emerald-400/10 border border-emerald-400/40" />
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Fake Sidebar + Content */}
                <div className="flex gap-6 h-full">
                    <div className="w-16 space-y-4 opacity-20">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-4 bg-zinc-400 dark:bg-zinc-600 rounded-full" />
                        ))}
                    </div>
                    <div className="flex-1 space-y-6">
                        <div className="h-8 w-1/3 bg-zinc-300 dark:bg-zinc-700 rounded-lg" />
                        <div className="grid grid-cols-2 gap-4">
                            <div ref={card1} className="h-32 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-4 space-y-2">
                                <div className="size-6 rounded-lg bg-blue-500/10 border border-blue-500/20" />
                                <div className="h-4 w-2/3 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                                <div className="h-3 w-1/2 bg-zinc-50 dark:bg-zinc-800/50 rounded-full" />
                            </div>
                            <div ref={card2} className="h-32 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-4 space-y-2">
                                <div className="size-6 rounded-lg bg-emerald-400/10 border border-emerald-400/20" />
                                <div className="h-4 w-2/3 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                                <div className="h-3 w-1/2 bg-zinc-50 dark:bg-zinc-800/50 rounded-full" />
                            </div>
                        </div>
                        <div className="h-40 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-700" />
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div
                ref={cursor}
                className="absolute top-1/2 left-1/4 text-zinc-900 dark:text-zinc-50 pointer-events-none drop-shadow-lg transition-transform"
            >
                <MousePointer2 size={32} className="fill-current" />
            </div>

            {/* Decorative Glow */}
            <div className="absolute -top-24 -right-24 size-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 size-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        </div>
    );
}
