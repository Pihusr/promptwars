"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  OnboardingDraft,
  StudentYear,
  Interest,
  Mission,
  LearningStyle,
  PreferredPace,
} from "@/types/onboarding";
import { onboardingRepository, DEFAULT_ONBOARDING_DRAFT } from "@/lib/onboarding-storage";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { StepNavigation } from "@/components/onboarding/StepNavigation";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import {
  Shield,
  BarChart2,
  Code2,
  Briefcase,
  Layers,
  FlaskConical,
  Rocket,
  MessageSquare,
  Users2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Target,
  GraduationCap,
  BookOpen,
  Video,
  FileText,
  Hammer,
  Award,
} from "lucide-react";

// ==============================================================================
// STEP 1 CONFIGURATION: YEARS
// ==============================================================================
const YEARS: { id: StudentYear; label: string; sub: string }[] = [
  { id: "first_year", label: "First Year", sub: "Class of 2029" },
  { id: "second_year", label: "Second Year", sub: "Class of 2028" },
  { id: "third_year", label: "Third Year", sub: "Class of 2027" },
  { id: "fourth_year", label: "Fourth Year", sub: "Class of 2026" },
  { id: "postgraduate", label: "Postgraduate", sub: "M.Tech / MS / MCA" },
  { id: "other", label: "Other", sub: "Self-paced / Bootcamp" },
];

// ==============================================================================
// STEP 2 CONFIGURATION: INTERESTS
// ==============================================================================
const INTEREST_OPTIONS: {
  id: Interest;
  title: string;
  desc: string;
  icon: React.ElementType;
}[] = [
  {
    id: "software_development",
    title: "Software Development",
    desc: "Full-stack apps, distributed systems, APIs, cloud deployments",
    icon: Code2,
  },
  {
    id: "data_science",
    title: "Data Science",
    desc: "Data analysis, machine learning models, statistical inference",
    icon: BarChart2,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    desc: "System defense, network security, ethical hacking, OWASP",
    icon: Shield,
  },
  {
    id: "product",
    title: "Product",
    desc: "Product roadmaps, user research, feature prioritization, UX",
    icon: Layers,
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship",
    desc: "Startup building, prototype validation, venture pitches",
    icon: Rocket,
  },
  {
    id: "research",
    title: "Research",
    desc: "Empirical benchmarking, scientific papers, experimental labs",
    icon: FlaskConical,
  },
  {
    id: "business",
    title: "Business",
    desc: "Tech economics, financial models, market analysis, operations",
    icon: Briefcase,
  },
  {
    id: "communication",
    title: "Communication",
    desc: "Technical writing, presentations, stakeholder articulation",
    icon: MessageSquare,
  },
  {
    id: "leadership",
    title: "Leadership",
    desc: "Team coordination, sprint leadership, technical mentorship",
    icon: Users2,
  },
];

// ==============================================================================
// STEP 3 CONFIGURATION: MISSIONS
// ==============================================================================
const MISSION_OPTIONS: {
  id: Mission;
  title: string;
  desc: string;
  tag: string;
  icon: React.ElementType;
}[] = [
  {
    id: "software_development",
    title: "Build strong software development skills",
    desc: "Master modern full-stack architectures, type safety, server components, and database optimization.",
    tag: "High Demand",
    icon: Code2,
  },
  {
    id: "cybersecurity_internship",
    title: "Become internship-ready in cybersecurity",
    desc: "Develop offensive/defensive capabilities, system auditing, and secure authentication protocols.",
    tag: "Security Focus",
    icon: Shield,
  },
  {
    id: "data_science_internship",
    title: "Become internship-ready in data science",
    desc: "Build predictive models, clean complex datasets with SQL/Pandas, and deploy machine learning pipelines.",
    tag: "Data Focus",
    icon: BarChart2,
  },
  {
    id: "competition_ready",
    title: "Become competition-ready",
    desc: "Sharpen algorithmic problem-solving for LeetCode, ICPC, and rapid 24h hackathon prototyping.",
    tag: "Fast Track",
    icon: Award,
  },
  {
    id: "public_speaking",
    title: "Become a stronger public speaker",
    desc: "Articulate engineering decisions clearly in team standups, conference presentations, and demo days.",
    tag: "Communication",
    icon: MessageSquare,
  },
  {
    id: "custom",
    title: "Create my own goal",
    desc: "Define a tailored career target or custom interdisciplinary engineering aspiration.",
    tag: "Custom Goal",
    icon: Sparkles,
  },
];

