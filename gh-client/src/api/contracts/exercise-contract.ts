export type ProgramExerciseDTO = {
  id: number;
  position: number;
  name: string;
  description: string;
  videoLink: string;
  firstMetric: ExerciseMetricDTO;
  secondMetric?: ExerciseMetricDTO;
};

export type ExerciseMetricDTO = {
  id: number;
  name: string;
  unit: string;
};
