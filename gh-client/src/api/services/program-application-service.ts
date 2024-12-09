import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import { PageableProgramApplications } from "../contracts/program-application-contract";
import { PageableProgramRequestsDTO } from "../models/program-request";

const getPageableTrainingProgramApplications = (
  searchString: string = "",
  page: number = 0,
  limit: number = 12
) => {
  var userId = "1";
  var url = ApiEndpoints.TrainerProgramApplications.replace("{userId}", userId);
  url += `?${
    searchString ? `filter=${searchString}&` : ""
  }page=${page}&size=${limit}`;

  return sendAxiosRequest<void, PageableProgramApplications>({
    method: "GET",
    url: url,
  }).then((response) => {
    // Perform neccessary mappings etc...
    return response.data as PageableProgramRequestsDTO;
  });
};

export { getPageableTrainingProgramApplications };
