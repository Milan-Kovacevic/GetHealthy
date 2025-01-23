import { ApiEndpoints } from "@/utils/constants";
import { AuthUserContext, UserLogin } from "../models/authentication";
import { sendAxiosRequest } from "./base-service";
import { LoginResponseDTO, UserLoginDTO } from "../contracts/auth-contract";
import { delay } from "@/lib/utils";

const loginUser = async (data: UserLogin): Promise<AuthUserContext> => {
  const url = `${ApiEndpoints.Authentication}/login`;
  await delay(1000);
  return sendAxiosRequest<UserLoginDTO, LoginResponseDTO>({
    method: "POST",
    url: url,
    data: data as UserLoginDTO,
  }).then((response) => response.data as AuthUserContext);
};

const logoutUser = async () => {
  const url = `${ApiEndpoints.Authentication}/logout`;
  await delay(500);

  return sendAxiosRequest<void, void>({
    method: "POST",
    url: url,
    requireAuth: true,
  }).then(() => {});
};

const registerUser = async (formData: FormData): Promise<boolean> => {
  const url = `${ApiEndpoints.Authentication}/register`;
  await delay(1000);
  return sendAxiosRequest<FormData, void>({
    method: "POST",
    url: url,
    data: formData,
  })
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};

export { loginUser, logoutUser, registerUser };
