import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {
  EmailChangeDTO,
  PasswordChangeDTO,
} from "../contracts/user-account-contract";

const getUserAccount = (userId: number = 0): Promise<any> => {
  var url = `${ApiEndpoints.UserAccounts}/${userId}`;

  return sendAxiosRequest<void, any>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data;
  });
};

const changePassword = async (request: PasswordChangeDTO, userId: number) => {
  var url = `${ApiEndpoints.UserAccounts}/${userId}/change-password`;

  return sendAxiosRequest<PasswordChangeDTO, void>({
    method: "POST",
    url: url,
    data: request,
  }).then();
};

const changeEmail = async (request: EmailChangeDTO, userId: number) => {
  var url = `${ApiEndpoints.UserAccounts}/${userId}/change-email`;

  return sendAxiosRequest<EmailChangeDTO, void>({
    method: "POST",
    url: url,
    data: request,
  }).then();
};

export { changePassword, changeEmail, getUserAccount };