// ==============================================================================
// STEP 4 CONFIGURATION: PREFERENCES
// ==============================================================================
const FORMAT_OPTIONS = [
  { id: "Video courses", label: "Video courses", icon: Video },
  { id: "Documentation and articles", label: "Documentation and articles", icon: FileText },
  { id: "Hands-on projects", label: "Hands-on projects", icon: Hammer },
  { id: "Books", label: "Books", icon: BookOpen },
  { id: "Workshops and campus events", label: "Workshops and campus events", icon: GraduationCap },
  { id: "Peer learning", label: "Peer learning", icon: Users2 },
];

const STYLE_OPTIONS: { id: LearningStyle; title: string; desc: string }[] = [
  { id: "solo", title: "Mostly solo", desc: "Independent deep work and self-paced study" },
  { id: "balanced", title: "Mix of solo and group", desc: "Independent practice with regular peer check-ins" },
  { id: "group", title: "Mostly with a group", desc: "Collaborative study squads and pair coding" },
];

const PACE_OPTIONS: { id: PreferredPace; title: string; desc: string }[] = [
  { id: "flexible", title: "Steady and flexible", desc: "Learn at your own pace without strict deadlines" },
  { id: "structured", title: "Structured weekly goals", desc: "Defined weekly milestones and progress checks" },
  { id: "intensive", title: "Intensive sprint", desc: "Accelerated schedule for upcoming hackathons/interviews" },
];

