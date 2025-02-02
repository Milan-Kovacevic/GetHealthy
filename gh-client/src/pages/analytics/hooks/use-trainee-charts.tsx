import { TraineeProgressAnalytics } from "@/api/models/analytics";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { ExerciseListingItem } from "@/api/models/exercise";
import { generateTraineeProgressAnalytics } from "@/api/services/trainee-analytics-service";
import useAuth from "@/hooks/use-auth";

export type ProgressChartState = {
  selectedExercise?: ExerciseListingItem;
  loading: boolean;
} & TraineeProgressAnalytics;

export default function useTraineeCharts(selectedPeriod?: DateRange) {
  const { getUserId } = useAuth();
  const userId = getUserId();

  const [progressChartState, setProgressChartState] =
    useState<ProgressChartState>({
      data: [],
      loading: false,
      selectedExercise: undefined,
    });

  const clearProgressChartData = () => {
    setProgressChartState((prev) => {
      return {
        ...prev,
        data: [],
        selectedExercise: undefined,
        loading: false,
      };
    });
  };

  const loadProgressChartData = (exercise: ExerciseListingItem) => {
    if (!selectedPeriod) return;

    setProgressChartState((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });

    generateTraineeProgressAnalytics(
      userId,
      selectedPeriod.from!,
      selectedPeriod.to!,
      exercise.id
    )
      .then((response) => {
        setProgressChartState((prev) => {
          return {
            ...prev,
            ...response,
            selectedExercise: exercise,
          };
        });
      })
      .finally(() => {
        setProgressChartState((prev) => {
          return { ...prev, loading: false };
        });
      });
  };

  useEffect(() => {
    if (selectedPeriod && progressChartState.selectedExercise) {
      loadProgressChartData(progressChartState.selectedExercise);
    } else {
      clearProgressChartData();
    }
  }, [selectedPeriod]);

  const onExerciseSelected = (exercise?: ExerciseListingItem) => {
    if (!exercise) clearProgressChartData();
    else if (selectedPeriod != undefined && exercise != undefined) {
      loadProgressChartData(exercise);
    }
  };

  return {
    progressChartState,
    setProgressChartState,
    onExerciseSelected,
  };
}
