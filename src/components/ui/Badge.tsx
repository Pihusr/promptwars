import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-navy-800/80 text-slate-200 border border-slate-700/80",
        success:
          "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40",
        danger:
          "bg-red-950/60 text-red-300 border border-red-500/40",
        warning:
          "bg-amber-950/60 text-amber-300 border border-amber-500/40",
        info:
          "bg-cyan-950/60 text-cyan-300 border border-cyan-500/40",
        "glow-green":
          "bg-emerald-900/40 text-emerald-400 border border-emerald-400/60 shadow-glow-green/50 font-semibold",
        "glow-red":
          "bg-red-900/40 text-red-400 border border-red-400/60 shadow-glow-red/50 font-semibold",
        outline:
          "border border-slate-700 bg-transparent text-slate-300",
      },
      size: {
        sm: "px-2 py-0.5 text-xs rounded",
        md: "px-2.5 py-1 text-xs rounded-md",
        lg: "px-3 py-1.5 text-sm rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  dotColor?: "green" | "red" | "cyan" | "amber" | "slate";
  icon?: React.ReactNode;
}

export function Badge({
  className,
  variant,
  size,
  dot = false,
  dotColor = "green",
  icon,
  children,
  ...props
}: BadgeProps) {
  const dotColorClasses = {
    green: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
    red: "bg-red-400 shadow-[0_0_8px_#f87171]",
    cyan: "bg-cyan-400 shadow-[0_0_8px_#67e8f9]",
    amber: "bg-amber-400 shadow-[0_0_8px_#fbbf24]",
    slate: "bg-slate-400",
  };

  return (
    <div className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full shrink-0", dotColorClasses[dotColor])}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </div>
  );
}
