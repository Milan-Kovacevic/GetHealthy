import { Card, CardContent } from "@/components/ui/card";
import {
  CircleBackgroundBlob,
  TopBackgroundBlob,
} from "@/pages/shared/BackgroundBlobs";
import { AuthCardHeader, AuthFooter } from "../shared/AuthPageSections";
import RegistrationSteps from "./components/RegistrationSteps";
import RegistrationForm from "./components/RegistrationForm";
import { useNavigate } from "react-router-dom";
import { UserRegistration } from "@/api/models/authentication";
import useRegisterStepper from "./use-register-stepper";
import { toast } from "sonner";
import { UserRole } from "@/api/enums/user-role";
import { registerUser } from "@/api/services/auth-service";
import { useState } from "react";

const RegisterPage = () => {
  const { currentStep, steps, onPreviousStep, onNextStep } =
    useRegisterStepper();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegistration = (data: UserRegistration) => {
    // Create http form-data object (for qualification upload)
    const formData = new FormData();
    if (data?.qualification)
      formData.append("qualification", data?.qualification);

    const dataWithoutQualification = (({ qualification, ...o }) => o)(data);
    formData.append(
      "data",
      new Blob([JSON.stringify(dataWithoutQualification)], {
        type: "application/json",
      })
    );
    setIsSubmitting(true);
    registerUser(formData)
      .then((isSuccessful) => {
        if (isSuccessful) {
          toast.message(`Registration was successful`, {
            description:
              data.role == UserRole.TRAINER
                ? " Please check your email for verification."
                : ` Welcome ${data.firstName} ${data.lastName}, please log in to continue.`,
          });
          navigate("/login");
        } else {
          toast.error(`Registration failed`, {
            description: "Unable to create new account",
          });
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="h-full relative overflow-hidden flex items-center justify-center">
      <TopBackgroundBlob />
      <CircleBackgroundBlob variant="lighter" />
      <CircleBackgroundBlob
        variant="light"
        className="-bottom-24 -right-16 w-1/3 h-96 left-auto"
      />
      <div className="relative container mx-auto z-10 -translate-y-20 my-20">
        <div className="flex flex-col gap-4">
          <Card className="mx-auto w-full p-1 max-w-[480px] animate-fade-down shadow-md dark:shadow-white/5">
            <AuthCardHeader
              title="Create an account"
              description="Fill in required information to get started, simple and easy."
            />
            <CardContent>
              <div className="w-full mx-auto space-y-8 mt-1">
                <RegistrationSteps steps={steps} currentStep={currentStep} />
                <RegistrationForm
                  currentStep={currentStep}
                  onPreviousStep={onPreviousStep}
                  onNextStep={onNextStep}
                  onSubmit={handleRegistration}
                  loading={isSubmitting}
                />
              </div>
            </CardContent>
          </Card>
          <AuthFooter
            text="Already have an account?"
            linkHref="/login"
            linkLabel="Log in"
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
