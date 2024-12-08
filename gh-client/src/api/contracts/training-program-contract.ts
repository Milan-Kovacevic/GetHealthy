import { Category } from "./category-contract";
import { Page } from "./pageable-contract";

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
