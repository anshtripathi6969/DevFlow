"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { StatCard } from "@/components/dashboard/stat-card";
import {
    Briefcase,
    Calendar,
    CheckCircle2,
    PieChart as PieChartIcon,
    BarChart3,
    Sparkles
} from "lucide-react";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    Pie,
    PieChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const COLORS = ["#3b82f6", "#8b5cf6", "#eab308", "#ef4444", "#10b981"];

export default function DashboardPage() {
    const { user } = useUser();
    const stats = useQuery(api.stats.getStats, user ? { userId: user.id } : "skip");
    const [greeting, setGreeting] = useState("Good morning");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 12 && hour < 17) setGreeting("Good afternoon");
        else if (hour >= 17) setGreeting("Good evening");
    }, []);

    if (!stats) {
        return (
            <div className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-48 rounded-lg" />
                    <Skeleton className="h-4 w-64 rounded-lg" />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-32 w-full rounded-2xl" />
                    ))}
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Skeleton className="h-[400px] md:col-span-4 rounded-2xl" />
                    <Skeleton className="h-[400px] md:col-span-3 rounded-2xl" />
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-8 pb-10"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tight flex items-center gap-3">
                        {greeting}, {user?.firstName} 👋
                    </h2>
                    <p className="text-muted-foreground font-medium mt-1">
                        You have <span className="text-foreground font-bold underline decoration-blue-500/30 underline-offset-4">{stats.totalInterviews} active interviews</span> this week. Keep flowing.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-widest text-zinc-500">
                    <Sparkles className="size-3 text-yellow-500" /> Professional Plan
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    title="Applications"
                    value={stats.totalApplications}
                    icon={Briefcase}
                    accentColor="blue"
                    trend={{ value: 12, isPositive: true, label: "this month" }}
                />
                <StatCard
                    title="Interviews"
                    value={stats.totalInterviews}
                    icon={Calendar}
                    accentColor="yellow"
                    trend={{ value: stats.interviewRate, isPositive: true, label: "conversion" }}
                />
                <StatCard
                    title="Offers"
                    value={stats.totalOffers}
                    icon={CheckCircle2}
                    accentColor="green"
                    trend={{ value: stats.conversionRate, isPositive: true, label: "success rate" }}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="md:col-span-4 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm bg-card overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="border-b border-zinc-50 dark:border-zinc-900/50">
                        <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <BarChart3 className="size-4 text-blue-500" />
                                Pipeline Velocity
                            </span>
                            <span className="text-[10px] text-muted-foreground font-bold">Last 6 Months</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.barChartData}>
                                    <defs>
                                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={10}
                                        className="font-bold uppercase tracking-tighter"
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}`}
                                        className="font-bold"
                                    />
                                    <Tooltip
                                        cursor={{ fill: "var(--accent)", opacity: 0.1 }}
                                        contentStyle={{
                                            backgroundColor: "rgba(24, 24, 27, 0.95)",
                                            borderRadius: "16px",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                                            color: "#fff"
                                        }}
                                        itemStyle={{ color: "#3b82f6", fontWeight: "bold" }}
                                    />
                                    <Bar
                                        dataKey="total"
                                        fill="url(#barGradient)"
                                        radius={[8, 8, 4, 4]}
                                        className="hover:opacity-100 opacity-90 transition-opacity"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-3 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm bg-card overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="border-b border-zinc-50 dark:border-zinc-900/50">
                        <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                            <PieChartIcon className="size-4 text-purple-500" />
                            Status Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 text-center">
                        <div className="h-[240px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats.statusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={90}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {stats.statusData.map((entry: any, index: number) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                                className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "rgba(24, 24, 27, 0.95)",
                                            borderRadius: "16px",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                                            color: "#fff"
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {stats.statusData.map((entry: any, index: number) => (
                                <div key={entry.name} className="flex items-center flex-col p-2 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:scale-105 transition-transform">
                                    <div
                                        className="size-2 rounded-full mb-1"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">
                                        {entry.name}
                                    </span>
                                    <span className="text-sm font-bold">{entry.value}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}
