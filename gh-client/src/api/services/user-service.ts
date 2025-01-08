import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";

const getProfile = async (userId: number = 0): Promise<any> => {
  var url = `${ApiEndpoints.Users}/${userId}/userInfo`;

  return sendAxiosRequest<void, any>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data;
  });
};

const updateUserProfile = async (
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

export { getProfile, updateUserProfile };
