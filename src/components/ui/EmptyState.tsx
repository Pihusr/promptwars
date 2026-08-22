import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Sparkles } from "lucide-react";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  primaryActionHref?: string;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  secondaryActionHref?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  primaryActionLabel,
  onPrimaryAction,
  primaryActionHref,
  secondaryActionLabel,
  onSecondaryAction,
  secondaryActionHref,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-navy-950/50 p-8 text-center md:p-12",
        className
      )}
      {...props}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-850 border border-slate-700/60 text-emerald-400 shadow-glow-green/30 mb-4">
        {icon || <Sparkles className="h-8 w-8 text-emerald-400" />}
      </div>

      <h3 className="text-lg md:text-xl font-bold text-white mb-2">{title}</h3>
      <p className="max-w-md text-sm text-slate-400 mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {primaryActionLabel && (
          primaryActionHref ? (
            <a href={primaryActionHref}>
              <Button variant="primary">{primaryActionLabel}</Button>
            </a>
          ) : (
            <Button variant="primary" onClick={onPrimaryAction}>
              {primaryActionLabel}
            </Button>
          )
        )}

        {secondaryActionLabel && (
          secondaryActionHref ? (
            <a href={secondaryActionHref}>
              <Button variant="outline">{secondaryActionLabel}</Button>
            </a>
          ) : (
            <Button variant="outline" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )
        )}
      </div>
    </div>
  );
}
