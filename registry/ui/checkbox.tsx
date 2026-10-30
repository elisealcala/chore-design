"use client";

import * as React from "react";
import { Checkbox as Primitive } from "radix-ui";
export function Checkbox({ className = "", ...props }: React.ComponentPropsWithoutRef<typeof Primitive.Root>) { return <Primitive.Root {...props} className={`inline-flex h-12 w-12 items-center justify-center rounded-sm border border-border bg-input text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground ${className}`}><Primitive.Indicator aria-hidden>✓</Primitive.Indicator></Primitive.Root>; }
