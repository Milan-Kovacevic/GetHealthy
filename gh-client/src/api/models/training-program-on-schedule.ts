import { ProgramDifficulty } from "../enums/program-difficulty";
import { Category } from "./category";

export type TrainingProgramOnSchedule = {
  id: number;
  dayOfWeek: number;
  startTime: string;
  program: ScheduleTrainingProgram;
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
