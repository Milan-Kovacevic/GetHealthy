import { delay } from "@/lib/utils";
import { ApiEndpoints } from "@/utils/constants";
import {
  FeaturedTrainingProgramDTO,
  PageableTrainerProgramsDTO,
  PageableTrainingProgramsDTO,
  TrainingProgramDTO,
} from "../contracts/training-program-contract";
import {
  FeaturedTrainingProgram,
  PageableTrainerPrograms,
  PageableTrainingPrograms,
  ProgramFilters,
  TrainingProgram,
} from "../models/training-program";
import { sendAxiosRequest } from "./base-service";

const getPageableTrainingPrograms = async (
  searchString: string = "",
  page: number = 0,
  filters: ProgramFilters,
  limit: number = 8
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

const getPageableTrainingProgramsForUser = async (
  userId: number,
  searchString: string = "",
  page: number = 0,
  filters: ProgramFilters,
  limit: number = 8
) => {
  var url = ApiEndpoints.UserTrainingPrograms.replace("{userId}", `${userId}`);
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

const getTrainingProgram = async (
  programId: number
): Promise<TrainingProgram> => {
  var url = `${ApiEndpoints.TrainingPrograms}/${programId}/details`;
  return sendAxiosRequest<void, TrainingProgramDTO>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data as TrainingProgram;
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
  var url = `${ApiEndpoints.TrainingPrograms}/${programId}/info`;

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
  data: any
): Promise<any> => {
  var url = `${ApiEndpoints.TrainingProgramExercises.replace(
    "{programId}",
    `${programId}`
  )}`;

  return sendAxiosRequest<any, any>({
    method: "PUT",
    url: url,
    data: data,
  }).then((response) => {
    return response.data;
  });
};

const removeTrainingProgram = async (programId: number) => {
  var url = ApiEndpoints.SingleTrainingProgram.replace(
    "{programId}",
    `${programId}`
  );
  await delay(1000);
  return sendAxiosRequest<any, any>({
    method: "DELETE",
    url: url,
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

const getPageableProgramsForTrainer = (
  trainerId: number,
  page: number = 0,
  limit: number = 5
) => {
  var url = ApiEndpoints.UserTrainingPrograms.replace(
    "{userId}",
    `${trainerId}`
  );
  url += `/brief?page=${page}&size=${limit}`;

  return sendAxiosRequest<void, PageableTrainerProgramsDTO>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data as PageableTrainerPrograms;
  });
};

export {
  getPageableTrainingPrograms,
  getPageableTrainingProgramsForUser,
  getPageableProgramsForTrainer,
  createTrainingProgram,
  removeTrainingProgram,
  getFeaturedTrainingPrograms,
  getTrainingProgram,
  updateTrainingProgramExercisePlan,
  updateTrainingProgramGeneralInfo,
};
