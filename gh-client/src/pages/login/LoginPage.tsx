import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  CircleBackgroundBlob,
  TopBackgroundBlob,
} from "../shared/BackgroundBlobs";
import { AuthCardHeader, AuthFooter } from "../shared/AuthPageSections";
import LoginForm from "./components/LoginForm";
import { LoginFormSchema } from "@/schemas/login-form-schema";
import useAuth from "@/hooks/use-auth";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleLogin(values: LoginFormSchema) {
    setIsSubmitting(true);
    auth
      ?.login(values)
      .then((response) => {
        if (response) {
          toast.message(`Welcome ${response.firstName} ${response.lastName}`, {
            description: "You have successfully logged in to your account!",
          });
          navigate("/schedule");
        }
      })
      .catch((error) => {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <section className="h-full relative overflow-hidden">
      <BackgroundBlurs />
      <div className="relative container mx-auto z-10 my-28">
        <div className="flex flex-col gap-4">
          <Card className="mx-auto w-full max-w-md p-1 animate-fade-down shadow-md dark:shadow-white/5">
            <AuthCardHeader
              title="Log in with your email or username"
              description="Enter your information to login"
            />
            <CardContent>
              <div className="grid gap-4">
                {/* <SocialLogin /> */}
                <LoginForm enabled={!isSubmitting} onLogin={handleLogin} />
              </div>
            </CardContent>
          </Card>
          <AuthFooter
            text="Don't have an account yet?"
            linkHref="/register"
            linkLabel="Sign up"
          />
        </div>
      </div>
    </section>
  );
}

const BackgroundBlurs = () => {
  return (
    <>
      <TopBackgroundBlob />
      <CircleBackgroundBlob variant="lighter" />
      <CircleBackgroundBlob
        variant="light"
        className="-bottom-24 -right-16 w-1/3 h-96 left-auto"
      />
    </>
  );
};
