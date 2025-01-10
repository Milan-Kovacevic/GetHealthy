import { Page } from "../contracts/pageable-contract";

export type ProgramRequest = {
  programId: number;
  traineeId: number;
  submissionDate: string;
  note?: string;
  markRead: boolean;
  programName: string;
  traineeFirstName: string;
  traineeLastName: string;
  traineeProfilePictureFilePath?: string;
};

export type ProgramRequestDetails = ProgramRequest & {
  traineeDateOfBirth?: string;
  traineeGender?: string;
  traineeHeight?: number;
  traineeWeight?: number;
  traineeMedicalHistory?: string;
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
