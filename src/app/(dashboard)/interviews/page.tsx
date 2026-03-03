"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import {
    Calendar as CalendarIcon,
    Building2,
    Clock,
    ExternalLink,
    ChevronRight
} from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { AddInterviewDialog } from "@/components/applications/add-interview-dialog";
import { Plus, Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

export default function InterviewsPage() {
    const { user } = useUser();
    const interviews = useQuery(api.interviews.getUserInterviews,
        user ? { userId: user.id } : "skip"
    );

    if (!interviews) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Interviews</h1>
                    <p className="text-zinc-500 mt-1">Manage and track your upcoming interview rounds.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-48 rounded-3xl" />
                    ))}
                </div>
            </div>
        );
    }

    const upcomingInterviews = interviews.filter(i => i.date >= Date.now()).sort((a, b) => a.date - b.date);
    const pastInterviews = interviews.filter(i => i.date < Date.now()).sort((a, b) => b.date - a.date);

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-zinc-50 dark:to-zinc-500">Interviews</h1>
                    <p className="text-zinc-500 mt-2 font-medium">Your upcoming and past interview rounds in one place.</p>
                </div>
                <AddInterviewDialog
                    trigger={
                        <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 h-12 shadow-lg shadow-blue-500/20 gap-2">
                            <Plus size={18} />
                            Schedule Interview
                        </Button>
                    }
                />
            </div>

            {upcomingInterviews.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <Clock size={16} />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Upcoming Rounds</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {upcomingInterviews.map((interview) => (
                            <InterviewCard key={interview._id} interview={interview} />
                        ))}
                    </div>
                </section>
            )}

            {pastInterviews.length > 0 && (
                <section className="space-y-6 opacity-80 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-xl bg-zinc-500/10 flex items-center justify-center text-zinc-500">
                            <CalendarIcon size={16} />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-zinc-500">Past Interviews</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {pastInterviews.map((interview) => (
                            <InterviewCard key={interview._id} interview={interview} isPast />
                        ))}
                    </div>
                </section>
            )}

            {interviews.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="size-20 rounded-3xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400">
                        <CalendarIcon size={40} />
                    </div>
                    <div className="space-y-1 max-w-sm">
                        <h3 className="text-xl font-bold">No interviews yet</h3>
                        <p className="text-zinc-500 text-sm">When you schedule an interview round for an application, it will appear here.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <AddInterviewDialog
                            trigger={
                                <Button className="rounded-2xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-bold px-8 h-12">
                                    Schedule Interview
                                </Button>
                            }
                        />
                        <Button variant="outline" className="rounded-2xl h-12 px-8 border-zinc-200/50 dark:border-zinc-800/50 font-bold" asChild>
                            <Link href="/board">Go to Board</Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

function InterviewCard({ interview, isPast = false }: { interview: any, isPast?: boolean }) {
    const deleteInterview = useMutation(api.interviews.deleteInterview);

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this interview round?")) return;

        try {
            await deleteInterview({ id: interview._id });
            toast.success("Interview round deleted");
        } catch (error) {
            toast.error("Failed to delete interview");
        }
    };

    return (
        <Card className={cn(
            "rounded-3xl border-none shadow-xl transition-all hover:scale-[1.02] group overflow-hidden bg-card relative",
            isPast ? "grayscale-[0.5]" : "shadow-blue-500/5"
        )}>
            <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                    onClick={handleDelete}
                >
                    <Trash2 size={16} />
                </Button>
            </div>
            <CardContent className="p-0">
                <div className={cn(
                    "p-6 space-y-6",
                    !isPast && "bg-gradient-to-br from-blue-500/5 via-transparent to-transparent"
                )}>
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500">
                                <span className="bg-blue-500/10 px-2 py-0.5 rounded-full">Round {interview.roundNumber}</span>
                            </div>
                            <h3 className="text-xl font-black tracking-tight mt-2">{interview.application?.companyName || "Unknown Company"}</h3>
                            <p className="text-sm text-zinc-500 font-medium">{interview.application?.role || "Position"}</p>
                        </div>
                        <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shadow-inner">
                            <Building2 className="text-zinc-400" size={20} />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 py-4 border-y border-zinc-100/50 dark:border-zinc-800/50">
                        <div className="space-y-1 flex-1">
                            <p className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Date & Time</p>
                            <p className="text-sm font-bold">{format(new Date(interview.date), "EEE, MMM d, yyyy")}</p>
                            <p className="text-xs text-zinc-500">{format(new Date(interview.date), "h:mm a")}</p>
                        </div>
                        <div className="size-1 w-px bg-zinc-200 dark:bg-zinc-800 h-8" />
                        <div className="space-y-1 flex-1">
                            <p className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Status</p>
                            <div className="pt-0.5">
                                <StatusBadge status={interview.application?.status || "Applied"} className="text-[10px]" />
                            </div>
                        </div>
                    </div>

                    {interview.notes && (
                        <div className="space-y-2">
                            <p className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Notes & Links</p>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 italic leading-relaxed">
                                {interview.notes}
                            </p>
                        </div>
                    )}

                    <div className="pt-2 flex items-center gap-2">
                        <Link href={`/applications/${interview.applicationId}`} className="flex-1">
                            <Button className="w-full rounded-2xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-bold text-xs h-10 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
