import {
  Bar,
  BarChart,
  LineChart,
  CartesianGrid,
  LabelList,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { UsersIcon } from "lucide-react";

const chartData = [
  { program: "Cardio HIIT", participants: 126 },
  { program: "Best Program", participants: 257 },
  { program: "Third one", participants: 42 },
];

const chartConfig = {
  participants: {
    label: "Participants",
    color: "hsl(var(--chart-2)/0.5)",
    icon: UsersIcon,
  },
} satisfies ChartConfig;

export function TopThreeJoinedProgramsChart() {
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
        <Line
          dataKey="participants"
          fill="var(--color-participants)"
          radius={8}
          type="step"
        >
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
