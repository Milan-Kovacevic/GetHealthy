import { Page } from "./pageable-contract";

export type ExerciseDTO = {
  id: number;
  exerciseName: string;
  description: string;
  videoLink: string;
  firstExerciseMetric: ExerciseMetricDTO;
  secondExerciseMetric: ExerciseMetricDTO;
  exerciseSets: ExerciseSetDTO[];
};

export type ExerciseMetricDTO = {
  id: number;
  name: string;
  unit: string;
};

export type ExerciseSetDTO = {
  id: number;
  restTime: number;
  firstMetricValue: string;
  secondMetricValue: string;
};

export type PageableExercisesDTO = Page<ExerciseDTO>;

export type ExerciseListingDTO = {
  id: number;
  exerciseName: string;
  firstExerciseMetric: ExerciseMetricDTO;
  secondExerciseMetric: ExerciseMetricDTO;
};

export type PageableExerciseListingDTO = Page<ExerciseListingDTO>;
