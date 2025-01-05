import {
  AnalyticsEngagementData,
  AnalyticsProgram,
  AnalyticsProgramExercise,
  AnalyticsProgramParticipant,
  TrainerEngagementAnalytics,
  TrainerPopularityAnalytics,
} from "@/api/models/analytics";
import { useEffect, useState } from "react";
import useTrainerAnalytics from "./use-trainer-analytics";
import {
  generateTrainerEngagementAnalytics,
  generateTrainerPopularityAnalytics,
} from "@/api/services/trainer-analytics-service";
import { DateRange } from "react-day-picker";

export type PopularityChartState = {
  loading: boolean;
} & TrainerPopularityAnalytics;
export type EngagementChartState = {
  selectedExercise?: AnalyticsProgramExercise;
  loading: boolean;
  filter: EngagementChartFilter;
} & TrainerEngagementAnalytics;

export type EngagementChartFilter = {
  participant?: AnalyticsProgramParticipant;
  display: "all" | "skipped" | "completed";
};

export default function useTrainerCharts() {
  const userId = 2;
  const [lastSelectedProgram, setLastSelectedProgram] =
    useState<AnalyticsProgram>();
  const [lastSelectedPeriod, setLastSelectedPeriod] = useState<DateRange>();
  const trainerAnalytics = useTrainerAnalytics();
  const [popularityChartState, setPopularityChartState] =
    useState<PopularityChartState>({
      loading: false,
      ratings: [],
      totalParticipants: [],
    });
  const [engagementChartState, setEngagementChartState] =
    useState<EngagementChartState>({
      data: [],
      loading: false,
      filter: {
        display: "all",
      },
    });

  const clearEngagementChartData = () => {
    setEngagementChartState((prev) => {
      return {
        ...prev,
        data: [],
        selectedExercise: undefined,
        filter: {
          ...prev.filter,
          participant: undefined,
        },
      };
    });
  };

  const clearPopularityChartData = () => {
    setPopularityChartState((prev) => {
      return {
        ...prev,
        ratings: [],
        totalParticipants: [],
      };
    });
  };

  const loadEngagementChartData = (
    exercise: AnalyticsProgramExercise,
    participant?: AnalyticsProgramParticipant
  ) => {
    if (!trainerAnalytics.selectedProgram || !trainerAnalytics.selectedPeriod)
      return;
    setEngagementChartState((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });

    generateTrainerEngagementAnalytics(
      userId,
      trainerAnalytics.selectedPeriod.from!,
      trainerAnalytics.selectedPeriod.to!,
      trainerAnalytics.selectedProgram.id,
      exercise.id,
      participant?.id
    )
      .then((response) => {
        setEngagementChartState((prev) => {
          return {
            ...prev,
            ...response,
            selectedExercise: exercise,
          };
        });
      })
      .finally(() => {
        setEngagementChartState((prev) => {
          return { ...prev, loading: false };
        });
      });
  };

  useEffect(() => {
    if (trainerAnalytics.selectedProgram && trainerAnalytics.selectedPeriod) {
      setPopularityChartState((prev) => {
        return {
          ...prev,
          loading: true,
        };
      });

      generateTrainerPopularityAnalytics(
        userId,
        trainerAnalytics.selectedPeriod.from!,
        trainerAnalytics.selectedPeriod.to!,
        trainerAnalytics.selectedProgram.id
      )
        .then((response) => {
          setPopularityChartState((prev) => {
            return {
              ...prev,
              ...response,
            };
          });
        })
        .finally(() => {
          setPopularityChartState((prev) => {
            return { ...prev, loading: false };
          });
        });

      if (
        trainerAnalytics.selectedProgram &&
        engagementChartState.selectedExercise &&
        lastSelectedProgram?.id != trainerAnalytics.selectedProgram?.id
      ) {
        clearEngagementChartData();
      }

      if (
        trainerAnalytics.selectedProgram &&
        engagementChartState.selectedExercise &&
        lastSelectedPeriod != trainerAnalytics.selectedPeriod &&
        lastSelectedProgram?.id == trainerAnalytics.selectedProgram?.id
      ) {
        loadEngagementChartData(engagementChartState.selectedExercise);
      }
    }

    if (!trainerAnalytics.selectedProgram) {
      clearPopularityChartData();
      clearEngagementChartData();
    }
    setLastSelectedProgram(trainerAnalytics.selectedProgram);
    setLastSelectedPeriod(trainerAnalytics.selectedPeriod);
  }, [trainerAnalytics.selectedProgram, trainerAnalytics.selectedPeriod]);

  const onProgramExerciseSelected = (exercise?: AnalyticsProgramExercise) => {
    if (!trainerAnalytics.selectedPeriod || !trainerAnalytics.selectedProgram)
      return;

    const isSameExercise =
      engagementChartState.selectedExercise?.id == exercise?.id;

    if (isSameExercise || !exercise) {
      clearEngagementChartData();
    } else {
      loadEngagementChartData(exercise);
    }
  };

  const onEngagementChartFiltersChanged = (filter: EngagementChartFilter) => {
    setEngagementChartState((prev) => {
      return { ...prev, filter: filter };
    });

    if (
      engagementChartState.filter.participant != filter.participant &&
      engagementChartState.selectedExercise &&
      filter.participant?.id != engagementChartState.filter.participant
    ) {
      loadEngagementChartData(
        engagementChartState.selectedExercise,
        filter.participant
      );
    }
  };

  return {
    popularityChartState,
    setPopularityChartState,
    engagementChartState,
    setEngagementChartState,
    onProgramExerciseSelected,
    onEngagementChartFiltersChanged,
  };
}
