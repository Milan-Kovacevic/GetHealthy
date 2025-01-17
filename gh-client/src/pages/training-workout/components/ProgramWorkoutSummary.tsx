import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  BicepsFlexedIcon,
  CheckCircle,
  HomeIcon,
  Loader2Icon,
  UserIcon,
  XCircle,
} from "lucide-react";
import { capitalize, cn } from "@/lib/utils";
import { ScheduleTrainingProgram } from "@/api/models/training-program-on-schedule";
import { addMinutesToTime } from "@/utils/date-time-utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useProgramWorkout from "../hooks/use-program-workout";
import LoadingActionButton from "./LoadingActionButton";

type ProgramWorkoutSummaryProps = {
  scheduleProgram: ScheduleTrainingProgram;
};

export default function ProgramWorkoutSummary(
  props: ProgramWorkoutSummaryProps
) {
  const { scheduleProgram } = props;

  const {
    workout,
    isWorkoutFinished,
    isWorkoutStarted,
    pendingWorkout,
    currentExerciseIndex,
    onStartWorkout,
    onFinishWorkout,
    onContinueWorkout,
    giveFeedback,
    setGiveFeedback,
  } = useProgramWorkout();

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
          <ul className="space-y-2 h-80">
            {workout.programExercises.map((exercise, index) => (
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
                    <ul className="list-disc list-inside space-y-0.5">
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
        <span className="font-semibold text-base">
          {scheduleProgram.trainingDuration}
        </span>{" "}
        min (
        <span className="text-xs font-semibold tracking-tight">
          {workout.dateTaken
            ? addMinutesToTime(
                workout.dateTaken,
                scheduleProgram.trainingDuration
              )
            : addMinutesToTime(new Date(), scheduleProgram.trainingDuration)}
        </span>
        )
      </p>
      {!isWorkoutStarted && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="feedback"
            checked={giveFeedback}
            onCheckedChange={setGiveFeedback}
          />
          <Label htmlFor="feedback" className="cursor-pointer">
            Give feedback during workout
          </Label>
        </div>
      )}
      <LoadingActionButton
        text={
          isWorkoutFinished
            ? "Finish"
            : isWorkoutStarted
            ? "Continue Workout"
            : "Start Workout"
        }
        type={{ variant: "secondary", size: "default" }}
        disabled={pendingWorkout}
        loading={pendingWorkout}
        className="w-full"
        onClick={() => {
          if (isWorkoutFinished) onFinishWorkout();
          else if (!isWorkoutStarted) onStartWorkout();
          else onContinueWorkout();
        }}
      />
    </div>
  );
}

export const GoToSummaryButton = ({
  onClick,
  className,
  tooltip,
}: {
  onClick: () => void;
  className?: string;
  tooltip?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClick}
            aria-label="Return to summary"
            className={cn("self-start", className)}
          >
            <HomeIcon className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip ?? "Go to workout summary"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
