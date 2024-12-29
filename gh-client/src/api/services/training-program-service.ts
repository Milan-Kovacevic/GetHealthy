import { ApiEndpoints } from "@/utils/constants";
import { Category } from "../models/category";
import { sendAxiosRequest } from "./base-service";
import {
  FeaturedTrainingProgramDTO,
  PageableTrainingProgramsDTO,
  TrainerProgramDTO,
  TrainingProgramDTO,
} from "../contracts/training-program-contract";
import {
  FeaturedTrainingProgram,
  PageableTrainingPrograms,
  ProgramFilters,
  TrainerProgram,
} from "../models/training-program";
import { delay } from "@/lib/utils";

const getPageableTrainingPrograms = async (
  searchString: string = "",
  page: number = 0,
  filters: ProgramFilters,
  limit: number = 6
) => {
  var url = ApiEndpoints.TrainingPrograms;
  const sortOpt = filters.sort.split("-");
  url += `?searchWord=${searchString}&page=${page}&size=${limit}&sortBy=${
    sortOpt[0]
  }&sortDir=${sortOpt[1]}&categories=${filters.categories.join(
    ","
  )}&ratingUpper=${filters.ratingRange[1]}&ratingLower=${
    filters.ratingRange[0]
  }&participantsLower=${filters.participantsRange[0]}&participantsUpper=${
    filters.participantsRange[1]
  }&difficulty=${filters.difficulty}`;

  await delay(500);
  return sendAxiosRequest<void, PageableTrainingProgramsDTO>({
    method: "GET",
    url: url,
  }).then((response) => {
    // Perform neccessary mappings etc...
    return response.data as PageableTrainingPrograms;
  });
};

const createUpdateTrainingProgram = async (
  trainingProgram: TrainingProgramDTO,
  isUpdate: boolean
) => {
  var url = ApiEndpoints.TrainingPrograms;
  return sendAxiosRequest<TrainingProgramDTO, object>({
    method: !isUpdate ? "POST" : "PUT",
    url: url,
    data: trainingProgram,
  }).then((response) => {
    return response.data as object;
  });
};

const getFeaturedTrainingPrograms = async () => {
  var url = ApiEndpoints.TrainingPrograms;
  url += `/featured`;

  await delay(500);
  return sendAxiosRequest<void, FeaturedTrainingProgramDTO[]>({
    method: "GET",
    url: url,
  }).then((response) => {
    // Perform neccessary mappings etc...
    return response.data as FeaturedTrainingProgram[];
  });
};

const getAllTrainingProgramsForTrainer = (trainerId: number) => {
  var url = ApiEndpoints.UserTrainingPrograms.replace(
    "{userId}",
    `${trainerId}`
  );

  return sendAxiosRequest<void, TrainerProgramDTO[]>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data as TrainerProgram[];
  });
};

export {
  getPageableTrainingPrograms,
  getAllTrainingProgramsForTrainer,
  getFeaturedTrainingPrograms,
  createUpdateTrainingProgram,
};
