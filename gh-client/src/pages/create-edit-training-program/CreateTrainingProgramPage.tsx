import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRef, useState } from "react";
import ExercisePlanBuilder from "./components/ExercisePlanBuilder";
import GeneralInformationForm from "./components/GeneralInformationForm";
import TrainingProgramForm from "./components/TrainingProgramForm";

const CreateTrainingProgramPage = () => {
  const [generalInfo, setGeneralInfo] = useState<any>(null);
  const [exercisePlan, setExercisePlan] = useState<any>(null);
  const generalInfoRef = useRef<{ submitForm: () => Promise<boolean> }>(null);
  const exercisePlanRef = useRef<{ submitForm: () => Promise<boolean> }>(null);

  const handleSubmit = async () => {
    const generalInfoValid = await generalInfoRef.current?.submitForm();
    const exercisePlanValid = await exercisePlanRef.current?.submitForm();

    if (generalInfoValid && exercisePlanValid) {
      const combinedData = { ...generalInfo, ...exercisePlan };
      try {
        // await createUpdateTrainingProgram(combinedData);
        console.log("Training program successfully created/updated!");
      } catch (error) {
        console.log("Failed to create/update training program:", error);
      }
    } else {
      console.log("Please fill out all required fields.");
    }
  };

  return (
    <div className="container mx-auto relative overflow-hidden sm:px-5 px-4 pt-8 pb-10">
      <div className="space-y-0.5">
        <p className="text-2xl font-bold">Create training program</p>
        <p className="text-muted-foreground text-sm">
          Fill in some general information about the program, and create your
          workout plan
        </p>
      </div>
      <TrainingProgramForm isEdit={false} />
      {/* <Separator className="my-4" />
      <GeneralInformationForm isEdit={false} />
      <Separator className="my-4" />
      <ExercisePlanBuilder isEdit={false} />
      <Button onClick={handleSubmit} variant="default" className="mt-4">
        Create Training Program
      </Button> */}
    </div>
  );
};

export default CreateTrainingProgramPage;
