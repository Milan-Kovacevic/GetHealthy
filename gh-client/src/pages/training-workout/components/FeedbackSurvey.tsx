import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2Icon, MessageCircleQuestionIcon } from "lucide-react";
import { ExerciseMetric } from "@/api/models/exercise";
import {
  SendExerciseSetFeedbackRequest,
  WorkoutSet,
} from "@/api/models/trainee-exercising";
import LoadingActionButton from "./LoadingActionButton";

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
}: //giveSetFeedback,
FeedbackSurveyProps) {
  const [completedAsPlanned, setCompletedAsPlanned] = useState(true);
  const [actualFirstMetricValue, setActualFirstMetricValue] =
    useState<string>("");
  //number(string)
  const [actualSecondMetricValue, setActualSecondMetricValue] = useState<
    string | undefined
  >(undefined);

  const handleSubmit = async () => {
    //TODOO
    const feedback: SendExerciseSetFeedbackRequest = {
      exerciseSetId: 0,
      completed: completedAsPlanned,
      firstMetricValueFeedback: completedAsPlanned
        ? completedSet.firstMetricValue
        : actualFirstMetricValue,
      secondMetricValueFeedback: completedAsPlanned
        ? completedSet.secondMetricValue
        : actualSecondMetricValue,
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
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  disabled={disabled}
                  id="completed"
                  checked={completedAsPlanned}
                  className={cn(completedAsPlanned && "font-normal")}
                  onCheckedChange={(checked) =>
                    setCompletedAsPlanned(checked as boolean)
                  }
                />
                <Label
                  htmlFor="completed"
                  className={cn(
                    "cursor-pointer font-normal",
                    disabled && "text-muted-foreground"
                  )}
                >
                  I have completed {completedSet.firstMetricValue}{" "}
                  {firstMetric.unit} at {completedSet.secondMetricValue}{" "}
                  {secondMetric?.unit}
                </Label>
              </div>
              {!completedAsPlanned && (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="actualFirstMetric">
                        Actual {firstMetric.name} ({secondMetric?.unit})
                      </Label>
                      <Input
                        disabled={disabled}
                        id="actualFirstMetric"
                        type="number"
                        placeholder={completedSet.firstMetricValue.toString()}
                        value={actualFirstMetricValue ?? ""}
                        onChange={(e) =>
                          setActualFirstMetricValue(e.target.value)
                        }
                      />
                    </div>
                    {completedSet.secondMetricValue && (
                      <div className="space-y-2">
                        <Label htmlFor="actualSecondMetric">
                          Actual {secondMetric?.name} ({secondMetric?.unit})
                        </Label>
                        <Input
                          disabled={disabled}
                          id="actualSecondMetric"
                          type="number"
                          placeholder={completedSet.secondMetricValue?.toString()}
                          value={actualSecondMetricValue ?? ""}
                          onChange={(e) =>
                            setActualSecondMetricValue(e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="p-4 pt-2 justify-end w-full">
          <LoadingActionButton
            text="Save Feedback"
            type={{ variant: "outline", size: "default" }}
            disabled={disabled || pending}
            loading={pending}
            className="w-auto flex-none mt-2 self-end"
            onClick={() => handleSubmit()}
          />

          {/* <Button
            variant="outline"
            disabled={disabled || pending}
            type="submit"
            onClick={handleSubmit}
          >
            {pending && (
              <Loader2Icon className="text-muted-foreground animate-spin" />
            )}
            Save Feedback
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
