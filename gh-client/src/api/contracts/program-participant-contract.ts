import { Page } from "./pageable-contract";

export type ProgramParticipantDetailsDTO = {
  id: number;
  firstName: string;
  lastName: string;
  gender?: number;
  dateOfBirth?: string;
  profilePictureFilePath?: string;
  height?: number;
  weight?: number;
  medicalHistory?: string;
  joinDate: string;
};
export type PageableProgramParticipantsDTO = Page<ProgramParticipantDetailsDTO>;

export type MoveProgramParticipantDTO = {
  newProgramId: number;
  trainerId: number;
};

export type ProgramParticipantDTO = {
  id: number;
  firstName: string;
  lastName: string;
  gender?: number;
  dateOfBirth?: string;
  joinDate: string;
};
