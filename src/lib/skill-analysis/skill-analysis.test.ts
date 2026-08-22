import { describe, expect, it } from "vitest";
import { analyzeAssessmentResult, analyzeSkills } from "./analysis";
import { TARGET_COMPETENCY_PERCENTAGE } from "./constants";
import { buildSkillGraph, detectGraphCycles } from "./graph";
import {
  calculateCurrentCompetencyPercentage,
  calculateSkillGap,
  classifySkillGap,
  indexStudentSkills,
} from "./scoring";
import type {
  GoalSkillRequirement,
  SkillAnalysisInput,
  SkillPrerequisite,
  StudentSkillLevel,
} from "./types";

const fullStackPrereqs: SkillPrerequisite[] = [
  { skillSlug: "javascript", prerequisiteSkillSlug: "html-css", relationshipStrength: 4 },
  { skillSlug: "typescript", prerequisiteSkillSlug: "javascript", relationshipStrength: 5 },
  { skillSlug: "react", prerequisiteSkillSlug: "javascript", relationshipStrength: 5 },
  { skillSlug: "react", prerequisiteSkillSlug: "html-css", relationshipStrength: 4 },
  { skillSlug: "nodejs", prerequisiteSkillSlug: "javascript", relationshipStrength: 5 },
  { skillSlug: "rest-apis", prerequisiteSkillSlug: "nodejs", relationshipStrength: 4 },
  { skillSlug: "rest-apis", prerequisiteSkillSlug: "javascript", relationshipStrength: 3 },
];

function requirement(
  skillSlug: string,
  targetLevel: GoalSkillRequirement["targetLevel"],
  importance: GoalSkillRequirement["importance"]
): GoalSkillRequirement {
  return { skillSlug, targetLevel, importance };
}

function student(
  skillSlug: string,
  currentLevel: StudentSkillLevel["currentLevel"],
  extras: Partial<StudentSkillLevel> = {}
): StudentSkillLevel {
  return { skillSlug, currentLevel, ...extras };
}

describe("calculateSkillGap", () => {
  it("returns target minus current when behind", () => {
    expect(calculateSkillGap(2, 5)).toBe(3);
  });

  it("never returns a negative gap when the student exceeds the target", () => {
    expect(calculateSkillGap(6, 4)).toBe(0);
  });

  it("returns 0 when current equals target", () => {
    expect(calculateSkillGap(4, 4)).toBe(0);
  });
});

describe("classifySkillGap", () => {
  it("classifies meeting or exceeding target as strength", () => {
    expect(classifySkillGap(5, 5, "critical")).toBe("strength");
    expect(classifySkillGap(6, 4, "high")).toBe("strength");
  });

  it("classifies a one-level deficit as moderate_gap regardless of importance", () => {
    expect(classifySkillGap(4, 5, "critical")).toBe("moderate_gap");
    expect(classifySkillGap(2, 3, "low")).toBe("moderate_gap");
  });

  it("classifies large gaps in medium/low skills as moderate_gap", () => {
    expect(classifySkillGap(1, 4, "medium")).toBe("moderate_gap");
    expect(classifySkillGap(1, 6, "low")).toBe("moderate_gap");
  });

  it("classifies large gaps in critical/high skills as critical_gap", () => {
    expect(classifySkillGap(1, 5, "critical")).toBe("critical_gap");
    expect(classifySkillGap(2, 4, "high")).toBe("critical_gap");
  });
});

describe("calculateCurrentCompetencyPercentage", () => {
  it("weights goal-required skills and clamps to an integer 0-100", () => {
    const requirements: GoalSkillRequirement[] = [
      requirement("javascript", 5, "critical"),
      requirement("react", 5, "critical"),
      requirement("docker", 3, "medium"),
    ];
    const bySlug = indexStudentSkills([
      student("javascript", 3),
      student("react", 5),
      student("docker", 1),
    ]);

    // (4 * 3/5 + 4 * 1 + 2 * 1/3) / 10 * 100 = 70.666... → 71
    expect(calculateCurrentCompetencyPercentage(requirements, bySlug)).toBe(71);
  });

  it("treats missing student skills as currentLevel 1", () => {
    const requirements = [requirement("javascript", 5, "critical")];
    expect(calculateCurrentCompetencyPercentage(requirements, new Map())).toBe(20);
  });

  it("returns 0 when there are no goal requirements", () => {
    expect(calculateCurrentCompetencyPercentage([], new Map())).toBe(0);
  });

  it("caps over-target skills at a 1.0 match ratio", () => {
    const requirements = [requirement("javascript", 4, "high")];
    const bySlug = indexStudentSkills([student("javascript", 6)]);
    expect(calculateCurrentCompetencyPercentage(requirements, bySlug)).toBe(100);
  });
});

