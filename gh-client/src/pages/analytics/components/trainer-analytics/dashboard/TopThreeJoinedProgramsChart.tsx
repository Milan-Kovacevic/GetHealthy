import {
  LineChart,
  CartesianGrid,
  LabelList,
  Line,
  XAxis,
  BarChart,
  Bar,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { UsersIcon } from "lucide-react";
import { TopProgramsDashboardData } from "@/api/models/analytics";

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
      <BarChart
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
