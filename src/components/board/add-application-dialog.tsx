"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { X, Flame, Zap, Minus, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AddApplicationDialogProps {
    trigger?: React.ReactNode;
}

export function AddApplicationDialog({ trigger }: AddApplicationDialogProps) {
    const { user } = useUser();
    const createApplication = useMutation(api.applications.createApplication);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [priority, setPriority] = useState("Medium");

    const addTag = () => {
        const trimmed = tagInput.trim();
        if (trimmed && !tags.includes(trimmed)) {
            setTags([...tags, trimmed]);
            setTagInput("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!user) return;

        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        try {
            await createApplication({
                userId: user.id,
                companyName: formData.get("companyName") as string,
                role: formData.get("role") as string,
                location: formData.get("location") as string,
                status: formData.get("status") as string,
                priority,
                tags,
                jobUrl: (formData.get("jobUrl") as string) || undefined,
                salaryRange: (formData.get("salaryRange") as string) || undefined,
                notes: (formData.get("notes") as string) || undefined,
                dateApplied: Date.now(),
            });

            toast.success("Application added successfully");
            setOpen(false);
        } catch (error) {
            toast.error("Failed to add application");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="rounded-xl gap-2 h-10 px-4 bg-primary hover:bg-primary/90">
                        <Plus className="size-4" />
                        Add Application
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-2xl border-none p-0 overflow-hidden bg-card">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">New Application</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="companyName">Company</Label>
                                    <Input
                                        id="companyName"
                                        name="companyName"
                                        required
                                        placeholder="Stripe"
                                        className="rounded-xl bg-muted/50 border-none h-10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Input
                                        id="role"
                                        name="role"
                                        required
                                        placeholder="Frontend Engineer"
                                        className="rounded-xl bg-muted/50 border-none h-10"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        required
                                        placeholder="Remote / SF"
                                        className="rounded-xl bg-muted/50 border-none h-10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Initial Status</Label>
                                    <Select name="status" defaultValue="Applied">
                                        <SelectTrigger className="rounded-xl bg-muted/50 border-none h-10">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-none shadow-xl bg-card">
                                            <SelectItem value="Applied">Applied</SelectItem>
                                            <SelectItem value="OA">OA</SelectItem>
                                            <SelectItem value="Interview">Interview</SelectItem>
                                            <SelectItem value="Rejected">Rejected</SelectItem>
                                            <SelectItem value="Offer">Offer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="priority">Priority</Label>
                                    <Select value={priority} onValueChange={setPriority}>
                                        <SelectTrigger className="rounded-xl bg-muted/50 border-none h-10">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-none shadow-xl bg-card">
                                            <SelectItem value="Dream" className="text-orange-500 font-bold">🔥 Dream</SelectItem>
                                            <SelectItem value="High" className="text-yellow-500 font-bold">⚡ High</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="Low">Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="jobUrl">Job URL (Optional)</Label>
                                    <Input
                                        id="jobUrl"
                                        name="jobUrl"
                                        type="url"
                                        placeholder="https://..."
                                        className="rounded-xl bg-muted/50 border-none h-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags (Remote, Startup, etc.)</Label>
                                <div className="space-y-2">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="rounded-lg gap-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-none">
                                                {tag}
                                                <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive">
                                                    <X size={12} />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <Input
                                        id="tags"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type and press Enter..."
                                        className="rounded-xl bg-muted/50 border-none h-10"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="salaryRange">Salary Range (Optional)</Label>
                                    <Input
                                        id="salaryRange"
                                        name="salaryRange"
                                        placeholder="$120k - $150k"
                                        className="rounded-xl bg-muted/50 border-none h-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Initial Notes</Label>
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    placeholder="Added referral..."
                                    className="rounded-xl bg-muted/50 border-none min-h-[100px] resize-none"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="bg-muted/30 p-4 border-t border-border/50">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            className="rounded-xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-xl bg-primary hover:bg-primary/90 px-8"
                        >
                            {isLoading ? "Adding..." : "Create Application"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
