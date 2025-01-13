import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {
  AddTrainingProgramExerciseDTO,
  ProgramExerciseDTO,
} from "../contracts/program-exercise-contract";
import { delay } from "@/lib/utils";
import { ProgramExercise } from "../models/program-exercise";

const getTrainingProgramExercises = async (programId: number) => {
  var url = ApiEndpoints.TrainingProgramExercises.replace(
    "{programId}",
    `${programId}`
  );

  await delay(1500);
  return sendAxiosRequest<void, ProgramExerciseDTO[]>({
    method: "GET",
    url: url,
  }).then((response) => response.data as ProgramExercise[]);
};

// TODO: ?
const sendExercises = async (data: AddTrainingProgramExerciseDTO[]) => {
  var url = ApiEndpoints.TrainingProgramExercises;

  return sendAxiosRequest<AddTrainingProgramExerciseDTO[], void>({
    method: "POST",
    url: url,
  }).then((response) => {
    return response.data as void;
  });
};

export { getTrainingProgramExercises, sendExercises };
