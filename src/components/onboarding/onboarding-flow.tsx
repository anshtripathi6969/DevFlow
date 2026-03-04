"use client";

import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

interface OnboardingFlowProps {
    onStart?: boolean;
}

export const OnboardingFlow = ({ onStart = false }: OnboardingFlowProps) => {
    useEffect(() => {
        // Only auto-start if explicitly told and hasn't been seen before
        const hasSeenOnboarding = localStorage.getItem("devflow-onboarding-seen");

        if (onStart && hasSeenOnboarding) return;

        const driverObj = driver({
            showProgress: true,
            animate: true,
            overlayColor: "rgba(0, 0, 0, 0.75)",
            steps: [
                {
                    element: "#nav-dashboard",
                    popover: {
                        title: "Your Command Center 📊",
                        description: "Get a bird's-eye view of your entire career pipeline, interview success rates, and recent activity.",
                        side: "right",
                        align: "start"
                    }
                },
                {
                    element: "#nav-board",
                    popover: {
                        title: "Kanban Board 🧱",
                        description: "Drag and drop your job applications across different stages. It's the most satisfying way to track your progress!",
                        side: "right",
                        align: "start"
                    }
                },
                {
                    element: "#quick-add-section",
                    popover: {
                        title: "Quick Add ⚡",
                        description: "Found a job you love? Add it instantly from anywhere in the app using this shortcut.",
                        side: "right",
                        align: "start"
                    }
                },
                {
                    element: "#add-app-button",
                    popover: {
                        title: "Start Your Journey ✨",
                        description: "Click here to add your first job application. It only takes a few seconds!",
                        side: "bottom",
                        align: "center"
                    }
                }
            ],
            onDestroyed: () => {
                localStorage.setItem("devflow-onboarding-seen", "true");
            }
        });

        if (onStart || !hasSeenOnboarding) {
            // Small delay to ensure elements are rendered
            setTimeout(() => {
                driverObj.drive();
            }, 1000);
        }

        // Expose start function globally for the "Help" button
        (window as any).startDevFlowTour = () => driverObj.drive();

    }, [onStart]);

    return null;
};
