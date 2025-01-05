import { useIsMobile } from "@/hooks/use-mobile";
import AnalyticsLineChart from "../../shared/AnalyticsLineChart";
import { AnalyticsPopularityData } from "@/api/models/analytics";

type TrainerProgramPopularityProps = {
  ratingsData: AnalyticsPopularityData[];
  participantsData: AnalyticsPopularityData[];
  loading: boolean;
};

export default function TrainerProgramPopularity(
  props: TrainerProgramPopularityProps
) {
  const { ratingsData, participantsData, loading } = props;
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

  const maxParticipantCount = Math.max(...participantsData.map((i) => i.value));

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        <AnalyticsLineChart
          className="flex-1"
          data={ratingsData}
          x={toXChartData()}
          y={toYChartData("Rating [0-5]", [0, 5], "number", isMobile)}
          config={toChartConfig("Rating [Avg]", "hsl(var(--primary)/0.9)")}
          tooltip={toChartTooltip()}
          title="Program rating (Avg)"
          description="Average rating over time for selected training program"
          loading={loading}
        />

        <AnalyticsLineChart
          className="flex-1"
          data={participantsData}
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
          loading={loading}
        />
      </div>
    </div>
  );
}
