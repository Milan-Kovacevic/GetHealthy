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
  biography: string;
  contactInfo: string;
  user:User;

  email: string;
  profilePictureFilePath: string;
  /// ??? Only basic info ...
};

export type User = 
{
  firstName: string;
  lastName: string;
}

export type PageableTrainingPrograms = Page<TrainingProgram>;

export type ProgramDifficulty = "Beginner" | "Intermediate" | "Advanced";
