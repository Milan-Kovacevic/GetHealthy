import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  exercisePlanSchema,
  generalInfoSchema,
} from "@/schemas/training-program-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ExercisePlanBuilder from "./ExercisePlanBuilder";
import GeneralInformationForm from "./GeneralInformationForm";
import { toast } from "sonner";
import {
  updateTrainingProgramExercisePlan,
  updateTrainingProgramGeneralInfo,
} from "@/api/services/training-program-service";

type EditTrainingProgramFormProps = {
  exercises: any;
  generalInfo: any;
  programId: number;
};

const EditTrainingProgramForm = ({
  exercises,
  generalInfo,
  programId,
}: EditTrainingProgramFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const editGeneralInfoForm = useForm<z.infer<typeof generalInfoSchema>>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: generalInfo ? generalInfo : {},
  });

  const editExercisePlanForm = useForm<z.infer<typeof exercisePlanSchema>>({
    resolver: zodResolver(exercisePlanSchema),
    defaultValues: {
      exercises: exercises ? exercises : [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    console.log("General Info", generalInfo);
    console.log("Exercises", exercises);
  }, []);

  const onGeneralInfoSubmit = async (
    data: z.infer<typeof generalInfoSchema>
  ) => {
    const generalInfoData = { ...data, trainerId: 2 }; // TrainerId hardcoded

    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    formData.append(
      "training-program",
      new Blob([JSON.stringify(generalInfoData)], { type: "application/json" })
    );

    try {
      await updateTrainingProgramGeneralInfo(programId, formData);
      toast.success("Training program general info successfully updated!");
    } catch (error) {
      console.log(error);
      toast.error("Training program general info could not be updated!");
    }
  };

  const onExercisePlanSubmit = async (
    data: z.infer<typeof exercisePlanSchema>
  ) => {
    const exercisesData = {
      trainingProgramExercises: data.exercises.map((elem, index) => ({
        position: index + 1,
        exerciseId: elem.id,
        programId: programId,
        programExerciseId: elem.programExerciseId,
        exerciseSets: elem.sets,
      })),
    };

    try {
      await updateTrainingProgramExercisePlan(programId, exercisesData);
      toast.success("Training program exercise plan successfully updated!");
    } catch (error) {
      console.log(error);
      toast.error("Training program exercise plan could not be updated!");
    }
    console.log(exercisesData);
  };

  return (
    <>
      <Form {...editGeneralInfoForm}>
        <form
          onSubmit={editGeneralInfoForm.handleSubmit(onGeneralInfoSubmit)}
          className="space-y-8"
        >
          <Separator className="my-4" />
          <GeneralInformationForm
            isEdit={true}
            form={editGeneralInfoForm}
            formPath=""
            defaultValueCategories={generalInfo.categories}
            onSelectFile={setSelectedFile}
          />
        </form>
      </Form>
      <Form {...editExercisePlanForm}>
        <form
          onSubmit={editExercisePlanForm.handleSubmit(onExercisePlanSubmit)}
          className="space-y-8"
        >
          <Separator className="my-4" />
          <ExercisePlanBuilder
            form={editExercisePlanForm}
            formPath=""
            isEdit={true}
          />
        </form>
      </Form>
    </>
  );
};

export default EditTrainingProgramForm;
