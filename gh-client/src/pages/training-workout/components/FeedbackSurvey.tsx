import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FileQuestionIcon, MessageCircleQuestionIcon } from "lucide-react";

type FeedbackSurveyProps = {
  onSubmit: () => void;
  disabled: boolean;
  targetReps: number;
  targetWeight: number;
};

export default function FeedbackSurvey({
  onSubmit,
  disabled,
  targetReps,
  targetWeight,
}: FeedbackSurveyProps) {
  const [completedAsPlanned, setCompletedAsPlanned] = useState(true);
  const [actualReps, setActualReps] = useState<number | undefined>(undefined);
  const [actualWeight, setActualWeight] = useState<number | undefined>(
    undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    // Here you can add logic to save the feedback if needed
    e.preventDefault();
    onSubmit();
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
                  I have completed {targetReps} reps at {targetWeight} lbs
                </Label>
              </div>
              {!completedAsPlanned && (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="actualReps">Actual Reps</Label>
                      <Input
                        disabled={disabled}
                        id="actualReps"
                        type="number"
                        placeholder={targetReps.toString()}
                        value={actualReps ?? ""}
                        onChange={(e) =>
                          setActualReps(
                            e.target.value
                              ? parseInt(e.target.value, 10)
                              : undefined
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="actualWeight">Actual Weight (lbs)</Label>
                      <Input
                        disabled={disabled}
                        id="actualWeight"
                        type="number"
                        placeholder={targetWeight.toString()}
                        value={actualWeight ?? ""}
                        onChange={(e) =>
                          setActualWeight(
                            e.target.value
                              ? parseInt(e.target.value, 10)
                              : undefined
                          )
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
