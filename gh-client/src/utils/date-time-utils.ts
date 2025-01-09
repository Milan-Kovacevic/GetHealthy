import { TrainingProgramOnSchedule } from "@/api/models/training-program-on-schedule";
import { isPast, isWithinInterval } from "date-fns";

export type ScheduleTrainingStatus = "completed" | "upcoming" | "live";

export const getTrainingProgramTimeRange = (
  programOnSchedule: TrainingProgramOnSchedule
): string => {
  const [startHour, startMinute] = programOnSchedule.startTime
    .split(":")
    .map(Number);

  const programStart = new Date();
  programStart.setHours(startHour, startMinute, 0, 0);

  const programEnd = new Date(
    programStart.getTime() + programOnSchedule.trainingDuration * 60000
  );

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const startTimeFormatted = formatTime(programStart);
  const endTimeFormatted = formatTime(programEnd);

  const timeRange = `${startTimeFormatted} - ${endTimeFormatted}`;
  return timeRange;
};

export const getProgramStatus = (
  programOnSchedule: TrainingProgramOnSchedule
): ScheduleTrainingStatus => {
  const now = new Date();

  const today = now.getDay() === 0 ? 7 : now.getDay();

  const programDay = programOnSchedule.dayOfWeek;
  const dayDifference = programDay - today;

  if (dayDifference !== 0) {
    return dayDifference > 0 ? "upcoming" : "completed";
  }

  const [startHour, startMinute] = programOnSchedule.startTime
    .split(":")
    .map(Number);

  const programStart = new Date();
  programStart.setHours(startHour, startMinute, 0, 0);

  const programEnd = new Date(
    programStart.getTime() + programOnSchedule.trainingDuration * 60000
  );

  if (isPast(programEnd)) return "completed";

  if (isWithinInterval(now, { start: programStart, end: programEnd }))
    return "live";

  return "upcoming";
};

export const parseTimeStringToDate = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};
