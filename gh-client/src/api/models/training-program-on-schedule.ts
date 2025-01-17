export type TrainingProgramOnSchedule = {
  id: number;
  dayOfWeek: number;
  startTime: string;
  program: TrainingProgram;
};

type TrainingProgram = {
  id: number;
  name: string;
  createdAt: string;
  description: string;
  trainingDuration: number;
  trainerName: string;
};
