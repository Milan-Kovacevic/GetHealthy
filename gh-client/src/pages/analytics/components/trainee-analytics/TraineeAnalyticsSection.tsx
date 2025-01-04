import AnalyticsDashboardCard from "../shared/AnalyticsDashboardCard";
import { DollarSignIcon } from "lucide-react";
import AnalyticsPeriodSelector from "../shared/AnalyticsPeriodSelector";

export default function TraineeAnalyticsSection() {
  return (
    <div className="flex flex-col flex-1">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-5">
        <AnalyticsDashboardCard
          title="Total active programs"
          value="$45,231.89"
          description="+20.1% from last month"
          icon={() => (
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          )}
        />

        <AnalyticsDashboardCard
          title="Averege program rate"
          value="+2350"
          description="+180.1% from last month"
          icon={() => (
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          )}
        />
      </div>

      <div className="flex-1 mt-8">
        <AnalyticsPeriodSelector onPeriodChange={() => {}} />
        // TODO
      </div>
    </div>
  );
}
