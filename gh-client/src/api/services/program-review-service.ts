import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {
  PageableProgramCommentsDTO,
  ProgramCommentDTO,
  SendProgramCommentDTO,
  SendProgramRatingDTO,
  ProgramRatingDTO,
} from "../contracts/program-review-contract";
import {
  PageableProgramComments,
  ProgramComment,
  ProgramRating,
  SendProgramComment,
  SendProgramRating,
} from "../models/program-review";
import { delay } from "@/lib/utils";

const getPageableProgramComments = async (
  programId: number,
  page: number = 0,
  pageSize: number = 6
) => {
  var url = ApiEndpoints.TrainingProgramComments.replace(
    "{programId}",
    `${programId}`
  );
  url += `?page=${page}&size=${pageSize}`;
  await delay(1500);
  return sendAxiosRequest<void, PageableProgramCommentsDTO>({
    method: "GET",
    url: url,
  }).then((response) => response.data as PageableProgramComments);
};

const sendTrainingProgramComment = async (
  userId: number,
  programId: number,
  comment: SendProgramComment
) => {
  var url = ApiEndpoints.TrainingProgramComments.replace(
    "{programId}",
    `${programId}`
  );
  await delay(1500);
  return sendAxiosRequest<SendProgramCommentDTO, ProgramCommentDTO>({
    method: "POST",
    url: url,
    data: { content: comment.content, authorId: userId },
  }).then((response) => response.data as ProgramComment);
};

const getTrainingProgramRating = async (userId: number, programId: number) => {
  var url = ApiEndpoints.TrainingProgramUserRating.replace(
    "{programId}",
    `${programId}`
  ).replace("{userId}", `${userId}`);

  return sendAxiosRequest<void, ProgramRatingDTO>({
    method: "GET",
    url: url,
  }).then((response) => response.data as ProgramRating);
};

const sendTrainingProgramRating = async (
  userId: number,
  programId: number,
  rating: SendProgramRating
) => {
  var url = ApiEndpoints.TrainingProgramRatings.replace(
    "{programId}",
    `${programId}`
  );

  return sendAxiosRequest<SendProgramRatingDTO, ProgramRatingDTO>({
    method: "POST",
    url: url,
    data: { rate: rating.rate, traineeId: userId },
  }).then((response) => response.data as ProgramRating);
};

export {
  getPageableProgramComments,
  sendTrainingProgramComment,
  sendTrainingProgramRating,
  getTrainingProgramRating,
};
