"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    size: number;
    color: string;
    vx: number;
    vy: number;
    density: number;
}

export const AntigravityBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0, radius: 150 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        const particleCount = 250;
        const colors = ["#3b82f6", "#6366f1", "#8b5cf6", "#d946ef"];

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const color = colors[Math.floor(Math.random() * colors.length)];

                particles.push({
                    x,
                    y,
                    originX: x,
                    originY: y,
                    size: Math.random() * 2 + 1,
                    color,
                    vx: 0,
                    vy: 0,
                    density: (Math.random() * 30) + 1,
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Distance from mouse
                const dx = mouse.current.x - p.x;
                const dy = mouse.current.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Interaction logic
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = mouse.current.radius;
                const force = (maxDistance - distance) / maxDistance;

                const directionX = forceDirectionX * force * p.density;
                const directionY = forceDirectionY * force * p.density;

                if (distance < mouse.current.radius) {
                    p.x -= directionX;
                    p.y -= directionY;
                } else {
                    // Return to origin
                    if (p.x !== p.originX) {
                        const dx = p.x - p.originX;
                        p.x -= dx / 20;
                    }
                    if (p.y !== p.originY) {
                        const dy = p.y - p.originY;
                        p.y -= dy / 20;
                    }
                }

                // Draw particle
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();

                // Connection lines (optional but adds to the vibe)
                ctx.strokeStyle = p.color;
                ctx.globalAlpha = 0.05;
                for (let j = i; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    if (dist2 < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
                ctx.globalAlpha = 1;
            }

            requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        const handleResize = () => {
            init();
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);
        init();
        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-20"
            style={{ filter: "blur(0.5px)" }}
        />
    );
};
