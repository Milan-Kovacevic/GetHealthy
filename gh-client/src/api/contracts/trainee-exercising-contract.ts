import { ProgramDifficulty } from "../enums/program-difficulty";
import { CategoryDTO } from "./category-contract";
import { ProgramExerciseDetailsDTO } from "./program-exercise-contract";

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
