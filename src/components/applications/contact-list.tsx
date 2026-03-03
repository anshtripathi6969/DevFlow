"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Mail, Linkedin, Trash2, MoreVertical, ExternalLink, Contact, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddContactDialog } from "./add-contact-dialog";

interface ContactListProps {
    applicationId: Id<"applications">;
}

export function ContactList({ applicationId }: ContactListProps) {
    const contacts = useQuery(api.contacts.getContacts, { applicationId });
    const deleteContact = useMutation(api.contacts.deleteContact);

    async function handleDelete(id: Id<"contacts">) {
        try {
            await deleteContact({ id });
            toast.success("Contact removed");
        } catch (error) {
            toast.error("Failed to remove contact");
        }
    }

    if (!contacts) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Contact className="size-5 text-blue-500" />
                    Key Contacts
                </h3>
                <AddContactDialog applicationId={applicationId} />
            </div>

            {contacts.length > 0 ? (
                <ScrollArea className="h-[300px] pr-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                        {contacts.map((contact: any) => (
                            <div key={contact._id} className="p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 group transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 relative">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreVertical size={14} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="rounded-xl border-none shadow-xl bg-card">
                                        <DropdownMenuItem
                                            className="text-rose-500 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30 rounded-lg"
                                            onClick={() => handleDelete(contact._id)}
                                        >
                                            <Trash2 className="size-4 mr-2" />
                                            Remove
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <div className="space-y-3">
                                    <div>
                                        <h4 className="font-bold text-sm leading-tight">{contact.name}</h4>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-0.5">
                                            {contact.role}
                                        </p>
                                    </div>

                                    {contact.notes && (
                                        <p className="text-[11px] text-muted-foreground italic line-clamp-2">
                                            "{contact.notes}"
                                        </p>
                                    )}

                                    <div className="flex items-center gap-2 pt-1">
                                        {contact.email && (
                                            <Button variant="secondary" size="icon" className="size-8 rounded-lg" asChild title={contact.email}>
                                                <a href={`mailto:${contact.email}`}>
                                                    <Mail size={14} />
                                                </a>
                                            </Button>
                                        )}
                                        {contact.linkedin && (
                                            <Button variant="secondary" size="icon" className="size-8 rounded-lg" asChild title="LinkedIn Profile">
                                                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                                                    <Linkedin size={14} />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            ) : (
                <div className="flex flex-col items-center justify-center p-12 rounded-3xl border-2 border-dashed border-zinc-100 dark:border-zinc-800/50 text-center space-y-4">
                    <div className="size-16 rounded-3xl bg-zinc-100/50 dark:bg-zinc-800/30 flex items-center justify-center text-zinc-400">
                        <UserPlus size={24} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                        <p className="font-black text-xs uppercase tracking-widest text-zinc-500">No Contacts</p>
                        <p className="text-[10px] font-medium text-muted-foreground leading-relaxed max-w-[160px]">
                            Track recruiters and engineers for this application.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
