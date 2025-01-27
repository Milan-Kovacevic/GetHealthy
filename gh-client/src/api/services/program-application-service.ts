import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {
  CreateTrainingProgramApplicationDTO,
  PageableProgramApplicationsDTO,
  ProcessTrainingProgramApplicationDTO,
  ProgramApplicationDetailsDTO,
  ProgramApplicationDTO,
} from "../contracts/program-application-contract";
import {
  PageableProgramRequests,
  ProcessProgramApplication,
  ProgramRequest,
  ProgramRequestDetails,
  SendProgramApplication,
} from "../models/program-request";
import { delay } from "@/lib/utils";

const getPageableTrainingProgramApplications = async (
  userId: number,
  searchString: string = "",
  page: number = 0,
  limit: number = 12
) => {
  var url = ApiEndpoints.UserProgramApplications.replace(
    "{userId}",
    `${userId}`
  );
  url += `?${
    searchString ? `filter=${searchString}&` : ""
  }page=${page}&size=${limit}`;

  await delay(1500);
  return sendAxiosRequest<void, PageableProgramApplicationsDTO>({
    method: "GET",
    url: url,
    requireAuth: true,
  }).then((response) => {
    return {
      ...response.data,
      content: response.data.content.map((x) => {
        return {
          ...x,
          programName: x.trainingProgramName,
        };
      }),
    } as PageableProgramRequests;
  });
};

const parseProgramRequestMessage = (requestJson: string) => {
  const requestDto = JSON.parse(requestJson) as ProgramApplicationDTO;

  return {
    ...requestDto,
    programName: requestDto.trainingProgramName,
  } as ProgramRequest;
};

const getProgramApplicationDetails = async (
  programId: number,
  traineeId: number
): Promise<ProgramRequestDetails> => {
  var url = ApiEndpoints.SingleTrainingProgramApplication.replace(
    "{userId}",
    `${traineeId}`
  ).replace("{programId}", `${programId}`);
  await delay(1500);
  return sendAxiosRequest<void, ProgramApplicationDetailsDTO>({
    method: "GET",
    url: url,
    requireAuth: true,
  }).then((response) => {
    return {
      ...response.data,
      programName: response.data.trainingProgramName,
    } as ProgramRequestDetails;
  });
};

const sendTrainingProgramApplication = async (
  traineeId: number,
  request: SendProgramApplication
): Promise<void> => {
  const url = ApiEndpoints.UserProgramApplications.replace(
    "{userId}",
    `${traineeId}`
  );

  await delay(1000);
  return sendAxiosRequest<CreateTrainingProgramApplicationDTO, void>({
    method: "POST",
    url: url,
    requireAuth: true,
    data: request as CreateTrainingProgramApplicationDTO,
  }).then((response) => {
    return response.data;
  });
};

const processTrainingProgramApplication = async (
  request: ProcessProgramApplication
): Promise<void> => {
  const url = `${ApiEndpoints.SingleTrainingProgramApplication.replace(
    "{userId}",
    `${request.userId}`
  ).replace("{programId}", `${request.programId}`)}/process`;

  const body: ProcessTrainingProgramApplicationDTO = {
    approve: request.approve,
  };

  await delay(1000);
  return sendAxiosRequest<ProcessTrainingProgramApplicationDTO, void>({
    method: "POST",
    url: url,
    requireAuth: true,
    data: body,
  }).then((response) => {
    return response.data;
  });
};

export {
  getPageableTrainingProgramApplications,
  getProgramApplicationDetails,
  sendTrainingProgramApplication,
  processTrainingProgramApplication,
  parseProgramRequestMessage,
};
