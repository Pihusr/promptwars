"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onboardingRepository } from "@/lib/onboarding-storage";
import { OnboardingDraft } from "@/types/onboarding";
import {
  AssessableSkill,
  AssessmentDraft,
  AssessmentResult,
  SkillAssessmentAnswer,
} from "@/types/assessment";
import { getGoalForMission, GoalDefinition } from "@/lib/assessment-catalogue";
import {
  assessmentRepository,
  calculateAssessmentResult,
} from "@/lib/assessment-storage";
import { AssessmentProgress } from "@/components/assessment/AssessmentProgress";
import { SkillAssessmentCard } from "@/components/assessment/SkillAssessmentCard";
import { AssessmentSummary } from "@/components/assessment/AssessmentSummary";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  Flame,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Compass,
  Target,
  Layers,
  HelpCircle,
  RefreshCw,
} from "lucide-react";

export default function AssessmentPage() {
  const router = useRouter();

  // State
  const [onboardingDraft, setOnboardingDraft] = React.useState<OnboardingDraft | null>(null);
  const [goalDef, setGoalDef] = React.useState<GoalDefinition | null>(null);
  const [assessmentDraft, setAssessmentDraft] = React.useState<AssessmentDraft | null>(null);
  const [activeSkillIndex, setActiveSkillIndex] = React.useState(0);
  const [isReviewMode, setIsReviewMode] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Initialize from LocalStorage
  React.useEffect(() => {
    async function init() {
      // 1. Check onboarding
      const onb = await onboardingRepository.loadDraft();
      if (!onb || !onb.name || !onb.degree) {
        setIsLoaded(true);
        return;
      }
      setOnboardingDraft(onb);

      // 2. Resolve Goal & Skills
      const goal = getGoalForMission(onb.mission, onb.interests, onb.customGoal);
      setGoalDef(goal);

      // 3. Check for existing Assessment Draft
      const savedDraft = await assessmentRepository.loadDraft();
      if (savedDraft && savedDraft.goalSlug === goal.slug) {
        setAssessmentDraft(savedDraft);
        setActiveSkillIndex(savedDraft.activeSkillIndex || 0);
      } else {
        const newDraft: AssessmentDraft = {
          id: `draft-${Date.now()}`,
          onboardingCompletedAt: onb.completedAt,
          goalSlug: goal.slug,
          goalTitle: goal.title,
          skillSlugs: goal.skills.map((s) => s.skillSlug),
          activeSkillIndex: 0,
          answers: {},
          startedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setAssessmentDraft(newDraft);
        await assessmentRepository.saveDraft(newDraft);
      }

      setIsLoaded(true);
    }

    init();
  }, []);

  // Autosave Draft
  const saveCurrentDraft = (updatedDraft: AssessmentDraft) => {
    setAssessmentDraft(updatedDraft);
    assessmentRepository.saveDraft(updatedDraft);
  };

  // Handle Answer Changes
  const handleAnswerChange = (updated: Partial<SkillAssessmentAnswer>) => {
    if (!assessmentDraft || !goalDef) return;
    setError(null);

    const currentSkill = goalDef.skills[activeSkillIndex];
    const existing = assessmentDraft.answers[currentSkill.skillSlug] || {
      skillSlug: currentSkill.skillSlug,
      selfReportedLevel: 1,
      confidence: "medium",
      updatedAt: new Date().toISOString(),
    };

    const newAnswer: SkillAssessmentAnswer = {
      ...existing,
      ...updated,
      skillSlug: currentSkill.skillSlug,
      updatedAt: new Date().toISOString(),
    };

    const updatedAnswers = {
      ...assessmentDraft.answers,
      [currentSkill.skillSlug]: newAnswer,
    };

    const updatedDraft: AssessmentDraft = {
      ...assessmentDraft,
      answers: updatedAnswers,
      activeSkillIndex,
      updatedAt: new Date().toISOString(),
    };

    saveCurrentDraft(updatedDraft);
  };

  // Validate and Advance
  const handleNext = () => {
    if (!goalDef || !assessmentDraft) return;

    const currentSkill = goalDef.skills[activeSkillIndex];
    const answer = assessmentDraft.answers[currentSkill.skillSlug];

    if (!answer || !answer.selfReportedLevel || !answer.confidence) {
      setError("Please select both your current skill level (1–6) and confidence rating to continue.");
      return;
    }

    setError(null);

    if (activeSkillIndex < goalDef.skills.length - 1) {
      const nextIndex = activeSkillIndex + 1;
      setActiveSkillIndex(nextIndex);
      const updatedDraft = {
        ...assessmentDraft,
        activeSkillIndex: nextIndex,
      };
      saveCurrentDraft(updatedDraft);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Reached end -> open review summary
      setIsReviewMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (activeSkillIndex > 0) {
      const prevIndex = activeSkillIndex - 1;
      setActiveSkillIndex(prevIndex);
      if (assessmentDraft) {
        const updatedDraft = {
          ...assessmentDraft,
          activeSkillIndex: prevIndex,
        };
        saveCurrentDraft(updatedDraft);
      }
      setError(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSelectSkillIndex = (idx: number) => {
    setActiveSkillIndex(idx);
    if (assessmentDraft) {
      const updatedDraft = {
        ...assessmentDraft,
        activeSkillIndex: idx,
      };
      saveCurrentDraft(updatedDraft);
    }
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Final Confirmation & Submission
  const handleConfirmAndSave = async (result: AssessmentResult) => {
    setIsSubmitting(true);
    try {
      await assessmentRepository.saveResult(result);
      await assessmentRepository.clearDraft();
      router.push("/dashboard");
    } catch (err) {
      console.error("Failed to save assessment result:", err);
      setIsSubmitting(false);
    }
  };

  // Loading State
  if (!isLoaded) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <span className="text-sm text-slate-400 font-mono">Loading skill assessment rubric...</span>
        </div>
      </div>
    );
  }

  // Missing Onboarding Empty State
  if (!onboardingDraft || !goalDef || !assessmentDraft) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <EmptyState
          icon={<Compass className="h-8 w-8 text-emerald-400" />}
          title="Complete Onboarding First"
          description="We need your academic background, degree program, and career mission to calibrate your personalized skill assessment rubric."
          primaryActionLabel="Start 4-Step Onboarding"
          primaryActionHref="/onboarding"
          secondaryActionLabel="Explore Platform Overview"
          secondaryActionHref="/"
        />
      </div>
    );
  }

  const currentSkill = goalDef.skills[activeSkillIndex];
  const currentAnswer = assessmentDraft.answers[currentSkill.skillSlug] || {};
  const isLastSkill = activeSkillIndex === goalDef.skills.length - 1;

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 space-y-8">
      {/* Header */}
      <SectionHeader
        badgeText={isReviewMode ? "Assessment Review" : "Preliminary Skill Diagnostic"}
        badgeVariant="glow-red"
        title={isReviewMode ? "Confirm Your Skill Profile" : goalDef.title}
        description={
          isReviewMode
            ? "Review your self-assessed levels and verified targets. You can edit any rating before confirming."
            : `Evaluating ${goalDef.skills.length} core technical & cognitive competencies for ${onboardingDraft.name || "Student"}.`
        }
      />

      {!isReviewMode ? (
        <div className="space-y-6">
          {/* Progress Component */}
          <Card className="p-4 sm:p-5 bg-navy-900/70 border-slate-800 backdrop-blur-md">
            <AssessmentProgress
              skills={goalDef.skills}
              activeSkillIndex={activeSkillIndex}
              answers={assessmentDraft.answers}
              onSelectSkill={handleSelectSkillIndex}
            />
          </Card>

          {/* Active Skill Assessment Card */}
          <SkillAssessmentCard
            skill={currentSkill}
            answer={currentAnswer}
            onAnswerChange={handleAnswerChange}
            error={error || undefined}
          />

          {/* Step Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800/80 gap-4">
            <div>
              {activeSkillIndex > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  leftIcon={<ArrowLeft className="h-4 w-4" />}
                  className="text-slate-400 hover:text-white"
                >
                  Previous Skill
                </Button>
              )}
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="px-6 h-11 shadow-glow-green"
            >
              {isLastSkill ? "Review Assessment" : "Save & Next Skill"}
            </Button>
          </div>
        </div>
      ) : (
        /* Review Screen */
        <AssessmentSummary
          draft={assessmentDraft}
          skills={goalDef.skills}
          studentName={onboardingDraft.name}
          onBackToAssessment={() => setIsReviewMode(false)}
          onConfirmAndSave={handleConfirmAndSave}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
