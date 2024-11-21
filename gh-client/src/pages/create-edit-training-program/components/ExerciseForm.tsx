import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray } from "react-hook-form";
import SetForm from "./SetForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";

type ExerciseFormProps = {
  exercise: any;
  index: number;
  form: any;
};

const ExerciseForm = ({ exercise, index, form }: ExerciseFormProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `exercises.${index}.sets`,
  });

  return (
    <div className="w-full p-3 pt-0">
      {/** mt-8 border rounded-lg*/}
      <h3 className="text-lg font-semibold mb-4">{exercise?.name} </h3>
      <FormField
        control={form.control}
        name={`exercises.${index}.sets`}
        render={() => (
          <FormItem className="space-y-[2px] mb-5">
            <FormLabel>Number of sets</FormLabel>
            <FormControl>
              <Input
                type="number"
                value={fields.length}
                onChange={(e) => {
                  const newSetCount = parseInt(e.target.value) || 0;
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
            <FormDescription>
              Enter the number of sets for this exercise.
            </FormDescription>
            {form.formState.errors.exercises?.[index]?.sets && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.exercises[index].sets.message}
              </p>
            )}
          </FormItem>
        )}
      />

      <ScrollArea className="h-[32vh] w-full ">
        <div className="mr-3 ">
          {fields.length > 0 ? <h4 className="font-medium mb-2">Sets:</h4> : ""}
          {fields.map((field, setIndex) => (
            <SetForm
              key={field.id}
              exerciseIndex={index}
              setIndex={setIndex}
              form={form}
              exerciseType={exercise?.type}
            />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

export default ExerciseForm;
