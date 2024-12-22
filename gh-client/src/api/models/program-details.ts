import { Page } from "../contracts/pageable-contract";
import { Category } from "./category";
import { ProgramExercise } from "./exercise";
import { ProgramDifficulty } from "./training-program";

export type SingleProgramDetails = {
  id: number;
  requirements: string;
  trainingDuration: number;
  exercises: ProgramExercise[];
};

export type SingleProgramParticipant = {
  id: number;
  firstName: string;
  lastName: string;
  gender?: string;
  dateOfBirth?: string;
  profilePictureFilePath?: string;
  height?: number;
  weight?: number;
  medicalHistory?: string;
  joinDate: string;
};

export type PageableProgramParticipants = Page<SingleProgramParticipant>;

export type SingleTrainingProgram = {
  id: number;
  name: string;
  imageFilePath: string;
  difficulty: ProgramDifficulty;
  averageRate: number;
  totalRates: number;
  description: string;
  trainerFirstName: string;
  trainerLastName: string;
  categories: Category[];
  currentlyEnrolled: number;
};

export type SingleProgramTrainer = {
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

export type MoveProgramParticipant = {
  programId: number;
  newProgramId: number;
  traineeId: number;
  trainerId: number;
};
