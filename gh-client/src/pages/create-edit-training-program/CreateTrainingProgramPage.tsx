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
