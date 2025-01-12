import NumberInputField from "@/components/primitives/NumberInputField";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ClipboardListIcon } from "lucide-react";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import ExerciseSetForm from "./ExerciseSetForm";
import { ExercisePlanItem } from "@/api/models/exercise";

type ExerciseFormProps = {
  exercise: ExercisePlanItem;
  index: number;
  form: any;
  formPath?: string;
};

const ExerciseForm = ({
  exercise,
  index,
  form,
  formPath = "",
}: ExerciseFormProps) => {
  const exercisesPath = formPath ? `${formPath}.exercises` : "exercises";
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `${exercisesPath}.${index}.sets`,
  });
  const [numOfSets, setNumOfSets] = useState(fields.length);
  const onExerciseSetRemoved = (setIndex: number) => {
    const updatedSets = fields.filter((_, i) => i !== setIndex);

    remove(setIndex);

    form.reset({
      ...form.getValues(),
      [`${exercisesPath}.${index}.sets`]: updatedSets,
    });

    setNumOfSets((prev) => prev - 1);
  };

  return (
    <div className="w-full pt-0 h-[49vh] flex-1 flex flex-col">
      <div>
        <FormField
          control={form.control}
          name={`${exercisesPath}.${index}.sets`}
          render={({ field: { onChange } }) => (
            <FormItem className="space-y-[2px] mb-5">
              <FormLabel>Number of sets</FormLabel>
              <FormControl>
                <NumberInputField
                  min={0}
                  max={20}
                  value={numOfSets}
                  setValue={setNumOfSets}
                  onChange={(newVal) => {
                    const newSetCount = newVal || 0;
                    if (newSetCount > fields.length) {
                      for (let i = fields.length; i < newSetCount; i++) {
                        append({});
                      }
                    } else if (newSetCount < fields.length) {
                      for (let i = fields.length; i > newSetCount; i--) {
                        remove(i - 1);
                      }
                    }
                  }}
                />
              </FormControl>

              <FormDescription className="text-xs ml-0.5">
                Enter the number of sets for this exercise.
              </FormDescription>
              {form.formState.errors?.[exercisesPath]?.[index]?.sets && (
                <p className="text-xs ml-0.5 font-medium text-destructive ">
                  {form.formState.errors?.[exercisesPath]?.[index].sets.message}
                </p>
              )}
            </FormItem>
          )}
        />
        {fields.length > 0 ? (
          <div className="flex flex-row items-center gap-1 mb-2">
            <ClipboardListIcon className="text-foreground/75 w-[18px] h-[18px]" />
            <p className="font-semibold text-lg">Sets:</p>
          </div>
        ) : (
          ""
        )}
      </div>

      <ScrollArea className="w-full flex-1">
        <div className="mr-3 flex flex-col gap-0 max-w-screen-md">
          {fields.map((field, setIndex) => (
            <ExerciseSetForm
              key={field.id}
              exerciseIndex={index}
              setIndex={setIndex}
              form={form}
              formPath={formPath}
              onRemove={onExerciseSetRemoved}
              firstMetricValue={exercise.firstExerciseMetric}
              secondMetricValue={exercise.secondExerciseMetric}
            />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

export default ExerciseForm;
