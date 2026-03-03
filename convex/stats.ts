import { query } from "./_generated/server";
import { v } from "convex/values";

export const getStats = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const applications = await ctx.db
            .query("applications")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .collect();

        const totalApplications = applications.length;
        const totalInterviews = applications.filter((a) => a.status === "Interview").length;
        const totalOffers = applications.filter((a) => a.status === "Offer").length;
        const totalRejections = applications.filter((a) => a.status === "Rejected").length;

        const conversionRate = totalApplications > 0 ? (totalOffers / totalApplications) * 100 : 0;
        const interviewRate = totalApplications > 0 ? (totalInterviews / totalApplications) * 100 : 0;
        const rejectionRate = totalApplications > 0 ? (totalRejections / totalApplications) * 100 : 0;

        // Monthly data for Bar Chart
        const monthlyData: Record<string, number> = {};
        applications.forEach((app) => {
            const date = new Date(app.dateApplied);
            const month = date.toLocaleString("default", { month: "short" });
            monthlyData[month] = (monthlyData[month] || 0) + 1;
        });

        const barChartData = Object.entries(monthlyData).map(([name, total]) => ({
            name,
            total,
        }));

        // Status distribution for Pie Chart
        const statusData = [
            { name: "Applied", value: applications.filter((a) => a.status === "Applied").length },
            { name: "OA", value: applications.filter((a) => a.status === "OA").length },
            { name: "Interview", value: totalInterviews },
            { name: "Rejected", value: totalRejections },
            { name: "Offer", value: totalOffers },
        ].filter((s) => s.value > 0);

        return {
            totalApplications,
            totalInterviews,
            totalOffers,
            conversionRate: Math.round(conversionRate),
            interviewRate: Math.round(interviewRate),
            rejectionRate: Math.round(rejectionRate),
            barChartData,
            statusData,
        };
    },
});
