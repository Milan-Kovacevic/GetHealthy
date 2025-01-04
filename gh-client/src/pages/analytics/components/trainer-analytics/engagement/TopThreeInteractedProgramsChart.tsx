import { Area, AreaChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DumbbellIcon } from "lucide-react";

const chartData = [
  { program: "Cardio HIIT", interactions: 10 },
  { program: "Best Program", interactions: 14 },
  { program: "Third one", interactions: 8 },
];

const chartConfig = {
  interactions: {
    label: "Rating",
    color: "hsl(var(--chart-3)/0.6)",
    icon: DumbbellIcon,
  },
} satisfies ChartConfig;

export function TopThreeInteractedProgramsChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto md:max-w-none max-w-sm w-full h-[140px]"
    >
      <AreaChart
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
        <Area
          dataKey="interactions"
          type="step"
          fill="var(--color-interactions)"
          fillOpacity={0.4}
          stroke="var(--color-interactions)"
        >
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Area>
      </AreaChart>
    </ChartContainer>
  );
}
