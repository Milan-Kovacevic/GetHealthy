import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle } from "lucide-react";
import { TraineeExercising } from "@/api/models/trainee-exercising";

type WorkoutSummaryProps = {
  workout: TraineeExercising;
  // onStart: (feedback: boolean) => void;
  currentExerciseIndex: number;
  onFinish: () => void;
  onStart: () => void;
  onContinue: () => void;
  giveFeedback: boolean;
  onFeedbackChecked: (value: boolean) => void;
};

export default function WorkoutSummary({
  workout,
  onStart,
  currentExerciseIndex,
  onFinish,
  onContinue,
  giveFeedback,
  onFeedbackChecked,
}: WorkoutSummaryProps) {
  const isWorkoutStarted = workout.exercises.some((exercise) =>
    exercise.exerciseSets.some((set) => set.status !== "pending")
  );

  const isWorkoutFinished = workout.exercises.every((exercise) =>
    exercise.exerciseSets.every((set) => set.status !== "pending")
  );

  return (
    <div className="space-y-4 flex flex-col w-[440px]">
      <div className="space-y-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <h2 className="text-base text-muted-foreground mb-2">
              Trainer: {workout.trainerName}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {workout.programCategories.map((category, index) => (
              <Badge key={index} variant="secondary">
                {category.name}
              </Badge>
            ))}
            <div className="text-sm flex items-center gap-1.5 w-full mb-0.5 mx-0.5">
              <p className="text-foreground/80">Level:</p>
              <p className="font-medium">{workout.programDifficulty}</p>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 pt-2">Exercises</h3>
        <ScrollArea className="">
          <ul className="space-y-3 max-h-80">
            {workout.exercises.map((exercise, index) => (
              <li key={index}>
                <Card
                  className={
                    index === currentExerciseIndex &&
                    isWorkoutStarted &&
                    !isWorkoutFinished
                      ? " border-black"
                      : ""
                  }
                >
                  <CardTitle className="text-lg px-4 py-2">
                    {index + 1}. {exercise.name}
                  </CardTitle>

                  <CardContent className="p-4 pt-0">
                    <ul className="list-disc list-inside space-y-1">
                      {exercise.exerciseSets.map((set, setIndex) => (
                        <li
                          key={setIndex}
                          className="text-sm flex items-center justify-between"
                        >
                          <span
                            className={
                              set.status === "completed" ? "line-through" : ""
                            }
                          >
                            {set.firstMetricValue}{" "}
                            {exercise.firstExerciseMetric.unit}
                            {exercise.secondExerciseMetric && (
                              <>
                                , {set.secondMetricValue}{" "}
                                {exercise.secondExerciseMetric.unit}
                              </>
                            )}
                            , {set.restTime}s rest
                          </span>
                          {set.status === "completed" && (
                            <CheckCircle
                              className="text-primary/85"
                              size={16}
                              aria-label="Completed"
                            />
                          )}
                          {set.status === "skipped" && (
                            <XCircle
                              className="text-destructive"
                              size={16}
                              aria-label="Skipped"
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>

      {!isWorkoutFinished && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="feedback"
            checked={giveFeedback}
            onCheckedChange={onFeedbackChecked}
          />
          <Label htmlFor="feedback">Give feedback during workout</Label>
        </div>
      )}
      <Button
        variant="secondary"
        onClick={() => {
          if (isWorkoutFinished) onFinish();
          else if (!isWorkoutStarted) onStart();
          else onContinue();
        }}
        className="w-full"
      >
        {isWorkoutFinished
          ? "Finish"
          : isWorkoutStarted
          ? "Continue Workout"
          : "Start Workout"}
      </Button>
    </div>
  );
}
