import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";
import { TraineeProgressData } from "@/api/models/analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { ExerciseListingItem } from "@/api/models/exercise";

type ExerciseProgressChartProps = {
  selectedExercise?: ExerciseListingItem;
  chartData: TraineeProgressData[];
  loading?: boolean;
};

export default function ExerciseProgressChart(
  props: ExerciseProgressChartProps
) {
  const { chartData, loading, selectedExercise } = props;
  const isMobile = useIsMobile();

  return loading ? (
    <Skeleton className="aspect-auto h-[420px] w-full" />
  ) : (
    <ChartContainer
      config={{
        yLabel: {
          label: "Metric values",
        },
        firstMetric: {
          label: `${selectedExercise?.firstExerciseMetric.name} [${selectedExercise?.firstExerciseMetric.unit}]`,
          color: "hsl(var(--chart-3)/0.8)",
        },
        secondMetric: {
          label: `${selectedExercise?.secondExerciseMetric?.name} [${selectedExercise?.secondExerciseMetric?.unit}]`,
          color: "hsl(var(--primary)/0.8)",
        },
      }}
      className="aspect-auto h-[420px] w-full"
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
              value: !selectedExercise ? "Metric value" : "Maximum value",
              angle: -90,
              position: "insideLeft",
            }}
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
          <linearGradient id="fillFirstMetric" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="15%"
              stopColor="var(--color-firstMetric)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-firstMetric)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillSecondMetric" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="15%"
              stopColor="var(--color-secondMetric)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-secondMetric)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        {selectedExercise && <ChartLegend content={<ChartLegendContent />} />}

        <Area
          dataKey="firstMetric"
          stroke="var(--color-firstMetric)"
          fill="url(#fillFirstMetric)"
          fillOpacity={0.5}
          type="monotone"
        />
        {selectedExercise?.secondExerciseMetric && (
          <Area
            dataKey="secondMetric"
            stroke="var(--color-secondMetric)"
            fill="url(#fillSecondMetric)"
            fillOpacity={0.5}
            type="monotone"
          />
        )}
      </AreaChart>
    </ChartContainer>
  );
}
