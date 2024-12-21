import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import useExerciseMetrics from "../hooks/use-exercise-metrics";
import { Skeleton } from "@/components/ui/skeleton";

type ExerciseMetricsSectionProps = {};

export default function ExerciseMetricsSection(
  props: ExerciseMetricsSectionProps
) {
  const { loadingMetrics, exerciseMetrics } = useExerciseMetrics();

  const [showMetrics, setShowMetrics] = useState(true);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-row items-center justify-between self-center gap-1">
        <Button
          variant="ghost"
          className="h-auto px-1.5 py-1 font-normal"
          onClick={() => setShowMetrics((prev) => !prev)}
        >
          {showMetrics ? (
            <EyeIcon strokeWidth={1.75} />
          ) : (
            <EyeOffIcon strokeWidth={1.75} />
          )}
        </Button>
        <p className="text-muted-foreground text-sm font-normal">
          {showMetrics
            ? exerciseMetrics.length == 0 && !loadingMetrics
              ? "There are no exercise metrics to show..."
              : "Available exercise metrics are"
            : "Show available exercise metrics"}
        </p>
      </div>

      {loadingMetrics && showMetrics && (
        <div className="flex flex-wrap items-center gap-2 justify-center">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={`item-${index}`} className="w-28 h-8 rounded-full" />
          ))}
        </div>
      )}

      {!loadingMetrics && showMetrics && exerciseMetrics.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {exerciseMetrics.map((item) => (
            <Badge
              key={item.id}
              className="font-medium flex gap-2 px-4 h-auto py-1 border-muted-foreground/20"
              variant="secondary"
            >
              <span className="text-sm">{item.name}</span>
              {item.unit && (
                <>
                  <span className="bg-muted-foreground/90 h-4 w-px"></span>
                  <span className="text-muted-foreground font-medium">
                    {item.unit}
                  </span>
                </>
              )}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
