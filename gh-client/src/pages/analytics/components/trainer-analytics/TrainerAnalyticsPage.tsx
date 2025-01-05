import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainerProgramPopularity from "./popularity/TrainerProgramPopularity";
import TrainerProgramEngagement from "./engagement/TrainerProgramEngagement";
import TrainerDashboardCards from "./dashboard/TrainerDashboardCards";
import TrainerAnalyticsSelector from "./TrainerAnalyticsSelector";
import useTrainerCharts from "../../hooks/use-trainer-charts";

export default function TrainerAnalyticsPage() {
  const {
    popularityChartState,
    engagementChartState,
    onProgramExerciseSelected,
    onEngagementChartFiltersChanged,
  } = useTrainerCharts();

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
              ratingsData={popularityChartState.ratings}
              participantsData={popularityChartState.totalParticipants}
              loading={popularityChartState.loading}
            />
          </TabsContent>
          <TabsContent value="tab2" className="h-full py-3">
            <TrainerProgramEngagement
              loading={engagementChartState.loading}
              filter={engagementChartState.filter}
              data={engagementChartState.data}
              selectedExercise={engagementChartState.selectedExercise}
              onExerciseChanged={onProgramExerciseSelected}
              onFilterChanged={onEngagementChartFiltersChanged}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
