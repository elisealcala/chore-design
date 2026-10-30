import * as React from "react";
export function Section({ title, children, ...props }: React.ComponentPropsWithoutRef<"section"> & { title: string }) { return <section {...props} className={`py-8 ${props.className ?? ""}`}><h2 className="mb-4 text-2xl font-semibold">{title}</h2>{children}</section>; }
