import { Page } from "./pageable-contract";

export type TrainingProgramApplicationDTO = {
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

export type PageableProgramApplicationsDTO =
  Page<TrainingProgramApplicationDTO>;
