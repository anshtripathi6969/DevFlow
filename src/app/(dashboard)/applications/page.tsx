"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, Filter, ExternalLink, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddApplicationDialog } from "@/components/board/add-application-dialog";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { motion, AnimatePresence } from "framer-motion";
import { Id } from "@/convex/_generated/dataModel";

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

export default function ApplicationsPage() {
    const { user } = useUser();
    const applications = useQuery(
        api.applications.getApplications,
        user ? { userId: user.id } : "skip"
    ) as Application[] | undefined;
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredItems = applications?.filter((item: Application) => {
        const matchesSearch =
            item.companyName.toLowerCase().includes(search.toLowerCase()) ||
            item.role.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (!applications) {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="rounded-2xl border border-border overflow-hidden">
                    <div className="h-12 bg-muted/50 border-b" />
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-16 border-b flex items-center px-4 gap-4">
                            <Skeleton className="h-4 w-full" />
                        </div>
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
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
                    <p className="text-muted-foreground">
                        Manage and track all your job applications in one place.
                    </p>
                </div>
                <AddApplicationDialog />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-2xl shadow-sm border border-transparent">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search company or role..."
                        className="pl-9 rounded-xl border-none bg-muted/50 h-10 w-full focus-visible:ring-1 focus-visible:ring-primary/20"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="size-4 text-muted-foreground ml-2 hidden sm:block" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[150px] rounded-xl border-none bg-muted/50 h-10">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-none shadow-xl">
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Applied">Applied</SelectItem>
                            <SelectItem value="OA">OA</SelectItem>
                            <SelectItem value="Interview">Interview</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                            <SelectItem value="Offer">Offer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="rounded-2xl border-none shadow-sm overflow-hidden bg-white dark:bg-zinc-950">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow className="hover:bg-transparent border-border/50">
                            <TableHead className="font-semibold text-xs uppercase tracking-wider">Company</TableHead>
                            <TableHead className="font-semibold text-xs uppercase tracking-wider">Role</TableHead>
                            <TableHead className="font-semibold text-xs uppercase tracking-wider">Location</TableHead>
                            <TableHead className="font-semibold text-xs uppercase tracking-wider">Date Applied</TableHead>
                            <TableHead className="font-semibold text-xs uppercase tracking-wider">Status</TableHead>
                            <TableHead className="font-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {filteredItems?.map((item, index) => (
                                <motion.tr
                                    key={item._id}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                    className="group hover:bg-muted/30 border-border/50 transition-colors cursor-pointer"
                                >
                                    <TableCell className="font-medium p-4">
                                        <Link href={`/applications/${item._id}`} className="block hover:text-primary transition-colors">
                                            {item.companyName}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="p-4">{item.role}</TableCell>
                                    <TableCell className="p-4 text-muted-foreground">{item.location}</TableCell>
                                    <TableCell className="p-4 text-muted-foreground text-sm">
                                        {format(new Date(item.dateApplied), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="p-4">
                                        <StatusBadge status={item.status} />
                                    </TableCell>
                                    <TableCell className="text-right p-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-xl border-none shadow-xl bg-card">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/applications/${item._id}`} className="flex items-center gap-2 cursor-pointer">
                                                        View Details
                                                    </Link>
                                                </DropdownMenuItem>
                                                {item.jobUrl && (
                                                    <DropdownMenuItem asChild>
                                                        <a href={item.jobUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 cursor-pointer">
                                                            Job Posting <ExternalLink className="size-3" />
                                                        </a>
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                        {filteredItems?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground italic">
                                    No applications found matching your search.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    );
}
