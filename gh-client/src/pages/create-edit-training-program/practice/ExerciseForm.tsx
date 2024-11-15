import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray } from "react-hook-form";

type ExerciseFormProps = {
  exercise: any;
  index: number;
  form: any;
};

const ExerciseForm = ({ exercise, index, form }: ExerciseFormProps) => {
  //   const { fields, append, remove } = useFieldArray({
  //     control: form.control,
  //     name: `exercise.${index}.sets`,
  //   });

  return (
    <div className="mt-8 p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">{exercise.name} Details</h3>
      <FormField
        control={form.control}
        name={`exercises.${index}.sets`}
        render={() => (
          <FormItem>
            <FormLabel>Number of sets</FormLabel>
            <FormControl></FormControl>
            <FormDescription>
              Enter the number of sets for this exercise.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ExerciseForm;
