import { CheckIcon } from "lucide-react";
import { useState } from "react";
import AccountTypeSelector from "./AccountTypeSelector";
import AccountInfoForm from "./AccountInfoForm";
import PersonalDetailsForm from "./PersonalDetailsForm";
import { toast } from "sonner";
import { AccountType } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

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
        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
          isActive
            ? "border-primary text-primary"
            : isCompleted
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground text-muted-foreground"
        }`}
      >
        {isCompleted ? (
          <CheckIcon className="h-5 w-5" />
        ) : (
          <span>{number}</span>
        )}
      </div>
      <span
        className={`ml-2 max-w-32 text-center text-sm font-medium ${
          isActive ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {title}
      </span>
      {!isLast && (
        <span className="h-0.5 bg-muted-foreground rounded-xl absolute w-[80%] top-4 translate-x-[63%]" />
      )}
    </div>
  );
};

export default function RegistrationStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAccountType, setSelectedAccountType] = useState<AccountType>();
  const steps = ["Account type", "Account info", "Additional details"];
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onAccountTypeSelected = (type: AccountType) => {
    setSelectedAccountType(type);
    handleNext();
  };

  const onAccountInfoSubmitted = (data: any) => {
    handleNext();
  };

  const onDetailsSubmitted = (data: any) => {
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
    navigate("/");
  };

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
      <div className="">
        <AccountTypeSelector
          className={currentStep == 1 ? "block" : "hidden"}
          onAccountSelected={onAccountTypeSelected}
        />
        <AccountInfoForm
          className={currentStep == 2 ? "block" : "hidden"}
          onGoBack={handlePrevious}
          onInfoSubmitted={onAccountInfoSubmitted}
        />
        <PersonalDetailsForm
          className={currentStep == 3 ? "block" : "hidden"}
          onGoBack={handlePrevious}
          onInfoSubmitted={onDetailsSubmitted}
          accountType={selectedAccountType}
        />
      </div>
    </div>
  );
}
