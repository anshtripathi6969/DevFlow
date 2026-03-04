import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createApplication = mutation({
    args: {
        userId: v.string(), // clerkId
        companyName: v.string(),
        role: v.string(),
        location: v.string(),
        jobUrl: v.optional(v.string()),
        salaryRange: v.optional(v.string()),
        dateApplied: v.number(),
        status: v.string(),
        priority: v.string(),
        tags: v.array(v.string()),
        notes: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const applicationId = await ctx.db.insert("applications", {
            ...args,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        // Update user application count
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.userId))
            .unique();

        if (user) {
            await ctx.db.patch(user._id, {
                applicationCount: user.applicationCount + 1,
            });
        }

        // Add status history
        await ctx.db.insert("statusHistory", {
            applicationId,
            previousStatus: "None",
            newStatus: args.status,
            changedAt: Date.now(),
        });

        return applicationId;
    },
});

export const getApplications = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("applications")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .order("desc")
            .collect();
    },
});

export const updateApplicationStatus = mutation({
    args: {
        id: v.id("applications"),
        newStatus: v.string(),
    },
    handler: async (ctx, args) => {
        const application = await ctx.db.get(args.id);
        if (!application) throw new Error("Application not found");

        const previousStatus = application.status;
        if (previousStatus === args.newStatus) return;

        await ctx.db.patch(args.id, {
            status: args.newStatus,
            updatedAt: Date.now(),
        });

        await ctx.db.insert("statusHistory", {
            applicationId: args.id,
            previousStatus,
            newStatus: args.newStatus,
            changedAt: Date.now(),
        });
    },
});

export const updateApplication = mutation({
    args: {
        id: v.id("applications"),
        companyName: v.string(),
        role: v.string(),
        location: v.string(),
        jobUrl: v.optional(v.string()),
        salaryRange: v.optional(v.string()),
        dateApplied: v.number(),
        priority: v.string(),
        tags: v.array(v.string()),
        notes: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, {
            ...data,
            updatedAt: Date.now(),
        });
    },
});

export const deleteApplication = mutation({
    args: { id: v.id("applications"), userId: v.string() },
    handler: async (ctx, args) => {
        const application = await ctx.db.get(args.id);
        if (!application) throw new Error("Application not found");

        await ctx.db.delete(args.id);

        // Update user application count
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.userId))
            .unique();

        if (user && user.applicationCount > 0) {
            await ctx.db.patch(user._id, {
                applicationCount: user.applicationCount - 1,
            });
        }

        // Cleanup related data (optional but good practice)
        const histories = await ctx.db
            .query("statusHistory")
            .withIndex("by_applicationId", (q) => q.eq("applicationId", args.id))
            .collect();
        for (const history of histories) {
            await ctx.db.delete(history._id);
        }

        const interviews = await ctx.db
            .query("interviews")
            .withIndex("by_applicationId", (q) => q.eq("applicationId", args.id))
            .collect();
        for (const interview of interviews) {
            await ctx.db.delete(interview._id);
        }
    },
});

export const getApplicationById = query({
    args: { id: v.id("applications") },
    handler: async (ctx, args) => {
        const application = await ctx.db.get(args.id);
        if (!application) return null;

        const interviews = await ctx.db
            .query("interviews")
            .withIndex("by_applicationId", (q) => q.eq("applicationId", args.id))
            .collect();

        const history = await ctx.db
            .query("statusHistory")
            .withIndex("by_applicationId", (q) => q.eq("applicationId", args.id))
            .order("desc")
            .collect();

        return { ...application, interviews, history };
    },
});

export const getRecentApplications = query({
    args: { userId: v.string(), limit: v.number() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("applications")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .order("desc")
            .take(args.limit);
    },
});
