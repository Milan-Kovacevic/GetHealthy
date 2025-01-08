import { createTrainingProgram } from "@/api/services/training-program-service";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  exercisePlanSchema,
  generalInfoSchema,
} from "@/schemas/training-program-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ExercisePlanBuilder from "./ExercisePlanBuilder";
import GeneralInformationForm from "./GeneralInformationForm";

const createTrainingProgramSchema = z.object({
  generalInfo: generalInfoSchema,
  exercisePlan: exercisePlanSchema,
});

type CreateTrainingProgramFormProps = {};

const CreateTrainingProgramForm = ({}: CreateTrainingProgramFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const createTrainingProgramForm = useForm<
    z.infer<typeof createTrainingProgramSchema>
  >({
    resolver: zodResolver(createTrainingProgramSchema),
    defaultValues: {
      generalInfo: {},
      exercisePlan: {
        exercises: [],
      },
    },
  });

  const onSubmit = async (
    data: z.infer<typeof createTrainingProgramSchema>
  ) => {
    const generalInfoData = data.generalInfo;
    const exercisesPlanData = data.exercisePlan.exercises;

    const trainingProgramExercisesData = {
      exercises: exercisesPlanData.map((elem, index) => ({
        position: index + 1,
        exerciseId: elem.id,
        exerciseSets: elem.sets,
      })),
    };

    const formData = new FormData();

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    formData.append(
      "training-program",
      new Blob([JSON.stringify(generalInfoData)], {
        type: "application/json",
      })
    );

    formData.append(
      "training-program-exercises",
      new Blob([JSON.stringify(trainingProgramExercisesData)], {
        type: "application/json",
      })
    );

    console.log("Exercise data", trainingProgramExercisesData);

    try {
      await createTrainingProgram(2, formData); // hardcoded userId for trainer
      toast.success("Training program successfully created!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...createTrainingProgramForm}>
      <form
        onSubmit={createTrainingProgramForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div>
          <Separator className="my-4" />
          <GeneralInformationForm
            onSelectFile={setSelectedFile}
            form={createTrainingProgramForm}
            formPath="generalInfo"
          />
          <Separator className="my-4" />
          <ExercisePlanBuilder
            form={createTrainingProgramForm}
            formPath="exercisePlan"
          />
        </div>
        <div className="flex w-full justify-end">
          <Button type="submit" variant="default">
            Create Program
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateTrainingProgramForm;
