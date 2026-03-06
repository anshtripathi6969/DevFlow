"use client";

import { UserButton } from "@clerk/nextjs";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Topbar() {
    return (
        <header className="h-16 flex items-center justify-between px-6 glass-header sticky top-0 z-40">
            <div className="relative w-96 max-w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                    type="search"
                    placeholder="Search applications..."
                    className="pl-10 bg-zinc-100/50 dark:bg-zinc-800/50 border-none rounded-2xl h-11 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:bg-white dark:focus-visible:bg-zinc-900 shadow-inner"
                />
            </div>
            <div className="flex items-center gap-4">
                <button className="size-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-foreground transition-all border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-white dark:hover:bg-zinc-900 shadow-sm relative group">
                    <Bell size={18} />
                    <span className="absolute top-2.5 right-2.5 size-2 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-950 group-hover:animate-ping" />
                </button>
                <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "h-10 w-10 rounded-2xl border-2 border-white dark:border-zinc-800 shadow-md",
                        },
                    }} />
            </div>
        </header>
    );
}
