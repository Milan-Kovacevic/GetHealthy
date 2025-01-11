import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ExerciseProgressChart from "./ExerciseProgressChart";
import TraineeExerciseSelector from "./TraineeExerciseSelector";

export default function TraineeExerciseProgress() {
  return (
    <div className={cn("w-full space-y-4 flex flex-col")}>
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b-0 p-0">
          <div className="flex lg:flex-row flex-col lg:justify-between lg:gap-4 border-b">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>Exercise progress</CardTitle>
              <CardDescription>
                Showing maximum values achieved for selected exercise over time
              </CardDescription>
            </div>

            <div className="flex sm:flex-row flex-1 flex-col sm:items-center lg:self-end mx-3.5 mb-3.5 gap-x-2 gap-y-1.5">
              <TraineeExerciseSelector
                exercises={[]}
                onExerciseSelected={(exercise) => {}}
                text="Select exercise"
                placeholder="There are no exercises to show"
                className="max-w-xs w-full ml-auto"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ExerciseProgressChart loading={false} chartData={[]} />
        </CardContent>
      </Card>
    </div>
  );
}
