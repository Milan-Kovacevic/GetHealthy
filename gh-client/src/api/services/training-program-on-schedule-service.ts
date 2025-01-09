import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {
  CreateTrainingProgramOnScheduleDTO,
  EditTrainingProgramOnScheduleDTO,
  TrainingProgramOnScheduleDTO,
} from "../contracts/training-program-on-schedule-contract";

const createTrainingProgramOnSchedule = async (
  data: CreateTrainingProgramOnScheduleDTO
) => {
  var url = `${ApiEndpoints.TrainingProgramOnSchedule}`;

  return sendAxiosRequest<CreateTrainingProgramOnScheduleDTO, void>({
    method: "POST",
    url: url,
    data: data,
  }).then((response) => {
    return response.data;
  });
};

const editTrainingProgramOnSchedule = (
  data: EditTrainingProgramOnScheduleDTO
) => {
  var url = `${ApiEndpoints.TrainingProgramOnSchedule}`;

  return sendAxiosRequest<EditTrainingProgramOnScheduleDTO, void>({
    method: "PUT",
    url: url,
    data: data,
  }).then((response) => {
    return response.data;
  });
};

const deleteTrainingProgramOnSchedule = async (id: number) => {
  var url = `${ApiEndpoints.TrainingProgramOnSchedule}/${id}`;

  return sendAxiosRequest<void, void>({
    method: "DELETE",
    url: url,
  }).then((response) => {
    return response.data;
  });
};

export {
  deleteTrainingProgramOnSchedule,
  createTrainingProgramOnSchedule,
  editTrainingProgramOnSchedule,
};
