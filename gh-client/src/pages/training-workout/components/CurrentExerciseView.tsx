import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import workoutAvatar from "@/assets/workout-avatar.gif";

type CurrentExerciseViewProps = {
  exercise: {
    name: string;
    description: string;
    videoLink: string;
  };
  currentSet: number;
  totalSets: number;
};

export default function CurrentExerciseView({
  exercise,
  currentSet,
  totalSets,
}: CurrentExerciseViewProps) {
  return (
    <div className="flex flex-col -translate-y-2">
      <img
        src={workoutAvatar}
        alt="workout avatar"
        className="w-20 h-20 mx-2 translate-y-4"
      />
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{exercise.name}</CardTitle>
          <CardDescription>
            Set {currentSet} of {totalSets}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{exercise.description}</p>
          <div>
            <strong>Demonstration Video:</strong>{" "}
            <Button variant="link" className="px-1">
              <a
                href={exercise.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground"
              >
                Watch Video
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
