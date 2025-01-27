import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {
  ManageTrainingProgramOnScheduleDTO,
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

const translateNumberToWeekDay = (weekDay: number) => {
  switch (weekDay) {
    case 0:
      return "MONDAY";
    case 1:
      return "TUESDAY";
    case 2:
      return "WEDNESDAY";
    case 3:
      return "THURSDAY";
    case 4:
      return "FRIDAY";
    case 5:
      return "SATURDAY";
    case 6:
      return "SUNDAY";
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
    requireAuth: true,
  }).then((response) => {
    return response.data.map((item) => {
      return {
        ...item,
        dayOfWeek: translateWeekDayToNumber(item.dayOfWeek),
      };
    });
  });
};

const addTrainingProgramToSchedule = async (
  data: ManageTrainingProgramOnSchedule
): Promise<TrainingProgramOnSchedule> => {
  var url = `${ApiEndpoints.TrainingProgramOnSchedule}`;

  return sendAxiosRequest<
    ManageTrainingProgramOnScheduleDTO,
    TrainingProgramOnScheduleDTO
  >({
    method: "POST",
    url: url,
    requireAuth: true,
    data: {
      ...data,
      startTime: format(data.startTime, "HH:mm:ss"),
      dayOfWeek: translateNumberToWeekDay(data.dayOfWeek),
    } as ManageTrainingProgramOnScheduleDTO,
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
    ManageTrainingProgramOnScheduleDTO,
    TrainingProgramOnScheduleDTO
  >({
    method: "PUT",
    url: url,
    requireAuth: true,
    data: {
      ...data,
      startTime: format(data.startTime, "HH:mm:ss"),
      dayOfWeek: translateNumberToWeekDay(data.dayOfWeek),
    } as ManageTrainingProgramOnScheduleDTO,
  }).then((response) => {
    return {
      ...response.data,
      dayOfWeek: translateWeekDayToNumber(response.data.dayOfWeek),
    };
  });
};

const deleteTrainingProgramFromSchedule = async (id: number) => {
  var url = `${ApiEndpoints.TrainingProgramOnSchedule}/${id}`;

  return sendAxiosRequest<void, void>({
    method: "DELETE",
    url: url,
    requireAuth: true,
  }).then((response) => {
    return response.data;
  });
};

export {
  deleteTrainingProgramFromSchedule,
  addTrainingProgramToSchedule,
  editTrainingProgramOnSchedule,
  fetchTrainingProgamsOnSchedule,
};
