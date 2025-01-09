import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {
  CreateTrainingProgramApplicationDTO,
  PageableProgramApplicationsDTO,
  ProcessTrainingProgramApplicationDTO,
} from "../contracts/program-application-contract";
import {
  PageableProgramRequests,
  ProcessProgramApplication,
  SendProgramApplication,
} from "../models/program-request";
import { delay } from "@/lib/utils";

const getPageableTrainingProgramApplications = async (
  userId: number,
  searchString: string = "",
  page: number = 0,
  limit: number = 12
) => {
  var url = ApiEndpoints.TrainerProgramApplications.replace(
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
  }).then((response) => {
    return response.data as PageableProgramRequests;
  });
};

const sendTrainingProgramApplication = async (
  request: SendProgramApplication
): Promise<void> => {
  const url = `${ApiEndpoints.TrainingProgramApplications}`;

  return sendAxiosRequest<CreateTrainingProgramApplicationDTO, void>({
    method: "POST",
    url: url,
    data: request as CreateTrainingProgramApplicationDTO,
  }).then((response) => {
    return response.data;
  });
};

const processTrainingProgramApplication = async (
  request: ProcessProgramApplication
): Promise<void> => {
  const url = `${ApiEndpoints.TrainingProgramApplications}/process`;

  return sendAxiosRequest<ProcessTrainingProgramApplicationDTO, void>({
    method: "POST",
    url: url,
    data: request as ProcessTrainingProgramApplicationDTO,
  }).then((response) => {
    return response.data;
  });
};

export {
  getPageableTrainingProgramApplications,
  sendTrainingProgramApplication,
  processTrainingProgramApplication,
};
