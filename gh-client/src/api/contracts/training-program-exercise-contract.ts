export type TrainingProgramExerciseDTO = {
  exerciseId: number;
  position: number;
  programId: number;
  exerciseSets: {
    restTime: number;
    firstMetricValue: string;
    secondMetricValue: string;
  }[];
};
