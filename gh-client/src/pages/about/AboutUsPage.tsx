import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeft, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { CircleBackgroundBlob } from "@/pages/shared/BackgroundBlobs";

const people = [
  {
    id: "person-1",
    name: "Milan Kovacevic",
    role: "Developer",
    description: "Elig doloremque mollitia fugiat omnis!",
    avatar: "https://www.shadcnblocks.com/images/block/avatar-4.webp",
  },
  {
    id: "person-2",
    name: "Duska Borojevic",
    role: "Developer",
    description: "Elig doloremque mollitia fugiat omnis!",
    avatar: "https://www.shadcnblocks.com/images/block/avatar-1.webp",
  },
  {
    id: "person-3",
    name: "Vladan Pasagic",
    role: "Developer",
    description:
      "Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
    avatar: "https://www.shadcnblocks.com/images/block/avatar-2.webp",
  },
  {
    id: "person-4",
    name: "Aleksandar Ciric",
    role: "Developer",
    description:
      "Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
    avatar: "https://www.shadcnblocks.com/images/block/avatar-6.webp",
  },
  {
    id: "person-5",
    name: "Ana Djurdjevic",
    role: "Developer",
    description:
      "Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
    avatar: "https://www.shadcnblocks.com/images/block/avatar-7.webp",
  },

  {
    id: "person-6",
    name: "Sasa Mikic",
    role: "Developer",
    description:
      "Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
    avatar: "https://www.shadcnblocks.com/images/block/avatar-5.webp",
  },
];

const AboutUsPage = () => {
  return (
    <section className="h-full relative overflow-hidden">
      <CircleBackgroundBlob variant="lightest" className="top-0 w-1/3 h-1/3" />
      <CircleBackgroundBlob variant="lighter" />
      <CircleBackgroundBlob
        variant="light"
        className="bottom-1/4 -right-36 w-1/4 h-96 left-auto"
      />
      <div className="container mx-auto z-10 lg:px-0 sm:px-4 px-4 relative">
        <Link to={"/"} className="absolute right-0 top-6 z-10">
          <Button variant="ghost">
            Go back <ArrowLeft className="ml-2 h-4" />
          </Button>
        </Link>
        <div className="flex flex-col items-center text-center pt-16 animate-fade-down">
          <div className="flex flex-wrap justify-center gap-2 relative w-full lg:mb-6 mb-4">
            <p className="text-2xl font-bold lg:text-4xl text-accent-foreground">
              About Us...
            </p>
          </div>

          <p className="mb-4 max-w-screen-lg text-muted-foreground lg:text-lg">
            "GetHealthy" is a system for creating training plans, intended for
            athletes and people who do fitness training with a personal trainer
            or physiotherapist. Users access the system through a web browser.
            Through the web interface, trainers have the ability to create
            training plans, create exercises, create schedules, and make
            changes. A schedule can be created for each individual user, but
            also for groups of users. The schedule changes on a weekly basis and
            contains all the detailed information necessary for proper training.
            Application users also have the option of commenting and rating
            training plans. The application sends notifications about activities
            from the schedule, notifications in case of schedule changes, new
            comments and training plan join request approvals. The administrator
            has the ability to review registration requests and if someone wants
            to register as a coach, to accept or reject them, as well as to
            review all registered accounts and delete them if necessary. The
            system is adapted to users of all ages, and it is available in a
            myriad of different languages. The system can be used for needs of
            physiotherapy, fitness centers, personal training, rehabilitation
            centers and the like.
          </p>
          <div className="flex flex-col items-center gap-2 mb-6">
            <p className="text-center: text-muted-foreground lg:text-left font-medium">
              Built with open-source technologies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "group px-3"
                )}
              >
                <img
                  src="https://www.shadcnblocks.com/images/block/logos/shadcn-ui-small.svg"
                  alt="company logo"
                  className="h-6 saturate-0 transition-all group-hover:saturate-100 dark:filter-white"
                />
              </a>
              <a
                href="#"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "group px-3"
                )}
              >
                <img
                  src="https://www.shadcnblocks.com/images/block/logos/typescript-small.svg"
                  alt="company logo"
                  className="h-6 saturate-0 transition-all group-hover:saturate-100"
                />
              </a>

              <a
                href="#"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "group px-3"
                )}
              >
                <img
                  src="https://www.shadcnblocks.com/images/block/logos/react-icon.svg"
                  alt="company logo"
                  className="h-6 saturate-0 transition-all group-hover:saturate-100"
                />
              </a>
              <a
                href="#"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "group px-3"
                )}
              >
                <img
                  src="https://www.shadcnblocks.com/images/block/logos/tailwind-small.svg"
                  alt="company logo"
                  className="h-4 saturate-0 transition-all group-hover:saturate-100"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-14 animate-fade-down delay-500">
          <h2 className="lg:mb-6 mb-4 text-pretty text-xl font-bold lg:text-2xl">
            Meet our team
          </h2>
          <div className="mx-auto max-w-screen-lg grid gap-x-8 gap-y-8 md:grid-cols-3 pb-20 z-20 relative">
            {people.map((person) => (
              <Card
                key={person.id}
                className="flex flex-col items-center bg-accent dark:bg-accent/30 p-8 rounded-md hover:bg-primary/10 hover:dark:bg-primary/10 duration-500"
              >
                <Avatar className="mb-4 size-20 border md:mb-5 lg:size-24">
                  <AvatarImage src={person.avatar} />
                  <AvatarFallback>{person.name}</AvatarFallback>
                </Avatar>
                <p className="text-center font-medium">{person.name}</p>
                <p className="text-center text-muted-foreground">
                  {person.role}
                </p>
                <p className="py-3 text-center text-sm text-muted-foreground">
                  {person.description}
                </p>
                <div className="mt-auto pt-2 flex gap-4">
                  <a href="#">
                    <Github className="size-4 text-muted-foreground" />
                  </a>
                  <a href="#">
                    <Linkedin className="size-4 text-muted-foreground" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
