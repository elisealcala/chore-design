import * as React from "react";
export function Badge(props: React.ComponentPropsWithoutRef<"span">) { return <span {...props} className={`inline-flex rounded-sm bg-secondary px-2 py-1 text-sm text-secondary-foreground ${props.className ?? ""}`} />; }
