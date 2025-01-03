import InputFormField from "@/components/primitives/InputFormField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrashIcon } from "lucide-react";

type SetFormProps = {
  exerciseIndex: number;
  setIndex: number;
  form: any;
  exerciseType: string;
  onRemove: (index: number) => void;
};

const SetForm = ({
  exerciseIndex,
  setIndex,
  form,
  exerciseType,
  onRemove,
}: SetFormProps) => {
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

  const currentSet = form.watch(`exercises.${exerciseIndex}.sets.${setIndex}`);
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
            form.formState.errors.exercises?.[exerciseIndex]?.sets[setIndex] &&
              "border-destructive hover:border-destructive"
          )}
        >
          <div
            className={cn(
              "flex flex-row items-center flex-1",
              form.formState.errors.exercises?.[exerciseIndex]?.sets[
                setIndex
              ] && "border-destructive"
            )}
          >
            <span className="font-semibold text-foreground/80 text-sm ml-1">
              {setIndex + 1}. Set
            </span>

            <div className="flex md:items-center md:flex-row flex-col text-xs text-muted-foreground md:space-x-3 ml-6">
              {setAttributes.map((attribute, index) => (
                <>
                  <div className="flex flex-row gap-1">
                    <span>{attribute}:</span>
                    <span className="font-semibold text-foreground/80">
                      {currentSet[attribute] ?? "-"}
                    </span>
                  </div>
                  {index < setAttributes.length - 1 && (
                    <span className="md:block hidden">|</span>
                  )}
                </>
              ))}
            </div>
          </div>
          <div className="mr-3">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="hover:text-destructive"
              onClick={() => onRemove(setIndex)}
            >
              <TrashIcon />
            </Button>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-4 p-1">
            {(exerciseType === "bodyweight" || exerciseType === "weighted") && (
              <div className="flex flex-col flex-grow w-full sm:w-auto">
                <InputFormField
                  control={form.control}
                  name={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
                  type="text"
                  display="Repetitions"
                  placeholder="Enter a number ..."
                  onChange={handleIntegerOnValueChange}
                />
                {/* <FormField
              control={form.control}
              name={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reps</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : ""
                        )
                      }
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage className="text-xs ml-0.5" />
                </FormItem>
              )}
            /> */}
              </div>
            )}

            {exerciseType === "weighted" && (
              <div className="flex flex-col flex-grow w-full sm:w-auto">
                <InputFormField
                  control={form.control}
                  name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
                  type="text"
                  display="Weight (kg)"
                  placeholder="Enter a number ..."
                  onChange={handleDecimalOnValueChange}
                />
                {/* <FormField
              control={form.control}
              name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseFloat(e.target.value) : ""
                        )
                      }
                      value={field.value ?? ""}
                      step="0.1"
                    />
                  </FormControl>
                  <FormMessage className="text-xs ml-0.5" />
                </FormItem>
              )}
            /> */}
              </div>
            )}

            {exerciseType === "cardio" && (
              <>
                <div className="flex flex-col flex-grow w-full sm:w-auto">
                  <InputFormField
                    control={form.control}
                    name={`exercises.${exerciseIndex}.sets.${setIndex}.distance`}
                    type="text"
                    display="Distance (km)"
                    placeholder="Enter a number ..."
                    onChange={handleDecimalOnValueChange}
                  />
                  {/* <FormField
                control={form.control}
                name={`exercises.${exerciseIndex}.sets.${setIndex}.distance`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distance (km)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? parseFloat(e.target.value) : ""
                          )
                        }
                        value={field.value ?? ""}
                        step="0.1"
                      />
                    </FormControl>
                    <FormMessage className="text-xs ml-0.5" />
                  </FormItem>
                )}
              /> */}
                </div>
                <div className="flex flex-col flex-grow w-full sm:w-auto">
                  <InputFormField
                    control={form.control}
                    name={`exercises.${exerciseIndex}.sets.${setIndex}.time`}
                    type="text"
                    display="Time (minutes)"
                    placeholder="Enter a number ..."
                    onChange={handleIntegerOnValueChange}
                  />
                  {/* <FormField
                control={form.control}
                name={`exercises.${exerciseIndex}.sets.${setIndex}.time`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? parseInt(e.target.value) : ""
                          )
                        }
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage className="text-xs ml-0.5" />
                  </FormItem>
                )}
              /> */}
                </div>
              </>
            )}

            {exerciseType === "timed" && (
              <div className="flex flex-col flex-grow w-full sm:w-auto">
                <InputFormField
                  control={form.control}
                  name={`exercises.${exerciseIndex}.sets.${setIndex}.time`}
                  type="text"
                  display="Time (seconds)"
                  placeholder="Enter a number ..."
                  onChange={handleIntegerOnValueChange}
                />
                {/* <FormField
              control={form.control}
              name={`exercises.${exerciseIndex}.sets.${setIndex}.time`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time (seconds)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : ""
                        )
                      }
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage className="text-xs ml-0.5" />
                </FormItem>
              )}
            /> */}
              </div>
            )}

            <div className="flex flex-col flex-grow w-full sm:w-auto">
              <InputFormField
                control={form.control}
                name={`exercises.${exerciseIndex}.sets.${setIndex}.pause`}
                type="text"
                display="Pause (seconds)"
                placeholder="Enter a number ..."
                onChange={handleIntegerOnValueChange}
              />
              {/* <FormField
            control={form.control}
            name={`exercises.${exerciseIndex}.sets.${setIndex}.pause`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pause (seconds)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : ""
                      )
                    }
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage className="text-xs ml-0.5" />
              </FormItem>
            )}
          /> */}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SetForm;
