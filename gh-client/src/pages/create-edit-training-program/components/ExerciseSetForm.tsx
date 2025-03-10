import { ExerciseMetric } from "@/api/models/exercise";
import InputFormField from "@/components/primitives/InputFormField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { handleIntegerOnValueChange } from "@/utils/form-input-utils";
import { TrashIcon } from "lucide-react";
import { useEffect } from "react";

type ExerciseSetFormProps = {
  exerciseIndex: number;
  setIndex: number;
  form: any;
  errors?: any;
  exercisesPath: string;
  onRemove: (index: number) => void;
  firstMetricValue: ExerciseMetric;
  secondMetricValue?: ExerciseMetric;
};

const ExerciseSetForm = ({
  exerciseIndex,
  setIndex,
  form,
  exercisesPath,
  errors,
  onRemove,
  firstMetricValue,
  secondMetricValue,
}: ExerciseSetFormProps) => {
  const currentSet = form.watch(
    `${exercisesPath}.${exerciseIndex}.sets.${setIndex}`
  );
  const exercise = form.watch(`${exercisesPath}.${exerciseIndex}`);

  const setAttributes = Object.keys(currentSet);

  return (
    <Accordion type="single" collapsible className="w-full mx-1 mt-1">
      <AccordionItem
        value={`item-${exerciseIndex}`}
        className="border-b-0"
        defaultValue={1}
      >
        <AccordionTrigger
          className={cn(
            "flex flex-row items-center mb-2 border p-2 rounded-md px-3 bg-muted/20 border-foreground/30 hover:border-foreground/55 hover:no-underline hover:bg-muted/50 transition-colors",
            errors?.[exerciseIndex]?.sets[setIndex] &&
              "border-destructive hover:border-destructive"
          )}
        >
          <div
            className={cn(
              "flex flex-row items-center flex-1",
              errors?.[exerciseIndex]?.sets[setIndex] && "border-destructive"
            )}
          >
            <span className="font-semibold text-foreground/80 text-sm ml-1">
              {setIndex + 1}. Set
            </span>

            <div className="flex md:items-center md:flex-row flex-col text-xs text-muted-foreground md:space-x-3 ml-6">
              {setAttributes
                .filter((attribute) => {
                  if (
                    attribute === "restTime" ||
                    attribute === "firstMetricValue" ||
                    attribute === "secondMetricValue"
                  ) {
                    const value =
                      attribute === "firstMetricValue"
                        ? currentSet.firstMetricValue
                        : attribute === "secondMetricValue"
                        ? currentSet.secondMetricValue
                        : currentSet[attribute];

                    return (
                      value !== null && value !== undefined && value !== ""
                    );
                  }
                  return false;
                })
                .map((attribute, index, filteredAttributes) => {
                  const value =
                    attribute === "firstMetricValue"
                      ? currentSet.firstMetricValue
                      : attribute === "secondMetricValue"
                      ? currentSet.secondMetricValue
                      : currentSet[attribute];

                  const metricName =
                    attribute === "firstMetricValue"
                      ? exercise.firstExerciseMetric?.name
                      : attribute === "secondMetricValue"
                      ? exercise.secondExerciseMetric?.name
                      : attribute === "restTime"
                      ? "Rest time"
                      : attribute;

                  return (
                    <div key={index} className="flex items-center">
                      <div className="flex flex-row gap-1">
                        <span>{metricName}:</span>
                        <span className="font-semibold text-foreground/80">
                          {value ?? "-"}
                        </span>
                      </div>
                      {index < filteredAttributes.length - 1 && (
                        <span className="md:block hidden mx-2">|</span>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="mr-3">
            {/** Avoid error validateDOMNesting(...)*/}
            <div
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 px-3 hover:bg-accent hover:text-destructive"
              onClick={() => onRemove(setIndex)}
            >
              <TrashIcon />
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-4 p-1">
            <div className="flex flex-col flex-grow w-full sm:w-auto">
              <InputFormField
                control={form.control}
                name={`${exercisesPath}.${exerciseIndex}.sets.${setIndex}.firstMetricValue`}
                type="text"
                display={`${firstMetricValue.name} (${firstMetricValue.unit})`}
                placeholder={`Enter a value for ${firstMetricValue.name.toLowerCase()}...`}
                onChange={handleIntegerOnValueChange}
              />
            </div>
            {secondMetricValue && (
              <div className="flex flex-col flex-grow w-full sm:w-auto">
                <InputFormField
                  control={form.control}
                  name={`${exercisesPath}.${exerciseIndex}.sets.${setIndex}.secondMetricValue`}
                  type="text"
                  display={`${secondMetricValue.name} (${secondMetricValue.unit})`}
                  placeholder={`Enter a value for ${secondMetricValue.name.toLowerCase()}...`}
                  onChange={handleIntegerOnValueChange}
                />
              </div>
            )}

            <div className="flex flex-col flex-grow w-full sm:w-auto">
              <InputFormField
                control={form.control}
                name={`${exercisesPath}.${exerciseIndex}.sets.${setIndex}.restTime`}
                type="text"
                display="Rest time (seconds)"
                placeholder="Enter a number..."
                onChange={handleIntegerOnValueChange}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ExerciseSetForm;
