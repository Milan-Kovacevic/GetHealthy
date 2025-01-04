import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AwardIcon } from "lucide-react";

const chartData = [
  { program: "Cardio HIIT", rate: 4.7, total: 320 },
  { program: "Best Program", rate: 4.8, total: 140 },
  { program: "Third one", rate: 4.55, total: 260 },
];

const chartConfig = {
  rate: {
    label: "Rating",
    color: "hsl(var(--primary)/0.5)",
    icon: AwardIcon,
  },
  total: {
    label: "Program name",
    color: "hsl(var(--primary)/0.5)",
    icon: AwardIcon,
  },
} satisfies ChartConfig;

export function TopThreeVotedProgramsChart() {
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
        <Bar dataKey="rate" fill="var(--color-rate)" radius={8}>
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
