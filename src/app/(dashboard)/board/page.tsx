"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import { KanbanColumn } from "@/components/board/kanban-column";
import { KanbanCard } from "@/components/board/kanban-card";
import { createPortal } from "react-dom";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { AddApplicationDialog } from "@/components/board/add-application-dialog";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutDashboard, Sparkles } from "lucide-react";

interface Application {
    _id: Id<"applications">;
    _creationTime: number;
    companyName: string;
    role: string;
    location: string;
    status: string;
    dateApplied: number;
    jobUrl?: string;
    notes?: string;
    userId: string;
}

const COLUMNS = [
    { id: "Applied", title: "Applied" },
    { id: "OA", title: "OA" },
    { id: "Interview", title: "Interview" },
    { id: "Rejected", title: "Rejected" },
    { id: "Offer", title: "Offer" },
];

export default function BoardPage() {
    const { user } = useUser();
    const applications = useQuery(
        api.applications.getApplications,
        user ? { userId: user.id } : "skip"
    ) as Application[] | undefined;
    const updateStatus = useMutation(api.applications.updateApplicationStatus);

    const [items, setItems] = useState<Application[]>([]);
    const [activeItem, setActiveItem] = useState<Application | null>(null);

    useEffect(() => {
        if (applications) {
            setItems(applications);
        }
    }, [applications]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const item = items.find((i) => i._id === active.id);
        if (item) setActiveItem(item);
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveACard = active.data.current?.type === "Card";
        const isOverACard = over.data.current?.type === "Card";

        if (!isActiveACard) return;

        if (isActiveACard && isOverACard) {
            setItems((prev) => {
                const activeIndex = prev.findIndex((i) => i._id === activeId);
                const overIndex = prev.findIndex((i) => i._id === overId);

                if (prev[activeIndex].status !== prev[overIndex].status) {
                    const newItems = [...prev];
                    newItems[activeIndex] = { ...newItems[activeIndex], status: String(newItems[overIndex].status) };
                    return arrayMove(newItems, activeIndex, overIndex);
                }

                return arrayMove(prev, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === "Column";
        if (isActiveACard && isOverAColumn) {
            setItems((prev) => {
                const activeIndex = prev.findIndex((i) => i._id === activeId);
                if (activeIndex === -1) return prev;
                const newItems = [...prev];
                newItems[activeIndex] = { ...newItems[activeIndex], status: overId.toString() };
                return arrayMove(newItems, activeIndex, activeIndex);
            });
        }
    }

    async function handleDragEnd(event: DragEndEvent) {
        setActiveItem(null);
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as Id<"applications">;

        const activeItem = items.find((i) => i._id === activeId);
        if (!activeItem) return;

        const newStatus = activeItem.status;

        const originalItem = applications?.find(i => i._id === activeId);
        if (originalItem && originalItem.status !== newStatus) {
            try {
                await updateStatus({ id: activeId, newStatus });
                toast.success(`Application moved to ${newStatus}`, {
                    description: "Your pipeline has been updated successfully.",
                    icon: <Sparkles className="size-4 text-emerald-500" />,
                });
            } catch (error) {
                toast.error("Failed to update status");
                if (applications) setItems(applications);
            }
        }
    }

    if (!applications) {
        return (
            <div className="h-full flex flex-col space-y-8 overflow-hidden">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-12 w-64 rounded-2xl" />
                    <Skeleton className="h-12 w-40 rounded-2xl" />
                </div>
                <div className="flex gap-8 h-full min-w-max pr-8 overflow-x-auto scrollbar-hide">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="w-80 h-[600px] rounded-[2rem]" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="h-full flex flex-col space-y-8 overflow-hidden pb-6"
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tight flex items-center gap-3">
                        Kanban Board <LayoutDashboard className="size-8 text-blue-500" />
                    </h2>
                    <p className="text-muted-foreground font-medium mt-1">
                        Visualize your application pipeline. Drag and drop to update stages.
                    </p>
                </div>
                <AddApplicationDialog />
            </div>

            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-6 scrollbar-hide">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex gap-8 h-full min-w-max pr-8 items-start">
                        {COLUMNS.map((col) => (
                            <KanbanColumn
                                key={col.id}
                                id={col.id}
                                title={col.title}
                                items={items.filter((i) => i.status === col.id)}
                            />
                        ))}
                    </div>

                    {"document" in globalThis &&
                        createPortal(
                            <DragOverlay
                                dropAnimation={{
                                    sideEffects: defaultDropAnimationSideEffects({
                                        styles: {
                                            active: {
                                                opacity: "0.5",
                                            },
                                        },
                                    }),
                                }}
                            >
                                {activeItem ? (
                                    <div className="scale-[1.05] transition-transform rotate-2 pointer-events-none">
                                        <KanbanCard item={activeItem} isOverlay />
                                    </div>
                                ) : null}
                            </DragOverlay>,
                            document.body
                        )}
                </DndContext>
            </div>
        </motion.div>
    );
}
