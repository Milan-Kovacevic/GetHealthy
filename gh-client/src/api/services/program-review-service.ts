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
  return sendAxiosRequest<void, PageableProgramCommentsDTO>({
    method: "GET",
    url: url,
  }).then((response) => response.data as PageableProgramComments);

  // Mock response for now
  // return Promise.resolve<PageableProgramComments>({
  //   content: [
  //     {
  //       commentId: 1,
  //       authorId: 1,
  //       authorFirstName: "Marko",
  //       authorLastName: "Markovic",
  //       content: "This is the first comment",
  //       datePosted: "datum1...",
  //     },
  //     {
  //       commentId: 2,
  //       authorId: 2,
  //       authorFirstName: "Janko",
  //       authorLastName: "Jankovic",
  //       content: "This is the second comment",
  //       datePosted: "datum2...",
  //     },
  //   ],
  //   empty: false,
  //   first: true,
  //   last: true,
  //   number: 1,
  //   numberOfElements: 3,
  //   pageable: {
  //     offset: 0,
  //     paged: true,
  //     pageNumber: 1,
  //     pageSize: 3,
  //     sort: {
  //       empty: true,
  //       sorted: false,
  //       unsorted: true,
  //     },
  //   },
  //   size: 3,
  //   totalElements: 3,
  //   totalPages: 1,
  // });
};

const sendTrainingProgramComment = async (
  programId: number,
  comment: SendProgramComment
) => {
  var userId = 1;
  var url = ApiEndpoints.TrainingProgramComments.replace(
    "{programId}",
    `${programId}`
  );

  return sendAxiosRequest<SendProgramCommentDTO, ProgramCommentDTO>({
    method: "POST",
    url: url,
    data: { content: comment.content, authorId: userId },
  }).then((response) => response.data as ProgramComment);
};

const getTrainingProgramRating = async (programId: number) => {
  var userId = "1";
  var url = ApiEndpoints.TrainingProgramUserRating.replace(
    "{programId}",
    `${programId}`
  ).replace("{userId}", userId);

  return sendAxiosRequest<void, ProgramRatingDTO>({
    method: "GET",
    url: url,
  }).then((response) => response.data as ProgramRating);
};

const sendTrainingProgramRating = async (
  programId: number,
  rating: SendProgramRating
) => {
  var userId = 1;
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
