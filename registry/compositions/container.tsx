import * as React from "react";
export function Container(props: React.ComponentPropsWithoutRef<"div">) { return <div {...props} className={`mx-auto w-full max-w-[var(--container)] px-[var(--gutter)] ${props.className ?? ""}`} />; }
