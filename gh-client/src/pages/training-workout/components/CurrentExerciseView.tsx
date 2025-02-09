import { Button } from "@/components/ui/button";
import workoutAvatar from "@/assets/workout-avatar.gif";
import { ArrowUpIcon, CircleIcon, SkipForwardIcon } from "lucide-react";
import { GoToSummaryButton } from "./ProgramWorkoutSummary";
import useProgramWorkout from "../hooks/use-program-workout";
import LoadingActionButton from "./LoadingActionButton";

type CurrentExerciseViewProps = {};

export default function CurrentExerciseView(props: CurrentExerciseViewProps) {
  const {
    workout,
    currentExerciseIndex,
    currentSetIndex,
    pendingWorkout,
    onSetSkipped,
    onSetCompleted,
    onReturnToSummary,
  } = useProgramWorkout();

  const exercise = workout.programExercises[currentExerciseIndex];
  const exerciseIndex = currentExerciseIndex;
  const setIndex = currentSetIndex;

  return (
    <div className="flex flex-col max-w-lg relative w-full">
      <img
        src={workoutAvatar}
        alt="workout avatar"
        className="w-14 h-14 mx-2 absolute -top-16 -translate-y-0.5 right-10"
      />

      <div className="p-0 space-y-1">
        <div className="flex items-center justify-between flex-wrap">
          <div>
            <p className="font-medium text-muted-foreground text-[13px] leading-none">
              Exercise no. {exerciseIndex + 1}
            </p>
            <h2 className="pt-0 text-xl font-medium tracking-tight">
              {exercise.name}
            </h2>
          </div>

          <GoToSummaryButton onClick={onReturnToSummary} />
        </div>
        <p className="text-foreground/80 text-sm">
          Set{" "}
          <span className="font-semibold text-foreground">{setIndex + 1}</span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">
            {exercise.exerciseSetsFeedback.length}
          </span>
          <span className="ml-2 text-foreground/70 font-medium">
            ({exercise.exerciseSetsFeedback[setIndex].firstMetricValue}{" "}
            {exercise.firstExerciseMetric.unit}
            {exercise.secondExerciseMetric && (
              <>
                , {exercise.exerciseSetsFeedback[setIndex].secondMetricValue}{" "}
                {exercise.secondExerciseMetric.unit}
              </>
            )}
            , {exercise.exerciseSetsFeedback[setIndex].restTime}s rest )
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-1.5 mt-3">
        <iframe
          src={exercise.videoLink}
          className="aspect-video sm:h-[260px] rounded-xl border-2"
        ></iframe>
        <div className="ml-0.5 space-y-0.5">
          <div className="flex flex-row items-center gap-1.5">
            <CircleIcon className="h-1.5 w-1.5" />
            <p className="text-sm font-medium text-foreground">Description</p>
          </div>
          <p className="ml-2.5 text-muted-foreground sm:text-sm text-[13px] leading-tight text-pretty">
            {exercise.description}
          </p>
        </div>
      </div>

      <div className="flex w-full gap-4 mt-6">
        <LoadingActionButton
          icon={<SkipForwardIcon />}
          text="Skip set"
          type={{ variant: "outline", size: "default" }}
          disabled={pendingWorkout}
          loading={pendingWorkout}
          className="flex-1 [&_svg]:hover:scale-110"
          onClick={onSetSkipped}
        />

        <LoadingActionButton
          icon={<ArrowUpIcon className="duration-300" />}
          text="Complete set"
          type={{ variant: "secondary", size: "default" }}
          disabled={pendingWorkout}
          loading={pendingWorkout}
          className="flex-1 [&_svg]:hover:rotate-90"
          onClick={onSetCompleted}
        />
      </div>
    </div>
  );
}
