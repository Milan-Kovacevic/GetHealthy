import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle } from "lucide-react";

type Set = {
  reps: number;
  weight: number;
  restTime: number;
  status: "pending" | "completed" | "skipped";
};

type Exercise = {
  name: string;
  sets: Set[];
};

type WorkoutSummaryProps = {
  program: {
    name: string;
    categories: string[];
    difficulty: string;
    exercises: Exercise[];
    estimatedTime: number;
    trainer: string;
  };
  onStart: (feedback: boolean) => void;
};

export default function WorkoutSummary({
  program,
  onStart,
}: WorkoutSummaryProps) {
  const [giveFeedback, setGiveFeedback] = useState(false);

  const isWorkoutStarted = program.exercises.some((exercise) =>
    exercise.sets.some((set) => set.status !== "pending")
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <h2 className="text-base text-muted-foreground mb-2">
            Trainer: {program.trainer}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {program.categories.map((category, index) => (
            <Badge key={index} variant="secondary">
              {category}
            </Badge>
          ))}
          <div className="text-sm flex items-center gap-2 w-full mb-0.5">
            <p>Level:</p>
            <p>{program.difficulty}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full text-sm">
          <p className="text-secondary-foreground">Estimated Workout Time:</p>
          <p>{program.estimatedTime} minutes</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Exercises</h3>
        <ScrollArea
          className={
            program.exercises.length > 2 ? "max-h-64 overflow-auto" : ""
          }
        >
          <ul className="space-y-4">
            {program.exercises.map((exercise, index) => (
              <li key={index}>
                <Card>
                  <CardTitle className="text-lg px-4 py-2">
                    {exercise.name}
                  </CardTitle>

                  <CardContent className="p-4 pt-0">
                    <ul className="list-disc list-inside space-y-1">
                      {exercise.sets.map((set, setIndex) => (
                        <li
                          key={setIndex}
                          className="text-sm flex items-center justify-between"
                        >
                          <span
                            className={
                              set.status === "completed" ? "line-through" : ""
                            }
                          >
                            {set.reps} reps, {set.weight} lbs, {set.restTime}s
                            rest
                          </span>
                          {set.status === "completed" && (
                            <CheckCircle
                              className="text-green-500"
                              size={16}
                              aria-label="Completed"
                            />
                          )}
                          {set.status === "skipped" && (
                            <XCircle
                              className="text-red-500"
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

      <div className="flex items-center space-x-2">
        <Checkbox
          id="feedback"
          checked={giveFeedback}
          onCheckedChange={(checked) => setGiveFeedback(checked as boolean)}
        />
        <Label htmlFor="feedback">Give feedback during workout</Label>
      </div>
      <Button
        variant="secondary"
        onClick={() => onStart(giveFeedback)}
        className="w-full"
      >
        {isWorkoutStarted ? "Continue Workout" : "Start Workout"}
      </Button>
    </div>
  );
}
