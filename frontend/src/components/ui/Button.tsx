import { cn } from "../../lib/utils"; // cn: conditional className joiner
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive" | "link";
}

const base =
  "inline-flex items-center justify-center text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<string, string> = {
  default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  outline: "border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
  destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  link: "text-blue-600 underline underline-offset-4 hover:no-underline focus:ring-transparent px-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className, "px-3 py-2")}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
