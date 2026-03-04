"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2, Clock, DollarSign, Flame, Zap, Minus, Info, Tag } from "lucide-react";
import { format, formatDistanceToNow, differenceInDays } from "date-fns";
import { motion } from "framer-motion";

interface KanbanCardProps {
    item: any;
    isOverlay?: boolean;
}

export function KanbanCard({ item, isOverlay }: KanbanCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: item._id,
        data: {
            type: "Card",
            item,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    const statusColors: Record<string, string> = {
        "Applied": "bg-blue-500",
        "OA": "bg-purple-500",
        "Interview": "bg-yellow-500",
        "Rejected": "bg-red-500",
        "Offer": "bg-emerald-500",
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="h-32 rounded-2xl bg-zinc-100/50 dark:bg-zinc-800/50 border-2 border-dashed border-zinc-200 dark:border-zinc-700 opacity-50"
            />
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <Card
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className={cn(
                    "rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm cursor-grab active:cursor-grabbing transition-all bg-white dark:bg-zinc-900 overflow-hidden group hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700",
                    isOverlay && "ring-2 ring-primary shadow-2xl scale-[1.03]"
                )}
            >
                <CardContent className="p-4 space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="size-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-50 font-black text-lg shadow-inner group-hover:bg-zinc-900 group-hover:text-zinc-50 dark:group-hover:bg-zinc-50 dark:group-hover:text-zinc-900 transition-colors duration-300">
                            {item.companyName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <h4 className="font-black text-sm leading-tight truncate group-hover:text-blue-500 transition-colors uppercase tracking-tight">{item.companyName}</h4>
                                {item.priority === "Dream" && (
                                    <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20 shrink-0 animate-pulse">
                                        <Flame size={10} className="fill-current" />
                                        Dream
                                    </div>
                                )}
                                {item.priority === "High" && (
                                    <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20 shrink-0">
                                        <Zap size={10} className="fill-current" />
                                        High
                                    </div>
                                )}
                            </div>
                            <p className="text-[11px] font-bold text-muted-foreground mt-1 uppercase tracking-tighter truncate opacity-70">
                                {item.role}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
                                <MapPin className="size-3 text-zinc-400" />
                                {item.location}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
                                <Clock className="size-3 text-blue-500" />
                                <span>Applied {formatDistanceToNow(new Date(item.dateApplied), { addSuffix: true })}</span>
                            </div>
                        </div>

                        {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {item.tags.map((tag: string) => (
                                    <div key={tag} className="text-[9px] font-bold px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 rounded-lg border border-zinc-200/30 dark:border-zinc-700/30">
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-zinc-50 dark:border-zinc-800/50 mt-2">
                        <div className="flex items-center gap-2">
                            <div className={cn("size-2 rounded-full", statusColors[item.status] || "bg-zinc-400")} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                {item.status}
                            </span>
                        </div>
                        {item.salaryRange && (
                            <div className="flex items-center gap-1 font-black text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400">
                                <DollarSign size={10} />
                                {item.salaryRange}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
