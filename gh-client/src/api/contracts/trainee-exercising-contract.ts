import { ExerciseSetDTO } from "./exercise-contract";
import { ProgramExerciseDetailsDTO } from "./program-exercise-contract";

export type GenerateWorkoutSummaryDTO = {
  traineeId: number;
  programScheduleId: number;
};

export type WorkoutSummaryDTO = {
  id: number; // Program on schedule id
  traineeExercisingId?: number; // Will be present if trainee had already started workout...
  dateTaken?: string; // -||-
  programExercises: WorkoutExerciseDTO[];
};

export type WorkoutExerciseDTO = Omit<
  ProgramExerciseDetailsDTO,
  "exerciseSets"
> & {
  exerciseFeedbackId?: number;
  exerciseSetsFeedback?: WorkoutSetDTO[];
  skipped?: boolean;
};

export type WorkoutSetDTO = ExerciseSetDTO & {
  setFeedbackId?: number;
  firstMetricValueFeedback?: string;
  secondMetricValueFeedback?: string;
  skipped?: boolean;
  completed?: boolean;
};

export type StartWorkoutRequestDTO = {
  traineeId: number;
  programScheduleId: number;
};
export type StartWorkoutResponseDTO = {
  traineeExercisingId: number;
  dateTaken: string;
};

export type ExerciseFeedbackRequestDTO = {
  programExerciseId: number;
};
export type ExerciseFeedbackResponseDTO = {
  exerciseFeedbackId: number;
};

export type SkipExerciseSetFeedbackRequestDTO = {
  exerciseSetId: number;
};
export type SendExerciseSetFeedbackRequestDTO =
  SkipExerciseSetFeedbackRequestDTO & {
    completed: boolean; // Trainee finished complete set
    firstMetricValueFeedback?: string; // Optional value if trainee doesn't complete 100% of set, or above 100%
    secondMetricValueFeedback?: string; // Optional value if trainee doesn't complete 100% of set, or above 100%
  };
export type ExerciseSetFeedbackResponseDTO = {
  setFeedbackId: number;
};
