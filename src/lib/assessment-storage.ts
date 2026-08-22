import {
  AssessmentDraft,
  AssessmentResult,
  AssessmentRepository,
  AssessableSkill,
  SkillProfileEntry,
  GoalImportance,
} from "@/types/assessment";

export const ASSESSMENT_DRAFT_KEY = "where-do-i-begin:assessment-draft";
export const ASSESSMENT_RESULT_KEY = "where-do-i-begin:assessment-result";

export const IMPORTANCE_WEIGHTS: Record<GoalImportance, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

export class LocalStorageAssessmentRepository implements AssessmentRepository {
  private draftKey = ASSESSMENT_DRAFT_KEY;
  private resultKey = ASSESSMENT_RESULT_KEY;

  async loadDraft(): Promise<AssessmentDraft | null> {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(this.draftKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Partial<AssessmentDraft>;
      if (!parsed || !parsed.goalSlug || typeof parsed.activeSkillIndex !== "number") {
        return null;
      }
      return parsed as AssessmentDraft;
    } catch {
      return null;
    }
  }

  async saveDraft(draft: AssessmentDraft): Promise<void> {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(this.draftKey, JSON.stringify(draft));
    } catch {
      // In-memory fallback
    }
  }

  async clearDraft(): Promise<void> {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(this.draftKey);
    } catch {
      // Ignore
    }
  }

  async saveResult(result: AssessmentResult): Promise<void> {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(this.resultKey, JSON.stringify(result));
    } catch {
      // Ignore
    }
  }

  async loadLatestResult(): Promise<AssessmentResult | null> {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(this.resultKey);
      if (!raw) return null;
      return JSON.parse(raw) as AssessmentResult;
    } catch {
      return null;
    }
  }
}

export const assessmentRepository = new LocalStorageAssessmentRepository();

/**
 * Calculates preliminary competency profile, weighted readiness score, and diagnostic signals.
 */
export function calculateAssessmentResult(
  draft: AssessmentDraft,
  skills: AssessableSkill[],
  studentName: string = "Student"
): AssessmentResult {
  let criticalGapCount = 0;
  let weightedMatchSum = 0;
  let totalWeightSum = 0;

  const profile: SkillProfileEntry[] = skills.map((skill) => {
    const answer = draft.answers[skill.skillSlug];
    const currentLevel = answer?.selfReportedLevel || 1;
    const targetLevel = (skill.targetLevel as 1 | 2 | 3 | 4 | 5 | 6) || 4;
    const confidence = answer?.confidence || "medium";

    const gap = Math.max(0, targetLevel - currentLevel);

    // Flag as critical gap if critical/high importance and gap >= 2
    if ((skill.importance === "critical" || skill.importance === "high") && gap >= 2) {
      criticalGapCount += 1;
    }

    // Diagnostic Signal
    let diagnosticSignal: "not_asked" | "consistent" | "needs_review" = "not_asked";
    if (skill.scenarioQuestion && answer?.selectedOptionId) {
      diagnosticSignal =
        answer.selectedOptionId === skill.scenarioQuestion.correctOptionId
          ? "consistent"
          : "needs_review";
    }

    // Weighted match calculation
    const skillMatch = Math.min(currentLevel / targetLevel, 1);
    const weight = IMPORTANCE_WEIGHTS[skill.importance] || 2;
    weightedMatchSum += weight * skillMatch;
    totalWeightSum += weight;

    return {
      skillSlug: skill.skillSlug,
      name: skill.name,
      currentLevel,
      targetLevel,
      gap,
      confidence,
      importance: skill.importance,
      diagnosticSignal,
      skillType: skill.skillType,
    };
  });

  const readinessScore = Math.round(
    (weightedMatchSum / (totalWeightSum || 1)) * 100
  );

  return {
    id: `result-${Date.now()}`,
    goalSlug: draft.goalSlug,
    goalTitle: draft.goalTitle,
    studentName,
    profile,
    assessedSkillCount: skills.length,
    criticalGapCount,
    readinessScore,
    onboardingCompletedAt: draft.onboardingCompletedAt,
    startedAt: draft.startedAt || new Date().toISOString(),
    completedAt: new Date().toISOString(),
    assessmentVersion: 1,
    catalogueVersion: 1,
  };
}
