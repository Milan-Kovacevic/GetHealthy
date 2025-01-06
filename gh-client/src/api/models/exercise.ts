import { Page } from "../contracts/pageable-contract";

export type Exercise = {
  id: number;
  exerciseName: string;
  description: string;
  videoLink: string;
  firstExerciseMetric: ExerciseMetric;
  secondExerciseMetric: ExerciseMetric;
};

export type ExerciseMetric = {
  id: number;
  name: string;
  unit: string;
};

export type ExerciseSet = {
  id: number;
  restTime: number;
  firstMetricValue: string;
  secondMetricValue?: string;
};

export type PageableExercises = Page<Exercise>;
