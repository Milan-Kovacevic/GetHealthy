import { CategoryDTO } from "./category-contract";
import { Page } from "./pageable-contract";

export type TrainingProgramDTO = {
  id: number;
  name: string;
  difficulty: number;
  trainingDuration: number;
  description: string;
  requirements: string;
  createdAt: string;
  categories: CategoryDTO[];
  rating: number;
  user: ProgramTrainerDTO;
};

export type ProgramTrainerDTO = {
  id: number;
  firstName: string;
  lastName: string;
  biography: string;
  contactInfo: string;

  /// ??? Only basic info ...
};

export type PageableTrainingProgramsDTO = Page<TrainingProgramDTO>;
