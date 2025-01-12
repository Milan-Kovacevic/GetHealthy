import { Page } from "../contracts/pageable-contract";
import { ProgramDifficulty } from "../enums/program-difficulty";
import { Category } from "./category";

export type TrainingProgram = {
  id: number;
  name: string;
  difficulty: ProgramDifficulty;
  description: string;
  createdAt: string;
  imageFilePath?: string;
  rating?: number;
  categories: Category[];
  trinerId: number;
  trainerFirstName: string;
  trainerLastName: string;
};

export type PageableTrainingPrograms = Page<TrainingProgram>;

export type TrainerProgram = {
  id: number;
  name: string;
  createdAt: string;
  description: string;
  trainerName: string;
};

export type PageableTrainerPrograms = Page<TrainerProgram>;

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
