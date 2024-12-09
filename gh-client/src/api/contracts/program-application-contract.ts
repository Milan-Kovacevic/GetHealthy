import { Page } from "./pageable-contract";

export type TrainingProgramApplication = {
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

export type PageableProgramApplications = Page<TrainingProgramApplication>;
