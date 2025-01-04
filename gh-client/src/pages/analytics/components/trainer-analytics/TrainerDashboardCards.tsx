import { useEffect, useState } from "react";
import { DashboardCardLoader } from "../shared/AnalyticsDashboardCard";
import { delay } from "@/lib/utils";
import TotalProgramsDashboardChart from "./engagement/TotalProgramsDashboardChart";
import ChartDashboardCardFrame from "../shared/ChartDashboardCardFrame";
import { TopThreeVotedProgramsChart } from "./engagement/TopThreeVotedProgramsChart";
import { TopThreeJoinedProgramsChart } from "./engagement/TopThreeJoinedProgramsChart";
import { TopThreeInteractedProgramsChart } from "./engagement/TopThreeInteractedProgramsChart";

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
          {[...Array(4)].map((item, index) => (
            <DashboardCardLoader key={`card-${index}`} />
          ))}
        </>
      ) : (
        <>
          <ChartDashboardCardFrame
            title="Total training programs"
            description="Showing total number of training programs based on difficulty"
          >
            <TotalProgramsDashboardChart />
          </ChartDashboardCardFrame>

          <ChartDashboardCardFrame
            title="Top interacted programs"
            description="Showing top 3 interacted programs this week based on number of participants"
          >
            <TopThreeInteractedProgramsChart />
          </ChartDashboardCardFrame>

          <ChartDashboardCardFrame
            title="Top joined programs"
            description="Showing top 3 programs based on number of participants"
          >
            <TopThreeJoinedProgramsChart />
          </ChartDashboardCardFrame>
          <ChartDashboardCardFrame
            title="Top voted programs"
            description="Showing top 3 programs based on average rating"
          >
            <TopThreeVotedProgramsChart />
          </ChartDashboardCardFrame>
        </>
      )}
    </div>
  );
}
