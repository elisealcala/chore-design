"use client";

import * as React from "react";
import { Tabs as Primitive } from "radix-ui";
export const Tabs = Primitive.Root;
export function TabsList({ className = "", ...props }: React.ComponentPropsWithoutRef<typeof Primitive.List>) { return <Primitive.List {...props} className={`flex flex-wrap gap-2 border-b border-border ${className}`} />; }
export function TabsTrigger({ className = "", ...props }: React.ComponentPropsWithoutRef<typeof Primitive.Trigger>) { return <Primitive.Trigger {...props} className={`min-h-12 px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-primary ${className}`} />; }
export const TabsContent = Primitive.Content;
