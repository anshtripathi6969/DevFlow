"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";

export function SyncUser() {
    const { user } = useUser();
    const storeUser = useMutation(api.users.storeUser);

    useEffect(() => {
        if (user) {
            storeUser({
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                fullName: user.fullName || "User",
            });
        }
    }, [user, storeUser]);

    return null;
}
