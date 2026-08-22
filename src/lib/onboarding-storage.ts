import { OnboardingDraft, OnboardingRepository } from "@/types/onboarding";

export const ONBOARDING_DRAFT_KEY = "where-do-i-begin:onboarding-draft";
export const ONBOARDING_COMPLETE_KEY = "where-do-i-begin:onboarding-complete";

export const DEFAULT_ONBOARDING_DRAFT: OnboardingDraft = {
  name: "",
  college: "Thapar Institute of Engineering and Technology (TIET)",
  degree: "",
  year: null,
  interests: [],
  mission: null,
  customGoal: "",
  availableHoursPerWeek: 10,
  learningFormats: [],
  learningStyle: null,
  preferredPace: null,
  activeStep: 1,
};

function sanitizeDraft(parsed: Partial<OnboardingDraft>): OnboardingDraft {
  const step = parsed.activeStep;
  const validStep: 1 | 2 | 3 | 4 =
    step === 1 || step === 2 || step === 3 || step === 4 ? step : 1;

  return {
    ...DEFAULT_ONBOARDING_DRAFT,
    ...parsed,
    activeStep: validStep,
    interests: Array.isArray(parsed.interests) ? parsed.interests : [],
    learningFormats: Array.isArray(parsed.learningFormats) ? parsed.learningFormats : [],
    name: typeof parsed.name === "string" ? parsed.name : "",
    college: typeof parsed.college === "string" && parsed.college ? parsed.college : DEFAULT_ONBOARDING_DRAFT.college,
    degree: typeof parsed.degree === "string" ? parsed.degree : "",
    customGoal: typeof parsed.customGoal === "string" ? parsed.customGoal : "",
  };
}

export class LocalStorageOnboardingRepository implements OnboardingRepository {
  private draftKey = ONBOARDING_DRAFT_KEY;
  private completeKey = ONBOARDING_COMPLETE_KEY;

  async loadDraft(): Promise<OnboardingDraft | null> {
    if (typeof window === "undefined") return null;

    try {
      const raw = window.localStorage.getItem(this.draftKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Partial<OnboardingDraft>;
      return sanitizeDraft(parsed);
    } catch {
      // Gracefully return null on storage failure without logging sensitive data
      return null;
    }
  }

  async saveDraft(draft: OnboardingDraft): Promise<void> {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(this.draftKey, JSON.stringify(draft));
    } catch {
      // Safe fallback - in-memory React state continues uninterrupted
    }
  }

  async loadCompleted(): Promise<OnboardingDraft | null> {
    if (typeof window === "undefined") return null;

    try {
      const raw = window.localStorage.getItem(this.completeKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Partial<OnboardingDraft>;
      return sanitizeDraft(parsed);
    } catch {
      return null;
    }
  }

  async clearDraft(): Promise<void> {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.removeItem(this.draftKey);
    } catch {
      // Ignore removal failures
    }
  }

  async markComplete(draft: OnboardingDraft): Promise<void> {
    const completedDraft: OnboardingDraft = {
      ...draft,
      completedAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(this.completeKey, JSON.stringify(completedDraft));
        window.localStorage.removeItem(this.draftKey);
      } catch {
        // Continue navigation even if storage write fails
      }
    }
  }
}

export const onboardingRepository = new LocalStorageOnboardingRepository();
