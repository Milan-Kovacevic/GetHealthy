import { useEffect, useState } from "react";
import { DashboardCardLoader } from "../../shared/DashboardCardLoader";
import ChartDashboardCardFrame from "../../shared/ChartDashboardCardFrame";
import { TopThreeInteractedProgramsChart } from "./TopThreeInteractedProgramsChart";
import { TraineeDashboardAnalytics } from "@/api/models/analytics";
import { getTraineeDashboardAnalytics } from "@/api/services/trainee-analytics-service";
import TotalJoinedProgramsChart from "./TotalJoinedProgramsChart";
import { TopThreeSkippedExercisesChart } from "./TopThreeSkippedExercisesChart";
import { TopThreeFavoriteExercisesChart } from "./TopThreeFavoriteExercisesChart";

type DashboardChartState = {
  loading: boolean;
} & TraineeDashboardAnalytics;

export default function TraineeDashboardCards() {
  // TODO: Hardcoded now
  const userId = 2;
  const [dashboardChartState, setDashboardChartState] =
    useState<DashboardChartState>({
      topFavoriteExercises: [],
      topInteractedPrograms: [],
      topSkippedExercises: [],
      totalJoined: [],
      loading: true,
    });

  useEffect(() => {
    setDashboardChartState((prev) => {
      return { ...prev, loading: true };
    });
    getTraineeDashboardAnalytics(userId)
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
            title="Total joined programs"
            description="Showing total number of interacted and non-interacted training programs"
          >
            <TotalJoinedProgramsChart
              chartData={dashboardChartState.totalJoined}
            />
          </ChartDashboardCardFrame>

          <ChartDashboardCardFrame
            title="Top interacted programs"
            description="Showing top 3 interacted programs this month based on number of completed workouts"
          >
            <TopThreeInteractedProgramsChart
              chartData={dashboardChartState.topInteractedPrograms}
            />
          </ChartDashboardCardFrame>

          <ChartDashboardCardFrame
            title="Top skipped exercises"
            description="Showing top 3 most skipped exercises this month when working out"
          >
            <TopThreeSkippedExercisesChart
              chartData={dashboardChartState.topSkippedExercises}
            />
          </ChartDashboardCardFrame>
          <ChartDashboardCardFrame
            title="Top best exercises"
            description="Showing top 3 favorite exercises this month"
          >
            <TopThreeFavoriteExercisesChart
              chartData={dashboardChartState.topFavoriteExercises}
            />
          </ChartDashboardCardFrame>
        </>
      )}
    </div>
  );
}
