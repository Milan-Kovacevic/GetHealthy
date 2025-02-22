import { ScheduleItemState } from "../contracts/training-program-on-schedule-contract";
import { ProgramDifficulty } from "../enums/program-difficulty";
import { Category } from "./category";

export type TrainingProgramOnSchedule = {
  id: number;
  dayOfWeek: number;
  startTime: string;
  program: ScheduleTrainingProgram;
  scheduleItemState?: ScheduleItemState;
};

export type ScheduleTrainingProgram = {
  id: number;
  name: string;
  createdAt: string;
  description: string;
  trainerFirstName: string;
  trainerLastName: string;
  trainingDuration: number;
  difficulty: ProgramDifficulty;
  categories: Category[];
};

export type ManageTrainingProgramOnSchedule = {
  dayOfWeek: number;
  startTime: Date; // HH:mm
  program: ManageScheduleProgram;
};

export type ManageScheduleProgram = {
  id: number;
};
