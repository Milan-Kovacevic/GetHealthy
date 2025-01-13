import {
  LineChart,
  CartesianGrid,
  LabelList,
  Line,
  XAxis,
  Bar,
  BarChart,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { UsersIcon } from "lucide-react";
import { TopExercisesDashboardData } from "@/api/models/analytics";

const chartConfig = {
  value: {
    label: "Skipped times",
    color: "hsl(var(--chart-2)/0.5)",
    icon: UsersIcon,
  },
} satisfies ChartConfig;

type TopThreeSkippedExercisesChartProps = {
  chartData: TopExercisesDashboardData[];
};

export function TopThreeSkippedExercisesChart({
  chartData,
}: TopThreeSkippedExercisesChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto max-w-[280px] w-full h-[140px]"
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
        <Bar dataKey="value" fill="var(--color-value)" radius={8}>
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
