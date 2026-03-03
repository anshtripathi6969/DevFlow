"use client";

import React from "react";
import { motion } from "framer-motion";

const COMPANIES = [
    {
        name: "Google",
        logo: (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M12.48 10.92V14.71h7.06c-.25 1.58-1.55 4.63-7.06 4.63-4.75 0-8.61-3.92-8.61-8.74s3.86-8.74 8.61-8.74c2.71 0 4.52 1.15 5.56 2.15l2.95-2.84C18.66 1.18 15.86 0 12.48 0 5.58 0 0 5.58 0 12.48s5.58 12.48 12.48 12.48c7.2 0 12-5.06 12-12.23 0-.82-.09-1.45-.21-2.07l-11.79.26z" />
            </svg>
        )
    },
    {
        name: "Meta",
        logo: (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M18.8 6.4c-1.3-1.6-3.2-2.4-5.2-2.4-1.8 0-3.5.7-4.8 1.9-1.3-1.2-3-1.9-4.8-1.9-2 0-3.9.8-5.2 2.4-1.3 1.6-2 3.8-2 6s.7 4.4 2 6c1.3 1.6 3.2 2.4 5.2 2.4 1.8 0 3.5-.7 4.8-1.9 1.3 1.2 3 1.9 4.8 1.9 2 0 3.9-.8 5.2-2.4 1.3-1.6 2-3.8 2-6s-.7-4.4-2-6zm-13.6 11c-1.2 0-2.3-.6-3.1-1.6-.7-.9-1-2.1-1-3.3 0-1.2.3-2.4 1-3.3.8-1 1.9-1.6 3.1-1.6 1.1 0 2.2.6 2.9 1.6.3.4.6.8.8 1.3-.8 1.5-1.5 3-2.3 4.5-.4.9-.8 1.7-1.4 2.4zm10.7-1.6c-.8 1-1.9 1.6-3.1 1.6-.6 0-1-.3-1.4-1-.1-.1-.2-.2-.3-.3.8-1.5 1.5-3.1 2.3-4.6.4-.8.8-1.6 1.4-2.3.7-.9 1.8-1.5 2.9-1.5 1.2 0 2.3.6 3.1 1.6.7.9 1 2.1 1 3.3 0 1.2-.3 2.4-1 3.3-.8 1-1.7 1.6-2.9 1.6-.8-.1-1.5-.4-2-.9z" />
            </svg>
        )
    },
    {
        name: "Amazon",
        logo: (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M15.93 17.13c-1.47.81-2.75 1.3-4.33 1.3-2.5 0-3.12-1.33-3.12-3.4 0-1.63.5-2.87 2.12-3.84 1.25-.75 2.75-1.12 5.12-1.12v.63c0 2.25-.13 4.87-1.2 6.43h.12s0 .13.06.13c.06 0 .06-.13.06-.13.38-.69.56-1.5.56-2.5h1.63c-.13 1.88-.63 3.31-1.63 4.38-.19.19-.38.44-.69.69-.13.13-.13.13-.13.13s-.06-.19-.06-.44v-.3zm-.25-7h-4c-1 0-1.25.38-1.25 1 0 .63.13 1 1 1h4.25v-2zm-12.87 9.87c.75.25 1.88.38 3.5.38 3.13 0 6.63-1.25 9.13-3.63.19-.19.44-.38.44-.63.06-.25-.19-.44-.38-.44-.19 0-.31.06-.44.19-2.25 2-5.38 3.06-8.25 3.06-1.63 0-2.87-.13-3.56-.38-.19-.06-.38-.12-.38-.31 0-.13.12-.13.25-.13h.12l.19.06s.06 0 .06-.06c.06-.06.06-.25-.44-.5l-.81-.5s-.19-.13-.38-.06c-.19.06-.25.19-.25.38v.06s0 .13.06.19c.19 1.12 1.13 2.12 1.13 2.12s.06 0 .12-.06l.13-.19.19-.13zm20.81-12.25c-.25-.38-.75-.5-1.13-.25L18 10c-.38.25-.5.75-.25 1.13l1.13 1.88c.12.19.31.31.5.31h.13l.13-.06c.38-.25.5-.75.25-1.13l-.56-1c2.19-1.13 3.5-3.31 3.25-5.63-.06-.25-.19-.38-.38-.38l-1.37.19.25.13z" />
            </svg>
        )
    },
    {
        name: "Apple",
        logo: (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05 1.88-3.08 1.88-1.04 0-1.42-.64-2.61-.64-1.18 0-1.63.62-2.61.64-1.03.02-2.14-.98-3.13-1.92-2-1.91-3.52-5.41-3.52-8.52 0-5.17 3.23-7.91 6.24-7.91 1.6 0 2.5 1.05 3.53 1.05 1.02 0 2.12-1.05 3.58-1.05 1.25 0 2.7.67 3.59 1.82-2.9 1.74-2.42 6.13.48 7.37-1.12 2.76-2.52 5.5-3.47 6.48zM12.04 3.12c-.11-2.02 1.6-3.75 3.44-4.04.29 2.22-1.9 4.18-3.44 4.04z" />
            </svg>
        )
    },
    {
        name: "Netflix",
        logo: (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M5.6 0H8l5.2 13.5L18.4 0h2.4v24h-2.4V6.5L14 18h-2L7.6 6.5V24H5.6V0z" />
            </svg>
        )
    },
    {
        name: "Microsoft",
        logo: (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M0 0h11.4v11.4H0V0zm12.6 0H24v11.4h-11.4V0zM0 12.6h11.4V24H0v-11.4zm12.6 0H24V24h-11.4v-11.4z" />
            </svg>
        )
    },
    {
        name: "Adobe",
        logo: "ADBE"
    },
    {
        name: "Salesforce",
        logo: "CRM"
    },
    {
        name: "Stripe",
        logo: (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M13.962 5.86c0-1.025.77-1.564 2.103-1.564 1.18 0 2.23.23 3.05.61l.51-3.75c-.84-.33-2.14-.71-3.87-.71-4.08 0-6.66 2.14-6.66 5.67 0 5.48 7.52 4.6 7.52 7 0 1.25-.97 1.85-2.51 1.85-1.56 0-2.92-.47-3.82-1.02l-.56 4.02c1.1.5 2.8.91 4.7.91 4.26 0 7.07-2.1 7.07-5.71 0-5.88-7.53-4.9-7.53-7.31z" />
            </svg>
        )
    },
    {
        name: "Airbnb",
        logo: (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M12 24c-1.104 0-2-.896-2-2 0-.306.071-.6.2-.862l7.106-14.75c.176-.367.545-.61.964-.61s.788.243.964.61l7.106 14.75c.129.262.2.556.2.862 0 1.104-.896 2-2 2s-2-.896-2-2c0-.306.071-.6.2-.862l-4.27-8.86-4.27 8.86c-.129.262-.2.556-.2.862 0 1.104-.896 2-2 2zm0-18.41c-2.02 0-3.66 1.64-3.66 3.66 0 1.1.49 2.09 1.27 2.76l-1.4 2.91C7.03 12.02 6.51 11.13 6.51 10.1c0-3.03 2.46-5.49 5.49-5.49s5.49 2.46 5.49 5.49c0 1.03-.52 1.92-1.29 2.82l-1.4-2.91c.78-.67 1.27-1.66 1.27-2.76 0-2.02-1.64-3.66-3.66-3.66z" />
            </svg>
        )
    }
];

