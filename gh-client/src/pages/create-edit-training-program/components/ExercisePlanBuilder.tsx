import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, DumbbellIcon, HashIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
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
import FormSectionTitle from "./FormSectionTitle";
import { getAllExcercises } from "@/api/services/exercise-service";
import { sendExercises } from "@/api/services/training-program-exercise-service";

// mock data for ed
const validExercisePlan: ExercisePlanValues = {
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
  programId: number;
};

const ExercisePlanBuilder = ({ isEdit = false }: ExercisePlanBuilderProps) => {
  const [exercises, setExercises] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExercises() {
      setExercises(
        (await getAllExcercises()).map((item) => ({
          label: item.exerciseName,
          value: item.id,
        }))
      );
    }
    fetchExercises();
  }, []);

  useEffect(() => {
    console.log(exercises);
  }, [exercises]);

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
    setComboBoxOpen(false);
    setSelectedExerciseIndex(form.getValues("exercises").length - 1);
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

  async function onSubmit(data: ExercisePlanValues) {
    // fix with data from form
    await sendExercises([
      {
        exerciseId: 1,
        position: 1,
        programId: 1,
        exerciseSets: [
          {
            restTime: 30,
            firstMetricValue: "string",
            secondMetricValue: "string",
          },
        ],
      },
    ]);

    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
    console.log(data);
    console.log(form.getValues("exercises"));
  }

  return (
    <div className="mt-8 w-full">
      <div className="mb-5">
        <FormSectionTitle title="Exercise plan" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col lg:flex-row flex-1 space-y-4 lg:space-y-0 gap-6">
              <div className="flex flex-col w-full lg:min-w-[340px] lg:max-w-[340px] md:min-w-[400px] md:max-w-[400px] overflow-hidden space-y-4">
                <div className="w-full pr-3 pl-1">
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
                <ScrollArea className="">
                  {form.watch("exercises").length === 0 ? (
                    <div className="flex flex-col mt-2 justify-center text-center bg-muted/40 items-center lg:h-[50vh] w-full border-2 border-dashed rounded-lg px-5">
                      <DumbbellIcon
                        strokeWidth={1.5}
                        className="text-foreground/70 h-8 w-8 mb-1"
                      />
                      <p className="text-foreground/80 mb-2">
                        No exercise selected
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        You can drag-n-drop exercises in the list to change the
                        workout order
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 m-1 pr-2 lg:h-[50vh]">
                      {form
                        .watch("exercises")
                        .map((exercise: any, index: number) => (
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
                  )}

                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
              <div className="border-2 rounded-lg p-4 flex flex-col w-full space-y-4 items-start lg:p-4">
                {selectedExerciseIndex !== null ? (
                  <div className="p-1 w-full h-full flex flex-col">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <p className="font-medium text-foreground/80 text-sm">
                          Exercise no. {selectedExerciseIndex + 1}
                        </p>
                        <div className="flex flex-row items-center gap-0.5 pb-2">
                          <HashIcon className="h-4 w-4 text-foreground/75 mt-0.5" />
                          <h3 className="text-xl font-semibold">
                            {
                              form.watch("exercises")[selectedExerciseIndex]
                                ?.name
                            }
                          </h3>
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="self-start">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 flex-shrink-0"
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
                            <p>Close</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="m-1 mt-3 flex-1 flex">
                      <ExerciseForm
                        key={selectedExerciseIndex}
                        exercise={
                          form.watch("exercises")[selectedExerciseIndex]
                        }
                        index={selectedExerciseIndex}
                        form={form}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full w-full text-center text-muted-foreground">
                    <p>Select an exercise to view or edit details.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="min-w-32">
                <CheckIcon />
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
