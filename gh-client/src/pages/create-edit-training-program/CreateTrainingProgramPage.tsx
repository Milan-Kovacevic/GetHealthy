import GeneralInformationForm from "./components/GeneralInformationForm";
import ExercisePlanBuilder from "./components/ExercisePlanBuilder";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const CreateTrainingProgramPage = () => {
  const [programId, setProgramId] = useState<number>(-1);
  return (
    <div className="container mx-auto relative overflow-hidden sm:px-5 px-4 pt-8 pb-10">
      <div className="space-y-0.5">
        <p className="text-2xl font-bold">Create training program</p>
        <p className="text-muted-foreground text-sm">
          Fill in some general information about the program, and create your
          workout plan
        </p>
      </div>
      <Separator className="my-4" />
      <GeneralInformationForm isEdit={false} setProgramId={setProgramId}/>
      <Separator className="my-4" />
      <ExercisePlanBuilder programId={programId}/>
    </div>
  );
};

export default CreateTrainingProgramPage;
