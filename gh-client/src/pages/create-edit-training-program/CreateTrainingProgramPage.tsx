import { Separator } from "@/components/ui/separator";
import { CircleBackgroundBlob } from "../shared/BackgroundBlobs";
import CreateTrainingProgramForm from "./components/CreateTrainingProgramForm";
import PageHeadingLayout from "@/layouts/PageHeadingLayout";

const CreateTrainingProgramPage = () => {
  return (
    <PageHeadingLayout
      title="Create training program"
      description="Fill in some general information about the program, and create your
            workout plan"
    >
      <CreateTrainingProgramForm />
    </PageHeadingLayout>
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
