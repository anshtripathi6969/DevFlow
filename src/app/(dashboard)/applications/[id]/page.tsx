"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    ExternalLink,
    Calendar as CalendarIcon,
    MapPin,
    DollarSign,
    Clock,
    Trash2,
    Edit2,
    Plus,
    Users,
    MoreVertical,
    Flame,
    Zap,
    Tag,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusBadge } from "@/components/ui/status-badge";
import { motion } from "framer-motion";
import { ContactList } from "@/components/applications/contact-list";
import { EditApplicationDialog } from "@/components/applications/edit-application-dialog";
import { AddInterviewDialog } from "@/components/applications/add-interview-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HistoryItem {
    _id: string;
    previousStatus: string;
    newStatus: string;
    changedAt: number;
}

interface Interview {
    _id: Id<"interviews">;
    roundNumber: number;
    date: number;
    notes?: string;
}

export default function ApplicationDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useUser();
    const application = useQuery(api.applications.getApplicationById, {
        id: id as Id<"applications">,
    });
    const deleteApplication = useMutation(api.applications.deleteApplication);
    const deleteInterview = useMutation(api.interviews.deleteInterview);

    async function handleDelete() {
        if (!window.confirm("Are you sure you want to delete this application?")) return;
        if (!user) return;

        try {
            await deleteApplication({ id: id as Id<"applications">, userId: user.id });
            toast.success("Application deleted");
            router.push("/applications");
        } catch (error) {
            toast.error("Failed to delete application");
        }
    }

    if (!application) {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-[200px] w-full rounded-2xl" />
                <Skeleton className="h-[400px] w-full rounded-2xl" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-5xl mx-auto space-y-8 pb-12"
        >
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild className="rounded-xl gap-2 -ml-2 text-muted-foreground hover:text-foreground">
                    <Link href="/applications">
                        <ChevronLeft size={18} />
                        Back to Applications
                    </Link>
                </Button>
                <div className="flex items-center gap-2">
                    <EditApplicationDialog application={application} />
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-xl border-border/50 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                        onClick={handleDelete}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
                <div className="space-y-10">
                    <section className="bg-card rounded-2xl p-8 shadow-sm border border-transparent">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-100 dark:border-zinc-900">
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight">{application.companyName}</h1>
                                <p className="text-xl text-muted-foreground mt-1 font-medium">{application.role}</p>
                            </div>
                            <StatusBadge status={application.status} className="text-sm px-4 py-1.5 rounded-xl self-start sm:self-center" />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10">
                            <div className="space-y-1">
                                <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Location</span>
                                <div className="flex items-center gap-2 font-medium">
                                    <MapPin size={16} className="text-muted-foreground" />
                                    {application.location}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Date Applied</span>
                                <div className="flex items-center gap-2 font-medium">
                                    <CalendarIcon size={16} className="text-muted-foreground" />
                                    {format(new Date(application.dateApplied), "MMM d, yyyy")}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Priority</span>
                                <div className="flex items-center gap-2 font-black uppercase tracking-widest text-[11px]">
                                    {application.priority === "Dream" && (
                                        <div className="flex items-center gap-1.5 text-orange-500 bg-orange-500/10 px-3 py-1 rounded-xl border border-orange-500/20 animate-pulse">
                                            <Flame size={14} className="fill-current" />
                                            Dream
                                        </div>
                                    )}
                                    {application.priority === "High" && (
                                        <div className="flex items-center gap-1.5 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-xl border border-yellow-500/20">
                                            <Zap size={14} className="fill-current" />
                                            High
                                        </div>
                                    )}
                                    {application.priority === "Medium" && (
                                        <div className="text-blue-500 bg-blue-500/10 px-3 py-1 rounded-xl border border-blue-500/20">
                                            Medium
                                        </div>
                                    )}
                                    {application.priority === "Low" && (
                                        <div className="text-zinc-500 bg-zinc-500/10 px-3 py-1 rounded-xl border border-zinc-500/20">
                                            Low
                                        </div>
                                    )}
                                </div>
                            </div>
                            {application.salaryRange && (
                                <div className="space-y-1">
                                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Salary</span>
                                    <div className="flex items-center gap-2 font-medium">
                                        <DollarSign size={16} className="text-muted-foreground" />
                                        {application.salaryRange}
                                    </div>
                                </div>
                            )}
                        </div>

                        {application.tags && application.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-8">
                                {application.tags.map((tag: string) => (
                                    <div key={tag} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-xl border border-zinc-200 dark:border-zinc-700">
                                        <Tag size={12} />
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        )}

                        {application.jobUrl && (
                            <div className="mt-8">
                                <Button variant="secondary" asChild className="rounded-xl gap-2 font-medium">
                                    <a href={application.jobUrl} target="_blank" rel="noopener noreferrer">
                                        Original Job Posting
                                        <ExternalLink size={14} />
                                    </a>
                                </Button>
                            </div>
                        )}
                    </section>

                    <Tabs defaultValue="notes" className="w-full">
                        <TabsList className="bg-muted/50 p-1 rounded-xl h-11 border-none shadow-none">
                            <TabsTrigger value="notes" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm px-6">
                                Notes
                            </TabsTrigger>
                            <TabsTrigger value="timeline" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm px-6">
                                Status History
                            </TabsTrigger>
                            <TabsTrigger value="contacts" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm px-6 gap-2">
                                <Users size={14} />
                                Contacts
                            </TabsTrigger>
                            <TabsTrigger value="interviews" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm px-6 gap-2">
                                <CalendarIcon size={14} />
                                Interviews
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="notes" className="mt-4 p-6 bg-card rounded-2xl shadow-sm border border-transparent min-h-[300px]">
                            <div className="prose prose-zinc dark:prose-invert max-w-none">
                                {application.notes ? (
                                    <p className="whitespace-pre-wrap">{application.notes}</p>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 text-muted-foreground">
                                        <p className="italic">No notes added yet.</p>
                                        <Button variant="ghost" size="sm" className="mt-2 rounded-lg gap-2">
                                            <Plus size={14} /> Add Notes
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="timeline" className="mt-4 p-6 bg-card rounded-2xl shadow-sm border border-transparent">
                            <div className="space-y-8">
                                {application.history.map((item: HistoryItem, index: number) => (
                                    <div key={item._id} className="relative pl-8 pb-8 last:pb-0">
                                        {index !== application.history.length - 1 && (
                                            <div className="absolute left-3 top-3 bottom-0 w-px bg-border" />
                                        )}
                                        <div className="absolute left-0 top-1.5 size-6 rounded-full bg-muted border-4 border-background flex items-center justify-center">
                                            <Clock size={10} className="text-muted-foreground" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="font-semibold">{item.newStatus}</span>
                                                <span className="text-muted-foreground">from {item.previousStatus}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {format(new Date(item.changedAt), "MMM d, yyyy 'at' h:mm a")}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="contacts" className="mt-4 p-6 bg-card rounded-2xl shadow-sm border border-transparent min-h-[300px]">
                            <ContactList applicationId={id as Id<"applications">} />
                        </TabsContent>
                        <TabsContent value="interviews" className="mt-4 p-6 bg-card rounded-2xl shadow-sm border border-transparent min-h-[400px]">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold tracking-tight">Interview Rounds</h3>
                                <AddInterviewDialog
                                    applicationId={id as Id<"applications">}
                                    nextRoundNumber={application.interviews.length + 1}
                                />
                            </div>

                            {application.interviews.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {application.interviews.map((interview: Interview) => (
                                        <div key={interview._id} className="p-5 rounded-2xl border border-border/50 bg-muted/20 group transition-all hover:bg-muted/30 relative">
                                            <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="size-8 rounded-lg">
                                                            <MoreVertical size={14} />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="rounded-xl border-none shadow-xl bg-card">
                                                        <DropdownMenuItem
                                                            className="text-destructive focus:text-destructive gap-2 rounded-lg cursor-pointer"
                                                            onClick={() => {
                                                                deleteInterview({ id: interview._id });
                                                                toast.success("Interview deleted");
                                                            }}
                                                        >
                                                            <Trash2 size={14} />
                                                            Delete Round
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                                                    <span className="text-sm font-black">{interview.roundNumber}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Round {interview.roundNumber}</p>
                                                    <p className="font-bold text-sm truncate">{format(new Date(interview.date), "EEEE, MMM d, yyyy")}</p>
                                                    <p className="text-xs text-zinc-500">{format(new Date(interview.date), "h:mm a")}</p>
                                                </div>
                                            </div>
                                            {interview.notes && (
                                                <div className="mt-4 p-3 rounded-xl bg-card/50 border border-border/30">
                                                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed italic line-clamp-3">
                                                        {interview.notes}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                                    <div className="size-16 rounded-3xl bg-muted/50 flex items-center justify-center text-muted-foreground">
                                        <Clock size={32} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-bold">No interviews scheduled yet</p>
                                        <p className="text-xs text-muted-foreground px-10">
                                            Keep track of your interview process and upcoming rounds here.
                                        </p>
                                    </div>
                                    <AddInterviewDialog
                                        applicationId={id as Id<"applications">}
                                        nextRoundNumber={1}
                                        trigger={
                                            <Button className="rounded-xl px-8 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-bold text-xs h-10 uppercase shadow-lg shadow-zinc-500/20">
                                                Schedule First Round
                                            </Button>
                                        }
                                    />
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </motion.div>
    );
}
