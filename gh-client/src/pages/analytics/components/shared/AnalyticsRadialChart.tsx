"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 5, mobile: 160 },
  { month: "February", desktop: 4, mobile: 170 },
  { month: "March", desktop: 10, mobile: 180 },
  { month: "April", desktop: 6, mobile: 160 },
  { month: "May", desktop: 3, mobile: 190 },
  { month: "June", desktop: 5, mobile: 204 },
  { month: "April", desktop: 6, mobile: 160 },
  { month: "May", desktop: 2, mobile: 190 },
  { month: "June", desktop: 1, mobile: 204 },
  { month: "April", desktop: 0, mobile: 160 },
  { month: "May", desktop: 8, mobile: 190 },
  { month: "June", desktop: 5, mobile: 204 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type AnalyticsRadialChartProps = {
  title: string;
  description: string;
  config: ChartConfig;
  data: any[];
  x: {
    dataKey: string;
    domain?: number[];
    formatter?: (value: any) => any;
  };
  y: {
    dataKey: string;
    type: "number" | "category";
    domain: number[];
    label: string;
    formatter?: (value: any) => any;
    show?: boolean;
  };
  tooltip: {
    labelKey: string;
    formatter: (value: any) => any;
  };
  className?: string;
};

export default function AnalyticsRadialChart(props: AnalyticsRadialChartProps) {
  const { title, description, data, config, y, x, tooltip, className } = props;

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid radialLines={false} />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0}
              stroke="var(--color-desktop)"
              strokeWidth={2}
            />
            {/* <Radar
              dataKey="mobile"
              fill="var(--color-mobile)"
              fillOpacity={0}
              stroke="var(--color-mobile)"
              strokeWidth={2}
            /> */}
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  );
}
