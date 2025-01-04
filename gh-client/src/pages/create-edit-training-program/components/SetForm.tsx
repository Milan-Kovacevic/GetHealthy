import InputFormField from "@/components/primitives/InputFormField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { TrashIcon } from "lucide-react";

type SetFormProps = {
  exerciseIndex: number;
  setIndex: number;
  form: any;
  formPath?: string;
  exerciseType: string;
  onRemove: (index: number) => void;
  metrics: any[];
};

const SetForm = ({
  exerciseIndex,
  setIndex,
  form,
  formPath = "",
  exerciseType,
  onRemove,
  metrics,
}: SetFormProps) => {
  const exercisesPath = formPath ? `${formPath}.exercises` : "exercises";

  const handleIntegerOnValueChange = (e: any, field: any) => {
    if (!e.target.value) field.onChange(undefined);
    else if (isNaN(parseInt(e.target.value))) field.onChange(e.target.value);
    else field.onChange(parseInt(e.target.value));
  };

  const handleDecimalOnValueChange = (e: any, field: any) => {
    if (!e.target.value) field.onChange(undefined);
    else if (e.target.value.endsWith(".")) field.onChange(e.target.value);
    else if (isNaN(parseFloat(e.target.value))) field.onChange(e.target.value);
    else field.onChange(parseFloat(e.target.value));
  };

  const currentSet = form.watch(
    `${exercisesPath}.${exerciseIndex}.sets.${setIndex}`
  );

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
            form.formState.errors?.[exercisesPath]?.[exerciseIndex]?.sets[
              setIndex
            ] && "border-destructive hover:border-destructive"
          )}
        >
          <div
            className={cn(
              "flex flex-row items-center flex-1",
              form.formState.errors?.[exercisesPath]?.[exerciseIndex]?.sets[
                setIndex
              ] && "border-destructive"
            )}
          >
            <span className="font-semibold text-foreground/80 text-sm ml-1">
              {setIndex + 1}. Set
            </span>

            <div className="flex md:items-center md:flex-row flex-col text-xs text-muted-foreground md:space-x-3 ml-6">
              {/* {setAttributes.map((attribute, index) => (
                <div key={index}>
                  <div className="flex flex-row gap-1">
                    <span>{attribute}:</span>
                    <span className="font-semibold text-foreground/80">
                      {currentSet[attribute] ?? "-"}
                    </span>
                  </div>
                  {index < setAttributes.length - 1 && (
                    <span className="md:block hidden">|</span>
                  )}
                </div>
              ))} */}
              {setAttributes.map((attribute, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex flex-row gap-1">
                    <span>{attribute}:</span>
                    <span className="font-semibold text-foreground/80">
                      {currentSet[attribute] ?? "-"}
                    </span>
                  </div>
                  {index < setAttributes.length - 1 && (
                    <span className="md:block hidden mx-2">|</span>
                  )}
                </div>
              ))}
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
            {(exerciseType === "bodyweight" || exerciseType === "weighted") && (
              <div className="flex flex-col flex-grow w-full sm:w-auto">
                <InputFormField
                  control={form.control}
                  name={`${exercisesPath}.${exerciseIndex}.sets.${setIndex}.reps`}
                  type="text"
                  display="Repetitions"
                  placeholder="Enter a number ..."
                  onChange={handleIntegerOnValueChange}
                />
              </div>
            )}

            {exerciseType === "weighted" && (
              <div className="flex flex-col flex-grow w-full sm:w-auto">
                <InputFormField
                  control={form.control}
                  name={`${exercisesPath}.${exerciseIndex}.sets.${setIndex}.weight`}
                  type="text"
                  display="Weight (kg)"
                  placeholder="Enter a number ..."
                  onChange={handleDecimalOnValueChange}
                />
              </div>
            )}

            {exerciseType === "cardio" && (
              <>
                <div className="flex flex-col flex-grow w-full sm:w-auto">
                  <InputFormField
                    control={form.control}
                    name={`${exercisesPath}.${exerciseIndex}.sets.${setIndex}.distance`}
                    type="text"
                    display="Distance (km)"
                    placeholder="Enter a number ..."
                    onChange={handleDecimalOnValueChange}
                  />
                </div>
                <div className="flex flex-col flex-grow w-full sm:w-auto">
                  <InputFormField
                    control={form.control}
                    name={`${exercisesPath}.${exerciseIndex}.sets.${setIndex}.time`}
                    type="text"
                    display="Time (minutes)"
                    placeholder="Enter a number ..."
                    onChange={handleIntegerOnValueChange}
                  />
                </div>
              </>
            )}

            {exerciseType === "timed" && (
              <div className="flex flex-col flex-grow w-full sm:w-auto">
                <InputFormField
                  control={form.control}
                  name={`${exercisesPath}.${exerciseIndex}.sets.${setIndex}.time`}
                  type="text"
                  display="Time (seconds)"
                  placeholder="Enter a number ..."
                  onChange={handleIntegerOnValueChange}
                />
              </div>
            )}

            {metrics.map((metric, index) => {
              if (metric === "Repetitions") {
                return (
                  <div
                    key={index}
                    className="flex flex-col flex-grow w-full sm:w-auto"
                  >
                    <InputFormField
                      control={form.control}
                      name={`${exercisesPath}.${exerciseIndex}.sets.${setIndex}.reps`}
                      type="text"
                      display="Repetitions"
                      placeholder="Enter number of reps"
                      onChange={handleIntegerOnValueChange}
                    />
                  </div>
                );
              } else if (metric === "Time") {
                return (
                  <div className="flex flex-col flex-grow w-full sm:w-auto">
                    <InputFormField
                      control={form.control}
                      name={`${exercisesPath}.${exerciseIndex}.sets.${setIndex}.time`}
                      type="text"
                      display="Time (minutes)"
                      placeholder="Enter a number ..."
                      onChange={handleIntegerOnValueChange}
                    />
                  </div>
                );
              }
            })}

            <div className="flex flex-col flex-grow w-full sm:w-auto">
              <InputFormField
                control={form.control}
                name={`${exercisesPath}.${exerciseIndex}.sets.${setIndex}.pause`}
                type="text"
                display="Pause (seconds)"
                placeholder="Enter a number ..."
                onChange={handleIntegerOnValueChange}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SetForm;
