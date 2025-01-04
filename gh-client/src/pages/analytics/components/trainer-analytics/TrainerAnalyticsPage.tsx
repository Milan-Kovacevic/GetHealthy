import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainerProgramPopularity from "./popularity/TrainerProgramPopularity";
import TrainerProgramEngagement from "./engagement/TrainerProgramEngagement";
import TrainerDashboardCards from "./TrainerDashboardCards";
import TrainerAnalyticsSelector from "./TrainerAnalyticsSelector";
import { useEffect, useState } from "react";
import useTrainerAnalytics from "../../hooks/use-trainer-analytics";
import {
  AnalyticsExercise,
  AnalyticsExerciseData,
  EngagementChartState,
  PopularityChartState,
} from "@/api/models/analytics";

const exerciseData: AnalyticsExerciseData[] = [
  { key: "2024-12-30", value: 74 },
  { key: "2024-12-31", value: 39 },
  { key: "2025-01-01", value: 85 },
  { key: "2025-01-02", value: 68 },
  { key: "2025-01-03", value: 38 },
  { key: "2025-01-04", value: 16 },
  { key: "2025-01-05", value: 36 },
  { key: "2025-01-06", value: 86 },
  { key: "2025-01-07", value: 40 },
  { key: "2025-01-08", value: 100 },
  { key: "2025-01-09", value: 65 },
  { key: "2025-01-10", value: 57 },
  { key: "2025-01-11", value: 77 },
  { key: "2025-01-12", value: 80 },
  { key: "2025-01-13", value: 87 },
  { key: "2025-01-14", value: 57 },
  { key: "2025-01-15", value: 2 },
  { key: "2025-01-16", value: 0 },
  { key: "2025-01-17", value: 10 },
  { key: "2025-01-18", value: 6 },
  { key: "2025-01-19", value: 45 },
  { key: "2025-01-20", value: 23 },
  { key: "2025-01-21", value: 86 },
  { key: "2025-01-22", value: 79 },
  { key: "2025-01-23", value: 56 },
  { key: "2025-01-24", value: 24 },
  { key: "2025-01-25", value: 95 },
  { key: "2025-01-26", value: 79 },
  { key: "2025-01-27", value: 26 },
  { key: "2025-01-28", value: 31 },
  { key: "2025-01-29", value: 63 },
];

const ratingData = [
  { date: "2024-12-30", value: 4.5 },
  { date: "2024-12-31", value: 4.2 },
  { date: "2025-01-01", value: 4.7 },
  { date: "2025-01-02", value: 4.3 },
  { date: "2025-01-03", value: 4.1 },
];
const participantData = [
  { date: "2024-12-30", value: 150 },
  { date: "2024-12-31", value: 120 },
  { date: "2025-01-01", value: 200 },
  { date: "2025-01-02", value: 180 },
  { date: "2025-01-03", value: 100 },
];

export default function TrainerAnalyticsPage() {
  const trainerAnalytics = useTrainerAnalytics();
  const [skippedExercise, setSkippedExercise] = useState<EngagementChartState>({
    data: [],
    selectedExercise: undefined,
    loading: false,
  });
  const [completedExercise, setCompletedExercise] =
    useState<EngagementChartState>({
      data: [],
      selectedExercise: undefined,
      loading: false,
    });
  const [ratingChart, setRatingChart] = useState<PopularityChartState>({
    data: [],
    loading: false,
  });
  const [participantCountChart, setParticipantCountChart] =
    useState<PopularityChartState>({
      data: [],
      loading: false,
    });

  useEffect(() => {
    setSkippedExercise({
      ...skippedExercise,
      data: [],
      selectedExercise: undefined,
    });
    setCompletedExercise({
      ...completedExercise,
      data: [],
      selectedExercise: undefined,
    });

    if (trainerAnalytics.selectedProgram) {
      setRatingChart({
        ...ratingChart,
        data: ratingData,
      });
      setParticipantCountChart({
        ...participantCountChart,
        data: participantData,
      });
    }

    if (!trainerAnalytics.selectedProgram) {
      setSkippedExercise((prev) => {
        return {
          ...prev,
          data: [],
          selectedExercise: undefined,
        };
      });
      setCompletedExercise((prev) => {
        return {
          ...prev,
          data: [],
          selectedExercise: undefined,
        };
      });
      setRatingChart({
        ...ratingChart,
        data: [],
      });
      setParticipantCountChart({
        ...participantCountChart,
        data: [],
      });
    }
  }, [trainerAnalytics.selectedProgram]);

  const handleSkippedChartExerciseSelected = (exercise?: AnalyticsExercise) => {
    /// Load exercise analytics data
    setSkippedExercise({
      ...skippedExercise,
      selectedExercise: exercise,
      data: exerciseData.slice(exercise?.id ?? (0 * 3) % 10),
    });
  };

  const handleCompletedChartExerciseSelected = (
    exercise?: AnalyticsExercise
  ) => {
    /// Load exercise analytics data
    setCompletedExercise({
      ...completedExercise,
      selectedExercise: exercise,
      data: exerciseData.slice(exercise?.id ?? (0 * 3) % 10),
    });
  };

  return (
    <div className="flex flex-col flex-1">
      <TrainerDashboardCards />
      <div className="flex-1 mt-8">
        <TrainerAnalyticsSelector />
        <Tabs defaultValue="tab1" className="w-full">
          <div className="flex lg:flex-row flex-col-reverse gap-x-4 gap-y-3 justify-between w-full">
            <TabsList className="flex md:flex-row flex-col gap-y-1 h-auto md:w-fit">
              <TabsTrigger value="tab1" className="px-8 w-full">
                Popularity
              </TabsTrigger>
              <TabsTrigger value="tab2" className="px-8 w-full">
                Engagement
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="tab1" className="h-full py-3">
            <TrainerProgramPopularity
              ratingChartState={ratingChart}
              partcipantChartState={participantCountChart}
            />
          </TabsContent>
          <TabsContent value="tab2" className="h-full py-3">
            <TrainerProgramEngagement
              skippedExerciseState={skippedExercise}
              completedExerciseState={completedExercise}
              onCompletedExerciseChanged={handleCompletedChartExerciseSelected}
              onSkippedExerciseChanged={handleSkippedChartExerciseSelected}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
