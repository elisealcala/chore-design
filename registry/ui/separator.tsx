"use client";

import * as React from "react";
import { Separator as Primitive } from "radix-ui";
export function Separator({ className = "", orientation = "horizontal", decorative = true, ...props }: React.ComponentPropsWithoutRef<typeof Primitive.Root>) { return <Primitive.Root {...props} decorative={decorative} orientation={orientation} className={`shrink-0 bg-border ${orientation === "horizontal" ? "h-px w-full" : "h-full w-px"} ${className}`} />; }
