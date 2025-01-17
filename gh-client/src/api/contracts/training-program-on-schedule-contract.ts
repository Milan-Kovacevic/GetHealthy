export type TrainingProgramOnScheduleDTO = {
  id: number;
  dayOfWeek: number;
  startTime: string; // HH:mm
  program: TrainingProgramDTO;
};

type TrainingProgramDTO = {
  id: number;
  name: string;
  createdAt: string;
  description: string;
  trainingDuration: number;
  trainerName: string;
};

export type EditTrainingProgramOnScheduleDTO = {
  id: number;
  dayOfWeek: number;
  startTime: Date; // HH:mm
  program: Omit<
    TrainingProgramDTO,
    "createdAt" | "description" | "trainerName" | "trainingDuration"
  >;
};

export type CreateTrainingProgramOnScheduleDTO = {
  dayOfWeek: number;
  startTime: Date;
  program: Omit<
    TrainingProgramDTO,
    "createdAt" | "description" | "trainerName" | "trainingDuration"
  >;
};
