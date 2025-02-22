import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnalyticsEngagementData } from "@/api/models/analytics";
import { Skeleton } from "@/components/ui/skeleton";

type ProgramEngagementChartProps = {
  chartData: AnalyticsEngagementData[];
  tooltipText: string;
  showLegend?: boolean;
  loading?: boolean;
  show: "skipped" | "completed" | "all";
};
export default function ProgramEngagementChart(
  props: ProgramEngagementChartProps
) {
  const { chartData, tooltipText, showLegend, show, loading } = props;
  const isMobile = useIsMobile();

  return loading ? (
    <Skeleton className="aspect-auto h-[400px] w-full" />
  ) : (
    <ChartContainer
      config={{
        yLabel: {
          label: tooltipText,
        },
        skipped: {
          label: "Skipped [%]",
          color: "hsl(var(--chart-3)/0.8)",
        },
        completed: {
          label: "Completed [%]",
          color: "hsl(var(--primary)/0.8)",
        },
      }}
      className="aspect-auto h-[400px] w-full"
    >
      <AreaChart
        accessibilityLayer
        data={chartData ?? []}
        margin={{
          left: 0,
          right: 0,
          top: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          minTickGap={24}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        {!isMobile && (
          <YAxis
            label={{
              value: tooltipText,
              angle: -90,
              position: "insideLeft",
            }}
            domain={[0, 100]}
            className="sm:block hidden w-0"
          />
        )}
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="line"
              className="w-[150px]"
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
              }}
            />
          }
        />
        <defs>
          <linearGradient id="fillSkipped" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="15%"
              stopColor="var(--color-skipped)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-skipped)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="15%"
              stopColor="var(--color-completed)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-completed)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {(show == "all" || show == "skipped") && (
          <Area
            dataKey="skipped"
            stroke="var(--color-skipped)"
            fill="url(#fillSkipped)"
            fillOpacity={0.5}
            type="bump"
          />
        )}
        {(show == "all" || show == "completed") && (
          <Area
            dataKey="completed"
            stroke="var(--color-completed)"
            fill="url(#fillCompleted)"
            fillOpacity={0.5}
            type="bump"
          />
        )}
      </AreaChart>
    </ChartContainer>
  );
}
