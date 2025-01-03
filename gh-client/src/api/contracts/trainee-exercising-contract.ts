import { CategoryDTO } from "./category-contract";
import { ProgramExerciseDTO } from "./exercise-contract";
import { ProgramDifficultyDTO } from "./training-program-contract";

export type TraineeExercisingDTO = {
    traineeExercisingId: number;
    programName: string;
    trainerName: string;
    programCategories: CategoryDTO[];
    programDifficulty: ProgramDifficultyDTO;
    exercises: ProgramExerciseDTO[];
}

export type TraineeExercisingRequestDTO = {
    programId: number;
    userId: number;
}