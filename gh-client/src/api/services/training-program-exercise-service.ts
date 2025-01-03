import { ApiEndpoints } from "@/utils/constants";
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