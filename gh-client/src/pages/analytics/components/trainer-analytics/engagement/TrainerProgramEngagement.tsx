import useTrainerAnalytics from "../../../hooks/use-trainer-analytics";

import {
  AnalyticsEngagementData,
  AnalyticsProgramExercise,
  AnalyticsProgramParticipant,
} from "@/api/models/analytics";
import ProgramEngagementChart from "./ProgramEngagementChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import EngagementChartFilters from "./EngagementChartFilters";
import { EngagementChartFilter } from "@/pages/analytics/hooks/use-trainer-charts";

type TrainerProgramEngagementProps = {
  data: AnalyticsEngagementData[];
  loading: boolean;
  selectedExercise?: AnalyticsProgramExercise;
  filter: EngagementChartFilter;
  onExerciseChanged: (exercise?: AnalyticsProgramExercise) => void;
  onFilterChanged: (filter: EngagementChartFilter) => void;
};

export default function TrainerProgramEngagement(
  props: TrainerProgramEngagementProps
) {
  const {
    data,
    loading,
    filter,
    selectedExercise,
    onExerciseChanged,
    onFilterChanged,
  } = props;
  const trainerAnalytics = useTrainerAnalytics();

  const chartTitle = filter.participant
    ? `Program exercise engagement for '${filter.participant.firstName} ${filter.participant.lastName}'`
    : "Program exercise engagement (Avg)";

  const noDataMessage =
    "No data to show, please select the period and training program first...";

  const chartDescription = !trainerAnalytics.selectedProgram
    ? noDataMessage
    : `Showing skip and complete rate of ${
        selectedExercise
          ? `'${selectedExercise.name}' exercise`
          : " selected exercise on program"
      } `;

  return (
    <div className="w-full space-y-4 flex flex-col">
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b-0 p-0">
          <div className="flex lg:flex-row flex-col lg:justify-between lg:gap-4 border-b">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>{chartTitle}</CardTitle>
              <CardDescription>{chartDescription}</CardDescription>
            </div>

            <EngagementChartFilters
              visible={
                selectedExercise != undefined &&
                trainerAnalytics.selectedProgram != undefined
              }
              filter={filter}
              onFilterChange={onFilterChanged}
            />
          </div>

          <ScrollArea className="overflow-x-auto flex-1 self-stretch sm:pb-1 pb-4">
            <div className="grid sm:grid-cols-4 flex-col sm:max-h-none max-h-[150px] sm:flex-row flex-1 h-full">
              {trainerAnalytics.selectedProgram?.exercises.map(
                (exercise, index) => {
                  return (
                    <div
                      key={exercise.id}
                      data-active={selectedExercise?.id === exercise.id}
                      className={cn(
                        "cursor-pointer flex min-w-40 flex-row flex-1 justify-center gap-2 border-t sm:border-b sm:border-r border-b-0 last:border-b px-6 py-2 items-center text-start data-[active=true]:bg-muted/50 data-[active=true]:border-b-primary",
                        index % 4 == 3 && "sm:border-r-0",
                        index >= 4 ? "sm:border-t-0" : "",
                        index >= 4 && index % 4 == 0 && "sm:border-l-0",
                        loading && "opacity-80 pointer-events-none"
                      )}
                      onClick={() => onExerciseChanged(exercise)}
                    >
                      <span className="text-lg text-muted-foreground font-medium">
                        {index + 1}.
                      </span>
                      <span className="text-base font-medium">
                        {exercise.name}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ProgramEngagementChart
            loading={loading}
            chartData={data}
            show={filter.display}
            tooltipText="Percentage [%]"
          />
        </CardContent>
      </Card>
    </div>
  );
}
