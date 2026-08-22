import {
  CONFIDENCE_PENALTIES,
  DEFAULT_CURRENT_LEVEL,
  DIAGNOSTIC_PENALTIES,
  IMPORTANCE_WEIGHTS,
} from "./constants";
import type { SkillGraph } from "./graph";
import { getDirectDependents, getTransitiveDependents } from "./graph";
import type {
  ConfidenceLevel,
  DiagnosticSignal,
  GoalImportance,
  GoalSkillRequirement,
  SkillClassification,
  SkillGapAnalysis,
  SkillLevel,
  StudentSkillLevel,
} from "./types";

export function calculateSkillGap(
  currentLevel: SkillLevel,
  targetLevel: SkillLevel
): number {
  return Math.max(0, targetLevel - currentLevel);
}

export function getImportanceWeight(importance: GoalImportance): number {
  return IMPORTANCE_WEIGHTS[importance];
}

export function getConfidencePenalty(confidence?: ConfidenceLevel): number {
  if (!confidence) return 0;
  return CONFIDENCE_PENALTIES[confidence];
}

export function getDiagnosticPenalty(signal?: DiagnosticSignal): number {
  if (!signal) return 0;
  return DIAGNOSTIC_PENALTIES[signal];
}

export function classifySkillGap(
  currentLevel: SkillLevel,
  targetLevel: SkillLevel,
  importance: GoalImportance
): SkillClassification {
  const gap = calculateSkillGap(currentLevel, targetLevel);

  if (currentLevel >= targetLevel) {
    return "strength";
  }

  // gap === 0 with currentLevel < targetLevel cannot occur with calculateSkillGap.
  // on_target is reserved for future exact-match logic.
  if (gap === 0) {
    return "on_target";
  }

  if (gap >= 2 && (importance === "critical" || importance === "high")) {
    return "critical_gap";
  }

  return "moderate_gap";
}

export function clampPercentage(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
}

export function indexStudentSkills(
  studentSkills: StudentSkillLevel[]
): Map<string, StudentSkillLevel> {
  const bySlug = new Map<string, StudentSkillLevel>();
  for (const skill of studentSkills) {
    bySlug.set(skill.skillSlug, skill);
  }
  return bySlug;
}

export function resolveCurrentLevel(
  studentSkillsBySlug: Map<string, StudentSkillLevel>,
  skillSlug: string
): SkillLevel {
  return studentSkillsBySlug.get(skillSlug)?.currentLevel ?? DEFAULT_CURRENT_LEVEL;
}

export function calculateCurrentCompetencyPercentage(
  goalRequirements: GoalSkillRequirement[],
  studentSkillsBySlug: Map<string, StudentSkillLevel>
): number {
  if (goalRequirements.length === 0) {
    return 0;
  }

  let weightedMatchSum = 0;
  let totalWeight = 0;

  for (const requirement of goalRequirements) {
    const weight = getImportanceWeight(requirement.importance);
    const currentLevel = resolveCurrentLevel(
      studentSkillsBySlug,
      requirement.skillSlug
    );
    const match = Math.min(currentLevel / requirement.targetLevel, 1);
    weightedMatchSum += weight * match;
    totalWeight += weight;
  }

  if (totalWeight === 0) {
    return 0;
  }

  return clampPercentage((weightedMatchSum / totalWeight) * 100);
}

export function calculatePrerequisiteImpact(
  graph: SkillGraph,
  skillSlug: string
): number {
  return getTransitiveDependents(graph, skillSlug).size;
}

export function calculateRelationshipStrengthImpact(
  graph: SkillGraph,
  skillSlug: string
): number {
  let sum = 0;
  for (const strength of getDirectDependents(graph, skillSlug).values()) {
    sum += strength;
  }
  return sum;
}

export function calculatePriorityScore(parts: {
  gap: number;
  importanceWeight: number;
  prerequisiteImpact: number;
  relationshipStrengthImpact: number;
  confidencePenalty: number;
  diagnosticPenalty: number;
}): number {
  return (
    parts.gap * parts.importanceWeight * 10 +
    parts.prerequisiteImpact * 5 +
    parts.relationshipStrengthImpact * 2 +
    parts.confidencePenalty +
    parts.diagnosticPenalty
  );
}

export function buildSkillGapAnalysis(
  requirement: GoalSkillRequirement,
  studentSkillsBySlug: Map<string, StudentSkillLevel>,
  graph: SkillGraph
): SkillGapAnalysis {
  const student = studentSkillsBySlug.get(requirement.skillSlug);
  const currentLevel = student?.currentLevel ?? DEFAULT_CURRENT_LEVEL;
  const gap = calculateSkillGap(currentLevel, requirement.targetLevel);
  const importanceWeight = getImportanceWeight(requirement.importance);
  const prerequisiteImpact = calculatePrerequisiteImpact(
    graph,
    requirement.skillSlug
  );
  const relationshipStrengthImpact = calculateRelationshipStrengthImpact(
    graph,
    requirement.skillSlug
  );
  const confidencePenalty = getConfidencePenalty(student?.confidence);
  const diagnosticPenalty = getDiagnosticPenalty(student?.diagnosticSignal);

  return {
    skillSlug: requirement.skillSlug,
    currentLevel,
    targetLevel: requirement.targetLevel,
    gap,
    importance: requirement.importance,
    importanceWeight,
    prerequisiteImpact,
    relationshipStrengthImpact,
    confidencePenalty,
    diagnosticPenalty,
    priorityScore: calculatePriorityScore({
      gap,
      importanceWeight,
      prerequisiteImpact,
      relationshipStrengthImpact,
      confidencePenalty,
      diagnosticPenalty,
    }),
    classification: classifySkillGap(
      currentLevel,
      requirement.targetLevel,
      requirement.importance
    ),
  };
}

export function compareSkillPriority(
  a: Pick<SkillGapAnalysis, "priorityScore" | "skillSlug">,
  b: Pick<SkillGapAnalysis, "priorityScore" | "skillSlug">
): number {
  if (b.priorityScore !== a.priorityScore) {
    return b.priorityScore - a.priorityScore;
  }
  return a.skillSlug.localeCompare(b.skillSlug);
}
