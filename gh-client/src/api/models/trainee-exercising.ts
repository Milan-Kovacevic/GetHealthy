import { ExerciseSet } from "./exercise";
import { ProgramExerciseDetails } from "./program-exercise";

export type GenerateWorkoutSummary = {
  traineeId: number;
  programScheduleId: number;
};

export type WorkoutSummary = {
  id: number; // Program on schedule id
  workoutId?: number; // traineeExercisingId - Will be present if trainee already started workout...
  dateTaken?: string; // -||-
  programExercises: WorkoutExercise[];
};

// This model combines exercise data and exercise feedback data ...
export type WorkoutExercise = Omit<ProgramExerciseDetails, "exerciseSets"> & {
  exerciseFeedbackId?: number;
  exerciseSetsFeedback: WorkoutSet[];
  skipped?: boolean;
};

export type WorkoutSet = ExerciseSet & {
  setFeedbackId?: number;
  firstMetricValueFeedback?: string;
  secondMetricValueFeedback?: string;
  skipped?: boolean;
  completed?: boolean;
};

export type StartWorkoutRequest = {
  traineeId: number;
  programScheduleId: number;
};
export type StartWorkoutResponse = {
  workoutId: number; // traineeExercisingId
  dateTaken: string;
};

export type ExerciseFeedbackRequest = {
  programExerciseId: number;
};
export type ExerciseFeedbackResponse = {
  exerciseFeedbackId: number;
};

export type SkipExerciseSetFeedbackRequest = {
  exerciseSetId: number;
};
export type SendExerciseSetFeedbackRequest = SkipExerciseSetFeedbackRequest & {
  completed: boolean; // Trainee finished complete set
  firstMetricValueFeedback?: string; // Optional value if trainee didnt complete 100% of set, or above 100%
  secondMetricValueFeedback?: string; // Optional value if trainee didnt complete 100% of set, or above 100%
};
export type ExerciseSetFeedbackResponse = {
  setFeedbackId: number;
};