export default function OnboardingPage() {
  const router = useRouter();

  // Form State
  const [draft, setDraft] = React.useState<OnboardingDraft>(DEFAULT_ONBOARDING_DRAFT);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // Input Field References for Accessible Auto-Focus on Error
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const collegeInputRef = React.useRef<HTMLInputElement>(null);
  const degreeInputRef = React.useRef<HTMLInputElement>(null);
  const customGoalRef = React.useRef<HTMLTextAreaElement>(null);
  const hoursSliderRef = React.useRef<HTMLInputElement>(null);
  const yearGroupRef = React.useRef<HTMLDivElement>(null);
  const interestsGroupRef = React.useRef<HTMLDivElement>(null);
  const missionGroupRef = React.useRef<HTMLDivElement>(null);

  // Restore draft on mount
  React.useEffect(() => {
    async function init() {
      const saved = await onboardingRepository.loadDraft();
      if (saved) {
        setDraft(saved);
      }
      setIsLoaded(true);
    }
    init();
  }, []);

  // Debounced auto-save to localStorage
  React.useEffect(() => {
    if (!isLoaded) return;
    const timer = setTimeout(() => {
      onboardingRepository.saveDraft(draft);
    }, 300);
    return () => clearTimeout(timer);
  }, [draft, isLoaded]);

  // Update specific draft field helper
  const updateField = <K extends keyof OnboardingDraft>(field: K, value: OnboardingDraft[K]) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Step Validation Logic
  const validateStep = (step: number): boolean => {
    const stepErrors: Record<string, string> = {};

    if (step === 1) {
      if (!draft.name.trim() || draft.name.trim().length < 2) {
        stepErrors.name = "Full name: Enter at least 2 characters.";
      }
      if (!draft.college.trim()) {
        stepErrors.college = "Please enter your college name.";
      }
      if (!draft.degree.trim()) {
        stepErrors.degree = "Please enter your degree or program of study.";
      }
      if (!draft.year) {
        stepErrors.year = "Please select your current year.";
      }
    } else if (step === 2) {
      if (draft.interests.length === 0) {
        stepErrors.interests = "Choose at least one area that interests you.";
      }
    } else if (step === 3) {
      if (!draft.mission) {
        stepErrors.mission = "Please select a target mission.";
      } else if (draft.mission === "custom") {
        if (!draft.customGoal.trim() || draft.customGoal.trim().length < 10) {
          stepErrors.customGoal = "Describe your custom goal in 10 to 160 characters.";
        } else if (draft.customGoal.trim().length > 160) {
          stepErrors.customGoal = "Describe your custom goal in 10 to 160 characters.";
        }
      }
    } else if (step === 4) {
      if (!draft.availableHoursPerWeek || draft.availableHoursPerWeek < 1 || draft.availableHoursPerWeek > 40) {
        stepErrors.availableHoursPerWeek = "Available learning hours: Enter a number from 1 to 40.";
      }
      if (draft.learningFormats.length === 0) {
        stepErrors.learningFormats = "Choose at least one preferred learning format.";
      }
      if (!draft.learningStyle) {
        stepErrors.learningStyle = "Please select your preferred learning style.";
      }
      if (!draft.preferredPace) {
        stepErrors.preferredPace = "Please select your target learning pace.";
      }
    }

    setErrors(stepErrors);

    // Auto-focus on first invalid field
    if (Object.keys(stepErrors).length > 0) {
      if (step === 1) {
        if (stepErrors.name) nameInputRef.current?.focus();
        else if (stepErrors.college) collegeInputRef.current?.focus();
        else if (stepErrors.degree) degreeInputRef.current?.focus();
        else if (stepErrors.year) yearGroupRef.current?.focus();
      } else if (step === 2) {
        interestsGroupRef.current?.focus();
      } else if (step === 3) {
        if (stepErrors.customGoal) customGoalRef.current?.focus();
        else missionGroupRef.current?.focus();
      } else if (step === 4) {
        if (stepErrors.availableHoursPerWeek) hoursSliderRef.current?.focus();
      }
      return false;
    }

    return true;
  };

  // Navigation Handlers
  const handleNext = async () => {
    if (!validateStep(draft.activeStep)) {
      return;
    }

    if (draft.activeStep < 4) {
      const nextStep = (draft.activeStep + 1) as 1 | 2 | 3 | 4;
      updateField("activeStep", nextStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsSubmitting(true);
      try {
        await onboardingRepository.markComplete(draft);
        router.push("/assessment");
      } catch {
        // Fallback navigation even if persistence fails
        router.push("/assessment");
      }
    }
  };

  const handleBack = () => {
    if (draft.activeStep > 1) {
      const prevStep = (draft.activeStep - 1) as 1 | 2 | 3 | 4;
      updateField("activeStep", prevStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleInterest = (interestId: Interest) => {
    const exists = draft.interests.includes(interestId);
    const updated = exists
      ? draft.interests.filter((i) => i !== interestId)
      : [...draft.interests, interestId];
    updateField("interests", updated);
  };

  const toggleFormat = (formatId: string) => {
    const exists = draft.learningFormats.includes(formatId);
    const updated = exists
      ? draft.learningFormats.filter((f) => f !== formatId)
      : [...draft.learningFormats, formatId];
    updateField("learningFormats", updated);
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <span className="text-sm text-slate-400 font-mono">Loading your onboarding session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 space-y-8">
      {/* Header */}
      <SectionHeader
        badgeText={`Step ${draft.activeStep} of 4 • Student Onboarding`}
        badgeVariant="glow-green"
        title={
          draft.activeStep === 1
            ? "Tell us about your background"
            : draft.activeStep === 2
            ? "What interests you?"
            : draft.activeStep === 3
            ? "Choose your mission"
            : "Learning preferences"
        }
        description={
          draft.activeStep === 1
            ? "We tailor your diagnostic rubric and available campus opportunities to your degree and academic year."
            : draft.activeStep === 2
            ? "Select all topics that pique your curiosity. You can change or expand these anytime."
            : draft.activeStep === 3
            ? "Select your target mission. This can be updated anytime later in your profile or dashboard."
            : "Set your weekly hours, study style, and pacing so your roadmap fits your real schedule."
        }
      />

      {/* Responsive Stepper */}
      <Card className="p-4 sm:p-5 bg-navy-900/70 border-slate-800 backdrop-blur-md">
        <OnboardingProgress
          currentStep={draft.activeStep}
          onStepClick={(step) => updateField("activeStep", step)}
        />
      </Card>

      {/* Main Step Container Form */}
      <Card className="p-6 sm:p-8 md:p-10 bg-navy-900/90 border-slate-800 shadow-2xl backdrop-blur-xl space-y-8">
        {/* ========================================================================= */}
        {/* STEP 1: ABOUT YOU */}
        {/* ========================================================================= */}
        {draft.activeStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="student-name" className="block text-sm font-bold text-white">
                Full name <span className="text-emerald-400" aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                ref={nameInputRef}
                id="student-name"
                type="text"
                value={draft.name}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                onChange={(e) => updateField("name", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                placeholder="e.g. Alex Sharma"
                className={`w-full rounded-xl bg-navy-950 border px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500/40 shadow-glow-red/20"
                    : "border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/30"
                }`}
              />
              {errors.name && (
                <p id="name-error" role="alert" className="text-xs text-red-400 flex items-center gap-1.5 pt-1 font-medium">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.name}
                </p>
              )}
            </div>

            {/* College / Institution */}
            <div className="space-y-2">
              <label htmlFor="student-college" className="block text-sm font-bold text-white">
                College / University <span className="text-emerald-400" aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                ref={collegeInputRef}
                id="student-college"
                type="text"
                value={draft.college}
                aria-required="true"
                aria-invalid={!!errors.college}
                aria-describedby={errors.college ? "college-error" : "college-help"}
                onChange={(e) => updateField("college", e.target.value)}
                placeholder="e.g. Thapar Institute of Engineering and Technology (TIET)"
                className={`w-full rounded-xl bg-navy-950 border px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.college
                    ? "border-red-500 focus:ring-red-500/40 shadow-glow-red/20"
                    : "border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/30"
                }`}
              />
              <p id="college-help" className="text-xs text-slate-400 leading-relaxed">
                TIET is selected by default so we can tailor future resource recommendations to campus opportunities.
              </p>
              {errors.college && (
                <p id="college-error" role="alert" className="text-xs text-red-400 flex items-center gap-1.5 pt-1 font-medium">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.college}
                </p>
              )}
            </div>

            {/* Degree / Program */}
            <div className="space-y-2">
              <label htmlFor="student-degree" className="block text-sm font-bold text-white">
                Degree / program of study <span className="text-emerald-400" aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                ref={degreeInputRef}
                id="student-degree"
                type="text"
                value={draft.degree}
                aria-required="true"
                aria-invalid={!!errors.degree}
                aria-describedby={errors.degree ? "degree-error" : undefined}
                onChange={(e) => updateField("degree", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                placeholder="e.g. B.Tech Computer Science and Engineering"
                className={`w-full rounded-xl bg-navy-950 border px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.degree
                    ? "border-red-500 focus:ring-red-500/40 shadow-glow-red/20"
                    : "border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/30"
                }`}
              />
              {errors.degree && (
                <p id="degree-error" role="alert" className="text-xs text-red-400 flex items-center gap-1.5 pt-1 font-medium">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.degree}
                </p>
              )}
            </div>

            {/* Current Year Selection */}
            <fieldset className="space-y-2.5">
              <legend className="block text-sm font-bold text-white mb-1">
                Current year of study <span className="text-emerald-400" aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </legend>
              <div
                ref={yearGroupRef}
                tabIndex={-1}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 focus:outline-none"
                role="radiogroup"
                aria-label="Current year of study"
              >
                {YEARS.map((y) => {
                  const isSelected = draft.year === y.id;
                  return (
                    <button
                      key={y.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => updateField("year", y.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        isSelected
                          ? "bg-emerald-950/50 border-emerald-400 text-white shadow-glow-green/30 ring-1 ring-emerald-500/30"
                          : "bg-navy-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-navy-850 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm">{y.label}</span>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
                      </div>
                      <span className="text-xs text-slate-400 font-mono block">{y.sub}</span>
                    </button>
                  );
                })}
              </div>
              {errors.year && (
                <p role="alert" className="text-xs text-red-400 flex items-center gap-1.5 pt-1 font-medium">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.year}
                </p>
              )}
            </fieldset>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: INTERESTS */}
        {/* ========================================================================= */}
        {draft.activeStep === 2 && (
          <fieldset className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <legend className="block text-base font-bold text-white">
                Choose your areas of interest <span className="text-emerald-400" aria-hidden="true">*</span>
                <span className="sr-only">(choose at least one)</span>
              </legend>
              <Badge variant="glow-green" size="sm">
                {draft.interests.length} Selected
              </Badge>
            </div>

            <p className="text-xs text-slate-400">
              Select all domains that interest you. This helps us recommend relevant career paths and campus groups without locking you in.
            </p>

            {errors.interests && (
              <p role="alert" className="text-xs text-red-400 flex items-center gap-1.5 font-medium bg-red-950/30 p-2.5 rounded-lg border border-red-500/30">
                <AlertCircle className="h-4 w-4 shrink-0" /> {errors.interests}
              </p>
            )}

            <div
              ref={interestsGroupRef}
              tabIndex={-1}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 focus:outline-none"
              role="group"
              aria-label="Areas of interest"
            >
              {INTEREST_OPTIONS.map((item) => {
                const Icon = item.icon;
                const isSelected = draft.interests.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="checkbox"
                    aria-checked={isSelected}
                    onClick={() => toggleInterest(item.id)}
                    className={`p-4 rounded-xl border text-left flex flex-col justify-between space-y-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      isSelected
                        ? "bg-emerald-950/40 border-emerald-400 text-white shadow-glow-green/20 ring-1 ring-emerald-500/30"
                        : "bg-navy-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-navy-850 hover:text-white"
                    }`}
                  >
                    <div className="flex items-start justify-between w-full gap-2">
                      <div className={`p-2 rounded-lg border ${isSelected ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-400" : "bg-navy-900 border-slate-800 text-slate-400"}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${isSelected ? "bg-emerald-500 border-emerald-400 text-navy-950" : "border-slate-700 bg-navy-900"}`}>
                        {isSelected && <CheckCircle2 className="h-4 w-4 stroke-[3]" />}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: MISSION */}
        {/* ========================================================================= */}
        {draft.activeStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <fieldset className="space-y-4">
              <div className="flex items-center justify-between">
                <legend className="block text-base font-bold text-white">
                  Choose your primary mission <span className="text-emerald-400" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </legend>
                <Badge variant="outline" size="sm">Adjustable Later</Badge>
              </div>

              <p className="text-xs text-slate-400">
                This selects the preliminary benchmark criteria for your diagnostic. You can adjust your target anytime.
              </p>

              {errors.mission && (
                <p role="alert" className="text-xs text-red-400 flex items-center gap-1.5 font-medium bg-red-950/30 p-2.5 rounded-lg border border-red-500/30">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {errors.mission}
                </p>
              )}

              <div
                ref={missionGroupRef}
                tabIndex={-1}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 focus:outline-none"
                role="radiogroup"
                aria-label="Primary Career Mission"
              >
                {MISSION_OPTIONS.map((m) => {
                  const Icon = m.icon;
                  const isSelected = draft.mission === m.id;

                  return (
                    <button
                      key={m.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => updateField("mission", m.id)}
                      className={`p-5 rounded-xl border text-left flex flex-col justify-between space-y-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        isSelected
                          ? "bg-emerald-950/40 border-emerald-400 text-white shadow-glow-green/30 ring-1 ring-emerald-500/30"
                          : "bg-navy-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-navy-850 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-lg border ${isSelected ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-400" : "bg-navy-900 border-slate-800 text-slate-400"}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-navy-900 border border-slate-800 text-slate-300">
                            {m.tag}
                          </span>
                        </div>
                        {isSelected && <Badge variant="glow-green" size="sm">Selected</Badge>}
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-white">{m.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Custom Goal Input (Revealed if custom selected) */}
            {draft.mission === "custom" && (
              <div className="p-5 rounded-xl bg-navy-950 border border-emerald-500/40 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <label htmlFor="custom-goal-text" className="block text-sm font-bold text-white">
                    Describe your custom goal <span className="text-emerald-400" aria-hidden="true">*</span>
                    <span className="sr-only">(10 to 160 characters required)</span>
                  </label>
                  <span className="text-xs font-mono text-slate-400">
                    {draft.customGoal.length}/160 characters
                  </span>
                </div>
                <textarea
                  ref={customGoalRef}
                  id="custom-goal-text"
                  rows={3}
                  maxLength={160}
                  value={draft.customGoal}
                  aria-required="true"
                  aria-invalid={!!errors.customGoal}
                  aria-describedby={errors.customGoal ? "custom-goal-error" : undefined}
                  onChange={(e) => updateField("customGoal", e.target.value)}
                  placeholder="e.g. Build an autonomous multi-agent robotics platform and publish an empirical benchmark in 6 months."
                  className={`w-full rounded-xl bg-navy-900 border px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.customGoal
                      ? "border-red-500 focus:ring-red-500/40"
                      : "border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/30"
                  }`}
                />
                {errors.customGoal && (
                  <p id="custom-goal-error" role="alert" className="text-xs text-red-400 flex items-center gap-1.5 pt-1 font-medium">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.customGoal}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: PREFERENCES & COMPACT REVIEW SUMMARY */}
        {/* ========================================================================= */}
        {draft.activeStep === 4 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* 1. Hours per week */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="hours-slider" className="block text-sm font-bold text-white">
                  Available learning hours per week <span className="text-emerald-400" aria-hidden="true">*</span>
                  <span className="sr-only">(1 to 40 hours)</span>
                </label>
                <span className="text-sm font-bold font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-500/30">
                  {draft.availableHoursPerWeek || 10} hours per week
                </span>
              </div>

              {/* Quick Pills */}
              <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label="Quick select weekly hours">
                {[5, 10, 15, 20, 30].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => updateField("availableHoursPerWeek", h)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      draft.availableHoursPerWeek === h
                        ? "bg-emerald-500 text-navy-950 shadow-glow-green"
                        : "bg-navy-950 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    {h} hrs/wk
                  </button>
                ))}
              </div>

              {/* Slider Input */}
              <input
                ref={hoursSliderRef}
                id="hours-slider"
                type="range"
                min="1"
                max="40"
                step="1"
                value={draft.availableHoursPerWeek || 10}
                aria-valuemin={1}
                aria-valuemax={40}
                aria-valuenow={draft.availableHoursPerWeek || 10}
                aria-valuetext={`${draft.availableHoursPerWeek || 10} hours per week`}
                onChange={(e) => updateField("availableHoursPerWeek", parseInt(e.target.value, 10))}
                className="w-full h-2 bg-navy-950 rounded-lg appearance-none cursor-pointer accent-emerald-500 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>1 hr (Light)</span>
                <span>20 hrs (Part-time)</span>
                <span>40 hrs (Intensive)</span>
              </div>
              {errors.availableHoursPerWeek && (
                <p role="alert" className="text-xs text-red-400 flex items-center gap-1.5 pt-1 font-medium">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.availableHoursPerWeek}
                </p>
              )}
            </div>

            {/* 2. Preferred Formats */}
            <fieldset className="space-y-3">
              <div className="flex items-center justify-between">
                <legend className="block text-sm font-bold text-white">
                  Preferred learning formats <span className="text-emerald-400" aria-hidden="true">*</span>
                  <span className="sr-only">(choose at least one)</span>
                </legend>
                <span className="text-xs text-slate-400">Select all that apply</span>
              </div>

              {errors.learningFormats && (
                <p role="alert" className="text-xs text-red-400 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.learningFormats}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" role="group" aria-label="Learning formats">
                {FORMAT_OPTIONS.map((f) => {
                  const Icon = f.icon;
                  const isSelected = draft.learningFormats.includes(f.id);

                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="checkbox"
                      aria-checked={isSelected}
                      onClick={() => toggleFormat(f.id)}
                      className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        isSelected
                          ? "bg-emerald-950/50 border-emerald-400 text-white shadow-glow-green/20"
                          : "bg-navy-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isSelected ? "text-emerald-400" : "text-slate-400"}`} />
                      <span className="text-xs font-semibold">{f.label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* 3. Learning Style & Pace */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Style */}
              <fieldset className="space-y-2.5">
                <legend className="block text-sm font-bold text-white mb-1">
                  Learning style <span className="text-emerald-400" aria-hidden="true">*</span>
                </legend>
                <div className="space-y-2" role="radiogroup" aria-label="Learning style">
                  {STYLE_OPTIONS.map((st) => {
                    const isSelected = draft.learningStyle === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => updateField("learningStyle", st.id)}
                        className={`w-full p-3 rounded-xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          isSelected
                            ? "bg-emerald-950/40 border-emerald-400 text-white shadow-glow-green/20"
                            : "bg-navy-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                        }`}
                      >
                        <div className="font-bold text-xs text-white">{st.title}</div>
                        <div className="text-[11px] text-slate-400">{st.desc}</div>
                      </button>
                    );
                  })}
                </div>
                {errors.learningStyle && (
                  <p role="alert" className="text-xs text-red-400 flex items-center gap-1.5 font-medium">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.learningStyle}
                  </p>
                )}
              </fieldset>

              {/* Pace */}
              <fieldset className="space-y-2.5">
                <legend className="block text-sm font-bold text-white mb-1">
                  Preferred pace <span className="text-emerald-400" aria-hidden="true">*</span>
                </legend>
                <div className="space-y-2" role="radiogroup" aria-label="Preferred pace">
                  {PACE_OPTIONS.map((p) => {
                    const isSelected = draft.preferredPace === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => updateField("preferredPace", p.id)}
                        className={`w-full p-3 rounded-xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          isSelected
                            ? "bg-emerald-950/40 border-emerald-400 text-white shadow-glow-green/20"
                            : "bg-navy-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                        }`}
                      >
                        <div className="font-bold text-xs text-white">{p.title}</div>
                        <div className="text-[11px] text-slate-400">{p.desc}</div>
                      </button>
                    );
                  })}
                </div>
                {errors.preferredPace && (
                  <p role="alert" className="text-xs text-red-400 flex items-center gap-1.5 font-medium">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.preferredPace}
                  </p>
                )}
              </fieldset>
            </div>

            {/* Compact Profile & Mission Summary */}
            <div className="p-5 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono text-slate-400 tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Onboarding Summary Snapshot
                </span>
                <Badge variant="glow-green" size="sm">Ready for Diagnostic</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 font-mono">Student</span>
                  <p className="font-bold text-white">{draft.name || "Student"}</p>
                  <p className="text-slate-400 truncate">{draft.degree}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 font-mono">Target Mission</span>
                  <p className="font-bold text-emerald-400">
                    {draft.mission === "custom"
                      ? draft.customGoal || "Custom Goal"
                      : MISSION_OPTIONS.find((m) => m.id === draft.mission)?.title || "Not selected"}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 font-mono">Focus Domains</span>
                  <p className="font-bold text-slate-200">
                    {draft.interests.length} Selected ({draft.interests.join(", ")})
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <StepNavigation
          currentStep={draft.activeStep}
          onBack={handleBack}
          onNext={handleNext}
          isSubmitting={isSubmitting}
        />
      </Card>
    </div>
  );
}
