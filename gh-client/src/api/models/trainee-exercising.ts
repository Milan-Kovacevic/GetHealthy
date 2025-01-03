import { Category } from "./category";
import { ExerciseMetric } from "./exercise";
import { ProgramDifficulty } from "./training-program";

export type TraineeExercising = {
    traineeExercisingId: number;
    programName: string;
    trainerName: string;
    programCategories: Category[];
    programDifficulty: ProgramDifficulty;
    exercises: Exercise[];
}

export type TraineeExercisingRequest = {
    programId: number;
    userId: number;
}

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
  
  