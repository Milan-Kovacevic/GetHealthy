import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import workoutAvatar from "@/assets/workout-avatar.gif";
import { HomeIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CurrentExerciseViewProps = {
  exercise: {
    name: string;
    description: string;
    videoLink: string;
  };
  exerciseIndex: number;
  currentSet: number;
  totalSets: number;
  onReturnToSummary: () => void;
};

export default function CurrentExerciseView({
  exercise,
  exerciseIndex,
  currentSet,
  totalSets,
  onReturnToSummary,
}: CurrentExerciseViewProps) {
  return (
    <div className="flex flex-col -translate-y-4 max-w-lg">
      <img
        src={workoutAvatar}
        alt="workout avatar"
        className="w-20 h-20 mx-2 translate-y-4"
      />
      <Card className="">
        <CardHeader className="pb-2 space-y-2">
          <div className="flex items-center justify-between flex-wrap">
            <div>
              <p className="font-medium text-muted-foreground text-sm">
                Exercise no. {exerciseIndex + 1}
              </p>
              <CardTitle className="pt-0">{exercise.name}</CardTitle>
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

          <p className="text-foreground/80 text-base">
            Set{" "}
            <span className="font-semibold text-foreground">{currentSet}</span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{totalSets}</span>
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            {exercise.description}
          </p>
          <div className="flex flex-col gap-1.5">
            <iframe
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
              className="h-[200px] sm:h-[220px] rounded-lg"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
