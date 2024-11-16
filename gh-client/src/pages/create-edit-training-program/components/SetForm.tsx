import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type SetFormProps = {
  exerciseIndex: number;
  setIndex: number;
  form: any;
  exerciseType: string;
};

const SetForm = ({
  exerciseIndex,
  setIndex,
  form,
  exerciseType,
}: SetFormProps) => {
  return (
    <div className="space-y-4 mb-4 p-4 border rounded-lg">
      <h4 className="font-medium">Set {setIndex + 1}</h4>
      <div className="flex flex-wrap gap-4">
        {(exerciseType === "bodyweight" || exerciseType === "weighted") && (
          <div className="flex flex-col flex-grow w-full sm:w-auto">
            <FormField
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {exerciseType === "weighted" && (
          <div className="flex flex-col flex-grow w-full sm:w-auto">
            <FormField
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {exerciseType === "cardio" && (
          <>
            <div className="flex flex-col flex-grow w-full sm:w-auto">
              <FormField
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col flex-grow w-full sm:w-auto">
              <FormField
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        {exerciseType === "timed" && (
          <div className="flex flex-col flex-grow w-full sm:w-auto">
            <FormField
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="flex flex-col flex-grow w-full sm:w-auto">
          <FormField
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SetForm;
