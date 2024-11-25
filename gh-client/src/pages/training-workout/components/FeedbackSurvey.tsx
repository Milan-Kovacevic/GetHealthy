import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type FeedbackSurveyProps = {
  onSubmit: () => void;
  disabled: boolean;
};

export default function FeedbackSurvey({
  onSubmit,
  disabled,
}: FeedbackSurveyProps) {
  const [completedReps, setCompletedReps] = useState<"all" | "some" | "none">(
    "all"
  );

  const handleSubmit = () => {
    // Here you can add logic to save the feedback if needed
    onSubmit();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Set Feedback</h2>
      <RadioGroup
        value={completedReps}
        onValueChange={(value) =>
          setCompletedReps(value as "all" | "some" | "none")
        }
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="all" />
          <Label htmlFor="all">Completed all repetitions</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="some" id="some" />
          <Label htmlFor="some">Completed some repetitions</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="none" />
          <Label htmlFor="none">Couldn't complete any repetitions</Label>
        </div>
      </RadioGroup>
      <Button
        variant="outline"
        onClick={handleSubmit}
        className="w-full"
        disabled={disabled}
      >
        Submit Feedback
      </Button>
    </div>
  );
}
