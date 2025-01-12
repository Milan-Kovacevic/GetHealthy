import { Separator } from "@/components/ui/separator";
import { CircleBackgroundBlob } from "../shared/BackgroundBlobs";
import CreateTrainingProgramForm from "./components/CreateTrainingProgramForm";

const CreateTrainingProgramPage = () => {
  return (
    <section className="overflow-hidden relative sm:px-5 px-4 md:pt-6 pt-4 pb-10">
      <BackgroundBlurs />
      <div className="container mx-auto h-full space-y-5 z-10 relative">
        <div className="space-y-0.5">
          <p className="text-2xl font-bold">Create training program</p>
          <p className="text-muted-foreground text-sm sm:text-base">
            Fill in some general information about the program, and create your
            workout plan
          </p>
        </div>
        <Separator className="my-4" />
        <CreateTrainingProgramForm />
      </div>
    </section>
  );
};

export default CreateTrainingProgramPage;

const BackgroundBlurs = () => {
  return (
    <>
      <CircleBackgroundBlob
        variant="lighter"
        className="left-auto -right-56 w-80 h-96 top-44"
      />
      <CircleBackgroundBlob
        variant="lightest"
        className="-left-72 w-1/4 h-96 top-44"
      />
      <CircleBackgroundBlob variant="lightest" />
      <CircleBackgroundBlob
        variant="lightest"
        className="-bottom-24 -right-16 w-1/3 h-96 left-auto"
      />
    </>
  );
};
