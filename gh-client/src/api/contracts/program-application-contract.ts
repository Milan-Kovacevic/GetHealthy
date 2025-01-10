import { Page } from "./pageable-contract";

export type ProgramApplicationDTO = {
  programId: number;
  traineeId: number;
  submissionDate: string;
  note?: string;
  markRead: boolean;
  trainingProgramName: string;
  traineeFirstName: string;
  traineeLastName: string;
  traineeProfilePictureFilePath?: string;
};

export type ProgramApplicationDetailsDTO = ProgramApplicationDTO & {
  traineeDateOfBirth?: string;
  traineeGender?: string;
  traineeHeight?: number;
  traineeWeight?: number;
  traineeMedicalHistory?: string;
};

export type PageableProgramApplicationsDTO = Page<ProgramApplicationDTO>;

export type CreateTrainingProgramApplicationDTO = {
  programId: number;
  traineeId: number;
  note: string;
};

export type ProcessTrainingProgramApplicationDTO = {
  approve: boolean;
};
