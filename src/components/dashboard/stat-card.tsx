import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: number;
        isPositive: boolean;
        label?: string;
    };
    accentColor?: "blue" | "yellow" | "green" | "purple" | "rose";
    className?: string;
}

export function StatCard({
    title,
    value,
    icon: Icon,
    description,
    trend,
    accentColor = "blue",
    className,
}: StatCardProps) {
    const accentVariants = {
        blue: "border-t-blue-500 bg-blue-500/5",
        yellow: "border-t-yellow-500 bg-yellow-500/5",
        green: "border-t-emerald-500 bg-emerald-500/5",
        purple: "border-t-purple-500 bg-purple-500/5",
        rose: "border-t-rose-500 bg-rose-500/5",
    };

    const iconColors = {
        blue: "text-blue-500",
        yellow: "text-yellow-500",
        green: "text-emerald-500",
        purple: "text-purple-500",
        rose: "text-rose-500",
    };

    return (
        <Card className={cn(
            "rounded-2xl border-t-4 shadow-sm bg-card transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl group",
            accentVariants[accentColor],
            className
        )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                    {title}
                </CardTitle>
                <div className={cn("size-8 rounded-xl flex items-center justify-center bg-background border border-border shadow-sm group-hover:scale-110 transition-transform duration-500", iconColors[accentColor])}>
                    <Icon className="size-4" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-end justify-between">
                    <div>
                        <div className="text-3xl font-black tracking-tight">{value}</div>
                        {(description || trend) && (
                            <div className="flex items-center gap-1.5 mt-1">
                                {trend && (
                                    <div className={cn(
                                        "flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                                        trend.isPositive ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                                    )}>
                                        {trend.isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                        {trend.isPositive ? "+" : "-"}{trend.value}%
                                    </div>
                                )}
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
                                    {trend?.label || description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Simple Sparkline SVG */}
                    <div className="h-8 w-16 opacity-30 group-hover:opacity-100 transition-opacity">
                        <svg viewBox="0 0 100 40" className="w-full h-full">
                            <path
                                d={trend?.isPositive
                                    ? "M0,35 Q25,35 50,20 T100,5"
                                    : "M0,5 Q25,5 50,20 T100,35"}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="6"
                                strokeLinecap="round"
                                className={iconColors[accentColor]}
                            />
                        </svg>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
