import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { DataKey } from "recharts/types/util/types";

type HorizontalBarChartProps = {
  title: string;
  description: string;
  config: ChartConfig;
  data: any[];
  dataKey: DataKey<any>;
  yDataKey: string;
  yType: "number" | "category";
};

export default function HorizontalBarChart(props: HorizontalBarChartProps) {
  const { title, description, data, dataKey, config, yDataKey, yType } = props;
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-auto w-full">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis type="number" />
            <YAxis dataKey={yDataKey} type={yType} />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <Bar
              dataKey={dataKey}
              fill={`var(--color-${dataKey})`}
              name={title}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
