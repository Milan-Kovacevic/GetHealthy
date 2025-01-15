import { ProgramDifficulty } from "../enums/program-difficulty";
import { CategoryDTO } from "./category-contract";
import { ExerciseDTO } from "./exercise-contract";
import { ProgramExerciseDetailsDTO } from "./program-exercise-contract";

export type StartWorkoutRequestDTO = {
  id: number; // Program on schedule id..
  traineeId: number;
};

export type WorkoutSummaryDTO = {
  id: number; // Program on schedule id
  traineeExercisingId?: number; // Will be present if trainee already started workout...
  programExercises: WorkoutExerciseDTO[];
};

export type WorkoutExerciseDTO = ExerciseDTO & {
  exerciseFeedbackId?: number;
  exerciseSetsFeedback?: WorkoutSetDTO[];
  skipped?: boolean;
};

export type WorkoutSetDTO = {
  setFeedbackId: number;
  firstMetricValueFeedback?: string;
  secondMetricValueFeedback?: string;
  skipped?: boolean;
  completed?: boolean;
};

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
