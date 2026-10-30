import * as React from "react";

/** Native select retains browser keyboard, form and assistive-technology behavior. */
export function Select({ className = "", ...props }: React.ComponentPropsWithoutRef<"select">) {
  return <select {...props} className={`min-h-12 w-full rounded-md border border-border bg-input px-3 text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive ${className}`} />;
}
