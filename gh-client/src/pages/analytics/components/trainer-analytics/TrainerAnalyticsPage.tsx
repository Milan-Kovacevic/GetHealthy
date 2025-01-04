import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainerProgramPopularity from "./popularity/TrainerProgramPopularity";
import TrainerProgramEngagement from "./engagement/TrainerProgramEngagement";
import TrainerDashboardCards from "./TrainerDashboardCards";
import TrainerAnalyticsSelector from "./TrainerAnalyticsSelector";
import { useEffect, useState } from "react";
import useTrainerAnalytics from "../../hooks/use-trainer-analytics";
import {
  AnalyticsProgramExercise,
  EngagementChartFilter,
  EngagementChartState,
  PopularityChartState,
} from "@/api/models/analytics";

const exerciseData = [
  { date: "2024-12-30", skipped: 74, completed: 71 },
  { date: "2024-12-31", skipped: 39, completed: 16 },
  { date: "2025-01-01", skipped: 85, completed: 26 },
  { date: "2025-01-02", skipped: 68, completed: 11 },
  { date: "2025-01-03", skipped: 38, completed: 4 },
  { date: "2025-01-04", skipped: 16, completed: 0 },
  { date: "2025-01-05", skipped: 36, completed: 50 },
  { date: "2025-01-06", skipped: 86, completed: 34 },
  { date: "2025-01-07", skipped: 40, completed: 27 },
  { date: "2025-01-08", skipped: 100, completed: 70 },
  { date: "2025-01-09", skipped: 65, completed: 72 },
  { date: "2025-01-10", skipped: 57, completed: 31 },
  { date: "2025-01-11", skipped: 77, completed: 63 },
  { date: "2025-01-12", skipped: 80, completed: 28 },
  { date: "2025-01-13", skipped: 87, completed: 94 },
  { date: "2025-01-14", skipped: 57, completed: 78 },
  { date: "2025-01-15", skipped: 2, completed: 54 },
  { date: "2025-01-16", skipped: 0, completed: 97 },
  { date: "2025-01-17", skipped: 10, completed: 88 },
  { date: "2025-01-18", skipped: 6, completed: 73 },
  { date: "2025-01-19", skipped: 45, completed: 27 },
  { date: "2025-01-20", skipped: 23, completed: 24 },
  { date: "2025-01-21", skipped: 86, completed: 13 },
  { date: "2025-01-22", skipped: 79, completed: 30 },
  { date: "2025-01-23", skipped: 56, completed: 57 },
  { date: "2025-01-24", skipped: 24, completed: 81 },
  { date: "2025-01-25", skipped: 95, completed: 58 },
  { date: "2025-01-26", skipped: 79, completed: 71 },
  { date: "2025-01-27", skipped: 26, completed: 4 },
  { date: "2025-01-28", skipped: 31, completed: 44 },
  { date: "2025-01-29", skipped: 63, completed: 71 },
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
  const [engagementChartState, setEngagementChartState] =
    useState<EngagementChartState>({
      data: [],
      loading: false,
      filter: {
        display: "all",
      },
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
    setEngagementChartState({
      ...engagementChartState,
      data: [],
      selectedExercise: undefined,
      selectedParticipant: undefined,
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
      setEngagementChartState((prev) => {
        return {
          ...prev,
          data: [],
          selectedExercise: undefined,
          selectedParticipant: undefined,
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

  const handleProgramExerciseSelected = (
    exercise?: AnalyticsProgramExercise
  ) => {
    const isSameExercise =
      engagementChartState.selectedExercise?.id == exercise?.id;
    /// Load exercise analytics data
    setEngagementChartState({
      ...engagementChartState,
      selectedExercise: isSameExercise ? undefined : exercise,
      data: isSameExercise
        ? []
        : exerciseData.slice(exercise?.id ?? (0 * 3) % 10),
    });
  };

  const handleFiltersChanged = (filter: EngagementChartFilter) => {
    setEngagementChartState((prev) => {
      return { ...prev, filter: filter };
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
              <TabsTrigger
                value="tab1"
                className="px-12 md:min-w-[200px] w-full"
              >
                Popularity
              </TabsTrigger>
              <TabsTrigger
                value="tab2"
                className="px-12 md:min-w-[200px] w-full"
              >
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
              chartState={engagementChartState}
              onExerciseChanged={handleProgramExerciseSelected}
              onFilterChanged={handleFiltersChanged}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
