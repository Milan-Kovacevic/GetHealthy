export type TrainingProgramOnScheduleDTO = {
  id: number;
  dayOfWeek: number;
  startTime: string; // HH:mm
  trainingDuration: number;
  program: ScheduleTrainingProgramDTO;
};

type ScheduleTrainingProgramDTO = {
  id: number;
  name: string;
  createdAt: string;
  description: string;
  trainerName: string;
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
