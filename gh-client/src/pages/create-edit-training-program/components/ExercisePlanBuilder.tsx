import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ExerciseCard from "./ExerciseCard";
import ExerciseForm from "./ExerciseForm";
import ExerciseSelector from "./ExerciseSelector";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    setSelectedExerciseIndex(targetIndex);
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
    <div className="mt-5  w-full">
      <div className="text-2xl font-semibold leading-none tracking-tight mb-5">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 border-2 border-black dark:border-white rounded-full"></span>
          <span> Workout Plan</span>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col sm:flex-row flex-1 space-y-4 sm:space-y-0">
              <div className="flex flex-col w-full sm:w-[330px] overflow-hidden  space-y-8 pr-0 sm:pr-4  sm:ml-4">
                <div className="w-full">
                  <ExerciseSelector
                    form={form}
                    comboBoxOpen={comboBoxOpen}
                    setComboBoxOpen={setComboBoxOpen}
                    exercises={exercises}
                    onSelect={handleSelect}
                    placeholder="Search exercise ..."
                    selectedExercises={selectedExercises}
                  />
                </div>
                <ScrollArea className="h-[50vh] pr-3 border-b-2 border-t-2 rounded-lg">
                  {form.watch("exercises").length === 0 ? (
                    <div className="flex justify-center items-center h-full w-full text-muted-foreground">
                      Exercises
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex flex-col gap-5 m-1">
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
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
              <div className="border-2 rounded-lg p-4 flex flex-col w-full  space-y-4 items-start lg:p-4">
                {selectedExerciseIndex !== null ? (
                  <>
                    <div className="flex justify-end w-full">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full hover:bg-destructive hover:text-destructive-foreground flex-shrink-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedExerciseIndex(null);
                              }}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove exercise</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remove exercise form</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <ExerciseForm
                      key={selectedExerciseIndex}
                      exercise={form.watch("exercises")[selectedExerciseIndex]}
                      index={selectedExerciseIndex}
                      form={form}
                    />
                  </>
                ) : (
                  <div className="flex justify-center items-center h-full w-full text-center text-muted-foreground">
                    <p>Select an exercise to view or edit details.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-8 ">
              <Button type="submit">
                {isEdit ? "Save changes" : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ExercisePlanBuilder;
