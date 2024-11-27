import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  CircleIcon,
  HashIcon,
  HomeIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
  XIcon,
} from "lucide-react";
import React from "react";

type ExerciseSummaryProps = {
  exercise: {
    name: string;
    description: string;
    videoLink: string;
    sets: Array<{ reps: number; weight: number; restTime: number }>;
  };
  exerciseIndex: number;
  onStart: () => void;
  onSkip: () => void;
  onReturnToSummary: () => void;
};

export default function ExerciseSummary({
  exercise,
  exerciseIndex,
  onStart,
  onSkip,
  onReturnToSummary,
}: ExerciseSummaryProps) {
  return (
    <div className="flex flex-col max-w-lg">
      <div className="mt-2 flex items-center justify-between flex-wrap">
        <div className="">
          <p className="font-medium text-muted-foreground text-sm">
            Get ready for ...
          </p>
          {/* <p className="text-foreground/75 font-bold"></p> */}
          <div className="flex flex-row items-end gap-0.5 pb-2">
            <span className="text-2xl font-semibold">{exerciseIndex + 1}.</span>
            <h3 className="text-2xl font-semibold">{exercise.name}</h3>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onReturnToSummary}
                aria-label="Return to summary"
                className="self-start"
              >
                <HomeIcon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go to program summary</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-4 mt-2">
        <div className="space-y-0.5">
          <SectionTitle title="Set details" />

          {exercise.sets.map((set, index) => (
            <p className="text-sm text-foreground/80 ml-3">
              <span className="font-medium">{index + 1}. Set</span> - {set.reps}{" "}
              reps, {set.weight} kg, {set.restTime}s rest
            </p>
          ))}
        </div>

        <div className="space-y-0.5 flex-1">
          <SectionTitle title="Description" />
          <p className="text-sm text-foreground/80 text-pretty">
            {exercise.description}
          </p>
        </div>

        {/* <div className="flex flex-col gap-1.5">
          <SectionTitle title="Demonstration" />

          <iframe
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
            className="h-[200px] sm:h-[280px] rounded-lg"
          ></iframe>
        </div> */}
      </div>

      <Separator className="mb-4 mt-8" />
      <div className="flex flex-wrap justify-between gap-3">
        <Button className="flex-1" variant="outline" onClick={onSkip}>
          <XIcon />
          Skip exercise
        </Button>
        <Button className="flex-1" variant="secondary" onClick={onStart}>
          <PlayIcon />
          Begin exercise
        </Button>
      </div>
    </div>
  );
}

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-row items-center gap-1.5">
      <CircleIcon className="h-1.5 w-1.5" />
      <p className="text-base font-semibold text-foreground/80">{title}</p>
    </div>
  );
};
