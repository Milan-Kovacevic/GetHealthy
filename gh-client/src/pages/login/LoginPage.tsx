import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  CircleBackgroundBlob,
  TopBackgroundBlob,
} from "../shared/BackgroundBlobs";
import AuthCardHeader from "../shared/AuthCardHeader";
import LoginForm from "./components/LoginForm";
import { LoginFormSchema } from "@/schemas/login-form-schema";
import useAuth from "@/hooks/use-auth";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleLogin(values: LoginFormSchema) {
    setIsSubmitting(true);
    auth
      ?.login(values)
      .then(() => {
        toast.message("You have successfully logged in to your account.");
        navigate("/schedule");
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
          <div className="mx-auto flex gap-1 text-sm">
            <p>Don&apos;t have an account yet?</p>
            <Link
              to="/register"
              className="underline text-foreground/80 hover:text-foreground"
            >
              Sign up
            </Link>
          </div>
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
