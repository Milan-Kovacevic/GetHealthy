import { TrainerProgram } from "./training-program";

export type AnalyticsProgram = TrainerProgram;

export type AnalyticsExercise = {
  id: number;
  name: string;
};

export type AnalyticsExerciseData = {
  key: string;
  value: number;
};

export type EngagementChartState = {
  selectedExercise?: AnalyticsExercise;
  data: AnalyticsExerciseData[];
  loading: boolean;
};
