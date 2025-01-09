import { Page } from "../contracts/pageable-contract";

export type ProgramRequest = {
  programId: number;
  traineeId: number;
  markRead: boolean;
  submissionDate: string;
  note?: string;
  trainingProgramId: number;
  trainingProgramName: string;
  traineeFirstName: string;
  traineeLastName: string;
  traineeGender: string;
};

export type PageableProgramRequests = Page<ProgramRequest>;

export type SendProgramApplication = {
  programId: number;
  traineeId: number;
  note: string;
};

export type ProcessProgramApplication = {
  programId: number;
  userId: number;
  approve: boolean;
};
