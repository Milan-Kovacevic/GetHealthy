import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DumbbellIcon } from "lucide-react";
import { TopProgramsDashboardData } from "@/api/models/analytics";

const chartConfig = {
  value: {
    label: "Interactions",
    color: "hsl(var(--chart-3)/0.6)",
    icon: DumbbellIcon,
  },
} satisfies ChartConfig;

type TopThreeInteractedProgramsChartProps = {
  chartData: TopProgramsDashboardData[];
};

export function TopThreeInteractedProgramsChart({
  chartData,
}: TopThreeInteractedProgramsChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto md:max-w-none max-w-sm w-full h-[140px]"
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
        <Bar
          dataKey="value"
          radius={6}
          fill="var(--color-value)"
          fillOpacity={0.4}
        >
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
