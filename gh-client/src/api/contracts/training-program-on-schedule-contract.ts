export type TrainingProgramOnScheduleDTO = {
  id: number;
  dayOfWeek: number;
  startTime: string; // HH:mm
  trainingDuration: number;
  program: TrainingProgramDTO;
};

type TrainingProgramDTO = {
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
  program: Omit<
    TrainingProgramDTO,
    "createdAt" | "description" | "trainerName"
  >;
};

export type CreateTrainingProgramOnScheduleDTO = {
  dayOfWeek: number;
  startTime: Date;
  program: Omit<
    TrainingProgramDTO,
    "createdAt" | "description" | "trainerName"
  >;
};
