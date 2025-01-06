import AnalyticsPeriodSelector from "../shared/AnalyticsPeriodSelector";
import { CircleIcon } from "lucide-react";
import TrainerProgramSelector from "@/pages/shared/TrainerProgramSelector";
import useTrainerAnalytics from "../../hooks/use-trainer-analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type TrainerAnalyticsSelectorProps = {};

export default function TrainerAnalyticsSelector(
  props: TrainerAnalyticsSelectorProps
) {
  const trainerAnalytics = useTrainerAnalytics();

  return (
    <div className="w-full flex md:flex-row flex-col md:items-center gap-x-5 gap-y-2 mb-3">
      <AnalyticsPeriodSelector
        initialPeriod={trainerAnalytics.selectedPeriod}
        onPeriodChange={trainerAnalytics.onChangePeriod}
        loading={trainerAnalytics.loading}
      />
      {trainerAnalytics.loading && trainerAnalytics.selectedPeriod && (
        <Skeleton className="max-w-sm w-full h-10" />
      )}
      {trainerAnalytics.selectedPeriod && (
        <div
          className={cn(
            "w-full flex flex-row items-center gap-x-4",
            trainerAnalytics.loading && "hidden"
          )}
        >
          <CircleIcon className="h-2 w-2 fill-border text-border md:block hidden" />
          <div className="flex items-center gap-1.5 w-full md:max-w-xs max-w-none ">
            <TrainerProgramSelector
              text={
                trainerAnalytics.selectedProgram
                  ? trainerAnalytics.selectedProgram.name
                  : "Select training program..."
              }
              programs={trainerAnalytics.programs}
              onProgramSelected={trainerAnalytics.onChangeProgram}
              className="sm:max-w-sm w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
