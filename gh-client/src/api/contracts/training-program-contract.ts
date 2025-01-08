import { ProgramDifficulty } from "../enums/program-difficulty";
import { CategoryDTO } from "./category-contract";
import { ExerciseDTO } from "./exercise-contract";
import { Page } from "./pageable-contract";

export type TrainingProgramDTO = {
  id: number;
  name: string;
  difficulty: ProgramDifficulty;
  trainingDuration: number;
  description: string;
  requirements?: string;
  createdAt: string;
  categories: CategoryDTO[];
  rating?: number;
  imageFilePath?: string;
  trinerId: number;
  trainerFirstName: string;
  trainerLastName: string;
  exercises: ExerciseDTO[];
};

export type PageableTrainingProgramsDTO = Page<TrainingProgramDTO>;

export type TrainerProgramDTO = {
  id: number;
  name: string;
  createdAt: string;
};

export type PageableTrainerProgramsDTO = Page<TrainerProgramDTO>;

export type FeaturedTrainingProgramDTO = {
  id: number;
  name: string;
  difficulty: ProgramDifficulty;
  description: string;
  createdAt: string;
  categories: CategoryDTO[];
  rating?: number;
  imageFilePath?: string;
  participants: number;
  trinerId: number;
  trainerFirstName: string;
  trainerLastName: string;
};
