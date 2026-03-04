"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
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
import { Edit2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Id } from "@/convex/_generated/dataModel";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { X, Flame, Zap, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EditApplicationDialogProps {
    application: {
        _id: Id<"applications">;
        companyName: string;
        role: string;
        location: string;
        jobUrl?: string;
        salaryRange?: string;
        notes?: string;
        dateApplied: number;
        priority: string;
        tags: string[];
    };
    trigger?: React.ReactNode;
}

export function EditApplicationDialog({ application, trigger }: EditApplicationDialogProps) {
    const updateApplication = useMutation(api.applications.updateApplication);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState<string[]>(application.tags || []);
    const [tagInput, setTagInput] = useState("");
    const [priority, setPriority] = useState(application.priority || "Medium");

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
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        try {
            await updateApplication({
                id: application._id,
                companyName: formData.get("companyName") as string,
                role: formData.get("role") as string,
                location: formData.get("location") as string,
                jobUrl: (formData.get("jobUrl") as string) || undefined,
                salaryRange: (formData.get("salaryRange") as string) || undefined,
                notes: (formData.get("notes") as string) || undefined,
                priority,
                tags,
                dateApplied: application.dateApplied, // Preserve original date for now
            });

            toast.success("Application updated successfully");
            setOpen(false);
        } catch (error) {
            toast.error("Failed to update application");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="icon" className="rounded-xl border-border/50">
                        <Edit2 size={16} />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-2xl border-none p-0 overflow-hidden bg-card">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">Edit Application</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="companyName">Company</Label>
                                    <Input
                                        id="companyName"
                                        name="companyName"
                                        required
                                        defaultValue={application.companyName}
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
                                        defaultValue={application.role}
                                        placeholder="Frontend Engineer"
                                        className="rounded-xl bg-muted/50 border-none h-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    required
                                    defaultValue={application.location}
                                    placeholder="Remote / SF"
                                    className="rounded-xl bg-muted/50 border-none h-10"
                                />
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
                                        defaultValue={application.jobUrl}
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
                                        defaultValue={application.salaryRange}
                                        placeholder="$120k - $150k"
                                        className="rounded-xl bg-muted/50 border-none h-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    defaultValue={application.notes}
                                    placeholder="Update your notes..."
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
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
