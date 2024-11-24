import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import FeedbackSurvey from "./FeedbackSurvey";
import workoutAvatarRest from "@/assets/workout-avatar-rest.gif";
import { Slider } from "@/components/ui/slider";

type WorkoutCountdownTimerProps = {
  duration: number;
  showFeedback: boolean;
  onComplete: () => void;
  onSkip: () => void;
};

export default function WorkoutCountdownTimer({
  duration,
  showFeedback,
  onComplete,
  onSkip,
}: WorkoutCountdownTimerProps) {
  const [totalSeconds, setTotalSeconds] = useState(duration);
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

  //   useEffect(() => {
  //     if (timeLeft > 0) {
  //       const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  //       return () => clearTimeout(timerId);
  //     } else if (feedback) {
  //       onComplete();
  //     }
  //   }, [timeLeft, onComplete]);

  const handleFeedbackSubmit = () => {
    // do something with the feedback
    if (secondsLeft > 0) {
      setFeedback(true);
    } else {
      onComplete();
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
    <div className="flex flex-col h-full">
      <img
        src={workoutAvatarRest}
        alt="workout avatar"
        className="w-20 h-20 self-center mt-2 mx-2 translate-y-3"
      />
      <div className="py-4 space-y-2 mb-4 mt-1">
        <div className="text-center flex flex-col w-full">
          <span className="text-muted-foreground font-medium text-base leading-none">
            Rest time
          </span>
          <span className="text-4xl font-bold">{formatTime(secondsLeft)}</span>
        </div>
        <Progress
          value={(secondsLeft / totalSeconds) * 100}
          className="w-full [&>*]:bg-primary/50"
        />
      </div>
      {showFeedback && (
        <FeedbackSurvey disabled={feedback} onSubmit={handleFeedbackSubmit} />
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
