import { Page } from "../contracts/pageable-contract";
import { Category } from "./category";

export type TrainingProgram = {
  id: number;
  name: string;
  difficulty: number;
  trainingDuration: number;
  description: string;
  requirements: string;
  createdAt: string;
  categories: Category[];
  rating: number;
  user: ProgramTrainer;
};

export type ProgramTrainer = {
  id: number;
  firstName: string;
  lastName: string;
  biography: string;
  contactInfo: string;

  /// ??? Only basic info ...
};

export type PageableTrainingPrograms = Page<TrainingProgram>;
