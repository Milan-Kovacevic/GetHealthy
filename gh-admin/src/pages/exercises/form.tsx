import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2Icon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSelect } from "@refinedev/core";

const ExerciseFormSchema = z
  .object({
    exerciseName: z
      .string({ required_error: "Name is required." })
      .min(1, "Name is required.")
      .max(96),
    description: z
      .string({ required_error: "Description is required." })
      .min(1, "Description is required.")
      .max(256),
    videoLink: z
      .string({ required_error: "Demonstration link is required." })
      .min(1, "Demonstration link is required.")
      .max(256),
    firstExerciseMetricId: z
      .number({
        required_error: "First metric is required.",
      })
      .min(1, "First metric is required."),
    secondExerciseMetricId: z.number().optional(),
  })
  .refine(
    (data) => !data.secondExerciseMetricId || data.firstExerciseMetricId !== data.secondExerciseMetricId,
    {
      message: "Metric types must be different.",
      path: ["secondExerciseMetricId"],
    }
  );

export function ManageExerciseForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { options: metricOptions } = useSelect<IMetricResponse>({
    resource: "metrics",
    optionLabel(item) {
      return `${item.name} | ${item.unit}`;
    },
  });

  const form = useForm<IExerciseResponse>({
    mode: "onChange",
    resolver: zodResolver(ExerciseFormSchema),
    defaultValues: {
      exerciseName: "",
      description: "",
      videoLink: "",
      firstExerciseMetricId: undefined,
      secondExerciseMetricId: undefined,
    },
  });
  const { onFinish, formLoading, query } = form.refineCore;
  const exerciseData = query?.data?.data;

  useEffect(() => {
    if (!exerciseData) return;

    form.setValue(
      "firstExerciseMetricId",
      exerciseData.firstExerciseMetric.id,
      { shouldValidate: true }
    );
    if (exerciseData.secondExerciseMetric) {
      form.setValue(
        "secondExerciseMetricId",
        exerciseData.secondExerciseMetric.id,
        { shouldValidate: true }
      );
    }
  }, [exerciseData, metricOptions]);

  return (
    <div
      className={cn("flex flex-col gap-6 p-1 max-w-2xl", className)}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-6">
          <div className="flex flex-col gap-y-3">
            <FormField
              control={form.control}
              name="exerciseName"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Exercise name *</FormLabel>
                    <FormControl>
                      <Input placeholder="ex. Plank" type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-0.5">
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="..."
                      className="resize-none min-h-36"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Write a brief description about exercise
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8">
                <FormField
                  control={form.control}
                  name="videoLink"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      <FormLabel>Demonstration video *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex. youtube embed"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter a url of a demonstration video
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="firstExerciseMetricId"
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-0.5">
                        <FormLabel>First metric *</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          } // Convert string to number
                          value={field.value?.toString()} // Convert number to string for the Select component
                          defaultValue={field.value?.toString()} // Ensure proper defaultValue
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Not set ..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {metricOptions.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value.toString()}
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select a first exercise metric
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="secondExerciseMetricId"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      <FormLabel>Second metric</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))} // Convert string to number
                        value={field.value?.toString()} // Convert number to string for the Select component
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Not set ..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {metricOptions.map((item) => (
                            <SelectItem
                              key={item.value}
                              value={item.value.toString()}
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select second (optional) exercise metric{" "}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Button
            disabled={formLoading}
            type="submit"
            className="min-w-32 self-end"
          >
            {formLoading && (
              <Loader2Icon className="text-primary-foreground animate-spin" />
            )}
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
