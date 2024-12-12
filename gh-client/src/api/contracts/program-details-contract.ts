import { CategoryDTO } from "./category-contract";
import { ProgramExerciseDTO } from "./exercise-contract";
import { ProgramDifficultyDTO } from "./training-program-contract";

export type SingleTrainingProgramDTO = {
  id: number;
  name: string;
  programPictureFilePath: string; // ???
  difficulty: ProgramDifficultyDTO;
  averageRate: number;
  totalRates: number;
  description: string;
  trainerFirstName: string;
  trainerLastName: string;
  categories: CategoryDTO[];
  enrolled: number;
};

export type SingleProgramDetailsDTO = {
  requirements: string;
  estimatedWorkoutTime: number;
  exercises: ProgramExerciseDTO[];
};

export type SingleProgramTrainerDTO = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  gender?: number;
  profilePictureFilePath?: string;
  contactInfo?: string;
  biography?: string;
};
export type ProgramParticipantDTO = {};
