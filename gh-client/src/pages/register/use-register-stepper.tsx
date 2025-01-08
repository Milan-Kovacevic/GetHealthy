import { useState } from "react";

export default function useRegisterStepper() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ["Account type", "Account info", "Additional details"];

  const onNextStepClicked = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const onPreviousStepClicked = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return {
    currentStep,
    steps,
    onPreviousStep: onPreviousStepClicked,
    onNextStep: onNextStepClicked,
  };
}
