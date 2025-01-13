import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MessageCircleQuestionIcon } from "lucide-react";
import { ExerciseMetric } from "@/api/models/exercise";
import { ExerciseSetFeedbackRequest } from "@/api/models/trainee-exercising";
import { giveSetFeedback } from "@/api/services/trainee-exercising-service";

type FeedbackSurveyProps = {
  onSubmit: (feedback: ExerciseSetFeedbackRequest) => void;
  disabled: boolean;
  targetFirstMatric: string;
  targetSecondMatric?: string;
  firstMetric: ExerciseMetric;
  secondMetric?: ExerciseMetric;
  //giveSetFeedback: (feedback: ExerciseSetFeedbackRequest) => Promise<void>;
};

export default function FeedbackSurvey({
  onSubmit,
  disabled,
  targetFirstMatric,
  targetSecondMatric,
  firstMetric,
  secondMetric,
}: //giveSetFeedback,
FeedbackSurveyProps) {
  const [completedAsPlanned, setCompletedAsPlanned] = useState(true);
  const [actualFirstMetricValue, setActualFirstMetricValue] =
    useState<string>("");
  //number(string)
  const [actualSecondMetricValue, setActualSecondMetricValue] = useState<
    string | undefined
  >(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //TODOO
    const feedback: ExerciseSetFeedbackRequest = {
      exerciseFeedbackId: 0,
      skipped: false,
      completed: completedAsPlanned,
      firstMetricValueFeedback: completedAsPlanned
        ? targetFirstMatric
        : actualFirstMetricValue,
      secondMetricValueFeedback: completedAsPlanned
        ? targetSecondMatric
        : actualSecondMetricValue,
    };

    try {
      await giveSetFeedback(feedback);
      onSubmit(feedback);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
  };

  return (
    <div className="relative mt-2">
      <Card
        className={cn(
          "w-full mb-2 border-2 shadow-sm",
          !disabled && "border-primary"
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
                  onCheckedChange={(checked) =>
                    setCompletedAsPlanned(checked as boolean)
                  }
                />
                <Label htmlFor="completed">
                  I have completed {targetFirstMatric} {firstMetric.unit} at{" "}
                  {targetSecondMatric} {secondMetric?.unit}
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
                        placeholder={targetFirstMatric.toString()}
                        value={actualFirstMetricValue ?? ""}
                        onChange={(e) =>
                          setActualFirstMetricValue(e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="actualSecondMetric">
                        Actual {secondMetric?.name} ({secondMetric?.unit})
                      </Label>
                      <Input
                        disabled={disabled}
                        id="actualSecondMetric"
                        type="number"
                        placeholder={targetSecondMatric?.toString()}
                        value={actualSecondMetricValue ?? ""}
                        onChange={(e) =>
                          setActualSecondMetricValue(e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="p-4 pt-2">
          <Button
            variant="outline"
            disabled={disabled}
            type="submit"
            onClick={handleSubmit}
          >
            Save Feedback
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
