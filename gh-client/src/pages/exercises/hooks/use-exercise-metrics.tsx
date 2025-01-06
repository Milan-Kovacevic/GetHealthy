import { ExerciseMetric } from "@/api/models/exercise";
import { getAllExerciseMetrics } from "@/api/services/exercise-service";

import { useEffect, useState } from "react";

export default function useExerciseMetrics() {
  const [loadingMetrics, setLoadingMetrics] = useState(false);
  const [exerciseMetrics, setExerciseMetrics] = useState<ExerciseMetric[]>([]);

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
