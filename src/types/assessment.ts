// ==============================================================================
// WHERE DO I BEGIN? - Assessment TypeScript Types & Contracts
// ==============================================================================

export type ConfidenceLevel = "low" | "medium" | "high";

export type GoalImportance = "critical" | "high" | "medium" | "low";

export type DiagnosticSignal = "not_asked" | "consistent" | "needs_review";

export interface ScenarioQuestion {
  id: string;
  prompt: string;
  options: {
    id: string;
    label: string;
  }[];
  correctOptionId: string;
}

export interface AssessableSkill {
  skillSlug: string;
  name: string;
  description: string;
  skillType: "hard" | "soft";
  importance: GoalImportance;
  targetLevel: number; // 1 - 6
  scenarioQuestion?: ScenarioQuestion;
}

export interface SkillAssessmentAnswer {
  skillSlug: string;
  selfReportedLevel: 1 | 2 | 3 | 4 | 5 | 6;
  confidence: ConfidenceLevel;
  scenarioQuestionId?: string;
  selectedOptionId?: string;
  isScenarioCorrect?: boolean;
  updatedAt: string;
}

export interface AssessmentDraft {
  id: string;
  onboardingCompletedAt?: string;
  goalSlug: string;
  goalTitle: string;
  skillSlugs: string[];
  activeSkillIndex: number;
  answers: Record<string, SkillAssessmentAnswer>;
  startedAt: string;
  updatedAt: string;
}

export interface SkillProfileEntry {
  skillSlug: string;
  name: string;
  currentLevel: 1 | 2 | 3 | 4 | 5 | 6;
  targetLevel: 1 | 2 | 3 | 4 | 5 | 6;
  gap: number;
  confidence: ConfidenceLevel;
  importance: GoalImportance;
  diagnosticSignal: DiagnosticSignal;
  skillType: "hard" | "soft";
}

export interface AssessmentResult {
  id: string;
  goalSlug: string;
  goalTitle: string;
  studentName: string;
  profile: SkillProfileEntry[];
  assessedSkillCount: number;
  criticalGapCount: number;
  readinessScore: number; // Transparent integer percentage (0 - 100)
  onboardingCompletedAt?: string;
  startedAt: string;
  completedAt: string;
  assessmentVersion: 1;
  catalogueVersion: 1;
}

export interface AssessmentRepository {
  loadDraft(): Promise<AssessmentDraft | null>;
  saveDraft(draft: AssessmentDraft): Promise<void>;
  saveResult(result: AssessmentResult): Promise<void>;
  clearDraft(): Promise<void>;
  loadLatestResult(): Promise<AssessmentResult | null>;
}
