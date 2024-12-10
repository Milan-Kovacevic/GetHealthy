import { Page } from "./pageable-contract";

export type ProgramCommentDTO = {
  commentId: number;
  content: string;
  datePosted: string;
  authorId: number;
  authorFirstName: string;
  authorLastName: string;
};

export type SendProgramCommentDTO = {
  content: string;
  authorId: number;
};

export type PageableProgramCommentsDTO = Page<ProgramCommentDTO>;

export type ProgramRatingDTO = {
  ratingId: number;
  rate: number;
  traineeId: number;
};

export type SendProgramRatingDTO = {
  traineeId: number;
  rate: number;
};
