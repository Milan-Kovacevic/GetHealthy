import { Metric } from "@/api/models/metric";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import useExerciseMetrics from "../hooks/use-exercise-metrics";

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
            ? exerciseMetrics.length == 0
              ? "There are no exercise metrics to show..."
              : "Available exercise metrics are"
            : "Show available exercise metrics"}
        </p>
      </div>

      {showMetrics && exerciseMetrics.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {exerciseMetrics.map((item) => (
            <Badge
              key={item.id}
              className="font-medium flex gap-2 px-4 h-auto py-1.5 border-muted-foreground/20"
              variant="secondary"
            >
              <span className="text-sm">{item.name}</span>
              {item.unit && (
                <>
                  <span className="bg-muted-foreground/90 h-full w-px"></span>
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
