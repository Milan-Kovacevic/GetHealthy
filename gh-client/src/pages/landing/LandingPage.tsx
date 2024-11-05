import { ExternalLink, MoveRight } from "lucide-react";
import appIcon from "@/assets/applogo.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/primitives/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import {
  CircleBackgroundBlob,
  TopBackgroundBlob,
} from "@/pages/shared/BackgroundBlobs";

const LandingPage = () => {
  return (
    <section className="relative overflow-hidden px-2 h-full">
      <div className="container mx-auto my-auto h-full">
        <TopBackgroundBlob />
        <CircleBackgroundBlob variant="lighter" />
        <CircleBackgroundBlob
          variant="light"
          className="-bottom-24 -right-16 w-1/3 h-96 left-auto"
        />
        <div className="mx-auto flex max-w-5xl flex-col items-center py-56">
          <div className="z-10 flex flex-col items-center gap-6 text-center">
            <img
              src={appIcon}
              alt="logo"
              className="h-20 lg:h-24 -mb-4 dark:filter-white"
            />
            <div>
              <h1 className="pb-10 text-pretty text-4xl font-bold lg:text-6xl inline-block bg-clip-text bg-gradient-to-l from-primary/90 to-gray-600 text-transparent dark:from-primary/90 dark:to-white">
                Welcome to Get Healthy
              </h1>
              <blockquote className="mx-6 relative max-w-screen-lg">
                <svg
                  className="absolute top-0 start-0 transform -translate-x-6 -translate-y-8 md:h-16 md:w-16 h-12 w-12 text-foreground/10 dark:text-foreground/15"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                    fill="currentColor"
                  />
                </svg>
                <div className="relative z-10">
                  <p className="text-muted-foreground dark:text-foreground/75 lg:text-xl ">
                    Transform your fitness journey with GetHealthy! Your
                    personalized training programs, exercise tracking, and
                    expert guidance all in one place. Start achieving your goals
                    today, whether you're a beginner or a pro - GetHealthy is
                    here to support every step!
                  </p>
                </div>
              </blockquote>
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-2 relative">
              <Link to={"login"}>
                <Button>
                  Get Started <MoveRight className="ml-0 h-4" />
                </Button>
              </Link>
              <div className="absolute -top-9 left-16">
                <div className="flex flex-row">
                  <svg
                    className="w-12 h-8 self-end"
                    width={45}
                    height={25}
                    viewBox="0 0 45 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z"
                      fill="currentColor"
                      className="text-muted-foreground"
                    />
                  </svg>
                  <Badge
                    variant={"secondary"}
                    className="self-end mb-1.5 uppercase border-muted-foreground border"
                  >
                    Its free
                  </Badge>
                </div>
              </div>

              <Link to={"about"}>
                <Button variant="outline">
                  About us <ExternalLink className="ml-2 h-4" />
                </Button>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
