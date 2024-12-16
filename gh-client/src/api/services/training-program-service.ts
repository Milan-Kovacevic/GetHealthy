import { ApiEndpoints } from "@/utils/constants";
import { Category } from "../models/category";
import { sendAxiosRequest } from "./base-service";
import { PageableTrainingProgramsDTO, TrainingProgramDTO } from "../contracts/training-program-contract";
import {
  PageableTrainingPrograms,
  TrainingProgram,
} from "../models/training-program";

const getPageableTrainingPrograms = (
  searchString: string = "",
  page: number = 0,
  categories: Category[] = [],
  difficulty: number = 0,
  ratingRange: number[] = [0.0, 5.0],
  participantsRange: number[] = [0, 1000],
  sortBy: string = "name",
  sortDir: string = "asc",
  limit: number = 12
) => {
  var url = ApiEndpoints.TrainingPrograms;
  url += `/filter?searchWord=${searchString}&page=${page}&size=${limit}&sortBy=${sortBy}&sortDir=${sortDir}&categories=${categories
    .map((c) => c.category.categoryName)
    .join(",")}&ratingUpper=${ratingRange[1]}&ratingLower=${
    ratingRange[0]
  }&participantsLower=${participantsRange[0]}&participantsUpper=${
    participantsRange[1]
  }&difficulty=${difficulty}`;

  return sendAxiosRequest<void, PageableTrainingProgramsDTO>({
    method: "GET",
    url: url,
  }).then((response) => {
    // Perform neccessary mappings etc...
    return response.data as PageableTrainingPrograms;
  });
};

export { getPageableTrainingPrograms };

export const createUpdateTrainingProgram = (
  trainingProgram: TrainingProgramDTO,
  isUpdate: boolean
) => {
  var url = ApiEndpoints.TrainingPrograms;
  return sendAxiosRequest<TrainingProgramDTO, void>({
    method: !isUpdate ? "POST" : "PUT",
    url: url,
    data: trainingProgram,
  }).then((response) => {
    return response.data as void;
  });
};
