import { ApiEndpoints } from "@/utils/constants";
import { CategoryDTO } from "../models/category";
import { sendAxiosRequest } from "./base-service";
import { PageableTrainingPrograms } from "../contracts/training-program-contract";
import { PageableTrainingProgramsDTO } from "../models/training-program";

const getPageableTrainingPrograms = (
  searchString: string = "",
  page: number = 0,
  categories: CategoryDTO[] = [],
  difficulty: number = 0,
  ratingRange: number[] = [0.0, 5.0],
  participantsRange: number[] = [0, 1000],
  sortBy: string = "name",
  sortDir: string = "asc",
  limit: number = 12
) => {
  var url = ApiEndpoints.TrainingPrograms;
  url += `/filter?searchWord=${searchString}&page=${page}&size=${limit}&sortBy=${sortBy}&sortDir=${sortDir}&categories=${categories
    .map((c) => c.categoryName)
    .join(",")}&ratingUpper=${ratingRange[1]}&ratingLower=${
    ratingRange[0]
  }&participantsLower=${participantsRange[0]}&participantsUpper=${
    participantsRange[1]
  }&difficulty=${difficulty}`;

  return sendAxiosRequest<void, PageableTrainingPrograms>({
    method: "GET",
    url: url,
  }).then((response) => {
    // Perform neccessary mappings etc...
    return response.data as PageableTrainingProgramsDTO;
  });
};

export { getPageableTrainingPrograms };
