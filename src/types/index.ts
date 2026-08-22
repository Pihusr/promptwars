export * from "./database";

export type SkillTier = "beginner" | "intermediate" | "advanced" | "master";

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
}

export interface SkillItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  skillType: "soft" | "hard";
  currentLevel: number; // 1 - 6
  targetLevel: number; // 1 - 6
  progress: number; // 0 - 100
  gapScore: number; // calculated deficit
}

export interface CareerGoalSummary {
  id: string;
  slug: string;
  title: string;
  category: string;
  targetRole: string;
  readinessPercentage: number;
  criticalSkills: string[];
}
