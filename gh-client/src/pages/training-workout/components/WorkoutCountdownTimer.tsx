import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import FeedbackSurvey from "./FeedbackSurvey";
import workoutAvatarRest from "@/assets/workout-avatar-rest.gif";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HomeIcon } from "lucide-react";
import {
  ExerciseSetFeedbackRequest,
  Set,
} from "@/api/models/trainee-exercising";
import { ExerciseMetric } from "@/api/models/exercise";
import { giveSetFeedback } from "@/api/services/trainee-exercising-service";

type WorkoutCountdownTimerProps = {
  showFeedback: boolean;
  onComplete: () => void;
  onSkip: () => void;
  onReturnToSummary: () => void;
  set: Set;
  firstMetric: ExerciseMetric;
  secondMetric?: ExerciseMetric;
};

export default function WorkoutCountdownTimer({
  set,
  firstMetric,
  secondMetric,
  showFeedback,
  onComplete,
  onSkip,
  onReturnToSummary,
}: WorkoutCountdownTimerProps) {
  const totalSeconds = set.restTime;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [feedback, setFeedback] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((seconds) => seconds - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);

      if (showFeedback && feedback) onComplete();
      if (!showFeedback) onComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  //TODOO
  const handleFeedbackSubmit = async (feedback: ExerciseSetFeedbackRequest) => {
    try {
      await giveSetFeedback(feedback);
      setFeedback(true);
      if (secondsLeft === 0) onComplete();
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-full w-[460px]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onReturnToSummary}
              aria-label="Return to summary"
              className="self-end"
            >
              <HomeIcon className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Go to program summary</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex gap-1 flex-wrap items-center justify-center mb-1.5">
        <img
          src={workoutAvatarRest}
          alt="workout avatar"
          className="w-20 h-20 self-center mx-2"
        />
        <div className="space-y-2 mt-1">
          <div className="text-center flex flex-col w-full">
            <span className="text-muted-foreground font-medium text-base leading-none">
              Rest time
            </span>
            <span className="text-4xl font-bold">
              {formatTime(secondsLeft)}
            </span>
          </div>
        </div>
      </div>
      <Progress
        value={(secondsLeft / totalSeconds) * 100}
        className="w-full [&>*]:bg-primary/50 mb-2"
      />
      {showFeedback && (
        <FeedbackSurvey
          firstMetric={firstMetric}
          secondMetric={secondMetric}
          disabled={feedback}
          onSubmit={(feedbackData: ExerciseSetFeedbackRequest) =>
            handleFeedbackSubmit(feedbackData)
          }
          targetFirstMatric={set.firstMetricValue}
          targetSecondMatric={set.secondMetricValue}
          //giveSetFeedback={giveSetFeedback}
        />
      )}
      <Button
        onClick={onSkip}
        variant="outline"
        className="w-full mt-2 self-end"
      >
        Skip Rest
      </Button>
    </div>
  );
}
