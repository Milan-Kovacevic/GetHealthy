import { ApiEndpoints } from "@/utils/constants";
import { ExerciseDTO } from "../contracts/exercise-contract";
import { Exercise } from "../models/exercise";
import { sendAxiosRequest } from "./base-service";
import { TrainingProgramExerciseDTO } from "../contracts/training-program-exercise-contract";

const sendExercises = async (data: TrainingProgramExerciseDTO[]) => {
    var url = ApiEndpoints.TrainingProgramExercises;
  
    return sendAxiosRequest<TrainingProgramExerciseDTO[], void>({
      method: "POST",
      url: url,
    }).then((response) => {
      return response.data as void;
    });
  };
  
  export { sendExercises };