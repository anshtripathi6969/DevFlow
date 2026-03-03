"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const statusStyles = {
    Applied: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
    OA: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    Interview: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
    Rejected: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
    Offer: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
};

interface StatusBadgeProps {
    status: string;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    return (
        <Badge
            variant="secondary"
            className={cn(
                "rounded-lg font-medium border-none px-2 py-0.5 text-[11px]",
                statusStyles[status as keyof typeof statusStyles] || "bg-muted text-muted-foreground",
                className
            )}
        >
            {status}
        </Badge>
    );
}
