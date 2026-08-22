import * as React from "react";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface StepNavigationProps {
  currentStep: 1 | 2 | 3 | 4;
  onBack: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
  nextLabel?: string;
}

export function StepNavigation({
  currentStep,
  onBack,
  onNext,
  isSubmitting = false,
  nextLabel,
}: StepNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === 4;

  const defaultNextLabels: Record<number, string> = {
    1: "Continue to Interests",
    2: "Continue to Mission",
    3: "Continue to Preferences",
    4: "Complete & Start Assessment",
  };

  const buttonText = nextLabel || defaultNextLabels[currentStep];

  return (
    <div className="flex items-center justify-between pt-6 border-t border-slate-800/80 gap-4">
      <div>
        {!isFirstStep && (
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            disabled={isSubmitting}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
            className="text-slate-400 hover:text-white"
            aria-label="Go back to previous onboarding step"
          >
            Back
          </Button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="primary"
          onClick={onNext}
          isLoading={isSubmitting}
          rightIcon={
            isLastStep ? (
              <Sparkles className="h-4 w-4 text-navy-950" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )
          }
          className="px-6 h-11 shadow-glow-green"
          aria-label={buttonText}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
