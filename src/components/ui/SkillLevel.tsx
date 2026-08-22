import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { Zap, Target, Award } from "lucide-react";

export type SkillLevelTier = "beginner" | "intermediate" | "advanced" | "master";

export interface SkillLevelProps extends React.HTMLAttributes<HTMLDivElement> {
  currentLevel: SkillLevelTier;
  targetLevel?: SkillLevelTier;
  skillName?: string;
  category?: string;
  showDetails?: boolean;
  compact?: boolean;
}

const TIER_ORDER: Record<SkillLevelTier, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  master: 4,
};

const TIER_LABELS: Record<SkillLevelTier, { label: string; desc: string }> = {
  beginner: { label: "Beginner", desc: "Foundational concepts & syntax" },
  intermediate: { label: "Intermediate", desc: "Applied projects & standard workflows" },
  advanced: { label: "Advanced", desc: "System design & deep domain expertise" },
  master: { label: "Master / Industry-Ready", desc: "Production grade & architecture mastery" },
};

export function SkillLevel({
  currentLevel,
  targetLevel,
  skillName,
  category,
  showDetails = true,
  compact = false,
  className,
  ...props
}: SkillLevelProps) {
  const currentStep = TIER_ORDER[currentLevel];
  const targetStep = targetLevel ? TIER_ORDER[targetLevel] : undefined;

  const getTierColor = (tier: SkillLevelTier) => {
    switch (tier) {
      case "beginner":
        return "text-cyan-400 border-cyan-500/30";
      case "intermediate":
        return "text-emerald-400 border-emerald-500/30";
      case "advanced":
        return "text-indigo-400 border-indigo-500/30";
      case "master":
        return "text-amber-400 border-amber-500/30";
    }
  };

  if (compact) {
    return (
      <div className={cn("inline-flex items-center gap-2", className)} {...props}>
        <div className="flex items-center gap-1">
          {(["beginner", "intermediate", "advanced", "master"] as SkillLevelTier[]).map(
            (tier, index) => {
              const stepNumber = index + 1;
              const isAchieved = stepNumber <= currentStep;
              const isTarget = targetStep && stepNumber === targetStep;

              return (
                <div
                  key={tier}
                  title={`Level ${stepNumber}: ${TIER_LABELS[tier].label}`}
                  className={cn(
                    "h-2 w-5 rounded-sm transition-all duration-200",
                    isAchieved
                      ? "bg-emerald-500 shadow-glow-green"
                      : isTarget
                      ? "bg-red-500/50 border border-red-400"
                      : "bg-navy-950 border border-slate-800"
                  )}
                />
              );
            }
          )}
        </div>
        <span className="text-xs font-semibold capitalize text-slate-300">
          {TIER_LABELS[currentLevel].label}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-800/80 bg-navy-900/60 p-4 space-y-3.5 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {skillName && (
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-white text-sm md:text-base">{skillName}</h4>
              {category && (
                <span className="text-2xs uppercase tracking-wider text-slate-400 bg-navy-950 px-2 py-0.5 rounded border border-slate-800">
                  {category}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="glow-green" size="sm" dot dotColor="green">
              {TIER_LABELS[currentLevel].label}
            </Badge>
            {targetLevel && (
              <Badge variant="glow-red" size="sm" icon={<Target className="w-3 h-3 text-red-400" />}>
                Goal: {TIER_LABELS[targetLevel].label}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* 4-Step Visual Tier Indicators */}
      <div className="space-y-1.5">
        <div className="grid grid-cols-4 gap-2">
          {(["beginner", "intermediate", "advanced", "master"] as SkillLevelTier[]).map(
            (tier, idx) => {
              const step = idx + 1;
              const isAchieved = step <= currentStep;
              const isCurrent = step === currentStep;
              const isTarget = targetStep ? step === targetStep : false;
              const isGap = targetStep ? step > currentStep && step <= targetStep : false;

              return (
                <div key={tier} className="space-y-1">
                  <div
                    className={cn(
                      "h-2.5 rounded-md transition-all duration-300",
                      isAchieved
                        ? "bg-emerald-500 shadow-glow-green"
                        : isGap
                        ? "bg-red-500/30 border border-red-500/50 shadow-glow-red/20"
                        : "bg-navy-950 border border-slate-800/80"
                    )}
                  />
                  <div className="flex items-center justify-between px-0.5">
                    <span
                      className={cn(
                        "text-[10px] font-medium uppercase tracking-tight",
                        isCurrent
                          ? "text-emerald-400 font-bold"
                          : isTarget
                          ? "text-red-400 font-bold"
                          : isAchieved
                          ? "text-slate-300"
                          : "text-slate-500"
                      )}
                    >
                      {tier.slice(0, 3)}
                    </span>
                    {isCurrent && <Zap className="w-2.5 h-2.5 text-emerald-400" />}
                    {isTarget && !isAchieved && (
                      <Target className="w-2.5 h-2.5 text-red-400" />
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {showDetails && (
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            Current: <strong className="text-slate-200">{TIER_LABELS[currentLevel].desc}</strong>
          </span>
          {targetLevel && currentStep < (targetStep ?? 0) && (
            <span className="text-red-400 font-medium font-mono text-[11px]">
              +{(targetStep ?? 0) - currentStep} tier gap to bridge
            </span>
          )}
        </div>
      )}
    </div>
  );
}
