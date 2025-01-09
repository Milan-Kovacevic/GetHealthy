export type TrainingProgramOnSchedule = {
  id: number;
  dayOfWeek: number;
  startTime: string;
  trainingDuration: number;
  program: TrainingProgram;
};

type TrainingProgram = {
  id: number;
  name: string;
  createdAt: string;
  description: string;
  trainerName: string;
};
