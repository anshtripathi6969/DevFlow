import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const storeUser = mutation({
    args: {
        clerkId: v.string(),
        email: v.string(),
        fullName: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        if (user !== null) {
            // Update user if already exists
            return await ctx.db.patch(user._id, {
                email: args.email,
                fullName: args.fullName,
            });
        }

        return await ctx.db.insert("users", {
            clerkId: args.clerkId,
            email: args.email,
            fullName: args.fullName,
            plan: "free",
            applicationCount: 0,
            createdAt: Date.now(),
        });
    },
});

export const currentUser = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();
    },
});
