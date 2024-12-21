import { ApiEndpoints } from "@/utils/constants";
import {
  ExerciseDTO,
  PageableExercisesDTO,
} from "../contracts/exercise-contract";
import { Exercise, PageableExercises } from "../models/exercise";
import { sendAxiosRequest } from "./base-service";
import { delay } from "@/lib/utils";

const getAllExcercises = async () => {
  var url = ApiEndpoints.Exercises;

  return sendAxiosRequest<void, ExerciseDTO[]>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data as Exercise[];
  });
};

const getPageableExcercises = async (
  query: string = "",
  page: number = 0,
  pageSize: number = 9
) => {
  var url = ApiEndpoints.Exercises;
  url += `/filter?query=${query}&page=${page}&size=${pageSize}`;
  await delay(2000);
  return sendAxiosRequest<void, PageableExercisesDTO>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data as PageableExercises;
  });
};

export { getAllExcercises, getPageableExcercises };
