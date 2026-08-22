import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AssessableSkill } from "@/types/assessment";

export interface AssessmentProgressProps {
  skills: AssessableSkill[];
  activeSkillIndex: number;
  answers: Record<string, any>;
  onSelectSkill: (index: number) => void;
}

export function AssessmentProgress({
  skills,
  activeSkillIndex,
  answers,
  onSelectSkill,
}: AssessmentProgressProps) {
  const total = skills.length;
  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k]?.selfReportedLevel && answers[k]?.confidence
  ).length;
  const progressPercent = Math.round((answeredCount / (total || 1)) * 100);

  return (
    <div className="w-full space-y-4">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Badge variant="glow-green" size="sm">
            Skill {activeSkillIndex + 1} of {total}
          </Badge>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
            {answeredCount} of {total} rated
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-emerald-400">
            {progressPercent}% Complete
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar value={progressPercent} variant="emerald" size="sm" />

      {/* Skill Quick-Jump Pill Nodes */}
      <div
        className="flex items-center gap-1.5 overflow-x-auto pb-1"
        role="tablist"
        aria-label="Skill assessment jump navigation"
      >
        {skills.map((skill, idx) => {
          const isAnswered =
            !!answers[skill.skillSlug]?.selfReportedLevel &&
            !!answers[skill.skillSlug]?.confidence;
          const isActive = idx === activeSkillIndex;

          return (
            <button
              key={skill.skillSlug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectSkill(idx)}
              title={`${idx + 1}. ${skill.name} (${isAnswered ? "Rated" : "Pending rating"})`}
              className={`flex-1 min-w-[28px] h-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                isActive
                  ? "bg-emerald-400 h-3.5 shadow-glow-green ring-2 ring-emerald-500/40"
                  : isAnswered
                  ? "bg-emerald-500/70 hover:bg-emerald-400"
                  : "bg-navy-950 border border-slate-800 hover:border-slate-700"
              }`}
              aria-label={`Jump to skill ${idx + 1}: ${skill.name} (${isAnswered ? "Completed" : "Unanswered"})`}
            />
          );
        })}
      </div>
    </div>
  );
}
