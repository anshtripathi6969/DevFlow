import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addInterview = mutation({
    args: {
        applicationId: v.id("applications"),
        userId: v.string(),
        roundNumber: v.number(),
        date: v.number(),
        notes: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("interviews", {
            ...args,
        });
    },
});

export const getUserInterviews = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const interviews = await ctx.db
            .query("interviews")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .order("desc")
            .collect();

        // Populate with application data
        const populatedInterviews = await Promise.all(
            interviews.map(async (interview) => {
                const application = await ctx.db.get(interview.applicationId);
                return { ...interview, application };
            })
        );

        return populatedInterviews;
    },
});

export const updateInterview = mutation({
    args: {
        id: v.id("interviews"),
        roundNumber: v.number(),
        date: v.number(),
        notes: v.optional(v.string()),
        result: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, { ...data });
    },
});

export const deleteInterview = mutation({
    args: { id: v.id("interviews") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
