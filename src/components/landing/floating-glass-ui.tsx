"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Briefcase, Trophy } from "lucide-react";

const FloatingCard = ({
    children,
    className,
    delay = 0,
    duration = 10,
    yOffset = 20
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    yOffset?: number;
}) => (
    <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -yOffset, 0] }}
        transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
        }}
        className={`absolute hidden lg:flex items-center gap-3 p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 shadow-2xl z-20 ${className}`}
    >
        {children}
    </motion.div>
);

export const FloatingGlassUI = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Card 1: Offer Received */}
            <FloatingCard
                className="top-[15%] -left-[5%] rotate-[-6deg]"
                delay={0}
                duration={12}
            >
                <div className="size-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Trophy size={20} />
                </div>
                <div>
                    <p className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Offer Received</p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Software Engineer @ Meta</p>
                </div>
            </FloatingCard>

            {/* Card 2: Interview Tomorrow */}
            <FloatingCard
                className="top-[45%] -right-[8%] rotate-[4deg]"
                delay={1.5}
                duration={15}
                yOffset={30}
            >
                <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Calendar size={20} />
                </div>
                <div>
                    <p className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">Next Round</p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Technical Interview @ Google</p>
                </div>
            </FloatingCard>

            {/* Card 3: New Application */}
            <FloatingCard
                className="bottom-[10%] left-[10%] rotate-[2deg]"
                delay={3}
                duration={10}
            >
                <div className="size-10 rounded-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center text-zinc-900 dark:text-zinc-50">
                    <Briefcase size={20} />
                </div>
                <div>
                    <p className="text-xs font-black uppercase tracking-wider text-zinc-500">Applied Successfully</p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Architect @ Airbnb</p>
                </div>
            </FloatingCard>
        </div>
    );
};
