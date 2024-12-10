import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import { PageableProgramApplicationsDTO } from "../contracts/program-application-contract";
import { PageableProgramRequests } from "../models/program-request";

const getPageableTrainingProgramApplications = async (
  searchString: string = "",
  page: number = 0,
  limit: number = 12
) => {
  var userId = "1";
  var url = ApiEndpoints.TrainerProgramApplications.replace("{userId}", userId);
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

export { getPageableTrainingProgramApplications };
