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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type AnalyticsBarChartProps = {
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
};

export default function AnalyticsBarChart(props: AnalyticsBarChartProps) {
  const { title, description, data, config, y, x, tooltip } = props;

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="aspect-auto h-[400px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={x.dataKey}
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              minTickGap={24}
              tickFormatter={x.formatter}
            />
            {!y.show && (
              <YAxis
                dataKey={y.dataKey}
                type={y.type}
                domain={y.domain}
                label={{
                  value: y.label,
                  angle: -90,
                  position: "insideLeft",
                }}
                className="sm:block hidden w-0"
                tickFormatter={y.formatter}
              />
            )}
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={tooltip.labelKey}
                  labelFormatter={tooltip.formatter}
                />
              }
            />

            <Bar
              dataKey={y.dataKey}
              fill={`var(--color-${y.dataKey})`}
              fillOpacity={0.6}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
