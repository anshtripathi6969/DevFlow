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
import { Plus, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

interface AddContactDialogProps {
    applicationId: Id<"applications">;
}

export function AddContactDialog({ applicationId }: AddContactDialogProps) {
    const addContact = useMutation(api.contacts.addContact);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        try {
            await addContact({
                applicationId,
                name: formData.get("name") as string,
                role: formData.get("role") as string,
                email: (formData.get("email") as string) || undefined,
                linkedin: (formData.get("linkedin") as string) || undefined,
                notes: (formData.get("notes") as string) || undefined,
            });

            toast.success("Contact added successfully");
            setOpen(false);
        } catch (error) {
            toast.error("Failed to add contact");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-xl gap-2 h-9 px-4 border-dashed hover:border-primary hover:text-primary transition-all">
                    <UserPlus className="size-4" />
                    Add Contact
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-2xl border-none p-0 overflow-hidden bg-card">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">New Contact</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Jane Doe"
                                    className="rounded-xl bg-muted/50 border-none h-10"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Input
                                    id="role"
                                    name="role"
                                    required
                                    placeholder="Tech Recruiter / SWE"
                                    className="rounded-xl bg-muted/50 border-none h-10"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email (Optional)</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="jane@company.com"
                                        className="rounded-xl bg-muted/50 border-none h-10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin">LinkedIn URL (Optional)</Label>
                                    <Input
                                        id="linkedin"
                                        name="linkedin"
                                        type="url"
                                        placeholder="https://..."
                                        className="rounded-xl bg-muted/50 border-none h-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes (Optional)</Label>
                                <Input
                                    id="notes"
                                    name="notes"
                                    placeholder="Met at career fair..."
                                    className="rounded-xl bg-muted/50 border-none h-10"
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
                            {isLoading ? "Adding..." : "Add Contact"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
