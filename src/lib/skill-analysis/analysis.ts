import type { AssessmentResult } from "@/types/assessment";
import { TARGET_COMPETENCY_PERCENTAGE } from "./constants";
import {
  buildPrerequisiteChains,
  buildSkillGraph,
  detectGraphCycles,
  getBlockingPrerequisiteSlugs,
} from "./graph";
import {
  buildSkillGapAnalysis,
  calculateCurrentCompetencyPercentage,
  compareSkillPriority,
  indexStudentSkills,
} from "./scoring";
import type {
  GoalSkillRequirement,
  SkillAnalysisInput,
  SkillAnalysisResult,
  SkillGapAnalysis,
  SkillPrerequisite,
  SkillPriority,
} from "./types";

function dedupeGoalRequirements(
  requirements: GoalSkillRequirement[]
): GoalSkillRequirement[] {
  const seen = new Set<string>();
  const unique: GoalSkillRequirement[] = [];
  for (const requirement of requirements) {
    if (seen.has(requirement.skillSlug)) continue;
    seen.add(requirement.skillSlug);
    unique.push(requirement);
  }
  return unique;
}

function toSkillPriority(analysis: SkillGapAnalysis): SkillPriority {
  return {
    skillSlug: analysis.skillSlug,
    priorityScore: analysis.priorityScore,
    currentLevel: analysis.currentLevel,
    targetLevel: analysis.targetLevel,
    gap: analysis.gap,
    importance: analysis.importance,
    prerequisiteImpact: analysis.prerequisiteImpact,
    classification: analysis.classification,
  };
}

export function selectRecommendedStartingSkill(
  skillGaps: SkillGapAnalysis[],
  prerequisites: SkillPrerequisite[]
): SkillPriority | null {
  const gapped = skillGaps.filter((skill) => skill.gap > 0);
  if (gapped.length === 0) {
    return null;
  }

  const graph = buildSkillGraph(prerequisites);
  const gappedSlugs = new Set(gapped.map((skill) => skill.skillSlug));

  const unblocked = gapped.filter(
    (skill) =>
      getBlockingPrerequisiteSlugs(graph, skill.skillSlug, gappedSlugs).length ===
      0
  );

  const candidates = unblocked.length > 0 ? unblocked : gapped;
  const ranked = [...candidates].sort(compareSkillPriority);
  return toSkillPriority(ranked[0]);
}

export function analyzeSkills(input: SkillAnalysisInput): SkillAnalysisResult {
  const goalRequirements = dedupeGoalRequirements(input.goalRequirements);
  const studentSkillsBySlug = indexStudentSkills(input.studentSkills);
  const graph = buildSkillGraph(input.prerequisites);
  const cycleInfo = detectGraphCycles(graph);

  const currentCompetencyPercentage = calculateCurrentCompetencyPercentage(
    goalRequirements,
    studentSkillsBySlug
  );

  const skillGaps = goalRequirements.map((requirement) =>
    buildSkillGapAnalysis(requirement, studentSkillsBySlug, graph)
  );

  const criticalGaps = skillGaps
    .filter((skill) => skill.classification === "critical_gap")
    .sort(compareSkillPriority);
  const moderateGaps = skillGaps
    .filter((skill) => skill.classification === "moderate_gap")
    .sort(compareSkillPriority);
  const strengths = skillGaps
    .filter((skill) => skill.classification === "strength")
    .sort(compareSkillPriority);

  const orderedSkillPriorities = [...skillGaps]
    .sort(compareSkillPriority)
    .map(toSkillPriority);

  return {
    goalSlug: input.goalSlug,
    currentCompetencyPercentage,
    targetCompetencyPercentage: TARGET_COMPETENCY_PERCENTAGE,
    readinessPercentage: currentCompetencyPercentage,
    skillGaps,
    criticalGaps,
    moderateGaps,
    strengths,
    recommendedStartingSkill: selectRecommendedStartingSkill(
      skillGaps,
      input.prerequisites
    ),
    orderedSkillPriorities,
    prerequisiteChains: buildPrerequisiteChains(
      graph,
      goalRequirements.map((requirement) => requirement.skillSlug)
    ),
    hasPrerequisiteCycle: cycleInfo.hasCycle,
    cycleSkillSlugs: cycleInfo.cycleSkillSlugs,
  };
}

export function fromAssessmentResult(
  result: Pick<AssessmentResult, "goalSlug" | "profile">,
  prerequisites: SkillPrerequisite[]
): SkillAnalysisInput {
  return {
    goalSlug: result.goalSlug,
    studentSkills: result.profile.map((entry) => ({
      skillSlug: entry.skillSlug,
      currentLevel: entry.currentLevel,
      confidence: entry.confidence,
      diagnosticSignal: entry.diagnosticSignal,
    })),
    goalRequirements: result.profile.map((entry) => ({
      skillSlug: entry.skillSlug,
      targetLevel: entry.targetLevel,
      importance: entry.importance,
    })),
    prerequisites,
  };
}

export function analyzeAssessmentResult(
  result: Pick<AssessmentResult, "goalSlug" | "profile">,
  prerequisites: SkillPrerequisite[]
): SkillAnalysisResult {
  return analyzeSkills(fromAssessmentResult(result, prerequisites));
}
