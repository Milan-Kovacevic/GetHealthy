import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import { pictureUrl } from "@/lib/utils";

const getProfile = async (userId: number): Promise<any> => {
  var url = `${ApiEndpoints.Users}/${userId}/userInfo`;

  return sendAxiosRequest<void, any>({
    method: "GET",
    requireAuth: true,
    url: url,
  }).then((response) => {
    return {
      ...response.data,
      profilePictureFilePath: pictureUrl(response.data.profilePictureFilePath),
    };
  });
};

const updateUserProfile = async (
  userId: number,
  formData: FormData
): Promise<any> => {
  var url = `${ApiEndpoints.Users}/${userId}/update`;

  return sendAxiosRequest<FormData, any>({
    method: "POST",
    requireAuth: true,
    url: url,
    data: formData,
  }).then((response) => {
    return response.data;
  });
};

export { getProfile, updateUserProfile };
