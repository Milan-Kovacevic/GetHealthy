import { ExerciseMetricDTO, ExerciseSetDTO } from "./exercise-contract";

export type AddTrainingProgramExerciseDTO = {
  exerciseId: number;
  position: number;
  programId: number;
  exerciseSets: {
    restTime: number;
    firstMetricValue: string;
    secondMetricValue: string;
  }[];
};

export type ProgramExerciseDetailsDTO = ProgramExerciseDTO & {
  description: string;
  videoLink: string;
  firstExerciseMetric: ExerciseMetricDTO;
  secondExerciseMetric?: ExerciseMetricDTO;
  exerciseSets: ExerciseSetDTO[];
};

export type ProgramExerciseDTO = {
  id: number;
  name: string;
};
