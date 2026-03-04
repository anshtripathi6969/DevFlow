import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        email: v.string(),
        fullName: v.string(),
        plan: v.string(), // "free" | "pro"
        applicationCount: v.number(),
        createdAt: v.number(),
    }).index("by_clerkId", ["clerkId"]),

    applications: defineTable({
        userId: v.string(), // clerkId
        companyName: v.string(),
        role: v.string(),
        location: v.string(),
        jobUrl: v.optional(v.string()),
        salaryRange: v.optional(v.string()),
        dateApplied: v.number(),
        status: v.string(), // "Applied" | "OA" | "Interview" | "Rejected" | "Offer"
        priority: v.optional(v.string()), // "Low" | "Medium" | "High" | "Dream"
        tags: v.optional(v.array(v.string())),
        notes: v.optional(v.string()),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_userId", ["userId"])
        .index("by_status", ["status"]),

    interviews: defineTable({
        applicationId: v.id("applications"),
        userId: v.string(),
        roundNumber: v.number(),
        date: v.number(),
        notes: v.optional(v.string()),
    }).index("by_applicationId", ["applicationId"])
        .index("by_userId", ["userId"]),

    statusHistory: defineTable({
        applicationId: v.id("applications"),
        previousStatus: v.string(),
        newStatus: v.string(),
        changedAt: v.number(),
    }).index("by_applicationId", ["applicationId"]),

    contacts: defineTable({
        applicationId: v.id("applications"),
        name: v.string(),
        role: v.string(),
        email: v.optional(v.string()),
        linkedin: v.optional(v.string()),
        notes: v.optional(v.string()),
        createdAt: v.number(),
    }).index("by_applicationId", ["applicationId"]),
});
