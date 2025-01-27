import { delay, pictureUrl } from "@/lib/utils";
import { ApiEndpoints } from "@/utils/constants";
import {
  FeaturedTrainingProgramDTO,
  PageableTrainerProgramsDTO,
  PageableTrainingProgramsDTO,
} from "../contracts/training-program-contract";
import {
  FeaturedTrainingProgram,
  PageableTrainerPrograms,
  PageableTrainingPrograms,
  ProgramFilters,
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
    requireAuth: true,
  }).then((response) => {
    // Perform neccessary mappings etc...
    return {
      ...response.data,
      content: response.data.content.map((item) => {
        return {
          ...item,
          imageFilePath: pictureUrl(item.imageFilePath),
        };
      }),
    } as PageableTrainingPrograms;
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
    requireAuth: true,
  }).then((response) => {
    return {
      ...response.data,
      content: response.data.content.map((item) => {
        return {
          ...item,
          imageFilePath: pictureUrl(item.imageFilePath),
        };
      }),
    } as PageableTrainingPrograms;
  });
};

const createTrainingProgram = async (formData: FormData) => {
  var url = `${ApiEndpoints.TrainingPrograms}`;
  return sendAxiosRequest<FormData, void>({
    method: "POST",
    url: url,
    requireAuth: true,
    data: formData,
  }).then((response) => {
    return response.data;
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
    requireAuth: true,
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
    requireAuth: true,
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
    requireAuth: true,
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
    requireAuth: true,
  }).then((response) => {
    // Perform neccessary mappings etc...
    return response.data.map((item) => {
      return {
        ...item,
        imageFilePath: pictureUrl(item.imageFilePath),
      };
    }) as FeaturedTrainingProgram[];
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
    requireAuth: true,
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
  updateTrainingProgramExercisePlan,
  updateTrainingProgramGeneralInfo,
};
