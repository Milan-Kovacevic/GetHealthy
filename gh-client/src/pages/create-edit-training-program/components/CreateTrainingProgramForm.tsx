import { createTrainingProgram } from "@/api/services/training-program-service";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  exercisePlanSchema,
  generalInfoSchema,
} from "@/schemas/training-program-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ExercisePlanBuilder from "./ExercisePlanBuilder";
import GeneralInformationForm from "./GeneralInformationForm";
import useAuth from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

const createTrainingProgramSchema = z.object({
  generalInfo: generalInfoSchema,
  exercisePlan: exercisePlanSchema,
});

type CreateTrainingProgramFormProps = {};

const CreateTrainingProgramForm = ({}: CreateTrainingProgramFormProps) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const userId = auth.getUserId();
  if (!userId) return;

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
      trainingProgramExercises: exercisesPlanData.map((elem, index) => ({
        position: index + 1,
        exerciseId: elem.id,
        exerciseSets: elem.sets,
      })),
    };

    const formData = new FormData();

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    var generalInfoFormData = {
      ...generalInfoData,
      trainerId: userId,
    };

    formData.append(
      "training-program",
      new Blob([JSON.stringify(generalInfoFormData)], {
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
      await createTrainingProgram(formData);
      toast.success("Training program successfully created!");
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.error(
        "Unable to create training program. Please, try again later."
      );
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
