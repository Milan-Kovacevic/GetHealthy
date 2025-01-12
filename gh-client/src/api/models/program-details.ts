import { Page } from "../contracts/pageable-contract";
import { ProgramDifficulty } from "../enums/program-difficulty";
import { Category } from "./category";
import { ProgramExerciseDetails } from "./program-exercise";

export type SingleProgramDetails = {
  id: number;
  requirements: string;
  trainingDuration: number;
  exercises: ProgramExerciseDetails[];
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
  rating: number;
  createdAt: string;
  totalRates: number;
  description: string;
  trainerFirstName: string;
  trainerLastName: string;
  categories: Category[];
  currentlyEnrolled: number;
  joined?: boolean;
};

export type SingleProgramTrainer = {
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

export type MoveProgramParticipant = {
  programId: number;
  newProgramId: number;
  traineeId: number;
  trainerId: number;
};
