import { useEffect, useState } from "react";
import AnalyticsDashboardCard, {
  DashboardCardLoader,
} from "../shared/AnalyticsDashboardCard";
import { DollarSignIcon } from "lucide-react";
import { delay } from "@/lib/utils";

export default function TrainerDashboardCards() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function mock() {
      setLoading(true);
      delay(1500).finally(() => {
        setLoading(false);
      });
    }
    mock();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-5">
      {loading ? (
        <>
          {[...Array(4)].map((item) => (
            <DashboardCardLoader />
          ))}
        </>
      ) : (
        <>
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
          <AnalyticsDashboardCard
            title="Averege program rate"
            value="+2350"
            description="+180.1% from last month"
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
        </>
      )}
    </div>
  );
}
