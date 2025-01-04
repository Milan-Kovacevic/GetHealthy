import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  exercisePlanSchema,
  generalInfoSchema,
} from "@/schemas/training-program-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ExercisePlanBuilder from "./ExercisePlanBuilder";
import GeneralInformationForm from "./GeneralInformationForm";

const createTrainingProgramSchema = z.object({
  generalInfo: generalInfoSchema,
  exercisePlan: exercisePlanSchema,
});

// mock data for ed
const validExercisePlan: any = {
  exercises: [
    {
      id: 1,
      name: "Push-ups",
      type: "bodyweight",
      sets: [
        {
          reps: 15,
          pause: 30,
        },
        {
          reps: 12,
          pause: 30,
        },
      ],
    },
    {
      id: 2,
      name: "Running",
      type: "cardio",
      sets: [
        {
          time: 600, // 10 minutes in seconds
          distance: 2.5, // 2.5 km
          pause: 60,
        },
      ],
    },
  ],
};

type TrainingProgramFormProps = {
  isEdit?: boolean;
};

const TrainingProgramForm = ({ isEdit }: TrainingProgramFormProps) => {
  const createTrainingProgramForm = useForm<
    z.infer<typeof createTrainingProgramSchema>
  >({
    resolver: zodResolver(createTrainingProgramSchema),
    defaultValues: {
      generalInfo: {},
      exercisePlan: {
        exercises: isEdit ? validExercisePlan.exercises : [],
      },
    },
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Form {...createTrainingProgramForm}>
      <form
        onSubmit={createTrainingProgramForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <Separator className="my-4" />
        <GeneralInformationForm
          form={createTrainingProgramForm}
          formPath="generalInfo"
        />
        <Separator className="my-4" />
        <ExercisePlanBuilder
          form={createTrainingProgramForm}
          formPath="exercisePlan"
        />
        <div className="flex w-full justify-end">
          <Button type="submit" variant="default">
            Create Program
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TrainingProgramForm;
