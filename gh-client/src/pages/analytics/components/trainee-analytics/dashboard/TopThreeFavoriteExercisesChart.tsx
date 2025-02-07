import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AwardIcon } from "lucide-react";
import { TopExercisesDashboardData } from "@/api/models/analytics";

const chartConfig = {
  value: {
    label: "Completed amount",
    color: "hsl(var(--primary)/0.5)",
    icon: AwardIcon,
  },
} satisfies ChartConfig;

type TopThreeFavoriteExercisesChartProps = {
  chartData: TopExercisesDashboardData[];
};

export function TopThreeFavoriteExercisesChart({
  chartData,
}: TopThreeFavoriteExercisesChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto max-w-[240px] w-full h-[140px]"
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 5,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="exercise" tickLine={false} axisLine={false} />

        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={6}>
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
