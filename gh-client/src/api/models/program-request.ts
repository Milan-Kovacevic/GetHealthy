import { Page } from "../contracts/pageable-contract";

export type ProgramRequest = {
  id: number;
  markRead: boolean;
  submissionDate: string;
  note: string;
  trainingProgramId: number;
  trainingProgramName: string;
  traineeFirstName: string;
  traineeLastName: string;
  traineeGender: number;
};

export type PageableProgramRequests = Page<ProgramRequest>;
