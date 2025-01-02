import { ExerciseSkippedChart } from "./ExerciseSkippedChart";

// Mock data for exercises in a training program

type ProgramAnalyticsExercise = {
  id: string;
  name: string;
  data: { date: string; percentage: number }[];
};

type TrainerProgramEngagementProps = {
  programExercises: ProgramAnalyticsExercise[];
};

export default function TrainerProgramEngagement(
  props: TrainerProgramEngagementProps
) {
  const { programExercises } = props;

  return (
    <div>
      <div className="w-full space-y-4 mt-3">
        <ExerciseSkippedChart programExercises={programExercises} />
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <HorizontalBarChart
            data={exerciseData}
            dataKey="percentageSkipped"
            config={{
              percentageSkipped: {
                label: "Percentage Skipped",
                color: "hsl(var(--chart-3)/0.6)",
              },
            }}
            title="Percentage Skipped"
            description="Percentage of participants skipping each exercise"
            yDataKey="exercise"
            yType="category"
          />
          <HorizontalBarChart
            data={exerciseData}
            dataKey="percentageCompleted"
            config={{
              percentageCompleted: {
                label: "Percentage Completed",
                color: "hsl(var(--chart-4)/0.6)",
              },
            }}
            title="Percentage Completed"
            description="Percentage of participants completing each exercise"
            yDataKey="exercise"
            yType="category"
          />
        </div> */}
      </div>
    </div>
  );
}
