import appIcon from "@/assets/applogo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  CircleBackgroundBlob,
  TopBackgroundBlob,
} from "../shared/BackgroundBlobs";
import RegistrationStepper from "./components/RegistrationStepper";

const RegisterPage = () => {
  return (
    <section className="h-full relative overflow-hidden">
      <TopBackgroundBlob />
      <CircleBackgroundBlob variant="lighter" />
      <CircleBackgroundBlob
        variant="light"
        className="-bottom-24 -right-16 w-1/3 h-96 left-auto"
      />
      <div className="relative container mx-auto z-10 mt-28">
        <div className="flex flex-col gap-4">
          <Card className="mx-auto w-full max-w-lg animate-fade-down shadow-md dark:shadow-white/5">
            <CardHeader className="items-center">
              <Link to="/" className="self-center">
                <img
                  src={appIcon}
                  alt="logo"
                  className="h-16 w-20 dark:filter-white"
                />
              </Link>
              <CardTitle className="sm:text-xl text-lg text-center leading-tight sm:leading-normal">
                Create an account
              </CardTitle>
              <CardDescription className="mt-0 text-pretty">
                Fill in required information to get started, simple and easy.
              </CardDescription>
            </CardHeader>
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
