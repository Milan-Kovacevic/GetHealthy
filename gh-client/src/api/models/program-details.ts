import { Page } from "../contracts/pageable-contract";
import { ProgramExercise } from "./exercise";

export type SingleProgramDetails = {
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
