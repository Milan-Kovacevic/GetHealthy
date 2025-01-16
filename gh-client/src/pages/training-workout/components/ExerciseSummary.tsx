import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CircleIcon, PlayIcon, XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { GoToSummaryButton } from "./ProgramWorkoutSummary";
import useProgramWorkout from "../hooks/use-program-workout";

type ExerciseSummaryProps = {};

export default function ExerciseSummary(props: ExerciseSummaryProps) {
  const {
    workout,
    currentExerciseIndex,
    currentSetIndex,
    pendingWorkout,
    onSkipExercise,
    onBeginExercise,
    onResumeExercise,
    onReturnToSummary,
  } = useProgramWorkout();

  const exercise = workout.programExercises[currentExerciseIndex];
  const exerciseIndex = currentExerciseIndex;
  const setIndex = currentSetIndex;

  return (
    <div className="flex flex-col max-w-lg">
      <div className="flex items-center justify-between flex-wrap">
        <div className="">
          <p className="font-medium text-muted-foreground text-sm">
            Get ready for ...
          </p>
          {/* <p className="text-foreground/75 font-bold"></p> */}
          <div className="flex flex-row items-end gap-0.5 pb-2">
            <span className="text-xl font-medium">{exerciseIndex + 1}.</span>
            <h3 className="text-xl font-medium tracking-tight">
              {exercise.name}
            </h3>
          </div>
        </div>
        <GoToSummaryButton onClick={onReturnToSummary} />
      </div>

      <div className="space-y-4 mt-2">
        <Card className="space-y-0.5">
          <CardContent className="p-3 px-4">
            <SectionTitle title="Set details" />
            <div className="mt-1.5">
              {exercise.exerciseSetsFeedback.map((set, index) => (
                <p key={index} className="text-sm text-foreground/80 ml-3">
                  <span
                    className={cn(
                      (set.completed || set.skipped) && "line-through"
                    )}
                  >
                    {index + 1}. Set -{" "}
                  </span>
                  <span
                    className={cn(
                      set.completed && "line-through",
                      setIndex == index && "font-semibold"
                    )}
                  >
                    {set.firstMetricValue} {exercise.firstExerciseMetric.unit}
                    {exercise.secondExerciseMetric && (
                      <>
                        , {set.secondMetricValue}{" "}
                        {exercise.secondExerciseMetric.unit}
                      </>
                    )}
                    , {set.restTime}s rest
                  </span>
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="py-1.5 text-sm text-foreground/80">
              Show details?
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 flex-1 mt-1">
                <SectionTitle title="Description" />
                <p className="text-sm text-pretty text-foreground/80">
                  {exercise.description}
                </p>
              </div>

              <div className="flex flex-col gap-1 mt-3">
                <SectionTitle title="Demo video" />
                {/* <iframe
                  src="https://www.youtube.com/embed/tgbNymZ7vqY"
                  className="h-[200px] sm:h-[280px] rounded-lg"
                ></iframe> */}
                <Button
                  className="text-foreground/80 text-xs h-auto px-0 py-0 hover:text-foreground transition-all sm:w-full w-60 justify-start"
                  variant="link"
                >
                  <Link
                    target="_blank"
                    className="w-auto text-start"
                    to={exercise.videoLink}
                  >
                    {exercise.videoLink}
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* <Separator className="mb-4 mt-8" /> */}
      <div className="flex flex-wrap justify-between gap-3 mt-6">
        <Button
          disabled={pendingWorkout}
          className="flex-1 [&_svg]:hover:scale-110"
          variant="outline"
          onClick={onSkipExercise}
        >
          <XIcon />
          Skip exercise
        </Button>
        {!exercise.exerciseFeedbackId ? (
          <Button
            disabled={pendingWorkout}
            className="flex-1 [&_svg]:hover:scale-110"
            variant="secondary"
            onClick={onBeginExercise}
          >
            <PlayIcon />
            Begin exercise
          </Button>
        ) : (
          <Button
            disabled={pendingWorkout}
            className="flex-1 [&_svg]:hover:scale-110"
            variant="secondary"
            onClick={onResumeExercise}
          >
            <PlayIcon />
            Resume exercise
          </Button>
        )}
      </div>
    </div>
  );
}

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-row items-center gap-1.5">
      <CircleIcon className="h-1.5 w-1.5" />
      <p className="text-sm font-medium text-foreground">{title}</p>
    </div>
  );
};
