import { ApiEndpoints } from "@/utils/constants";
import { TrainingProgramApplicationDTO } from "../contracts/user-contract";
import { sendAxiosRequest } from "./base-service";

const getProfile = (userId: number = 0): Promise<any> => {
  var url = `${ApiEndpoints.Users}/${userId}/userInfo`;

  return sendAxiosRequest<void, any>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data;
  });
};

const updateUserProfile = (
  userId: number,
  formData: FormData
): Promise<any> => {
  var url = `${ApiEndpoints.Users}/${userId}/update`;

  return sendAxiosRequest<FormData, any>({
    method: "POST",
    url: url,
    data: formData,
  }).then((response) => {
    return response.data;
  });
};

const joinTrainingProgram = (
  request: TrainingProgramApplicationDTO
): Promise<void> => {
  const url = "http://localhost:8200/api/v1/users/join-program";

  return sendAxiosRequest<TrainingProgramApplicationDTO, void>({
    method: "POST",
    url: url,
    data: request,
  }).then(() => {});
};

export { getProfile, updateUserProfile, joinTrainingProgram };
