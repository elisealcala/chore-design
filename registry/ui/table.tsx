import * as React from "react";
export function Table(props: React.ComponentPropsWithoutRef<"table">) { return <div className="w-full overflow-x-auto"><table {...props} className={`w-full text-left text-card-foreground ${props.className ?? ""}`} /></div>; }
export function TableHead(props: React.ComponentPropsWithoutRef<"th">) { return <th {...props} className={`border-b border-border p-3 font-medium ${props.className ?? ""}`} />; }
export function TableCell(props: React.ComponentPropsWithoutRef<"td">) { return <td {...props} className={`border-b border-border p-3 ${props.className ?? ""}`} />; }
