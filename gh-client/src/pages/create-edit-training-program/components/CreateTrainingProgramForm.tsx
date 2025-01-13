import { createTrainingProgram } from "@/api/services/training-program-service";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  CreateProgramFormSchema,
  createProgramSchemaDefaultValues,
  createTrainingProgramSchema,
  ExercisePlanFormSchema,
  GeneralInfoFormSchema,
} from "@/schemas/training-program-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ExercisePlanBuilder from "./ExercisePlanBuilder";
import GeneralInformationForm from "./GeneralInformationForm";
import useAuth from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

type CreateTrainingProgramFormProps = {};

const CreateTrainingProgramForm = ({}: CreateTrainingProgramFormProps) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const userId = auth.getUserId();
  if (!userId) return;

  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const createTrainingProgramForm = useForm<CreateProgramFormSchema>({
    resolver: zodResolver(createTrainingProgramSchema),
    defaultValues: createProgramSchemaDefaultValues,
  });

  const onSubmit = async (data: CreateProgramFormSchema) => {
    const generalInfoData: GeneralInfoFormSchema = data.generalInfo;
    const exercisesPlanData: ExercisePlanFormSchema = data.exercisePlan;

    const programExercisesFormData = {
      trainingProgramExercises: exercisesPlanData.exercises.map(
        (elem, index) => ({
          position: index + 1,
          exerciseId: elem.id,
          exerciseSets: elem.sets,
        })
      ),
    };
    const generalInfoFormData = {
      ...generalInfoData,
      trainerId: userId,
    };

    const formData = new FormData();

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    formData.append(
      "training-program",
      new Blob([JSON.stringify(generalInfoFormData)], {
        type: "application/json",
      })
    );

    formData.append(
      "training-program-exercises",
      new Blob([JSON.stringify(programExercisesFormData)], {
        type: "application/json",
      })
    );

    try {
      await createTrainingProgram(formData);
      navigate(-1);
      toast.success("Training program successfully created!");
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
        <GeneralInformationForm
          isEdit={false}
          onSelectFile={setSelectedFile}
          form={createTrainingProgramForm}
        />

        <ExercisePlanBuilder isEdit={false} form={createTrainingProgramForm} />
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
