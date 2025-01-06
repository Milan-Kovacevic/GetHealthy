import { Page } from "./pageable-contract";

export type ExerciseDTO = {
  id: number;
  exerciseName: string;
  description: string;
  videoLink: string;
  firstExerciseMetric: ExerciseMetricDTO;
  secondExerciseMetric: ExerciseMetricDTO;
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
