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
import { Skeleton } from "@/components/ui/skeleton";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type AnalyticsLineChartProps = {
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
  loading?: boolean;
};

export default function AnalyticsLineChart(props: AnalyticsLineChartProps) {
  const {
    title,
    description,
    data,
    config,
    y,
    x,
    tooltip,
    className,
    loading,
  } = props;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!loading && (
          <ChartContainer
            config={config}
            className="aspect-auto h-[400px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                left: 0,
                top: 5,
                bottom: 5,
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

              <Line
                dataKey={y.dataKey}
                stroke={`var(--color-${y.dataKey})`}
                strokeWidth={2}
                fillOpacity={0.6}
                type="step"
              />
            </LineChart>
          </ChartContainer>
        )}
        {loading && <Skeleton className="aspect-auto h-[400px] w-full" />}
      </CardContent>
    </Card>
  );
}
