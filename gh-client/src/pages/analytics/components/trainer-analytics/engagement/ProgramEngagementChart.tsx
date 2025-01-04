import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  AnalyticsExercise,
  AnalyticsExerciseData,
} from "@/api/models/analytics";
import useTrainerAnalytics from "@/pages/analytics/hooks/use-trainer-analytics";

type ProgramEngagementChartProps = {
  title: string;
  description: string;
  yLabel: string;
  xLabel: string;
  chartData: AnalyticsExerciseData[];
  chartColor?: string;
  selectedExercise?: AnalyticsExercise;
  onExerciseSelected: (exercise?: AnalyticsExercise) => void;
};
export default function ProgramEngagementChart(
  props: ProgramEngagementChartProps
) {
  const {
    chartData,
    chartColor,
    yLabel,
    title,
    description,
    selectedExercise,
    onExerciseSelected,
  } = props;
  const trainerAnalytics = useTrainerAnalytics();
  const exercises = trainerAnalytics.programExercises;
  const isMobile = useIsMobile();

  const handleExerciseSelect = (exerciseId: number) => {
    const exercise = exercises.find((e) => e.id === exerciseId);
    onExerciseSelected(exercise);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b-0 p-0">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <ScrollArea className="overflow-x-auto flex-1 self-stretch sm:pb-1 pb-4">
          <div className="grid sm:grid-cols-4 flex-col sm:max-h-none max-h-[150px] sm:flex-row flex-1 h-full">
            {exercises.map((exercise, index) => {
              return (
                <button
                  key={exercise.id}
                  data-active={selectedExercise?.id === exercise.id}
                  className={cn(
                    "flex min-w-40 flex-row flex-1 justify-center gap-2 border-t sm:border-b sm:border-r border-b-0 last:border-b px-6 py-2 items-center text-start data-[active=true]:bg-muted/50",
                    index % 4 == 3 && "sm:border-r-0",
                    index >= 4 ? "sm:border-t-0" : "",
                    index >= 4 && index % 4 == 0 && "sm:border-l-0"
                  )}
                  onClick={() => handleExerciseSelect(exercise.id)}
                >
                  <span className="text-lg text-muted-foreground font-medium">
                    {index + 1}.
                  </span>
                  <span className="text-base font-medium">{exercise.name}</span>
                </button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={{
            yLabel: {
              label: yLabel,
            },
            value: {
              color: chartColor ?? "hsl(var(--chart-1)/0.8)",
            },
          }}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData ?? []}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="key"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              minTickGap={24}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            {!isMobile && (
              <YAxis
                dataKey="value"
                label={{
                  value: yLabel,
                  angle: -90,
                  position: "insideLeft",
                }}
                domain={[0, 100]}
                className="sm:block hidden w-0"
              />
            )}
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="yLabel"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Area
              dataKey="value"
              fill={"var(--color-value)"}
              fillOpacity={0.4}
              type="bump"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
