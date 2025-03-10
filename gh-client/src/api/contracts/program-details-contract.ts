import { ProgramExerciseDetailsDTO } from "./program-exercise-contract";
import { TrainingProgramDTO } from "./training-program-contract";

export type SingleTrainingProgramDTO = TrainingProgramDTO & {
  totalRates: number;
  requirements: string;
  trainingDuration: number;
  exercises: ProgramExerciseDetailsDTO[];
};

export type TraineeProgramStatusDTO = "JOINED" | "NOT_JOINED" | "PENDING";

export type SingleTrainingProgramInfoDTO = TrainingProgramDTO & {
  totalRates: number;
  joined?: boolean;
  status?: TraineeProgramStatusDTO;
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
  certificateFilePath?: string; //todoo
};
