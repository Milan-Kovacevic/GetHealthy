import { delay } from "@/lib/utils";
import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {
  FeaturedTrainingProgramDTO,
  PageableTrainingProgramsDTO,
  TrainerProgramDTO,
} from "../contracts/training-program-contract";
import {
  FeaturedTrainingProgram,
  PageableTrainingPrograms,
  ProgramFilters,
  TrainerProgram,
} from "../models/training-program";

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

const createTrainingProgram = async (userId: number, formData: FormData) => {
  var url = `${ApiEndpoints.TrainingPrograms}/${userId}`;
  return sendAxiosRequest<any, object>({
    method: "POST",
    url: url,
    data: formData,
  }).then((response) => {
    return response.data as object;
  });
};

const updateTrainingProgramGeneralInfo = async (
  programId: number,
  formData: FormData
): Promise<any> => {
  var url = `${ApiEndpoints.TrainingPrograms}/${programId}/general-info`;

  return sendAxiosRequest<FormData, any>({
    method: "PUT",
    url: url,
    data: formData,
  }).then((response) => {
    return response.data;
  });
};

const updateTrainingProgramExercisePlan = async (
  programId: number,
  formData: FormData
): Promise<any> => {
  var url = `${ApiEndpoints.TrainingPrograms}/${programId}/exercise-plan`;

  return sendAxiosRequest<FormData, any>({
    method: "PUT",
    url: url,
    data: formData,
  }).then((response) => {
    return response.data;
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
  createTrainingProgram,
  getAllTrainingProgramsForTrainer,
  getFeaturedTrainingPrograms,
  getPageableTrainingPrograms,
  updateTrainingProgramExercisePlan,
  updateTrainingProgramGeneralInfo,
};