describe("detectGraphCycles", () => {
  it("reports no cycle for a DAG", () => {
    const result = detectGraphCycles(buildSkillGraph(fullStackPrereqs));
    expect(result.hasCycle).toBe(false);
    expect(result.cycleSkillSlugs).toEqual([]);
  });

  it("detects a two-node cycle", () => {
    const result = detectGraphCycles(
      buildSkillGraph([
        { skillSlug: "adaptability", prerequisiteSkillSlug: "resilience", relationshipStrength: 3 },
        { skillSlug: "resilience", prerequisiteSkillSlug: "adaptability", relationshipStrength: 3 },
      ])
    );
    expect(result.hasCycle).toBe(true);
    expect(result.cycleSkillSlugs).toEqual(["adaptability", "resilience"]);
  });

  it("detects a self-prerequisite as a cycle", () => {
    const result = detectGraphCycles(
      buildSkillGraph([
        { skillSlug: "sql", prerequisiteSkillSlug: "sql", relationshipStrength: 1 },
      ])
    );
    expect(result.hasCycle).toBe(true);
    expect(result.cycleSkillSlugs).toEqual(["sql"]);
  });
});

describe("analyzeSkills", () => {
  const input: SkillAnalysisInput = {
    goalSlug: "fullstack-engineer",
    studentSkills: [
      student("html-css", 2, { confidence: "high" }),
      student("javascript", 2, { confidence: "low", diagnosticSignal: "needs_review" }),
      student("react", 1, { confidence: "medium" }),
      student("typescript", 5, { confidence: "high", diagnosticSignal: "consistent" }),
      student("nodejs", 4, { confidence: "high" }),
    ],
    goalRequirements: [
      requirement("html-css", 4, "high"),
      requirement("javascript", 5, "critical"),
      requirement("react", 5, "critical"),
      requirement("typescript", 5, "critical"),
      requirement("nodejs", 4, "critical"),
      requirement("docker", 3, "medium"),
    ],
    prerequisites: fullStackPrereqs,
  };

  it("is deterministic for the same input", () => {
    expect(analyzeSkills(input)).toEqual(analyzeSkills(input));
  });

  it("sets target competency to 100 and readiness equal to current competency", () => {
    const result = analyzeSkills(input);
    expect(result.targetCompetencyPercentage).toBe(TARGET_COMPETENCY_PERCENTAGE);
    expect(result.readinessPercentage).toBe(result.currentCompetencyPercentage);
    expect(result.goalSlug).toBe("fullstack-engineer");
  });

  it("includes every goal-required skill exactly once in skillGaps", () => {
    const result = analyzeSkills(input);
    expect(result.skillGaps.map((skill) => skill.skillSlug)).toEqual([
      "html-css",
      "javascript",
      "react",
      "typescript",
      "nodejs",
      "docker",
    ]);
    expect(result.skillGaps).toHaveLength(6);
  });

  it("defaults a missing goal-required skill to currentLevel 1", () => {
    const docker = analyzeSkills(input).skillGaps.find((skill) => skill.skillSlug === "docker");
    expect(docker?.currentLevel).toBe(1);
    expect(docker?.gap).toBe(2);
    expect(docker?.classification).toBe("moderate_gap");
  });

  it("partitions strengths and gaps without dropping skills", () => {
    const result = analyzeSkills(input);
    const classified = [
      ...result.criticalGaps,
      ...result.moderateGaps,
      ...result.strengths,
    ];
    expect(classified).toHaveLength(result.skillGaps.length);
    expect(result.strengths.map((skill) => skill.skillSlug).sort()).toEqual([
      "nodejs",
      "typescript",
    ]);
    expect(result.criticalGaps.map((skill) => skill.skillSlug).sort()).toEqual([
      "html-css",
      "javascript",
      "react",
    ]);
    expect(result.moderateGaps.map((skill) => skill.skillSlug).sort()).toEqual([
      "docker",
    ]);
  });

  it("computes additive priority scores from documented components", () => {
    const javascript = analyzeSkills(input).skillGaps.find(
      (skill) => skill.skillSlug === "javascript"
    );
    expect(javascript).toMatchObject({
      gap: 3,
      importanceWeight: 4,
      confidencePenalty: 2,
      diagnosticPenalty: 2,
    });
    expect(javascript?.prerequisiteImpact).toBe(4);
    expect(javascript?.relationshipStrengthImpact).toBe(18);
    expect(javascript?.priorityScore).toBe(3 * 4 * 10 + 4 * 5 + 18 * 2 + 2 + 2);
  });

  it("recommends the unblocked foundational skill, not a blocked downstream skill", () => {
    const result = analyzeSkills(input);
    expect(result.recommendedStartingSkill?.skillSlug).toBe("html-css");
  });

  it("recommends javascript once html-css is already at target", () => {
    const result = analyzeSkills({
      ...input,
      studentSkills: input.studentSkills.map((skill) =>
        skill.skillSlug === "html-css" ? student("html-css", 4) : skill
      ),
    });
    expect(result.recommendedStartingSkill?.skillSlug).toBe("javascript");
  });

  it("returns null recommendedStartingSkill when every required skill is a strength", () => {
    const result = analyzeSkills({
      goalSlug: "fullstack-engineer",
      studentSkills: [
        student("javascript", 5),
        student("react", 6),
      ],
      goalRequirements: [
        requirement("javascript", 5, "critical"),
        requirement("react", 5, "critical"),
      ],
      prerequisites: fullStackPrereqs,
    });
    expect(result.recommendedStartingSkill).toBeNull();
    expect(result.currentCompetencyPercentage).toBe(100);
  });

  it("orders prerequisite chains from foundations to dependents", () => {
    const result = analyzeSkills(input);
    const reactChain = result.prerequisiteChains.find(
      (chain) => chain.targetSkillSlug === "react"
    );
    expect(reactChain?.hasCycle).toBe(false);
    expect(reactChain?.orderedPrerequisiteSkillSlugs).toEqual([
      "html-css",
      "javascript",
    ]);
  });

  it("surfaces graph-wide cycles on the result", () => {
    const result = analyzeSkills({
      ...input,
      prerequisites: [
        ...fullStackPrereqs,
        { skillSlug: "adaptability", prerequisiteSkillSlug: "resilience", relationshipStrength: 3 },
        { skillSlug: "resilience", prerequisiteSkillSlug: "adaptability", relationshipStrength: 3 },
      ],
    });
    expect(result.hasPrerequisiteCycle).toBe(true);
    expect(result.cycleSkillSlugs).toEqual(["adaptability", "resilience"]);
  });

  it("orders skill priorities by score descending then slug", () => {
    const result = analyzeSkills(input);
    const scores = result.orderedSkillPriorities.map((skill) => skill.priorityScore);
    expect(scores).toEqual([...scores].sort((a, b) => b - a));
  });
});

describe("analyzeAssessmentResult", () => {
  it("maps AssessmentResult profile rows into engine input without side effects", () => {
    const result = analyzeAssessmentResult(
      {
        goalSlug: "fullstack-engineer",
        profile: [
          {
            skillSlug: "javascript",
            name: "JavaScript",
            currentLevel: 3,
            targetLevel: 5,
            gap: 99,
            confidence: "medium",
            importance: "critical",
            diagnosticSignal: "consistent",
            skillType: "hard",
          },
          {
            skillSlug: "react",
            name: "React",
            currentLevel: 5,
            targetLevel: 5,
            gap: 0,
            confidence: "high",
            importance: "critical",
            diagnosticSignal: "not_asked",
            skillType: "hard",
          },
        ],
      },
      fullStackPrereqs
    );

    expect(result.skillGaps).toHaveLength(2);
    expect(result.skillGaps[0].gap).toBe(2);
    expect(result.strengths).toHaveLength(1);
    expect(result.recommendedStartingSkill?.skillSlug).toBe("javascript");
  });
});
