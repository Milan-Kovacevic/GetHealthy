import { CategoryDTO } from "./category-contract";
import { ProgramExerciseDTO } from "./exercise-contract";
import { Page } from "./pageable-contract";
import { ProgramDifficultyDTO } from "./training-program-contract";

export type SingleTrainingProgramDTO = {
  id: number;
  name: string;
  imageFilePath?: string;
  difficulty: ProgramDifficultyDTO;
  averageRate: number;
  totalRates: number;
  description: string;
  trainerFirstName: string;
  trainerLastName: string;
  categories: CategoryDTO[];
  currentlyEnrolled: number;
};

export type SingleProgramDetailsDTO = {
  requirements: string;
  trainingDuration: number;
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

export type SingleProgramParticipantDTO = {
  id: number;
  firstName: string;
  lastName: string;
  gender?: number;
  dateOfBirth?: string;
  profilePictureFilePath?: string;
  height?: number;
  weight?: number;
  medicalHistory?: string;
  joinDate: string;
};
export type PageableProgramParticipantsDTO = Page<SingleProgramParticipantDTO>;

export type MoveProgramParticipantDTO = {
  newProgramId: number;
  trainerId: number;
};
