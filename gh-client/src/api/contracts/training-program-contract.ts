import { CategoryDTO } from "./category-contract";
import { Page } from "./pageable-contract";

export type TrainingProgramDTO = {
  id?: number;
  name: string;
  difficulty: number;
  trainingDuration: number;
  description: string;
  requirements: string | undefined;
  createdAt?: string;
  categories: CategoryDTO[];
  rating?: number;
  user?: ProgramTrainerDTO;
  userId?:number;
};

export type ProgramTrainerDTO = {
  id: number;
  user: UserDTO;
  biography: string;
  contactInfo: string;
  email: string;
  profilePictureFilePath: string;
  /// ??? Only basic info ...
};

export type UserDTO = {
  firstName: string;
  lastName: string;
};

export type PageableTrainingProgramsDTO = Page<TrainingProgramDTO>;

export type ProgramDifficultyDTO = "Beginner" | "Intermediate" | "Advanced";

export type TrainerProgramDTO = {
  id: number;
  name: string;
  createdAt: string;
};
