import { useIsMobile } from "@/hooks/use-mobile";
import AnalyticsLineChart from "../../shared/AnalyticsLineChart";
import { AnalyticsPopularityData } from "@/api/models/trainer-analytics";
import { LockIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type TrainerProgramPopularityProps = {
  ratingsData: AnalyticsPopularityData[];
  participantsData: AnalyticsPopularityData[];
  loadingCharts: boolean;
  loadingMetadata: boolean;
};

export default function TrainerProgramPopularity(
  props: TrainerProgramPopularityProps
) {
  const { ratingsData, participantsData, loadingCharts, loadingMetadata } =
    props;
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
    <>
      {loadingMetadata && (
        <div className="w-full h-full absolute flex flex-col-reverse lg:flex-row gap-4">
          <div className="flex-1 h-full rounded-lg bg-muted/65" />
          <div className="flex-1 h-full rounded-lg bg-muted/65" />
          <div className="w-full h-full absolute flex flex-col-reverse lg:flex-row gap-4 z-10">
            <div className="flex items-center justify-center flex-1 w-full h-full">
              <LockIcon className="h-10 w-10 text-muted-foreground" />
            </div>

            <div className="flex items-center justify-center flex-1 w-full h-full">
              <LockIcon className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}
      <div
        className={cn(
          "w-full flex flex-col-reverse lg:flex-row gap-4",
          loadingMetadata && "pointer-events-none"
        )}
      >
        <AnalyticsLineChart
          className="flex-1"
          data={ratingsData}
          x={toXChartData()}
          y={toYChartData("Rating [0-5]", [0, 5], "number", isMobile)}
          config={toChartConfig("Rating [Avg]", "hsl(var(--primary)/0.9)")}
          tooltip={toChartTooltip()}
          title="Program rating (Avg)"
          description="Average rating over time for selected training program"
          loading={loadingCharts}
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
          loading={loadingCharts}
        />
      </div>
    </>
  );
}