export const LogoMarquee = () => {
    // Triple the list to ensure seamless transition
    const marqueeItems = [...COMPANIES, ...COMPANIES, ...COMPANIES];

    return (
        <div className="w-full py-12 overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/10 border-y border-zinc-100 dark:border-zinc-900 relative">
            {/* Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10" />

            <div className="flex flex-col items-center gap-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
                    Trusted by applicants joining world-class teams
                </p>

                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-16 items-center whitespace-nowrap"
                        animate={{
                            x: [0, -100 * COMPANIES.length],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 30,
                                ease: "linear",
                            },
                        }}
                    >
                        {marqueeItems.map((company, index) => (
                            <div
                                key={`${company.name}-${index}`}
                                className="flex items-center gap-3 px-6 py-2 rounded-xl transition-all duration-300 group grayscale hover:grayscale-0 opacity-40 hover:opacity-100 cursor-pointer"
                            >
                                <div className="size-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center transition-colors group-hover:bg-zinc-900 dark:group-hover:bg-zinc-50 group-hover:text-zinc-50 dark:group-hover:text-zinc-900">
                                    {typeof company.logo === 'string' ? (
                                        <span className="font-black text-[10px] tracking-tighter">
                                            {company.logo}
                                        </span>
                                    ) : (
                                        company.logo
                                    )}
                                </div>
                                <span className="text-sm font-bold tracking-tight text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-50 transition-colors">
                                    {company.name}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
