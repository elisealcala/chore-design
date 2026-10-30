import * as React from "react";
export function PageIntro({ title, description, ...props }: Omit<React.ComponentPropsWithoutRef<"header">, "title"> & { title: string; description?: string }) { return <header {...props}><h1 className="text-4xl font-bold tracking-tight">{title}</h1>{description && <p className="mt-4 text-muted-foreground">{description}</p>}</header>; }
