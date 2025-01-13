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
import { DateRange } from "react-day-picker";
import { TraineeProgressData } from "@/api/models/analytics";
import { ExerciseListingItem } from "@/api/models/exercise";

type TraineeExerciseProgressProps = {
  loading: boolean;
  chartData: TraineeProgressData[];
  selectedExercise?: ExerciseListingItem;
  selectedPeriod?: DateRange;
  onExerciseSelected: (exercise?: ExerciseListingItem) => void;
};

export default function TraineeExerciseProgress(
  props: TraineeExerciseProgressProps
) {
  const {
    selectedPeriod,
    loading,
    chartData,
    onExerciseSelected,
    selectedExercise,
  } = props;

  return (
    <div className={cn("w-full space-y-4 flex flex-col")}>
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b-0 p-0">
          <div className="flex lg:flex-row flex-col lg:justify-between lg:gap-4 border-b">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>Exercise progress</CardTitle>
              <CardDescription>
                Showing metric values achieved for selected exercise over time
              </CardDescription>
            </div>
            {selectedPeriod && (
              <div className="flex sm:flex-row flex-1 flex-col sm:items-center lg:self-end mx-3.5 mb-3.5 gap-x-2 gap-y-1.5">
                <TraineeExerciseSelector
                  onExerciseSelected={onExerciseSelected}
                  className="max-w-xs w-full ml-auto"
                />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ExerciseProgressChart
            loading={loading}
            chartData={chartData}
            selectedExercise={selectedExercise}
          />
        </CardContent>
      </Card>
    </div>
  );
}
