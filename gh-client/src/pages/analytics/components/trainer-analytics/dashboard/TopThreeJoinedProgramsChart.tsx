import { LineChart, CartesianGrid, LabelList, Line, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { UsersIcon } from "lucide-react";
import { TopProgramsDashboardData } from "@/api/models/trainer-analytics";

const chartConfig = {
  value: {
    label: "Participants",
    color: "hsl(var(--chart-2)/0.5)",
    icon: UsersIcon,
  },
} satisfies ChartConfig;

type TopThreeJoinedProgramsChartProps = {
  chartData: TopProgramsDashboardData[];
};

export function TopThreeJoinedProgramsChart({
  chartData,
}: TopThreeJoinedProgramsChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto max-w-[280px] w-full h-[140px]"
    >
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
          left: 20,
          right: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="program" tickLine={false} axisLine={false} />

        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line dataKey="value" fill="var(--color-value)" radius={8} type="step">
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Line>
      </LineChart>
    </ChartContainer>
  );
}
