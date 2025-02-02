import { ApiEndpoints } from "@/utils/constants";
import {
  ExerciseDTO,
  ExerciseMetricDTO,
  PageableExerciseListingDTO,
  PageableExercisesDTO,
} from "../contracts/exercise-contract";
import {
  Exercise,
  ExerciseMetric,
  PageableExerciseListing,
  PageableExercises,
} from "../models/exercise";
import { sendAxiosRequest } from "./base-service";
import { delay } from "@/lib/utils";

const getAllExcercises = async () => {
  var url = ApiEndpoints.Exercises;

  return sendAxiosRequest<void, ExerciseDTO[]>({
    method: "GET",
    url: url,
    requireAuth: true,
  }).then((response) => {
    return response.data as Exercise[];
  });
};

const getPageableExerciseListing = async (
  query: string = "",
  page: number = 0,
  pageSize: number = 10
) => {
  var url = ApiEndpoints.Exercises;
  url += `/brief?query=${query}&page=${page}&size=${pageSize}`;
  await delay(500);
  return sendAxiosRequest<void, PageableExerciseListingDTO>({
    method: "GET",
    url: url,
    requireAuth: true,
  }).then((response) => {
    return response.data as PageableExerciseListing;
  });
};

const getAllExerciseMetrics = async () => {
  const url = ApiEndpoints.Metrics;
  await delay(700);
  return sendAxiosRequest<void, ExerciseMetricDTO[]>({
    method: "GET",
    url: url,
    requireAuth: true,
  }).then((response) => {
    return response.data as ExerciseMetric[];
  });
};

const getPageableExcercises = async (
  query: string = "",
  page: number = 0,
  pageSize: number = 9
) => {
  var url = ApiEndpoints.Exercises;
  url += `/filter?query=${query}&page=${page}&size=${pageSize}`;
  await delay(500);
  return sendAxiosRequest<void, PageableExercisesDTO>({
    method: "GET",
    url: url,
    requireAuth: true,
  }).then((response) => {
    return response.data as PageableExercises;
  });
};

export {
  getPageableExerciseListing,
  getAllExcercises,
  getPageableExcercises,
  getAllExerciseMetrics,
};
