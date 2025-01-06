import { TotalProgramsDashboardData } from "@/api/models/trainer-analytics";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

const chartConfig = {
  beginner: {
    label: "Beginner",
    color: "hsl(var(--chart-1)/0.6)",
  },
  intermediate: {
    label: "Intermediate",
    color: "hsl(var(--chart-3)/0.6)",
  },
  advanced: {
    label: "Advanced",
    color: "hsl(var(--primary)/0.6)",
  },
} satisfies ChartConfig;

type TotalProgramsDashboardChartProps = {
  chartData: TotalProgramsDashboardData[];
};

export default function TotalProgramsDashboardChart({
  chartData,
}: TotalProgramsDashboardChartProps) {
  if (chartData.length == 0) return;
  const totalPrograms =
    chartData[0].beginner + chartData[0].intermediate + chartData[0].advanced;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto max-w-[200px] h-[200px] -mb-[80px]"
    >
      <RadialBarChart
        data={chartData}
        endAngle={180}
        innerRadius={80}
        outerRadius={130}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {totalPrograms.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                      className="fill-muted-foreground"
                    >
                      Training Programs
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>

        <RadialBar
          dataKey="beginner"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-beginner)"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="intermediate"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-intermediate)"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="advanced"
          fill="var(--color-advanced)"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  );
}
