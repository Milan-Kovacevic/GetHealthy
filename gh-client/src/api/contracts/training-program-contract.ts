import { CategoryDTO } from "./category-contract";
import { Page } from "./pageable-contract";

export type TrainingProgramDTO = {
  id: number;
  name: string;
  difficulty: ProgramDifficultyDTO;
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
};

export type PageableTrainingProgramsDTO = Page<TrainingProgramDTO>;

export type ProgramDifficultyDTO = "Beginner" | "Intermediate" | "Advanced";

export type TrainerProgramDTO = {
  id: number;
  name: string;
  createdAt: string;
};

export type FeaturedTrainingProgramDTO = {
  id: number;
  name: string;
  difficulty: ProgramDifficultyDTO;
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
