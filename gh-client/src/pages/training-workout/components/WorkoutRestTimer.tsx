import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import FeedbackSurvey from "./FeedbackSurvey";
import workoutAvatarRest from "@/assets/workout-avatar-rest.gif";
import { GoToSummaryButton } from "./ProgramWorkoutSummary";
import { cn } from "@/lib/utils";
import useProgramWorkout from "../hooks/use-program-workout";
import { Loader2Icon } from "lucide-react";

type WorkoutRestTimerProps = {};

export default function WorkoutRestTimer(props: WorkoutRestTimerProps) {
  const {
    workout,
    pendingWorkout,
    giveFeedback,
    currentExerciseIndex,
    currentSetIndex,
    feedbackSubmitted,
    onRestSkipped,
    onRestFinished,
    onReturnToSummary,
    onFeedbackSubmit,
  } = useProgramWorkout();

  const exercise = workout.programExercises[currentExerciseIndex];
  const completedSet = exercise.exerciseSetsFeedback[currentSetIndex];
  const totalSeconds = completedSet.restTime;

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((seconds) => seconds - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);

      if (giveFeedback && feedbackSubmitted) onRestFinished();
      if (!giveFeedback) onRestFinished();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-full relative">
      <img
        src={workoutAvatarRest}
        alt="workout avatar"
        className={cn(
          "w-14 h-14 self-center mx-2 absolute z-10 right-2 -translate-y-5",
          giveFeedback
            ? "right-2 -translate-y-5"
            : "right-2 top-12 translate-y-1.5"
        )}
      />
      {giveFeedback && (
        <FeedbackSurvey
          firstMetric={exercise.firstExerciseMetric}
          secondMetric={exercise.secondExerciseMetric}
          disabled={feedbackSubmitted}
          pending={pendingWorkout}
          onSubmit={onFeedbackSubmit}
          completedSet={completedSet}
        />
      )}
      <div className="w-full flex flex-row items-center gap-2">
        <Progress
          value={(secondsLeft / totalSeconds) * 100}
          className="w-full [&>*]:bg-primary/70  dark:[&>*]:bg-primary/50"
        />
        <GoToSummaryButton
          onClick={onReturnToSummary}
          className="self-end rounded-full h-auto py-2 px-2 mr-1"
        />
      </div>

      <div className="flex gap-1 flex-wrap items-center justify-center mb-1.5">
        <div className="space-y-2 mt-1">
          <div className="text-center flex flex-col w-full">
            <span className="text-muted-foreground font-medium text-sm leading-none">
              Rest time
            </span>
            <span className="text-3xl font-bold">
              {formatTime(secondsLeft)}
            </span>
          </div>
        </div>
      </div>

      <Button
        disabled={pendingWorkout}
        onClick={onRestSkipped}
        variant="outline"
        className="w-full mt-2 self-end"
      >
        {pendingWorkout && (
          <Loader2Icon className="text-muted-foreground animate-spin" />
        )}
        Skip Rest
      </Button>
    </div>
  );
}
