import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AwardIcon } from "lucide-react";
import { TopProgramsDashboardData } from "@/api/models/trainer-analytics";

const chartConfig = {
  value: {
    label: "Rating",
    color: "hsl(var(--primary)/0.5)",
    icon: AwardIcon,
  },
} satisfies ChartConfig;

type TopThreeVotedProgramsChartProps = {
  chartData: TopProgramsDashboardData[];
};

export function TopThreeVotedProgramsChart({
  chartData,
}: TopThreeVotedProgramsChartProps) {
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
        <XAxis dataKey="program" tickLine={false} axisLine={false} />

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
