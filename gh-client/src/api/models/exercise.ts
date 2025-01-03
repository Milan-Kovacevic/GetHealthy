import { Page } from "../contracts/pageable-contract";
import { Metric } from "./metric";

export type Exercise = {
  id: number;
  exerciseName: string;
  description: string;
  videoLink: string;
  firstExerciseMetric: Metric;
  secondExerciseMetric: Metric;
};

export type ProgramExercise = {
  id: number;
  name: string;
  description: string;
  videoLink: string;
  firstExerciseMetric: ExerciseMetric;
  secondExerciseMetric?: ExerciseMetric;
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
