import { Page } from "./pageable-contract";

export type TrainingProgramApplicationDTO = {
  programId: number;
  traineeId: number;
  markRead: boolean;
  submissionDate: string;
  note: string;
  trainingProgramId: number;
  trainingProgramName: string;
  traineeFirstName: string;
  traineeLastName: string;
  traineeGender: string;
};

export type PageableProgramApplicationsDTO =
  Page<TrainingProgramApplicationDTO>;

export type CreateTrainingProgramApplicationDTO = {
  programId: number;
  traineeId: number;
  note: string;
};

export type ProcessTrainingProgramApplicationDTO = {
  programId: number;
  userId: number;
  approve: boolean;
};
