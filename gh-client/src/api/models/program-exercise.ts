import { ExerciseMetric, ExerciseSet } from "./exercise";

export type ProgramExerciseDetails = ProgramExercise & {
  description: string;
  videoLink: string;
  firstExerciseMetric: ExerciseMetric;
  secondExerciseMetric?: ExerciseMetric;
  exerciseSets: ExerciseSet[];
};

export type ProgramExercise = {
  id: number;
  name: string;
};
