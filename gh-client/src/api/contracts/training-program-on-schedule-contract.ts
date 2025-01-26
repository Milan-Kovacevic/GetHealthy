import { ProgramDifficulty } from "../enums/program-difficulty";
import { CategoryDTO } from "./category-contract";

export type TrainingProgramOnScheduleDTO = {
  id: number;
  dayOfWeek: string;
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

export type ManageTrainingProgramOnScheduleDTO = {
  dayOfWeek: string;
  startTime: string; // HH:mm
  program: ManageScheduleProgramDTO;
};

export type ManageScheduleProgramDTO = {
  id: number;
  name: string;
};
