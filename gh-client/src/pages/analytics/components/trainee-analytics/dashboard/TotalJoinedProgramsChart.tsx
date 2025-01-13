import { TotalJoinedProgramsData } from "@/api/models/analytics";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

const chartConfig = {
  interacted: {
    label: "Interacted",
    color: "hsl(var(--primary)/0.6)",
  },
  nonInteracted: {
    label: "Non interacted",
    color: "hsl(var(--chart-1)/0.6)",
  },
} satisfies ChartConfig;

type TotalJoinedProgramsChartProps = {
  chartData: TotalJoinedProgramsData[];
};

export default function TotalJoinedProgramsChart({
  chartData,
}: TotalJoinedProgramsChartProps) {
  if (chartData.length == 0) return;
  const totalJoinedPrograms =
    chartData[0].interacted + chartData[0].nonInteracted;

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
                      {totalJoinedPrograms.toLocaleString()}
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
          dataKey="interacted"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-interacted)"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="nonInteracted"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-nonInteracted)"
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  );
}
