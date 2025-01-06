import { CategoryDTO } from "./category-contract";
import { ProgramDifficultyDTO } from "./training-program-contract";
import { ProgramExerciseDetailsDTO } from "./program-exercise-contract";

export type TraineeExercisingDTO = {
  traineeExercisingId: number;
  programName: string;
  trainerName: string;
  programCategories: CategoryDTO[];
  programDifficulty: ProgramDifficultyDTO;
  exercises: ProgramExerciseDetailsDTO[];
};

export type TraineeExercisingRequestDTO = {
  programId: number;
  userId: number;
};
