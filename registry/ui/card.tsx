import * as React from "react";
export function Card(props: React.ComponentPropsWithoutRef<"div">) { return <div {...props} className={`rounded-lg border border-border bg-card p-6 text-card-foreground ${props.className ?? ""}`} />; }
