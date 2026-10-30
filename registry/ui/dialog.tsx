"use client";

import * as React from "react";
import { Dialog as Primitive } from "radix-ui";
export const Dialog = Primitive.Root;
export const DialogTrigger = Primitive.Trigger;
export const DialogClose = Primitive.Close;
export const DialogTitle = Primitive.Title;
export const DialogDescription = Primitive.Description;
export function DialogContent({ children, className = "", ...props }: React.ComponentPropsWithoutRef<typeof Primitive.Content>) { return <Primitive.Portal><Primitive.Overlay className="fixed inset-0 z-50 bg-black/70" /><Primitive.Content {...props} className={`fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-lg border border-border bg-card p-6 text-card-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${className}`}>{children}</Primitive.Content></Primitive.Portal>; }
