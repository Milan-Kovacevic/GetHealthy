import { ProgramExerciseDetailsDTO } from "./program-exercise-contract";
import { TrainingProgramDTO } from "./training-program-contract";

export type SingleTrainingProgramDTO = TrainingProgramDTO & {
  totalRates: number;
  currentlyEnrolled: number;
  joined?: boolean;
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
