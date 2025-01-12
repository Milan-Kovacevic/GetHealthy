import { Page } from "../contracts/pageable-contract";

export type Exercise = {
  id: number;
  exerciseName: string;
  description: string;
  videoLink: string;
  firstExerciseMetric: ExerciseMetric;
  secondExerciseMetric: ExerciseMetric;
  exerciseSets: ExerciseSet[];
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

export type ExerciseListing = {
  id: number;
  exerciseName: string;
  firstExerciseMetric: ExerciseMetric;
  secondExerciseMetric: ExerciseMetric;
};

export type PageableExerciseListing = Page<ExerciseListing>;

export type ExercisePlanItem = {
  id: number;
  name: string;
  firstExerciseMetric: ExerciseMetric;
  secondExerciseMetric?: ExerciseMetric;
  sets: ExerciseSet[];
};
