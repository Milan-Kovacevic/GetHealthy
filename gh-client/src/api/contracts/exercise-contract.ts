import { MetricDTO } from "./metric-contract";

export type ExerciseDTO = {
    id: number;
    exerciseName: string;
    description: string;
    videoLink: string;
    firstExerciseMetric: MetricDTO;
    secondExerciseMetric: MetricDTO;
  };
  