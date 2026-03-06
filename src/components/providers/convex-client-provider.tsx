"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!convexUrl) {
    console.error("Missing NEXT_PUBLIC_CONVEX_URL");
}

if (!clerkKey) {
    console.error("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
}

const convex = new ConvexReactClient(convexUrl || "https://decisive-possum-117.convex.cloud");

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    if (!clerkKey) return <>{children}</>;

    return (
        <ClerkProvider publishableKey={clerkKey}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}
