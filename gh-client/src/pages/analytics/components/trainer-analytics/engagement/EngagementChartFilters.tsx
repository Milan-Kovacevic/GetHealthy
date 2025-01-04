import { useEffect, useState } from "react";
import { BanIcon, CheckIcon, CircleCheckBigIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  EngagementChartFilter,
  EngagementChartState,
} from "@/api/models/analytics";
import useTrainerAnalytics from "@/pages/analytics/hooks/use-trainer-analytics";
import TraineeAnalyticsSelector from "./TraineeAnalyticsSelector";
import { cn } from "@/lib/utils";

type EngagementChartFiltersProps = {
  chartState: EngagementChartState;
  onFilterChange: (filter: EngagementChartFilter) => void;
};

export default function EngagementChartFilters(
  props: EngagementChartFiltersProps
) {
  const trainerAnalytics = useTrainerAnalytics();
  const { chartState, onFilterChange } = props;
  type DisplayState = typeof chartState.filter.display;
  const displayState = chartState.filter.display;

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

  const handleClick = () => {
    const newState = getNextState(displayState);
    onFilterChange({
      display: newState,
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

  const isVisible =
    chartState.selectedExercise && trainerAnalytics.selectedProgram;
  return (
    <div className="flex sm:flex-row flex-col sm:items-center lg:self-end flex-1 mx-3.5 mb-3.5 gap-x-2 gap-y-1.5">
      {isVisible && (
        <div className="flex-1 flex justify-end">
          <TraineeAnalyticsSelector
            className="max-w-xs w-full"
            text="Select program participant"
            placeholder="There are no participants to show now"
            participants={trainerAnalytics.selectedProgram?.participants ?? []}
            onParticipantSelected={() => {}}
          />
        </div>
      )}
      {isVisible && (
        <div className={cn("flex self-end items-center space-x-1")}>
          <Button
            variant="secondary"
            id="filter"
            onClick={handleClick}
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
