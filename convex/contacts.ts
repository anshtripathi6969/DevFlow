import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getContacts = query({
    args: { applicationId: v.id("applications") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("contacts")
            .withIndex("by_applicationId", (q) => q.eq("applicationId", args.applicationId))
            .order("desc")
            .collect();
    },
});

export const addContact = mutation({
    args: {
        applicationId: v.id("applications"),
        name: v.string(),
        role: v.string(),
        email: v.optional(v.string()),
        linkedin: v.optional(v.string()),
        notes: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("contacts", {
            applicationId: args.applicationId,
            name: args.name,
            role: args.role,
            email: args.email,
            linkedin: args.linkedin,
            notes: args.notes,
            createdAt: Date.now(),
        });
    },
});

export const deleteContact = mutation({
    args: { id: v.id("contacts") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
