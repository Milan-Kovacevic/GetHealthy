import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { SquareArrowOutUpRight } from "lucide-react";

type WorkoutSummaryProps = {
  program: {
    name: string;
    categories: string[];
    difficulty: string;
    exercises: Array<{
      name: string;
      sets: Array<{ reps: number; weight: number; restTime: number }>;
    }>;
    estimatedTime: number;
  };
  onStart: (feedback: boolean) => void;
};

export default function WorkoutSummary({
  program,
  onStart,
}: WorkoutSummaryProps) {
  const [giveFeedback, setGiveFeedback] = useState(false);

  return (
    <div className="space-y-6 mt-4">
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <h2 className="text-2xl font-bold mb-2">{program.name}</h2>
          <Link to="/programs/1">
            <Button variant="ghost" size="sm" className="h-auto py-2">
              <SquareArrowOutUpRight />
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {program.categories.map((category, index) => (
            <Badge key={index} variant="secondary">
              {category}
            </Badge>
          ))}
          <Badge variant="outline">{program.difficulty}</Badge>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Exercises</h3>
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
                      <li key={setIndex} className="text-sm">
                        {set.reps} reps, {set.weight} lbs, {set.restTime}s rest
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <strong className="font-semibold">Estimated Workout Time:</strong>{" "}
        {program.estimatedTime} minutes
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
        Start Workout
      </Button>
    </div>
  );
}
