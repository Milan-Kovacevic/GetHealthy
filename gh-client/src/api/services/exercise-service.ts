import { ApiEndpoints } from "@/utils/constants";
import { ExerciseDTO } from "../contracts/exercise-contract";
import { Exercise } from "../models/exercise";
import { sendAxiosRequest } from "./base-service";

const getAllExcercises = async () => {
    var url = ApiEndpoints.Exercises;
  
    return sendAxiosRequest<void, ExerciseDTO[]>({
      method: "GET",
      url: url,
    }).then((response) => {
      return response.data as Exercise[];
    });
  };
  
  export { getAllExcercises };