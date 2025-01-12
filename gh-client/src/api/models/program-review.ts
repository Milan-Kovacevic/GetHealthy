import { Page } from "../contracts/pageable-contract";

export type ProgramComment = {
  commentId: number;
  content: string;
  datePosted: string;
  authorId: number;
  authorFirstName: string;
  authorLastName: string;
  authorProfilePictureFilePath?: string;
};

export type PageableProgramComments = Page<ProgramComment>;

export type SendProgramComment = {
  content: string;
};

export type ProgramRating = {
  ratingId: number;
  rate: number;
  traineeId: number;
};

export type SendProgramRating = {
  rate: number;
};
