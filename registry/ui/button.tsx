import * as React from "react";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
};

/** A native button; installed source belongs to the consuming project. */
export function Button({ className = "", variant = "primary", type = "button", ...props }: ButtonProps) {
  const colors = variant === "primary"
    ? "bg-primary text-primary-foreground"
    : "bg-secondary text-secondary-foreground";
  return (
    <button
      type={type}
      className={`inline-flex min-h-12 items-center justify-center rounded-md px-4 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 ${colors} ${className}`}
      {...props}
    />
  );
}
