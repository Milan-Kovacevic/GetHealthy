import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import workoutAvatar from "@/assets/workout-avatar.gif";
import { ArrowLeft } from "lucide-react";

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
        <CardHeader className="pb-2 space-y-1">
          <p className="font-medium text-muted-foreground text-sm">
            Exercise no. {exerciseIndex + 1}
          </p>
          <CardTitle className="pt-0">{exercise.name}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onReturnToSummary}
            aria-label="Return to summary"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <p className="text-foreground/80 text-sm">
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
