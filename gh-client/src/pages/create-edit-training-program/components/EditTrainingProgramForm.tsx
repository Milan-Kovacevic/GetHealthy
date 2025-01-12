import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  exercisePlanSchema,
  GeneralInfoFormSchema,
  generalInfoSchema,
} from "@/schemas/training-program-schema";
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
import { ExercisePlanItem } from "@/api/models/exercise";

type EditTrainingProgramFormProps = {
  exercises: ExercisePlanItem[];
  generalInfo: GeneralInfoFormSchema;
  programPicture?: string;
  programId: number;
};

const EditTrainingProgramForm = ({
  exercises,
  generalInfo,
  programId,
  programPicture,
}: EditTrainingProgramFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const editGeneralInfoForm = useForm<z.infer<typeof generalInfoSchema>>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: generalInfo ? generalInfo : {},
  });

  const mappedExercises = exercises.map((exercise) => ({
    ...exercise,
    sets: exercise.sets.map((set) => ({
      ...set,
      firstMetricValue: Number(set.firstMetricValue),
      secondMetricValue: set.secondMetricValue
        ? Number(set.secondMetricValue)
        : undefined,
      restTime: set.restTime ?? 0,
    })),
  }));

  const editExercisePlanForm = useForm<z.infer<typeof exercisePlanSchema>>({
    resolver: zodResolver(exercisePlanSchema),
    defaultValues: {
      exercises: mappedExercises,
    },
    mode: "onChange",
  });

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
          className=""
        >
          <GeneralInformationForm
            isEdit={true}
            form={editGeneralInfoForm}
            formPath=""
            defaultValueCategories={generalInfo.categories}
            defaultPicture={programPicture}
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
