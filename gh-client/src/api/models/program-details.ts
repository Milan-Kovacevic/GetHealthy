import { Page } from "../contracts/pageable-contract";
import { ProgramExerciseDetails } from "./program-exercise";
import { TrainingProgram } from "./training-program";

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

export type SingleTrainingProgramInfo = TrainingProgram & {
  totalRates: number;
  currentlyEnrolled: number;
  joined?: boolean;
};

export type SingleTrainingProgram = TrainingProgram & {
  totalRates: number;
  currentlyEnrolled: number;
  requirements: string;
  trainingDuration: number;
  exercises: ProgramExerciseDetails[];
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
