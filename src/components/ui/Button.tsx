import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-emerald-500 text-navy-950 font-semibold shadow-md hover:bg-emerald-400 hover:shadow-glow-green border border-emerald-400/30",
        secondary:
          "bg-navy-800 text-slate-100 hover:bg-navy-700 border border-slate-700/60 shadow-sm",
        destructive:
          "bg-red-500 text-white font-semibold hover:bg-red-600 hover:shadow-glow-red border border-red-400/30",
        outline:
          "border border-slate-700 bg-transparent text-slate-200 hover:bg-navy-800 hover:text-white hover:border-slate-500",
        ghost:
          "text-slate-300 hover:bg-navy-800 hover:text-white",
        "glow-green":
          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/60 shadow-glow-green",
        "glow-red":
          "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/60 shadow-glow-red",
      },
      size: {
        sm: "h-8 px-3 text-xs gap-1.5",
        md: "h-10 px-4 py-2 text-sm gap-2",
        lg: "h-12 px-6 text-base gap-2.5 font-semibold",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        {children}
        {!isLoading && rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
