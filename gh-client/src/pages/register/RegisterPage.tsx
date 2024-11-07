import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  CircleBackgroundBlob,
  TopBackgroundBlob,
} from "@/pages/shared/BackgroundBlobs";
import RegistrationStepper from "./components/RegistrationStepper";
import AuthCardHeader from "../shared/AuthCardHeader";

const RegisterPage = () => {
  return (
    <section className="h-full relative overflow-hidden">
      <TopBackgroundBlob />
      <CircleBackgroundBlob variant="lighter" />
      <CircleBackgroundBlob
        variant="light"
        className="-bottom-24 -right-16 w-1/3 h-96 left-auto"
      />
      <div className="relative container mx-auto z-10 my-28">
        <div className="flex flex-col gap-4">
          <Card className="mx-auto w-full max-w-lg animate-fade-down shadow-md dark:shadow-white/5">
            <AuthCardHeader
              title="Create an account"
              description="Fill in required information to get started, simple and easy."
            />
            <CardContent>
              <div className="mt-4">
                <RegistrationStepper />
              </div>
            </CardContent>
          </Card>
          <div className="mx-auto flex gap-1 text-sm">
            <p>Already have an account?</p>
            <Link
              to="/login"
              className="underline text-foreground/80 hover:text-foreground"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
