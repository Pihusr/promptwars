import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  gapValue?: number; // optional gap/deficit percentage (e.g. remaining gap to goal)
  variant?: "emerald" | "red" | "gradient" | "cyan" | "dual";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  sublabel?: string;
}

export function ProgressBar({
  value,
  max = 100,
  gapValue = 0,
  variant = "emerald",
  size = "md",
  showLabel = false,
  label,
  sublabel,
  className,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const gapPercentage = Math.min(Math.max((gapValue / max) * 100, 0), 100 - percentage);

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4 rounded-md",
  };

  const getBarColor = () => {
    switch (variant) {
      case "emerald":
        return "bg-emerald-500 shadow-glow-green";
      case "red":
        return "bg-red-500 shadow-glow-red";
      case "cyan":
        return "bg-cyan-500 shadow-glow-cyan";
      case "gradient":
        return "bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500";
      case "dual":
        return "bg-emerald-500";
      default:
        return "bg-emerald-500";
    }
  };

  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {label && <span className="font-semibold text-slate-200">{label}</span>}
            {sublabel && <span className="text-slate-400">{sublabel}</span>}
          </div>
          {showLabel && (
            <div className="flex items-center gap-2 font-mono">
              <span className="text-emerald-400 font-bold">{Math.round(percentage)}%</span>
              {gapValue > 0 && (
                <span className="text-red-400 font-medium">({Math.round(gapPercentage)}% gap)</span>
              )}
            </div>
          )}
        </div>
      )}

      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-navy-950/80 border border-slate-800 p-0.5",
          sizeClasses[size]
        )}
      >
        <div className="flex h-full w-full rounded-full overflow-hidden">
          <div
            className={cn("h-full transition-all duration-500 ease-out rounded-full", getBarColor())}
            style={{ width: `${percentage}%` }}
          />
          {variant === "dual" && gapPercentage > 0 && (
            <div
              className="h-full bg-red-500/80 transition-all duration-500 ease-out rounded-r-full shadow-glow-red"
              style={{ width: `${gapPercentage}%` }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
