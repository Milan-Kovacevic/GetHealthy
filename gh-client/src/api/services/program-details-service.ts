import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {SingleTrainingProgramDTO, SingleProgramTrainerDTO} from "../contracts/program-details-contract";
import {SingleTrainingProgram, SingleProgramTrainer} from "../models/program-details";

const getSingleTrainingProgram = async (
    programId: number
) => {
    var url = ApiEndpoints.SingleTrainingProgram.replace(
        "{programId}",
        `${programId}`
      );
      return sendAxiosRequest<void, SingleTrainingProgramDTO>({
        method: "GET",
        url: url,
      }).then((response) => response.data as SingleTrainingProgram);  
}; 

const getSingleProgramTrainer = async (
    programId: number
) => {
    var url = ApiEndpoints.SingleTrainingProgram.replace(
        "{programId}",
        `${programId}`
      );
      url+=`/trainer-info`;

      return sendAxiosRequest<void, SingleProgramTrainerDTO>({
        method: "GET",
        url: url,
      }).then((response) => response.data as SingleProgramTrainer);  
}; 

export {getSingleTrainingProgram, getSingleProgramTrainer};
