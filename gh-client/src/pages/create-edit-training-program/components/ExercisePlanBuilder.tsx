import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckIcon, CircleOffIcon, HashIcon, X } from "lucide-react";
import ExerciseCard from "./ExerciseCard";
import ExerciseForm from "./ExerciseForm";
import ExerciseFormFieldSelector from "./ExerciseFormFieldSelector";
import FormSectionTitle from "./FormSectionTitle";
import useExercisePlanBuilder from "../hooks/use-exercise-builder";
import { ExercisePlanItem } from "@/api/models/exercise";
import {
  resolveExerciseFormErrorObject,
  resolveExerciseFormPrefixPath,
} from "@/schemas/training-program-schema";

type ExercisePlanBuilderProps = {
  isEdit: boolean;
  form: any;
};

const ExercisePlanBuilder = ({ isEdit, form }: ExercisePlanBuilderProps) => {
  const exercisesPath = resolveExerciseFormPrefixPath(isEdit);
  const {
    onExerciseDragDrop,
    onExerciseDragOver,
    onExerciseDragStart,
    onRemoveExercise,
    onSelectExercise,
    selectedExerciseIndex,
    onChangeSelectedExerciseIndex,
  } = useExercisePlanBuilder({ form, exercisesPath });

  var formExercises: ExercisePlanItem[] = form.watch(exercisesPath);
  var exerciseErrors = resolveExerciseFormErrorObject(form, isEdit);
  console.log(exerciseErrors);

  return (
    <div className="mt-8 w-full">
      <div className="mb-4">
        <FormSectionTitle title="Exercise plan" />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col lg:flex-row flex-1 sm:space-y-6 space-y-3 lg:space-y-0 gap-2">
          <div className="flex flex-col w-full lg:max-w-[340px] overflow-hidden space-y-4">
            <div className="w-full lg:max-w-xs lg:pr-0 pr-5">
              <ExerciseFormFieldSelector
                form={form}
                errors={exerciseErrors}
                exercisesPath={exercisesPath}
                onSelect={onSelectExercise}
              />
            </div>
            <ScrollArea className="flex-1">
              {formExercises.length === 0 ? (
                <div className="pr-5 h-full">
                  <div className="flex flex-col justify-center text-center bg-muted/10 items-center lg:h-[53vh] py-10 w-full border-2 border-dashed rounded-lg px-5 mr-4">
                    <CircleOffIcon
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
                </div>
              ) : (
                <div className="flex flex-col p-1 gap-2 pr-5 lg:h-[53vh] lg:max-h-[53vh] max-h-[300px] md:max-h-[500px]">
                  {formExercises.map((exercise, index) => (
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
                        errors={exerciseErrors}
                        onRemove={onRemoveExercise}
                      />
                    </div>
                  ))}
                </div>
              )}

              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
          <div className="border-2 rounded-lg p-4 flex flex-col w-full space-y-4 items-start lg:p-4 bg-background">
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
                    exercisesPath={exercisesPath}
                    exercise={form.watch(exercisesPath)[selectedExerciseIndex]}
                    index={selectedExerciseIndex}
                    errors={exerciseErrors}
                    form={form}
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center min-h-[400px] h-full w-full">
                <p className="italic text-center text-muted-foreground text-sm">
                  Select an exercise to view or edit details.
                </p>
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
