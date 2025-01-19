import { ApiEndpoints } from "@/utils/constants";
import { AuthUserContext, UserLogin } from "../models/authentication";
import { sendAxiosRequest } from "./base-service";
import { LoginResponseDTO, UserLoginDTO } from "../contracts/auth-contract";
import { delay } from "@/lib/utils";
import { UserRole } from "../enums/user-role";

const loginUser = async (data: UserLogin): Promise<AuthUserContext> => {
  const url = `${ApiEndpoints.Authentication}/login`;
  await delay(1000);
  return sendAxiosRequest<UserLoginDTO, LoginResponseDTO>({
    method: "POST",
    url: url,
    data: data as UserLoginDTO,
  }).then((response) => response.data as AuthUserContext);
  // const userMock = {
  //   id: 2,
  //   firstName: "Marko",
  //   lastName: "Markovic",
  //   role: UserRole.TRAINEE,
  // };
  // const tokensMock = {
  //   accessToken: "123-sha256",
  //   refreshToken: "123456-sha512",
  // };

  // return { user: userMock, tokens: tokensMock };
};

// TODO: Check if this is neccessary
// (ex. set valid flag in token claim on backend to invalidate jwt?)
const logoutUser = async () => {
  const url = `${ApiEndpoints.Authentication}/logout`;
  await delay(1000);

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
      // Handle error code...
      return false;
    });
};

export { loginUser, logoutUser, registerUser };
