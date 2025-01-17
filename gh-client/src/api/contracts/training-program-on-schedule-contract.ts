import { ProgramDifficulty } from "../enums/program-difficulty";
import { CategoryDTO } from "./category-contract";

export type TrainingProgramOnScheduleDTO = {
  id: number;
  dayOfWeek: number;
  startTime: string; // HH:mm
  program: ScheduleTrainingProgramDTO;
};

type ScheduleTrainingProgramDTO = {
  id: number;
  name: string;
  createdAt: string;
  description: string;
  trainerFirstName: string;
  trainerLastName: string;
  trainingDuration: number;
  difficulty: ProgramDifficulty;
  categories: CategoryDTO[];
};

export type EditTrainingProgramOnScheduleDTO = {
  id: number;
  dayOfWeek: number;
  startTime: Date; // HH:mm
  program: ManageScheduleProgramDTO;
};

export type CreateTrainingProgramOnScheduleDTO = {
  dayOfWeek: number;
  startTime: Date;
  program: ManageScheduleProgramDTO;
};

export type ManageScheduleProgramDTO = {
  id: number;
  name: string;
};
