import * as React from "react";
import {
  AssessableSkill,
  SkillAssessmentAnswer,
  ConfidenceLevel,
} from "@/types/assessment";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, Sparkles, AlertCircle } from "lucide-react";

export interface SkillAssessmentCardProps {
  skill: AssessableSkill;
  answer?: Partial<SkillAssessmentAnswer>;
  onAnswerChange: (updated: Partial<SkillAssessmentAnswer>) => void;
  error?: string;
}

const LEVEL_DEFINITIONS: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  label: string;
  tag: string;
}[] = [
  { level: 1, label: "I've only heard of it", tag: "Awareness" },
  { level: 2, label: "I understand the basics", tag: "Basic" },
  { level: 3, label: "I can solve guided problems", tag: "Guided" },
  { level: 4, label: "I can work independently", tag: "Independent" },
  { level: 5, label: "I can build real projects", tag: "Advanced" },
  { level: 6, label: "I can teach or mentor others", tag: "Expert" },
];

const CONFIDENCE_OPTIONS: {
  level: ConfidenceLevel;
  label: string;
  desc: string;
}[] = [
  { level: "low", label: "Low Confidence", desc: "Still tentative or early in exploration" },
  { level: "medium", label: "Medium Confidence", desc: "Comfortable with standard workflows" },
  { level: "high", label: "High Confidence", desc: "Fluent, battle-tested in practice" },
];

export function SkillAssessmentCard({
  skill,
  answer = {},
  onAnswerChange,
  error,
}: SkillAssessmentCardProps) {
  const selectedLevel = answer.selfReportedLevel;
  const selectedConfidence = answer.confidence;
  const selectedOption = answer.selectedOptionId;

  const handleSelectLevel = (lvl: 1 | 2 | 3 | 4 | 5 | 6) => {
    onAnswerChange({
      ...answer,
      skillSlug: skill.skillSlug,
      selfReportedLevel: lvl,
      confidence: selectedConfidence || "medium",
      updatedAt: new Date().toISOString(),
    });
  };

  const handleSelectConfidence = (conf: ConfidenceLevel) => {
    onAnswerChange({
      ...answer,
      skillSlug: skill.skillSlug,
      confidence: conf,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleSelectScenario = (optionId: string) => {
    onAnswerChange({
      ...answer,
      skillSlug: skill.skillSlug,
      scenarioQuestionId: skill.scenarioQuestion?.id,
      selectedOptionId: optionId,
      isScenarioCorrect: optionId === skill.scenarioQuestion?.correctOptionId,
      updatedAt: new Date().toISOString(),
    });
  };

  const getImportanceBadge = (imp: string) => {
    switch (imp) {
      case "critical":
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-red-950/60 text-red-300 border border-red-500/40 shadow-glow-red/20">
            Critical Priority
          </span>
        );
      case "high":
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-950/60 text-amber-300 border border-amber-500/40">
            High Priority
          </span>
        );
      case "medium":
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-cyan-950/60 text-cyan-300 border border-cyan-500/40">
            Medium Priority
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-navy-950 text-slate-400 border border-slate-800">
            Elective
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Skill Meta Header Card */}
      <Card className="p-6 bg-navy-900/90 border-slate-800 space-y-4 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-navy-950 border border-slate-800 text-slate-300">
                {skill.skillType === "hard" ? "Technical Skill" : "Core Soft Skill"}
              </span>
              {getImportanceBadge(skill.importance)}
            </div>
            <h2 className="text-2xl font-black text-white">{skill.name}</h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Badge variant="outline" size="md">
              Target Level: {skill.targetLevel} / 6
            </Badge>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
          {skill.description}
        </p>
      </Card>

      {/* Validation Error Alert */}
      {error && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center gap-2.5 text-xs text-red-300 font-medium"
        >
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Self-Assessed Level (1 - 6) */}
      <fieldset className="space-y-3">
        <div className="flex items-center justify-between">
          <legend className="block text-sm font-bold text-white">
            1. Current self-reported level <span className="text-emerald-400" aria-hidden="true">*</span>
            <span className="sr-only">(required, select 1 to 6)</span>
          </legend>
          <span className="text-xs font-mono text-slate-400">
            Scale 1 (Awareness) to 6 (Expert)
          </span>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          role="radiogroup"
          aria-label="Current self-reported skill level"
        >
          {LEVEL_DEFINITIONS.map((def) => {
            const isSelected = selectedLevel === def.level;
            const isTarget = skill.targetLevel === def.level;

            return (
              <button
                key={def.level}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelectLevel(def.level)}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between space-y-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  isSelected
                    ? "bg-emerald-950/50 border-emerald-400 text-white shadow-glow-green/30 ring-1 ring-emerald-500/30"
                    : "bg-navy-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-navy-850 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-md font-mono text-xs font-bold ${
                        isSelected
                          ? "bg-emerald-400 text-navy-950"
                          : "bg-navy-900 text-slate-400"
                      }`}
                    >
                      {def.level}
                    </span>
                    <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                      {def.tag}
                    </span>
                  </div>
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                  {isTarget && !isSelected && (
                    <span className="text-[10px] text-cyan-400 font-mono">Target</span>
                  )}
                </div>

                <div className="text-xs font-semibold text-white leading-snug">
                  "{def.label}"
                </div>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* 2. Confidence Level Selection */}
      <fieldset className="space-y-3 pt-2">
        <legend className="block text-sm font-bold text-white mb-1">
          2. How confident are you in this self-rating? <span className="text-emerald-400" aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </legend>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          role="radiogroup"
          aria-label="Confidence in self-rating"
        >
          {CONFIDENCE_OPTIONS.map((conf) => {
            const isSelected = selectedConfidence === conf.level;

            return (
              <button
                key={conf.level}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelectConfidence(conf.level)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  isSelected
                    ? "bg-emerald-950/40 border-emerald-400 text-white shadow-glow-green/20 ring-1 ring-emerald-500/30"
                    : "bg-navy-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-bold text-xs text-white">{conf.label}</span>
                  {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                </div>
                <span className="text-[11px] text-slate-400">{conf.desc}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* 3. Optional Scenario Question (if present on this skill) */}
      {skill.scenarioQuestion && (
        <fieldset className="p-5 rounded-2xl bg-navy-950/90 border border-slate-800 space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <legend className="text-xs uppercase font-mono text-cyan-400 font-bold flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> Quick confidence check — optional
            </legend>
            <span className="text-[11px] text-slate-400 font-mono">Calibrates diagnostic</span>
          </div>

          <p className="text-sm font-semibold text-white leading-relaxed">
            {skill.scenarioQuestion.prompt}
          </p>

          <div
            className="space-y-2"
            role="radiogroup"
            aria-label="Quick confidence check options"
          >
            {skill.scenarioQuestion.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectScenario(opt.id)}
                  className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    isSelected
                      ? "bg-cyan-950/40 border-cyan-400 text-white shadow-glow-cyan/20 ring-1 ring-cyan-500/30"
                      : "bg-navy-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded text-xs font-bold shrink-0 mt-0.5 ${
                      isSelected
                        ? "bg-cyan-400 text-navy-950"
                        : "bg-navy-950 text-slate-400 border border-slate-800"
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className="text-xs leading-relaxed">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}
    </div>
  );
}
