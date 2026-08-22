import type { ConfidenceLevel, DiagnosticSignal, GoalImportance } from "./types";

export const IMPORTANCE_WEIGHTS = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
} as const satisfies Record<GoalImportance, number>;

export const CONFIDENCE_PENALTIES = {
  low: 2,
  medium: 1,
  high: 0,
} as const satisfies Record<ConfidenceLevel, number>;

export const DIAGNOSTIC_PENALTIES = {
  needs_review: 2,
  not_asked: 0,
  consistent: 0,
} as const satisfies Record<DiagnosticSignal, number>;

/** Used when a goal-required skill is missing from studentSkills. */
export const DEFAULT_CURRENT_LEVEL = 1;

export const TARGET_COMPETENCY_PERCENTAGE = 100;
