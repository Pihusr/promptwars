export {
  CONFIDENCE_PENALTIES,
  DEFAULT_CURRENT_LEVEL,
  DIAGNOSTIC_PENALTIES,
  IMPORTANCE_WEIGHTS,
  TARGET_COMPETENCY_PERCENTAGE,
} from "./constants";

export {
  analyzeAssessmentResult,
  analyzeSkills,
  fromAssessmentResult,
  selectRecommendedStartingSkill,
} from "./analysis";

export {
  buildPrerequisiteChain,
  buildPrerequisiteChains,
  buildSkillGraph,
  detectGraphCycles,
  getBlockingPrerequisiteSlugs,
  getTransitiveDependents,
} from "./graph";

export {
  buildSkillGapAnalysis,
  calculateCurrentCompetencyPercentage,
  calculatePriorityScore,
  calculatePrerequisiteImpact,
  calculateRelationshipStrengthImpact,
  calculateSkillGap,
  classifySkillGap,
  clampPercentage,
  compareSkillPriority,
  getConfidencePenalty,
  getDiagnosticPenalty,
  getImportanceWeight,
  indexStudentSkills,
  resolveCurrentLevel,
} from "./scoring";

export type {
  ConfidenceLevel,
  DiagnosticSignal,
  GoalImportance,
  GoalSkillRequirement,
  PrerequisiteChain,
  RelationshipStrength,
  SkillAnalysisInput,
  SkillAnalysisResult,
  SkillClassification,
  SkillGapAnalysis,
  SkillLevel,
  SkillPrerequisite,
  SkillPriority,
  StudentSkillLevel,
} from "./types";
