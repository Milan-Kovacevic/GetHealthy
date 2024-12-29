import { Page } from "../contracts/pageable-contract";
import { Category } from "./category";

export type TrainingProgram = {
  id: number;
  name: string;
  difficulty: ProgramDifficulty;
  trainingDuration: number;
  description: string;
  requirements?: string;
  createdAt: string;
  categories: Category[];
  rating?: number;
  imageFilePath?: string;
  trinerId: number;
  trainerFirstName: string;
  trainerLastName: string;
};

export type PageableTrainingPrograms = Page<TrainingProgram>;

export type ProgramDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type TrainerProgram = {
  id: number;
  name: string;
  createdAt: string;
};

export type ProgramFilters = {
  categories: string[];
  difficulty: number;
  ratingRange: number[];
  participantsRange: number[];
  sort: string;
};

export type FeaturedTrainingProgram = {
  id: number;
  name: string;
  difficulty: ProgramDifficulty;
  description: string;
  createdAt: string;
  categories: Category[];
  rating?: number;
  imageFilePath?: string;
  participants: number;
  trinerId: number;
  trainerFirstName: string;
  trainerLastName: string;
};
