import { BanIcon, CheckIcon, CircleCheckBigIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalyticsProgramParticipant } from "@/api/models/analytics";
import useTrainerAnalytics from "@/pages/analytics/hooks/use-trainer-analytics";
import TraineeAnalyticsSelector from "./TraineeAnalyticsSelector";
import { cn } from "@/lib/utils";
import { EngagementChartFilter } from "@/pages/analytics/hooks/use-trainer-charts";

type EngagementChartFiltersProps = {
  visible: boolean;
  filter: EngagementChartFilter;
  onFilterChange: (filter: EngagementChartFilter) => void;
};

export default function EngagementChartFilters(
  props: EngagementChartFiltersProps
) {
  const trainerAnalytics = useTrainerAnalytics();
  const { visible, filter, onFilterChange } = props;
  type DisplayState = typeof filter.display;
  const displayState = filter.display;

  const getNextState = (currentState: DisplayState): DisplayState => {
    switch (currentState) {
      case "all":
        return "skipped";
      case "skipped":
        return "completed";
      case "completed":
        return "all";
    }
  };

  const handleChangeDisplay = () => {
    const newState = getNextState(displayState);
    onFilterChange({
      ...filter,
      display: newState,
    });
  };

  const handleChangeParticipant = (
    participant?: AnalyticsProgramParticipant
  ) => {
    onFilterChange({
      ...filter,
      participant: participant,
    });
  };

  const getIcon = () => {
    switch (displayState) {
      case "all":
        return <CircleCheckBigIcon className="h-4 w-4" />;
      case "skipped":
        return <BanIcon className="h-4 w-4" />;
      case "completed":
        return <CheckIcon className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (displayState) {
      case "all":
        return "Show all";
      case "skipped":
        return "Show skipped";
      case "completed":
        return "Show completed";
    }
  };

  return (
    <div className="flex sm:flex-row flex-col sm:items-center lg:self-end flex-1 mx-3.5 mb-3.5 gap-x-2 gap-y-1.5">
      {visible && (
        <div className="flex-1 flex justify-end">
          <TraineeAnalyticsSelector
            className="max-w-xs w-full"
            text={
              filter.participant
                ? `${filter.participant.firstName} ${filter.participant.lastName}`
                : "Select program participant"
            }
            placeholder="There are no participants to show now"
            participants={trainerAnalytics.selectedProgram?.participants ?? []}
            onParticipantSelected={handleChangeParticipant}
            initialParticipant={filter.participant}
          />
        </div>
      )}
      {visible && (
        <div className={cn("flex self-end items-center space-x-1")}>
          <Button
            variant="secondary"
            id="filter"
            onClick={handleChangeDisplay}
            className="rounded-sm"
            aria-label={getLabel()}
          >
            {getLabel()}

            {getIcon()}
          </Button>
        </div>
      )}
    </div>
  );
}
