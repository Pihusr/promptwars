import * as React from "react";
import { Check, User, Sparkles, Target, Settings, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

export interface OnboardingProgressProps {
  currentStep: 1 | 2 | 3 | 4;
  onStepClick?: (step: 1 | 2 | 3 | 4) => void;
  completedSteps?: number[];
}

const STEPS = [
  { step: 1 as const, title: "About You", desc: "College & Program", icon: User },
  { step: 2 as const, title: "Interests", desc: "Domain Passions", icon: Sparkles },
  { step: 3 as const, title: "Mission", desc: "Target Career Goal", icon: Target },
  { step: 4 as const, title: "Preferences", desc: "Hours, Format & Pace", icon: Settings },
];

export function OnboardingProgress({
  currentStep,
  onStepClick,
  completedSteps = [],
}: OnboardingProgressProps) {
  const percentage = ((currentStep - 1) / 3) * 100;

  return (
    <div className="w-full space-y-4">
      {/* Mobile Compact Progress (< 768px) */}
      <div className="md:hidden space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="glow-green" size="sm">
              Step {currentStep} of 4
            </Badge>
            <span className="text-sm font-bold text-white">
              {STEPS[currentStep - 1].title}
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            {Math.round((currentStep / 4) * 100)}%
          </span>
        </div>
        <ProgressBar value={(currentStep / 4) * 100} variant="emerald" size="sm" />
      </div>

      {/* Desktop Detailed Stepper (>= 768px) */}
      <div className="hidden md:block">
        <div className="relative flex items-center justify-between">
          {/* Background Connecting Line */}
          <div className="absolute left-8 right-8 top-5 h-[2px] bg-slate-800 -z-0" />
          {/* Active Emerald Progress Fill Line */}
          <div
            className="absolute left-8 top-5 h-[2px] bg-emerald-500 shadow-glow-green transition-all duration-500 ease-out -z-0"
            style={{ width: `${percentage}%` }}
          />

          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.step;
            const isActive = currentStep === s.step;
            const isUpcoming = currentStep < s.step;

            return (
              <div
                key={s.step}
                className="relative z-10 flex flex-col items-center text-center group"
                aria-current={isActive ? "step" : undefined}
              >
                <button
                  type="button"
                  disabled={isUpcoming}
                  onClick={() => onStepClick && isCompleted && onStepClick(s.step)}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300",
                    isCompleted &&
                      "border-emerald-400 bg-emerald-500 text-navy-950 shadow-glow-green cursor-pointer hover:scale-105",
                    isActive &&
                      "border-emerald-400 bg-navy-900 text-emerald-400 shadow-glow-green ring-4 ring-emerald-500/20",
                    isUpcoming &&
                      "border-slate-800 bg-navy-950 text-slate-500 cursor-not-allowed"
                  )}
                  aria-label={`Step ${s.step}: ${s.title}`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 stroke-[3]" />
                  ) : (
                    <Icon className={cn("h-4 w-4", isActive ? "text-emerald-400" : "text-slate-500")} />
                  )}
                </button>

                <div className="mt-2 space-y-0.5">
                  <div
                    className={cn(
                      "text-xs font-bold transition-colors",
                      isActive
                        ? "text-emerald-400 font-extrabold"
                        : isCompleted
                        ? "text-slate-200"
                        : "text-slate-500"
                    )}
                  >
                    {s.title}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {s.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
