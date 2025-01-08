import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {
  CreateTrainingProgramApplicationDTO,
  PageableProgramApplicationsDTO,
} from "../contracts/program-application-contract";
import { PageableProgramRequests } from "../models/program-request";

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

  return sendAxiosRequest<void, PageableProgramApplicationsDTO>({
    method: "GET",
    url: url,
  }).then((response) => {
    // Perform neccessary mappings etc...
    return response.data as PageableProgramRequests;
  });
};

const sendTrainingProgramApplication = async (
  request: CreateTrainingProgramApplicationDTO
): Promise<void> => {
  const url = `${ApiEndpoints.TrainingProgramApplications}`;

  return sendAxiosRequest<CreateTrainingProgramApplicationDTO, void>({
    method: "POST",
    url: url,
    data: request,
  }).then(() => {});
};

export {
  getPageableTrainingProgramApplications,
  sendTrainingProgramApplication,
};
