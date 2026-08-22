export type SkillLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type GoalImportance = "critical" | "high" | "medium" | "low";

export type ConfidenceLevel = "low" | "medium" | "high";

export type DiagnosticSignal = "not_asked" | "consistent" | "needs_review";

export type SkillClassification =
  | "strength"
  | "on_target"
  | "moderate_gap"
  | "critical_gap";

export type RelationshipStrength = 1 | 2 | 3 | 4 | 5;

export interface StudentSkillLevel {
  skillSlug: string;
  currentLevel: SkillLevel;
  confidence?: ConfidenceLevel;
  diagnosticSignal?: DiagnosticSignal;
}

export interface GoalSkillRequirement {
  skillSlug: string;
  targetLevel: SkillLevel;
  importance: GoalImportance;
}

export interface SkillPrerequisite {
  skillSlug: string;
  prerequisiteSkillSlug: string;
  relationshipStrength: RelationshipStrength;
}

export interface SkillAnalysisInput {
  goalSlug: string;
  studentSkills: StudentSkillLevel[];
  goalRequirements: GoalSkillRequirement[];
  prerequisites: SkillPrerequisite[];
}

export interface SkillGapAnalysis {
  skillSlug: string;
  currentLevel: SkillLevel;
  targetLevel: SkillLevel;
  gap: number;
  importance: GoalImportance;
  importanceWeight: number;
  prerequisiteImpact: number;
  relationshipStrengthImpact: number;
  confidencePenalty: number;
  diagnosticPenalty: number;
  priorityScore: number;
  classification: SkillClassification;
}

export interface PrerequisiteChain {
  targetSkillSlug: string;
  orderedPrerequisiteSkillSlugs: string[];
  hasCycle: boolean;
  cycleSkillSlugs: string[];
}

export interface SkillPriority {
  skillSlug: string;
  priorityScore: number;
  currentLevel: SkillLevel;
  targetLevel: SkillLevel;
  gap: number;
  importance: GoalImportance;
  prerequisiteImpact: number;
  classification: SkillClassification;
}

export interface SkillAnalysisResult {
  goalSlug: string;
  currentCompetencyPercentage: number;
  targetCompetencyPercentage: 100;
  readinessPercentage: number;
  skillGaps: SkillGapAnalysis[];
  criticalGaps: SkillGapAnalysis[];
  moderateGaps: SkillGapAnalysis[];
  strengths: SkillGapAnalysis[];
  recommendedStartingSkill: SkillPriority | null;
  orderedSkillPriorities: SkillPriority[];
  prerequisiteChains: PrerequisiteChain[];
  hasPrerequisiteCycle: boolean;
  cycleSkillSlugs: string[];
}
