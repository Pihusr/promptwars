// ==============================================================================
// WHERE DO I BEGIN? - Onboarding TypeScript Types & Repository Interfaces
// ==============================================================================

export type StudentYear =
  | "first_year"
  | "second_year"
  | "third_year"
  | "fourth_year"
  | "postgraduate"
  | "other";

export type Interest =
  | "cybersecurity"
  | "data_science"
  | "software_development"
  | "business"
  | "product"
  | "research"
  | "entrepreneurship"
  | "communication"
  | "leadership";

export type Mission =
  | "cybersecurity_internship"
  | "data_science_internship"
  | "software_development"
  | "competition_ready"
  | "public_speaking"
  | "custom";

export type LearningStyle = "solo" | "balanced" | "group";
export type PreferredPace = "flexible" | "structured" | "intensive";

export interface OnboardingDraft {
  name: string;
  college: string;
  degree: string;
  year: StudentYear | null;
  interests: Interest[];
  mission: Mission | null;
  customGoal: string;
  availableHoursPerWeek: number | null;
  learningFormats: string[];
  learningStyle: LearningStyle | null;
  preferredPace: PreferredPace | null;
  activeStep: 1 | 2 | 3 | 4;
  completedAt?: string;
}

export interface OnboardingRepository {
  loadDraft(): Promise<OnboardingDraft | null>;
  saveDraft(draft: OnboardingDraft): Promise<void>;
  loadCompleted(): Promise<OnboardingDraft | null>;
  markComplete(draft: OnboardingDraft): Promise<void>;
  clearDraft(): Promise<void>;
}
