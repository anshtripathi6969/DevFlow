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
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Id } from "@/convex/_generated/dataModel";
import { Calendar } from "@/components/ui/calendar";
import { useUser } from "@clerk/nextjs";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface AddInterviewDialogProps {
    applicationId?: Id<"applications">;
    nextRoundNumber?: number;
    trigger?: React.ReactNode;
}

export function AddInterviewDialog({ applicationId: propApplicationId, nextRoundNumber: propNextRoundNumber, trigger }: AddInterviewDialogProps) {
    const { user } = useUser();
    const applications = useQuery(api.applications.getApplications,
        user ? { userId: user.id } : "skip"
    );
    const addInterview = useMutation(api.interviews.addInterview);

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
    const [selectedApplicationId, setSelectedApplicationId] = useState<string>(propApplicationId || "");

    const activeApplicationId = propApplicationId || (selectedApplicationId as Id<"applications">);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!user) return;
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        try {
            if (!activeApplicationId) {
                toast.error("Please select an application");
                return;
            }

            await addInterview({
                applicationId: activeApplicationId,
                userId: user.id,
                roundNumber: Number(formData.get("roundNumber")),
                date: date.getTime(),
                notes: (formData.get("notes") as string) || undefined,
            });

            toast.success(`Round ${formData.get("roundNumber")} scheduled!`);
            setOpen(false);
            setDate(new Date());
        } catch (error) {
            toast.error("Failed to schedule interview");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8">
                        <Plus size={16} />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-2xl border-none p-0 overflow-hidden bg-card">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                <CalendarIcon className="size-5 text-blue-500" />
                                Schedule Interview
                            </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {!propApplicationId && (
                                <div className="space-y-2">
                                    <Label>Company / Role</Label>
                                    <Select value={selectedApplicationId} onValueChange={setSelectedApplicationId}>
                                        <SelectTrigger className="rounded-xl bg-muted/50 border-none h-10">
                                            <SelectValue placeholder="Select an application" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-none shadow-2xl bg-card">
                                            {applications?.map((app) => (
                                                <SelectItem key={app._id} value={app._id} className="rounded-lg">
                                                    {app.companyName} - {app.role}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="roundNumber">Round Number</Label>
                                <Input
                                    id="roundNumber"
                                    name="roundNumber"
                                    type="number"
                                    required
                                    defaultValue={propNextRoundNumber || 1}
                                    className="rounded-xl bg-muted/50 border-none h-10"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal rounded-xl bg-muted/50 border-none h-10",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 rounded-2xl border-none shadow-2xl bg-card" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={(d: Date | undefined) => d && setDate(d)}
                                            initialFocus
                                            className="rounded-2xl"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes / Meeting Link</Label>
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    placeholder="Zoom link, topics to prepare..."
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
                            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 shadow-lg shadow-blue-500/20"
                        >
                            {isLoading ? "Scheduling..." : "Schedule Round"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
