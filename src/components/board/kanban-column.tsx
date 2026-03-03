"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { KanbanCard } from "./kanban-card";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Rocket, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddApplicationDialog } from "./add-application-dialog";

interface KanbanColumnProps {
    id: string;
    title: string;
    items: any[];
}

export function KanbanColumn({ id, title, items }: KanbanColumnProps) {
    const { setNodeRef, isOver } = useSortable({
        id: id,
        data: {
            type: "Column",
        },
    });

    const statusColors: Record<string, string> = {
        "Applied": "bg-blue-500",
        "OA": "bg-purple-500",
        "Interview": "bg-yellow-500",
        "Rejected": "bg-red-500",
        "Offer": "bg-emerald-500",
    };

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "flex flex-col w-80 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-[2rem] p-4 h-full border border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-300 group/col relative",
                isOver && "bg-zinc-100/80 dark:bg-zinc-800/50 ring-2 ring-primary/20 scale-[1.01]"
            )}
        >
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-3">
                    <div className={cn("size-2.5 rounded-full shadow-lg", statusColors[title] || "bg-zinc-400")} />
                    <h3 className="font-black text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 group-hover/col:text-zinc-900 dark:group-hover/col:text-zinc-100 transition-colors">
                        {title}
                    </h3>
                    <span className="text-[10px] font-black bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-lg">
                        {items.length}
                    </span>
                </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-1 scrollbar-hide py-2">
                <SortableContext items={items.map((i) => i._id)} strategy={verticalListSortingStrategy}>
                    {items.map((item) => (
                        <KanbanCard key={item._id} item={item} />
                    ))}
                </SortableContext>

                {items.length === 0 && (
                    <div className="h-48 border-2 border-dashed border-zinc-200 dark:border-zinc-800/50 flex flex-col items-center justify-center rounded-3xl text-zinc-400 dark:text-zinc-600 gap-4 p-6 text-center animate-in fade-in duration-700">
                        <div className="size-16 rounded-3xl bg-zinc-100/50 dark:bg-zinc-800/30 flex items-center justify-center">
                            <Package size={24} strokeWidth={1.5} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[11px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-500">Empty Stage</p>
                            <p className="text-[10px] font-medium leading-relaxed max-w-[140px] mb-4">No applications yet. Start by adding your first opportunity.</p>
                            <AddApplicationDialog />
                        </div>
                    </div>
                )}
            </div>

            {/* Column Glow Effect */}
            <div className={cn(
                "absolute inset-0 -z-10 rounded-[2rem] blur-2xl opacity-0 transition-opacity duration-500 pointer-events-none",
                isOver && "opacity-10",
                statusColors[title] || "bg-zinc-400"
            )} />
        </div>
    );
}
