export type ProgramExercise = {
  id: number;
  name: string;
  description: string;
  videoLink: string;
  firstMetric: ExerciseMetric;
  secondMetric?: ExerciseMetric;
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
  secondMetricValue: string;
};
