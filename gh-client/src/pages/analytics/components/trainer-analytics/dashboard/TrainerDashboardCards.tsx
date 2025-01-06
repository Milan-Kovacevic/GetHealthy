import { useEffect, useState } from "react";
import { DashboardCardLoader } from "../../shared/AnalyticsDashboardCard";
import TotalProgramsDashboardChart from "./TotalProgramsDashboardChart";
import ChartDashboardCardFrame from "../../shared/ChartDashboardCardFrame";
import { TopThreeVotedProgramsChart } from "./TopThreeVotedProgramsChart";
import { TopThreeJoinedProgramsChart } from "./TopThreeJoinedProgramsChart";
import { TopThreeInteractedProgramsChart } from "./TopThreeInteractedProgramsChart";
import { TrainerDashboardAnalytics } from "@/api/models/trainer-analytics";
import { getTrainerDashboardAnalytics } from "@/api/services/trainer-analytics-service";

type TrainerDashboardCardsProps = {};

type DashboardChartState = {
  loading: boolean;
} & TrainerDashboardAnalytics;

export default function TrainerDashboardCards(
  props: TrainerDashboardCardsProps
) {
  // TODO: Hardcoded now
  const userId = 2;
  const [dashboardChartState, setDashboardChartState] =
    useState<DashboardChartState>({
      topInteracted: [],
      topJoined: [],
      topVoted: [],
      totalPrograms: [],
      loading: true,
    });

  useEffect(() => {
    setDashboardChartState((prev) => {
      return { ...prev, loading: true };
    });
    getTrainerDashboardAnalytics(userId)
      .then((response) => {
        setDashboardChartState((prev) => {
          return {
            ...prev,
            ...response,
          };
        });
      })
      .finally(() => {
        setDashboardChartState((prev) => {
          return { ...prev, loading: false };
        });
      });
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-5">
      {dashboardChartState.loading ? (
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
            <TotalProgramsDashboardChart
              chartData={dashboardChartState.totalPrograms}
            />
          </ChartDashboardCardFrame>

          <ChartDashboardCardFrame
            title="Top interacted programs"
            description="Showing top 3 interacted programs this week based on number of participants"
          >
            <TopThreeInteractedProgramsChart
              chartData={dashboardChartState.topInteracted}
            />
          </ChartDashboardCardFrame>

          <ChartDashboardCardFrame
            title="Top joined programs"
            description="Showing top 3 programs based on number of participants"
          >
            <TopThreeJoinedProgramsChart
              chartData={dashboardChartState.topJoined}
            />
          </ChartDashboardCardFrame>
          <ChartDashboardCardFrame
            title="Top voted programs"
            description="Showing top 3 programs based on average rating"
          >
            <TopThreeVotedProgramsChart
              chartData={dashboardChartState.topVoted}
            />
          </ChartDashboardCardFrame>
        </>
      )}
    </div>
  );
}
