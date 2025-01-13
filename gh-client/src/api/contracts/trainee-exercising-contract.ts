import { ProgramDifficulty } from "../enums/program-difficulty";
import { CategoryDTO } from "./category-contract";
import { ProgramExerciseDetailsDTO } from "./program-exercise-contract";

//TODOO
export type TraineeExercisingDTO = {
  traineeExercisingId: number;
  programName: string;
  trainerName: string;
  programCategories: CategoryDTO[];
  programDifficulty: ProgramDifficulty;
  exercises: ProgramExerciseDetailsDTO[];
};

export type TraineeExercisingRequestDTO = {
  programId: number;
  userId: number;
};

export type ExerciseSetFeedbackRequestDTO = {
  exerciseFeedbackId: number;
  skipped: boolean;
  completed: boolean;
  firstMetricValueFeedback: string;
  secondMetricValueFeedback?: string;
};

export type ExerciseFeedbackRequestDTO = {
  skipped: boolean;
  traineeExercisingId: number;
  exerciseId: number;
  programExerciseId: number;
};
