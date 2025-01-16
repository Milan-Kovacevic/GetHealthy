import { Exercise, ExerciseSet } from "./exercise";

export type WorkoutSummary = {
  id: number; // Program on schedule id
  traineeExercisingId?: number; // Will be present if trainee already started workout...
  dateTaken?: string; // -||-
  programExercises: WorkoutExercise[];
};

// This model combines exercise data and exercise feedback data ...
export type WorkoutExercise = Omit<Exercise, "exerciseSets"> & {
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

//TODOO
// export type TraineeExercising = {
//   traineeExercisingId: number;
//   programName: string;
//   trainerName: string;
//   programCategories: Category[];
//   programDifficulty: ProgramDifficulty;
//   exercises: Exercise[];
// };

export type TraineeExercisingRequest = {
  programId: number;
  userId: number;
};

export type ExerciseSetFeedbackRequest = {
  exerciseFeedbackId: number;
  skipped: boolean;
  completed: boolean;
  firstMetricValueFeedback: string;
  secondMetricValueFeedback?: string;
};

export type ExerciseFeedbackRequest = {
  skipped: boolean;
  traineeExercisingId: number;
  exerciseId: number;
  programExerciseId: number;
};
