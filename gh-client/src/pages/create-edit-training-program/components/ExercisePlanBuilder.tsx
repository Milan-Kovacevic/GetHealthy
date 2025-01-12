import { getAllExcercises } from "@/api/services/exercise-service";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckIcon, DumbbellIcon, HashIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import ExerciseForm from "./ExerciseForm";
import ExerciseFormFieldSelector from "./ExerciseFormFieldSelector";
import FormSectionTitle from "./FormSectionTitle";
import { useFieldArray } from "react-hook-form";
import useExercisePlanBuilder from "../hooks/use-exercise-builder";

type ExercisePlanBuilderProps = {
  isEdit?: boolean;
  form: any;
  formPath?: string;
};

const ExercisePlanBuilder = ({
  isEdit = false,
  form,
  formPath = "",
}: ExercisePlanBuilderProps) => {
  const [exercises, setExercises] = useState<any[]>([]);
  const exercisesPath = formPath ? `${formPath}.exercises` : "exercises";
  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: `${exercisesPath}`,
  // });

  useEffect(() => {
    async function fetchExercises() {
      setExercises(
        (await getAllExcercises()).map((item) => ({
          label: item.exerciseName,
          id: item.id,
          firstExerciseMetric: item.firstExerciseMetric,
          secondExerciseMetric: item.secondExerciseMetric,
        }))
      );
    }
    fetchExercises();
  }, []);

  useEffect(() => {
    console.log(exercises);
  }, [exercises]);

  const {
    onExerciseDragDrop,
    onExerciseDragOver,
    onExerciseDragStart,
    onRemoveExercise,
    onSelectExercise,
    selectedExerciseIndex,
    onChangeSelectedExerciseIndex,
  } = useExercisePlanBuilder({ form, exercisesPath });

  // const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<
  //   number | null
  // >(null);

  // const handleSelectExercise = (item: any) => {
  //   console.log("Item", item);
  //   form.setValue(exercisesPath, [...form.getValues(exercisesPath), item]);
  //   setSelectedExerciseIndex(form.getValues(exercisesPath).length - 1);
  // };

  // const handleRemoveExercise = (index: number) => {
  //   const currentExercises = form.getValues(exercisesPath);
  //   const updatedExercises = currentExercises.filter(
  //     (_: any, i: any) => i !== index
  //   );

  //   const unregisterSets = (index: number) =>
  //     form.unregister(`${exercisesPath}.${index}.sets`);

  //   unregisterSets(index);
  //   remove(index);
  //   unregisterSets(fields.length - 1);

  //   form.setValue(exercisesPath, updatedExercises);

  //   if (selectedExerciseIndex === index) {
  //     setSelectedExerciseIndex(null);
  //   } else if (
  //     selectedExerciseIndex !== null &&
  //     selectedExerciseIndex > index
  //   ) {
  //     setSelectedExerciseIndex(selectedExerciseIndex - 1);
  //   }

  //   console.log(form.getValues(exercisesPath));
  // };

  // const handleDragStart = (e: React.DragEvent, draggedIndex: number) => {
  //   e.dataTransfer.setData("draggedIndex", String(draggedIndex));
  // };

  // const handleDrop = (e: React.DragEvent, targetIndex: number) => {
  //   const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"));

  //   if (draggedIndex === targetIndex) return;

  //   const exercises = form.getValues(exercisesPath);

  //   const [draggedItem] = exercises.splice(draggedIndex, 1);

  //   exercises.splice(targetIndex, 0, draggedItem);

  //   form.setValue(exercisesPath, exercises);
  //   setSelectedExerciseIndex(targetIndex);
  // };

  // const handleDragOver = (e: React.DragEvent) => {
  //   e.preventDefault();
  // };

  return (
    <div className="mt-8 w-full">
      <div className="mb-4">
        <FormSectionTitle title="Exercise plan" />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col lg:flex-row flex-1 space-y-4 lg:space-y-0 gap-6">
          <div className="flex flex-col w-full lg:min-w-[340px] lg:max-w-[340px] md:min-w-[400px] md:max-w-[400px] overflow-hidden space-y-4">
            <div className="w-full max-w-xs">
              <ExerciseFormFieldSelector
                form={form}
                formPath={formPath}
                exercises={exercises}
                onSelect={onSelectExercise}
                placeholder="Search exercise ..."
              />
            </div>
            <ScrollArea className="">
              {form.watch(exercisesPath).length === 0 ? (
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
                    .watch(exercisesPath)
                    .map((exercise: any, index: number) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => onExerciseDragStart(e, index)}
                        onDragOver={(e) => onExerciseDragOver(e)}
                        onDrop={(e) => onExerciseDragDrop(e, index)}
                        className="cursor-move"
                      >
                        <ExerciseCard
                          key={exercise.id}
                          exercise={exercise}
                          index={index}
                          isSelected={selectedExerciseIndex === index}
                          onSelect={() => onChangeSelectedExerciseIndex(index)}
                          form={form}
                          onRemove={onRemoveExercise}
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
                        {form.watch(exercisesPath)[selectedExerciseIndex]?.name}
                      </h3>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="self-start" asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            onChangeSelectedExerciseIndex(null);
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
                    formPath={formPath}
                    exercise={form.watch(exercisesPath)[selectedExerciseIndex]}
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
        {isEdit ? (
          <div className="flex justify-end">
            <Button type="submit" variant="secondary" className="min-w-32">
              <CheckIcon />
              {isEdit ? "Save changes" : "Submit"}
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ExercisePlanBuilder;
