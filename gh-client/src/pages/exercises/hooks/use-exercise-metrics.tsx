import { Metric } from "@/api/models/metric";
import { getAllExerciseMetrics } from "@/api/services/metric-service";
import { useEffect, useState } from "react";

export default function useExerciseMetrics() {
  const [loadingMetrics, setLoadingMetrics] = useState(false);
  const [exerciseMetrics, setExerciseMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    setLoadingMetrics(true);
    getAllExerciseMetrics()
      .then((value) => {
        setExerciseMetrics(value);
      })
      .catch(() => {})
      .finally(() => {
        setLoadingMetrics(false);
      });
  }, []);

  return { exerciseMetrics, loadingMetrics };
}
