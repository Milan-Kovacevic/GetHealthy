import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {
  SingleProgramDetailsDTO,
  SingleTrainingProgramInfoDTO,
} from "../contracts/program-details-contract";
import {
  MoveProgramParticipant,
  PageableProgramParticipants,
  SingleProgramDetails,
  SingleTrainingProgramInfo,
} from "../models/program-details";
import { delay, pictureUrl } from "@/lib/utils";
import {
  SingleTrainingProgramDTO,
  SingleProgramTrainerDTO,
} from "../contracts/program-details-contract";
import {
  SingleTrainingProgram,
  SingleProgramTrainer,
} from "../models/program-details";
import {
  MoveProgramParticipantDTO,
  PageableProgramParticipantsDTO,
} from "../contracts/program-participant-contract";

const getSingleTrainingProgram = async (programId: number) => {
  var url = ApiEndpoints.SingleTrainingProgram.replace(
    "{programId}",
    `${programId}`
  );
  await delay(500);
  return sendAxiosRequest<void, SingleTrainingProgramDTO>({
    method: "GET",
    url: url,
    requireAuth: true,
  }).then((response) => {
    return {
      ...response.data,
      imageFilePath: pictureUrl(response.data.imageFilePath),
    } as SingleTrainingProgram;
  });
};

const getSingleTrainingProgramInfo = async (programId: number) => {
  var url = ApiEndpoints.SingleTrainingProgram.replace(
    "{programId}",
    `${programId}`
  );
  url += "/info";
  await delay(500);
  return sendAxiosRequest<void, SingleTrainingProgramInfoDTO>({
    method: "GET",
    url: url,
    requireAuth: true,
  }).then((response) => {
    return {
      ...response.data,
      status: response.data.status ?? "NOT_JOINED",
    } as SingleTrainingProgramInfo;
  });
};

const getSingleProgramTrainer = async (programId: number) => {
  var url = ApiEndpoints.SingleTrainingProgram.replace(
    "{programId}",
    `${programId}`
  );
  url += `/trainer-info`;
  await delay(500);
  return sendAxiosRequest<void, SingleProgramTrainerDTO>({
    method: "GET",
    url: url,
    requireAuth: true,
  }).then((response) => response.data as SingleProgramTrainer);
};

const getSingleTrainingProgramDetails = async (id: number) => {
  var url = ApiEndpoints.SingleTrainingProgram.replace("{programId}", `${id}`);
  url += "/details";

  await delay(500);
  return sendAxiosRequest<void, SingleProgramDetailsDTO>({
    method: "GET",
    url: url,
    requireAuth: true,
  }).then((response) => {
    // Perform neccessary mappings etc...
    return response.data as SingleProgramDetails;
  });
};

const getPageableTrainingProgramParticipants = async (
  programId: number,
  page: number = 0,
  filter: string = "",
  pageSize: number = 5
) => {
  var url = ApiEndpoints.SingleTrainingProgramParticipants.replace(
    "{programId}",
    `${programId}`
  );
  url += `?filter=${filter}&page=${page}&size=${pageSize}`;
  await delay(500);
  return sendAxiosRequest<void, PageableProgramParticipantsDTO>({
    method: "GET",
    url: url,
    requireAuth: true,
  }).then((response) => {
    // Perform neccessary mappings etc...
    return response.data as PageableProgramParticipants;
  });
};

const removeParticipantFromTrainingProgram = async (
  programId: number,
  traineeId: number
) => {
  var url = ApiEndpoints.SingleTrainingProgramParticipants.replace(
    "{programId}",
    `${programId}`
  );
  url += `/${traineeId}`;

  await delay(500);
  return sendAxiosRequest<void, void>({
    method: "DELETE",
    url: url,
    requireAuth: true,
  });
};

const moveParticipantToAnotherTrainingProgram = async (
  model: MoveProgramParticipant
) => {
  var url = ApiEndpoints.SingleTrainingProgramParticipants.replace(
    "{programId}",
    `${model.programId}`
  );
  url += `/${model.traineeId}/move`;

  await delay(500);
  return sendAxiosRequest<MoveProgramParticipantDTO, void>({
    method: "PUT",
    url: url,
    requireAuth: true,
    data: model as MoveProgramParticipantDTO,
  });
};

const leaveTrainingProgram = async (
  userId: number,
  programId: number
): Promise<void> => {
  var url = ApiEndpoints.SingleUserTrainingPrograms.replace(
    "{userId}",
    `${userId}`
  ).replace("{programId}", `${programId}`);
  url += "/leave";

  await delay(500);
  return sendAxiosRequest<void, void>({
    method: "POST",
    url: url,
    requireAuth: true,
  }).then((response) => {
    return response.data;
  });
};

export {
  getSingleTrainingProgramDetails,
  getPageableTrainingProgramParticipants,
  getSingleTrainingProgramInfo,
  getSingleTrainingProgram,
  getSingleProgramTrainer,
  removeParticipantFromTrainingProgram,
  moveParticipantToAnotherTrainingProgram,
  leaveTrainingProgram,
};
