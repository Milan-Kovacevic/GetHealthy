import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";

const deleteTrainingProgramOnSchedule = async (id: number) => {
  var url = `${ApiEndpoints.TrainingProgramOnSchedule}/${id}`;

  return sendAxiosRequest<void, void>({
    method: "DELETE",
    url: url,
  }).then((response) => {
    return response.data;
  });
};

export { deleteTrainingProgramOnSchedule };
