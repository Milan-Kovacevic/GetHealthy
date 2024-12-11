import { Metric } from "./metric";

export type Exercise = {
    id: number;
    exerciseName: string;
    description: string;
    videoLink: string;
    firstExerciseMetric: Metric;
    secondExerciseMetric: Metric;
  };
  