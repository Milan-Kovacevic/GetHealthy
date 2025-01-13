import AnalyticsPeriodSelector from "../shared/AnalyticsPeriodSelector";
import TraineeExerciseProgress from "./TraineeExerciseProgress";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import useTraineeCharts from "../../hooks/use-trainee-charts";
import TraineeDashboardCards from "./dashboard/TraineeDashboardCards";

export default function TraineeAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<DateRange>();
  const { progressChartState, onExerciseSelected } =
    useTraineeCharts(selectedPeriod);

  return (
    <div className="flex flex-col flex-1">
      <TraineeDashboardCards />

      <div className="flex-1 mt-8 w-full flex flex-col gap-4">
        <AnalyticsPeriodSelector
          className="sm:mr-20 self-start"
          onPeriodChange={setSelectedPeriod}
          initialPeriod={selectedPeriod}
          loading={progressChartState.loading}
        />
        <div className="">
          <TraineeExerciseProgress
            loading={progressChartState.loading}
            chartData={progressChartState.data}
            selectedExercise={progressChartState.selectedExercise}
            onExerciseSelected={onExerciseSelected}
            selectedPeriod={selectedPeriod}
          />
        </div>
      </div>
    </div>
  );
}
