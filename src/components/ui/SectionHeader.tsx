import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  badgeText?: string;
  badgeVariant?: "default" | "success" | "danger" | "warning" | "glow-green" | "glow-red";
  action?: React.ReactNode;
  align?: "left" | "center" | "between";
}

export function SectionHeader({
  title,
  description,
  badgeText,
  badgeVariant = "glow-green",
  action,
  align = "between",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 pb-4 md:pb-6",
        align === "center" && "items-center text-center",
        align === "between" && "md:flex-row md:items-end md:justify-between",
        className
      )}
      {...props}
    >
      <div className="space-y-1.5 max-w-2xl">
        {badgeText && (
          <div className="mb-2">
            <Badge variant={badgeVariant} size="sm" dot dotColor={badgeVariant.includes("red") ? "red" : "green"}>
              {badgeText}
            </Badge>
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          {title}
        </h2>
        {description && (
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && <div className="flex shrink-0 items-center gap-3">{action}</div>}
    </div>
  );
}
