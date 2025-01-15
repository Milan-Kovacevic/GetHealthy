import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BicepsFlexedIcon, CheckCircle, UserIcon, XCircle } from "lucide-react";
import { WorkoutSummary } from "@/api/models/trainee-exercising";
import { capitalize } from "@/lib/utils";
import { ScheduleTrainingProgram } from "@/api/models/training-program-on-schedule";

type ProgramWorkoutSummaryProps = {
  workoutSummary: WorkoutSummary;
  scheduleProgram: ScheduleTrainingProgram;
  trainingDuration: number;
  isWorkoutStarted: boolean;
  currentExerciseIndex: number;
  onFinish: () => void;
  onStart: () => void;
  onContinue: () => void;
  giveFeedback: boolean;
  onFeedbackChecked: (value: boolean) => void;
};

export default function ProgramWorkoutSummary(
  props: ProgramWorkoutSummaryProps
) {
  const {
    workoutSummary,
    scheduleProgram,
    isWorkoutStarted,
    trainingDuration,
    onStart,
    currentExerciseIndex,
    onFinish,
    onContinue,
    giveFeedback,
    onFeedbackChecked,
  } = props;

  // const isWorkoutFinished = workout.exercises.every((exercise) =>
  //   exercise.exerciseSets.every((set) => set.status !== "pending")
  // );

  // TODO
  const isWorkoutFinished = false;

  return (
    <div className="space-y-3 flex flex-col">
      <div className="space-y-1.5">
        <div>
          <div className="flex flex-row w-full gap-3 items-center mb-1.5">
            <div className="flex items-center text-sm gap-1">
              <UserIcon className="text-muted-foreground fill-secondary h-4 w-4 mt-0.5" />
              <p className="text-foreground/80 text-base font-medium tracking-tight">
                {scheduleProgram.trainerFirstName}{" "}
                {scheduleProgram.trainerLastName}
              </p>
            </div>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-1.5">
              <BicepsFlexedIcon className="text-foreground/75 fill-secondary h-4 w-4 mt-0.5" />
              <p className="font-normal">
                {capitalize(scheduleProgram.difficulty)}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {scheduleProgram.categories.map((category) => (
              <Badge
                key={category.categoryId}
                variant="secondary"
                className="font-normal"
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
        <h3 className="text-xl font-medium">Exercises</h3>
        <ScrollArea className="">
          <ul className="space-y-3 h-80">
            {workoutSummary.programExercises.map((exercise, index) => (
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
                    {index + 1}. {exercise.exerciseName}
                  </CardTitle>

                  <CardContent className="p-4 pt-0">
                    <ul className="list-disc list-inside space-y-1">
                      {exercise.exerciseSetsFeedback.map((set, setIndex) => (
                        <li
                          key={setIndex}
                          className="text-sm flex items-center justify-between"
                        >
                          <span className={set.completed ? "line-through" : ""}>
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
                          {set.completed && (
                            <CheckCircle
                              className="text-primary/85"
                              size={16}
                              aria-label="Completed"
                            />
                          )}
                          {set.skipped && (
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
      <p className="font-normal text-sm pb-1">
        Estimated workout time:{" "}
        <span className="font-semibold text-base">{trainingDuration}</span> min
      </p>
      {!isWorkoutFinished && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="feedback"
            checked={giveFeedback}
            onCheckedChange={onFeedbackChecked}
          />
          <Label htmlFor="feedback" className="cursor-pointer">
            Give feedback during workout
          </Label>
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
