import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";

const changePassword = () => {
  var url = `${ApiEndpoints.UserAccounts}/change-password`;

  // return sendAxiosRequest<void, Trainer>({
  //   method: "PUT",
  //   url: url,
  // }).then((response) => {
  //   return response.data as TrainerDTO;
  // });
};

const changeEmail = () => {
  var url = `${ApiEndpoints.UserAccounts}/change-email`;

  // return sendAxiosRequest<void, Trainer>({
  //   method: "PUT",
  //   url: url,
  // }).then((response) => {
  //   return response.data as TrainerDTO;
  // });
};
