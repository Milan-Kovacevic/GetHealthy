import useTrainerAnalytics from "../../../hooks/use-trainer-analytics";

import {
  AnalyticsExercise,
  EngagementChartState,
} from "@/api/models/analytics";
import ProgramEngagementChart from "./ProgramEngagementChart";

type TrainerProgramEngagementProps = {
  skippedExerciseState: EngagementChartState;
  completedExerciseState: EngagementChartState;
  onSkippedExerciseChanged: (exercise?: AnalyticsExercise) => void;
  onCompletedExerciseChanged: (exercise?: AnalyticsExercise) => void;
};

export default function TrainerProgramEngagement({
  skippedExerciseState,
  completedExerciseState,
  onSkippedExerciseChanged,
  onCompletedExerciseChanged,
}: TrainerProgramEngagementProps) {
  const trainerAnalytics = useTrainerAnalytics();

  const noDataMessage =
    "No data to show, please select the period and training program first...";

  const skippedChartDescription = !trainerAnalytics.selectedProgram
    ? noDataMessage
    : `Showing average skip rate of ${
        skippedExerciseState.selectedExercise
          ? `'${skippedExerciseState.selectedExercise.name}' exercise`
          : " selected exercise on program"
      } `;

  const completedChartDescription = !trainerAnalytics.selectedProgram
    ? noDataMessage
    : `Showing average completion rate of ${
        completedExerciseState.selectedExercise
          ? `'${completedExerciseState.selectedExercise.name}' exercise`
          : " selected exercise on program"
      } `;

  return (
    <div className="w-full space-y-4">
      <ProgramEngagementChart
        title={"Skipped program exercises (Avg)"}
        description={skippedChartDescription}
        yLabel="Percentage [%]"
        xLabel="Percentage skipped"
        chartColor="hsl(var(--chart-2)/0.6)"
        chartData={skippedExerciseState.data}
        selectedExercise={skippedExerciseState.selectedExercise}
        onExerciseSelected={onSkippedExerciseChanged}
      />
      <ProgramEngagementChart
        title={"Completed program exercises (Avg)"}
        description={completedChartDescription}
        yLabel="Percentage [%]"
        xLabel="Percentage completed"
        chartColor="hsl(var(--primary)/0.8)"
        chartData={completedExerciseState.data}
        selectedExercise={completedExerciseState.selectedExercise}
        onExerciseSelected={onCompletedExerciseChanged}
      />
    </div>
  );
}
