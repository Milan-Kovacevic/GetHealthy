import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {
  CreateTrainingProgramOnScheduleDTO,
  EditTrainingProgramOnScheduleDTO,
  TrainingProgramOnScheduleDTO,
} from "../contracts/training-program-on-schedule-contract";
import {
  ManageTrainingProgramOnSchedule,
  TrainingProgramOnSchedule,
} from "../models/training-program-on-schedule";
import { format } from "date-fns";

const translateWeekDayToNumber = (weekDay: string) => {
  switch (weekDay) {
    case "MONDAY":
      return 0;
    case "TUESDAY":
      return 1;
    case "WEDNESDAY":
      return 2;
    case "THURSDAY":
      return 3;
    case "FRIDAY":
      return 4;
    case "SATURDAY":
      return 5;
    case "SUNDAY":
      return 6;
    default:
      return -1;
  }
};

const fetchTrainingProgamsOnSchedule = async (): Promise<
  TrainingProgramOnSchedule[]
> => {
  var url = `${ApiEndpoints.TrainingProgramOnSchedule}`;

  return sendAxiosRequest<void, TrainingProgramOnScheduleDTO[]>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data.map((item) => {
      return {
        ...item,
        dayOfWeek: translateWeekDayToNumber(item.dayOfWeek),
      };
    });
  });
};

const createTrainingProgramOnSchedule = async (
  data: ManageTrainingProgramOnSchedule
): Promise<TrainingProgramOnSchedule> => {
  var url = `${ApiEndpoints.TrainingProgramOnSchedule}`;

  return sendAxiosRequest<
    CreateTrainingProgramOnScheduleDTO,
    TrainingProgramOnScheduleDTO
  >({
    method: "POST",
    url: url,
    data: {
      ...data,
      startTime: format(data.startTime, "HH:mm:ss"),
    } as CreateTrainingProgramOnScheduleDTO,
  }).then((response) => {
    return {
      ...response.data,
      dayOfWeek: translateWeekDayToNumber(response.data.dayOfWeek),
    };
  });
};

const editTrainingProgramOnSchedule = async (
  id: number,
  data: ManageTrainingProgramOnSchedule
): Promise<TrainingProgramOnSchedule> => {
  var url = `${ApiEndpoints.TrainingProgramOnSchedule}/${id}`;
  console.log(data);
  return sendAxiosRequest<
    EditTrainingProgramOnScheduleDTO,
    TrainingProgramOnScheduleDTO
  >({
    method: "PUT",
    url: url,
    data: {
      ...data,
      startTime: format(data.startTime, "HH:mm:ss"),
    } as EditTrainingProgramOnScheduleDTO,
  }).then((response) => {
    return {
      ...response.data,
      dayOfWeek: translateWeekDayToNumber(response.data.dayOfWeek),
    };
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
  fetchTrainingProgamsOnSchedule,
};
