import { ProgramDifficulty } from "../enums/program-difficulty";
import { CategoryDTO } from "./category-contract";
import { ProgramExerciseDetailsDTO } from "./program-exercise-contract";

export type SingleTrainingProgramDTO = {
  id: number;
  name: string;
  imageFilePath?: string;
  difficulty: ProgramDifficulty;
  rating: number;
  createdAt: string;
  totalRates: number;
  description: string;
  trainerFirstName: string;
  trainerLastName: string;
  categories: CategoryDTO[];
  currentlyEnrolled: number;
};

export type SingleProgramDetailsDTO = {
  id: number;
  requirements: string;
  trainingDuration: number;
  exercises: ProgramExerciseDetailsDTO[];
};

export type SingleProgramTrainerDTO = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  gender?: string;
  profilePictureFilePath?: string;
  contactInfo?: string;
  biography?: string;
};
