import { ProgramDifficulty } from "../enums/program-difficulty";
import { Category } from "./category";
import { ExerciseMetric } from "./exercise";

//TODOO
export type TraineeExercising = {
  traineeExercisingId: number;
  programName: string;
  trainerName: string;
  programCategories: Category[];
  programDifficulty: ProgramDifficulty;
  exercises: Exercise[];
};

export type TraineeExercisingRequest = {
  programId: number;
  userId: number;
};

export type Set = {
  id: number;
  restTime: number;
  firstMetricValue: string;
  secondMetricValue?: string;
  status: "pending" | "completed" | "skipped";
};

export type Exercise = {
  id: number;
  name: string;
  description: string;
  videoLink: string;
  firstExerciseMetric: ExerciseMetric;
  secondExerciseMetric?: ExerciseMetric;
  exerciseSets: Set[];
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
