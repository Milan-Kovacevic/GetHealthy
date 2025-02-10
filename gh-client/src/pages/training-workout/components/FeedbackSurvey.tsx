import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Loader2Icon, MessageCircleQuestionIcon } from "lucide-react";
import { ExerciseMetric } from "@/api/models/exercise";
import {
  SendExerciseSetFeedbackRequest,
  WorkoutSet,
} from "@/api/models/trainee-exercising";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import InputFormField from "@/components/primitives/InputFormField";
import { Button } from "@/components/ui/button";
import { handleIntegerOnValueChange } from "@/utils/form-input-utils";

type FeedbackSurveyProps = {
  onSubmit: (feedback: SendExerciseSetFeedbackRequest) => void;
  disabled: boolean;
  pending: boolean;
  firstMetric: ExerciseMetric;
  secondMetric?: ExerciseMetric;
  completedSet: WorkoutSet;
};

export default function FeedbackSurvey({
  onSubmit,
  disabled,
  pending,
  firstMetric,
  secondMetric,
  completedSet,
}: FeedbackSurveyProps) {
  var formSchema = secondMetric
    ? z
        .object({
          completedAsPlanned: z.boolean().default(true),
          firstMetricValueFeedback: z
            .number({ invalid_type_error: "First feedback value is required" })
            .positive()
            .optional(),

          secondMetricValueFeedback: z
            .number({ invalid_type_error: "Second feedback value is required" })
            .positive()
            .optional(),
        })
        .refine(
          (value) =>
            !value.completedAsPlanned ||
            !!value.firstMetricValueFeedback ||
            !!value.secondMetricValueFeedback,
          {
            message: "Values are required",
            path: [
              "firstMetricValueFeedback",
              "secondMetricValueFeedback",
              "completedAsPlanned",
            ],
          }
        )
    : z
        .object({
          completedAsPlanned: z.boolean().default(true),
          firstMetricValueFeedback: z
            .number({ invalid_type_error: "First feedback value is required" })
            .positive()
            .optional(),
        })
        .refine(
          (value) =>
            !value.completedAsPlanned ||
            !!value.firstMetricValueFeedback || {
              message: "Values are required",
              path: ["firstMetricValueFeedback", "completedAsPlanned"],
            }
        );

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      completedAsPlanned: true,
      firstMetricValueFeedback: Number(completedSet.firstMetricValue),
      secondMetricValueFeedback: Number(completedSet.secondMetricValue),
    },
  });

  const onSubmitFeedback = (values: any) => {
    const feedback: SendExerciseSetFeedbackRequest = {
      exerciseSetId: 0,
      completed: values.completedAsPlanned,
      firstMetricValueFeedback: values.firstMetricValueFeedback?.toString(),
      secondMetricValueFeedback: values.secondMetricValueFeedback?.toString(),
    };

    onSubmit(feedback);
  };

  return (
    <div className="relative mt-2">
      <Card
        className={cn(
          "w-full mb-2 border-2 shadow-md border-border/90",
          !disabled && ""
        )}
      >
        <div className="px-4 py-3 pb-0 flex flex-row gap-1">
          {!disabled && <MessageCircleQuestionIcon className="h-5 w-5 mt-1" />}
          <CardTitle className="text-lg">
            {disabled ? "Resting..." : "Set Feedback"}
          </CardTitle>
        </div>

        <CardContent className="p-4">
          <div className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitFeedback)}
                className="flex flex-col space-y-4"
              >
                <FormField
                  control={form.control}
                  name="completedAsPlanned"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          disabled={disabled || pending}
                          onCheckedChange={(e) => {
                            field.onChange(e);
                            form.setValue(
                              "firstMetricValueFeedback",
                              Number(completedSet.firstMetricValue),
                              { shouldValidate: true }
                            );
                            if (secondMetric)
                              form.setValue(
                                "secondMetricValueFeedback",
                                Number(completedSet.secondMetricValue),
                                { shouldValidate: true }
                              );
                          }}
                          className={cn(field.value && "font-normal")}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal cursor-pointer">
                          I have completed {completedSet.firstMetricValue}{" "}
                          {firstMetric.unit}
                          {secondMetric &&
                            ` at ${completedSet.secondMetricValue} ${secondMetric.unit}`}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                {!form.watch("completedAsPlanned") && (
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                      <InputFormField
                        control={form.control}
                        disabled={disabled}
                        type="number"
                        onChange={(e, field) => {
                          handleIntegerOnValueChange(e, field);
                        }}
                        display={`Actual ${firstMetric.name} [${firstMetric.unit}]`}
                        name="firstMetricValueFeedback"
                        placeholder={completedSet.firstMetricValue}
                      />
                    </div>

                    <div className="col-span-6">
                      {secondMetric && (
                        <InputFormField
                          control={form.control}
                          disabled={disabled}
                          type="number"
                          onChange={(e, field) => {
                            handleIntegerOnValueChange(e, field);
                          }}
                          display={`Actual ${secondMetric.name} [${secondMetric.unit}]`}
                          name="secondMetricValueFeedback"
                          placeholder={completedSet.secondMetricValue}
                        />
                      )}
                    </div>
                  </div>
                )}
                <div className="self-end pt-0">
                  <Button
                    variant="outline"
                    disabled={disabled || pending}
                    type="submit"
                  >
                    {pending && (
                      <Loader2Icon className="text-muted-foreground animate-spin self-end" />
                    )}
                    Save Feedback
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
        {/* <CardFooter className="p-4 pt-2 justify-end w-full">
          <LoadingActionButton
            text="Save Feedback"
            type={{ variant: "outline", size: "default" }}
            disabled={disabled || pending}
            loading={pending}
            className="w-auto flex-none mt-2 self-end"
            onClick={() => handleSubmit()}
          />
        </CardFooter> */}
      </Card>
    </div>
  );
}
