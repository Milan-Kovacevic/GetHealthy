import { useIsMobile } from "@/hooks/use-mobile";
import { PopularityChartState } from "@/api/models/analytics";
import AnalyticsLineChart from "../../shared/AnalyticsLineChart";
import AnalyticsRadialChart from "../../shared/AnalyticsRadialChart";

type TrainerProgramPopularityProps = {
  ratingChartState: PopularityChartState;
  partcipantChartState: PopularityChartState;
};

export default function TrainerProgramPopularity(
  props: TrainerProgramPopularityProps
) {
  const { ratingChartState, partcipantChartState } = props;
  const isMobile = useIsMobile();

  const toChartTooltip = () => {
    return {
      labelKey: "yLabel",
      formatter: (value: any) => {
        return new Date(value).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      },
    };
  };
  const toXChartData = () => {
    return {
      dataKey: "date",
      formatter: (value: any) => {
        const date = new Date(value);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      },
    };
  };
  const toYChartData = (
    label: string,
    domain: number[],
    type: "number" | "category",
    show: boolean | undefined = undefined
  ) => {
    return {
      dataKey: "value",
      domain: domain,
      label: label,
      type: type,
      show: show,
    };
  };
  const toChartConfig = (tooltipKey: string, color: string) => {
    return {
      yLabel: {
        label: tooltipKey,
      },
      value: {
        color: color,
      },
    };
  };

  const maxParticipantCount = Math.max(
    ...partcipantChartState.data.map((i) => i.value)
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        <AnalyticsLineChart
          className="flex-1"
          data={ratingChartState.data}
          x={toXChartData()}
          y={toYChartData("Rating [0-5]", [0, 5], "number", isMobile)}
          config={toChartConfig("Rating [Avg]", "hsl(var(--primary)/0.9)")}
          tooltip={toChartTooltip()}
          title="Program rating (Avg)"
          description="Average rating over time for selected training program"
        />

        <AnalyticsLineChart
          className="flex-1"
          data={partcipantChartState.data}
          x={toXChartData()}
          y={toYChartData(
            "Total pariticipants",
            [0, maxParticipantCount == -Infinity ? 1000 : maxParticipantCount],
            "number",
            isMobile
          )}
          config={toChartConfig("Participants", "hsl(var(--chart-2)/0.9)")}
          tooltip={toChartTooltip()}
          title="Total program participants"
          description="Participants over time on selected training program"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
    </div>
  );
}
