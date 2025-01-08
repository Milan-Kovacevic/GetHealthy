import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type RegistrationStepsProps = {
  steps: string[];
  currentStep: number;
};

export default function RegistrationSteps(props: RegistrationStepsProps) {
  const { steps, currentStep } = props;
  return (
    <div className="w-full mx-auto space-y-8">
      <div className="flex justify-between items-start">
        {steps.map((step, index) => (
          <Step
            number={`${index + 1}`}
            key={step}
            title={step}
            isActive={currentStep === index + 1}
            isCompleted={currentStep > index + 1}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

type StepProps = {
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  number: string;
  isLast: boolean;
};

const Step = ({ isActive, isCompleted, title, number, isLast }: StepProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center relative">
      <div
        className={cn(
          `flex h-8 w-8 items-center justify-center rounded-full border-2 z-10 bg-background`,
          isActive
            ? "border-primary text-primary"
            : isCompleted
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground text-muted-foreground"
        )}
      >
        {isCompleted ? (
          <CheckIcon className="h-5 w-5" />
        ) : (
          <span>{number}</span>
        )}
      </div>
      <span
        className={cn(
          `ml-2 max-w-32 text-center text-sm font-medium truncate z-10 bg-background relative`,
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {title}
      </span>
      {!isLast && (
        <span className="h-0.5 bg-muted-foreground rounded-xl absolute w-full top-4 translate-x-[50%] z-0 " />
      )}
    </div>
  );
};
