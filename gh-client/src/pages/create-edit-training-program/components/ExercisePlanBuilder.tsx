import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ExerciseCard from "./ExerciseCard";
import ExerciseForm from "./ExerciseForm";
import ExerciseSelector from "./ExerciseSelector";

// mock data of exercises
const exercises = [
  { id: 1, value: "push-ups", label: "Push-ups", type: "bodyweight" },
  { id: 2, value: "squats", label: "Squats", type: "bodyweight" },
  { id: 3, value: "lat-pulldowns", label: "Lat Pulldowns", type: "weighted" },
  { id: 4, value: "bench-press", label: "Bench Press", type: "weighted" },
  { id: 5, value: "running", label: "Running", type: "cardio" },
  { id: 6, value: "plank", label: "Plank", type: "timed" },
];

// mock data for edit
const validExercisePlan: ExercisePlanValues = {
  exercises: [
    {
      id: 1,
      name: "Push-ups",
      type: "bodyweight",
      sets: [
        {
          reps: 15,
          weight: undefined,
          time: undefined,
          distance: undefined,
          pause: 30,
        },
        {
          reps: 12,
          weight: undefined,
          time: undefined,
          distance: undefined,
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
          reps: undefined,
          weight: undefined,
          time: 600, // 10 minutes in seconds
          distance: 2.5, // 2.5 km
          pause: 60,
        },
      ],
    },
  ],
};

const setSchema = z.object({
  reps: z.number().min(1, "Reps must be at least one").optional(),
  weight: z.number().min(0, "Weight must be non-negative").optional(),
  time: z.number().min(1, "Time must be at least one second").optional(),
  distance: z.number().optional(),
  pause: z.number().min(0, "Pause time must be greater than 0"),
});

const exerciseSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.enum(["bodyweight", "weighted", "cardio", "timed"]),
  sets: z
    .array(setSchema)
    .min(1, "At least one set is required")
    .max(3, "Must have less then 4 sets"),
});

const exercisePlanSchema = z.object({
  exercises: z.array(exerciseSchema).min(1, "Select at least one exercise"),
});

type ExercisePlanValues = z.infer<typeof exercisePlanSchema>;

type ExercisePlanBuilderProps = {
  isEdit?: boolean;
};

const ExercisePlanBuilder = ({ isEdit = false }: ExercisePlanBuilderProps) => {
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<
    number | null
  >(null);
  const [comboBoxOpen, setComboBoxOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState(null);

  const form = useForm<ExercisePlanValues>({
    resolver: zodResolver(exercisePlanSchema),
    defaultValues: {
      exercises: isEdit ? validExercisePlan.exercises : [],
    },
  });

  const handleSelect = (item: any) => {
    form.setValue("exercises", [...form.getValues("exercises"), item]);
    console.log(form.getValues("exercises"));
    setComboBoxOpen(false);
  };

  const handleRemoveExercise = (index: any) => {
    const currentExercises = form.getValues("exercises");

    const updatedExercises = currentExercises.filter((_, i) => i !== index);
    // form.setValue("exercises", updatedExercises);
    form.reset({
      exercises: updatedExercises,
    });

    if (selectedExerciseIndex === index) {
      setSelectedExerciseIndex(null);
    } else if (
      selectedExerciseIndex !== null &&
      selectedExerciseIndex > index
    ) {
      setSelectedExerciseIndex(selectedExerciseIndex - 1);
    }
  };

  const handleDragStart = (e: React.DragEvent, draggedIndex: number) => {
    e.dataTransfer.setData("draggedIndex", String(draggedIndex));
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"));

    if (draggedIndex === targetIndex) return;

    const exercises = form.getValues("exercises");

    const [draggedItem] = exercises.splice(draggedIndex, 1);

    exercises.splice(targetIndex, 0, draggedItem);

    form.setValue("exercises", exercises);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onSubmit = (data: ExercisePlanValues) => {
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
    console.log(data);
  };

  return (
    <div className="border rounded-lg p-5 mt-5 max-w-4xl mx-auto w-full">
      <div className="text-2xl font-semibold leading-none tracking-tight mb-5">
        Workout Plan
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-60">
            <ExerciseSelector
              form={form}
              comboBoxOpen={comboBoxOpen}
              setComboBoxOpen={setComboBoxOpen}
              exercises={exercises}
              onSelect={handleSelect}
              placeholder="Search exercise"
              selectedExercises={selectedExercises}
            />
          </div>
          <div className="flex gap-5 flex-wrap">
            {form.watch("exercises").map((exercise, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, index)}
                className="cursor-move"
              >
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                  isSelected={selectedExerciseIndex === index}
                  onSelect={() =>
                    selectedExerciseIndex !== null
                      ? selectedExerciseIndex === index
                        ? setSelectedExerciseIndex(null)
                        : setSelectedExerciseIndex(index)
                      : setSelectedExerciseIndex(index)
                  }
                  form={form}
                  onRemove={handleRemoveExercise}
                />
              </div>
            ))}
          </div>
          {selectedExerciseIndex !== null && (
            <ExerciseForm
              key={selectedExerciseIndex}
              exercise={form.watch("exercises")[selectedExerciseIndex]}
              index={selectedExerciseIndex}
              form={form}
            />
          )}
          <div className="justify-end flex">
            <Button type="submit">{isEdit ? "Save Changes" : "Submit"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ExercisePlanBuilder;
