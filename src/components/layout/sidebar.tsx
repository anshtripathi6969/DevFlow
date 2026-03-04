"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    KanbanSquare,
    Briefcase,
    ChevronLeft,
    ChevronRight,
    Search,
    PlusCircle,
    HelpCircle
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddApplicationDialog } from "@/components/board/add-application-dialog";
import { ThemeToggle } from "./theme-toggle";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Building2, ArrowRight, Calendar as CalendarIcon } from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, id: "nav-dashboard" },
    { name: "Board", href: "/board", icon: KanbanSquare, id: "nav-board" },
    { name: "Applications", href: "/applications", icon: Briefcase, id: "nav-applications" },
    { name: "Interviews", href: "/interviews", icon: CalendarIcon, id: "nav-interviews" },
];

export function Sidebar() {
    const pathname = usePathname();
    const { user } = useUser();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const recentApplications = useQuery(api.applications.getRecentApplications,
        user ? { userId: user.id, limit: 50 } : "skip"
    );

    return (
        <aside
            className={cn(
                "relative flex flex-col border-r border-zinc-200/50 dark:border-zinc-800/50 bg-card transition-all duration-500 ease-in-out z-50",
                isCollapsed ? "w-20" : "w-72"
            )}
        >
            <div className="flex h-16 items-center px-6 border-b border-zinc-50 dark:border-zinc-900">
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <div className="size-9 rounded-xl bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center text-zinc-50 dark:text-zinc-900 font-black text-lg transition-transform group-hover:rotate-12">
                        D
                    </div>
                    {!isCollapsed && (
                        <span className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-zinc-50 dark:to-zinc-500">
                            DevFlow
                        </span>
                    )}
                </Link>
            </div>

            <div className="flex-1 space-y-6 p-4 mt-6 overflow-y-auto no-scrollbar">
                {!isCollapsed && (
                    <div className="px-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600 mb-4">Main Menu</p>
                    </div>
                )}

                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                id={item.id}
                                className={cn(
                                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all group overflow-hidden relative",
                                    isActive
                                        ? "bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 shadow-xl shadow-zinc-200 dark:shadow-zinc-950/50 scale-[1.02]"
                                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/50",
                                    isCollapsed && "justify-center px-0 mx-2"
                                )}
                            >
                                <item.icon className={cn("size-5 transition-transform group-hover:scale-110", isActive && "text-blue-500")} />
                                {!isCollapsed && <span>{item.name}</span>}
                                {isActive && !isCollapsed && (
                                    <div className="absolute right-4 size-1.5 rounded-full bg-blue-500 animate-pulse" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Recent Items */}
                {!isCollapsed && recentApplications && recentApplications.length > 0 && (
                    <div className="space-y-4 px-2">
                        <div className="px-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">Quick Details</p>
                        </div>
                        <div className="space-y-1">
                            {recentApplications.map((app) => (
                                <Link
                                    key={app._id}
                                    href={`/applications/${app._id}`}
                                    className={cn(
                                        "flex items-center justify-between group px-2 py-2 rounded-xl transition-all hover:bg-zinc-100 dark:hover:bg-zinc-900/50 border border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-800/50",
                                        pathname === `/applications/${app._id}` && "bg-zinc-100 dark:bg-zinc-900/50 border-zinc-200/50 dark:border-zinc-800/50"
                                    )}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="size-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-blue-500 transition-colors shrink-0">
                                            <Building2 size={14} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-xs font-bold truncate pr-2">{app.companyName}</p>
                                            <p className="text-[10px] text-zinc-500 truncate pr-2 uppercase font-medium">{app.role}</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={12} className="text-zinc-300 dark:text-zinc-700 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {!isCollapsed && (
                    <div id="quick-add-section" className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                                <PlusCircle size={16} />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">Fast Track</p>
                                <p className="text-[9px] font-medium text-zinc-600 dark:text-zinc-400">Add from anywhere.</p>
                            </div>
                        </div>
                        <AddApplicationDialog trigger={
                            <Button size="sm" className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase h-7">
                                Quick Add
                            </Button>
                        } />
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-zinc-50 dark:border-zinc-900 flex items-center gap-2">
                <ThemeToggle className={cn(isCollapsed && "mx-auto")} />
                {!isCollapsed && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-1 justify-center h-10 rounded-2xl text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <div className="flex items-center gap-2">
                            <ChevronLeft size={20} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Collapse</span>
                        </div>
                    </Button>
                )}
                {isCollapsed && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-10 rounded-2xl text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <ChevronRight size={20} />
                    </Button>
                )}
            </div>

            <div className="p-4 pt-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "w-full rounded-xl text-zinc-400 hover:text-blue-500 hover:bg-blue-500/10 transition-all font-bold text-[10px] uppercase gap-2 h-10 shadow-none",
                        isCollapsed && "px-0"
                    )}
                    onClick={() => (window as any).startDevFlowTour?.()}
                >
                    <HelpCircle size={16} />
                    {!isCollapsed && <span>Need Help?</span>}
                </Button>
            </div>
        </aside>
    );
}
