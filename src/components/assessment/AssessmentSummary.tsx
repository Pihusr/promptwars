import * as React from "react";
import {
  AssessmentDraft,
  AssessableSkill,
  AssessmentResult,
  DiagnosticSignal,
} from "@/types/assessment";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Flame,
  Sparkles,
  AlertCircle,
  Clock,
} from "lucide-react";
import { calculateAssessmentResult } from "@/lib/assessment-storage";

export interface AssessmentSummaryProps {
  draft: AssessmentDraft;
  skills: AssessableSkill[];
  studentName?: string;
  onBackToAssessment: () => void;
  onJumpToSkill: (skillIndex: number) => void;
  onConfirmAndSave: (result: AssessmentResult) => void;
  isSubmitting?: boolean;
}

export function AssessmentSummary({
  draft,
  skills,
  studentName = "Student",
  onBackToAssessment,
  onJumpToSkill,
  onConfirmAndSave,
  isSubmitting = false,
}: AssessmentSummaryProps) {
  // Check for any unanswered required skills
  const unansweredSkills = skills
    .map((skill, index) => ({ skill, index }))
    .filter(({ skill }) => {
      const ans = draft.answers[skill.skillSlug];
      return !ans || !ans.selfReportedLevel || !ans.confidence;
    });

  const isAllAnswered = unansweredSkills.length === 0;

  const result = React.useMemo(() => {
    return calculateAssessmentResult(draft, skills, studentName);
  }, [draft, skills, studentName]);

  const getDiagnosticLabel = (signal: DiagnosticSignal) => {
    switch (signal) {
      case "consistent":
        return "Quick check aligned with your current self-rating";
      case "needs_review":
        return "Consider revisiting this area with a short practice activity";
      case "not_asked":
      default:
        return "No quick check completed for this skill";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Goal Card */}
        <Card className="p-5 bg-navy-900/80 border-slate-800 space-y-1.5">
          <span className="text-xs uppercase font-mono text-slate-400">Target Goal</span>
          <h3 className="text-lg font-bold text-white leading-snug">{draft.goalTitle}</h3>
          <p className="text-xs text-slate-400 font-mono">{skills.length} Evaluated Skills</p>
        </Card>

        {/* Readiness Score Card */}
        <Card variant="glow-green" className="p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono text-slate-300">
              Preliminary goal readiness estimate
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black font-mono text-emerald-400">
            {result.readinessScore}%
          </div>
          <ProgressBar value={result.readinessScore} variant="emerald" size="sm" />
          <span className="text-[11px] text-slate-400 leading-tight block pt-0.5">
            Based on your self-assessment and optional confidence checks.
          </span>
        </Card>

        {/* Critical Priority Gaps */}
        <Card
          variant={result.criticalGapCount > 0 ? "glow-red" : "default"}
          className="p-5 space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono text-slate-300">Skills to Strengthen</span>
            <Flame className="h-4 w-4 text-red-400" />
          </div>
          <div className="text-3xl font-black font-mono text-red-400">
            {result.criticalGapCount} Priority Gaps
          </div>
          <p className="text-xs text-slate-400">
            {result.criticalGapCount > 0
              ? "Prerequisites prioritized for your upcoming roadmap"
              : "Solid baseline foundation across core topics"}
          </p>
        </Card>
      </div>

      {/* Unanswered Skills Warning (if any) */}
      {!isAllAnswered && (
        <Card className="p-5 bg-red-950/40 border-red-500/40 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-red-300">
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
            <span>Incomplete Skill Ratings ({unansweredSkills.length} remaining)</span>
          </div>
          <p className="text-xs text-slate-300">
            Complete all required skill ratings to save your preliminary profile. Click any item below to jump directly to it:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {unansweredSkills.map(({ skill, index }) => (
              <button
                key={skill.skillSlug}
                type="button"
                onClick={() => onJumpToSkill(index)}
                className="px-3 py-1.5 rounded-lg bg-navy-950 border border-red-500/50 text-xs font-semibold text-red-300 hover:bg-red-900/30 hover:border-red-400 transition-all flex items-center gap-1.5"
              >
                <span>{index + 1}. {skill.name}</span>
                <span className="text-[10px] font-mono text-red-400">→ Jump</span>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Detailed Skill Profile Breakdown */}
      <Card className="p-6 bg-navy-900/90 border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Preliminary Skill Profile</h3>
            <p className="text-xs text-slate-400">
              Comparing your current self-reported baseline against recruiter benchmark targets.
            </p>
          </div>
          <Badge variant="outline" size="sm">Self-Reported</Badge>
        </div>

        <div className="space-y-3">
          {result.profile.map((entry) => {
            const isCritical =
              (entry.importance === "critical" || entry.importance === "high") &&
              entry.gap >= 2;

            return (
              <div
                key={entry.skillSlug}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  isCritical
                    ? "bg-navy-950 border-red-500/30"
                    : "bg-navy-950/70 border-slate-800"
                }`}
              >
                <div className="space-y-1.5 min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{entry.name}</span>
                    {isCritical && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-red-950/60 text-red-300 border border-red-500/40">
                        Priority Gap
                      </span>
                    )}
                    {entry.gap === 0 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/40">
                        Target Met
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                    <span>{entry.skillType === "hard" ? "Tech" : "Soft"}</span>
                    <span>•</span>
                    <span className="capitalize">{entry.confidence} Confidence</span>
                    <span>•</span>
                    <span
                      className={
                        entry.diagnosticSignal === "consistent"
                          ? "text-emerald-400"
                          : entry.diagnosticSignal === "needs_review"
                          ? "text-amber-400"
                          : "text-slate-500"
                      }
                    >
                      {getDiagnosticLabel(entry.diagnosticSignal)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">
                      Your Level
                    </span>
                    <span className="text-sm font-bold font-mono text-white">
                      Lvl {entry.currentLevel}
                    </span>
                  </div>

                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">
                      Target
                    </span>
                    <span className="text-sm font-bold font-mono text-cyan-400">
                      Lvl {entry.targetLevel}
                    </span>
                  </div>

                  <div className="text-center min-w-[60px]">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">
                      Gap
                    </span>
                    <span
                      className={`text-sm font-bold font-mono ${
                        entry.gap > 0 ? "text-red-400" : "text-emerald-400"
                      }`}
                    >
                      {entry.gap > 0 ? `-${entry.gap}` : "0 (Ready)"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 rounded-xl bg-navy-950 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
          <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>
            This profile is based on your self-assessment and optional confidence checks. You can update it as you learn and build projects.
          </span>
        </div>
      </Card>

      {/* Confirmation Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <Button
          type="button"
          variant="ghost"
          onClick={onBackToAssessment}
          disabled={isSubmitting}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Assessment
        </Button>

        <Button
          type="button"
          variant="primary"
          onClick={() => onConfirmAndSave(result)}
          disabled={!isAllAnswered || isSubmitting}
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="h-4 w-4" />}
          className={`px-8 h-12 shadow-glow-green ${
            !isAllAnswered ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Save and View My Dashboard
        </Button>
      </div>
    </div>
  );
}
