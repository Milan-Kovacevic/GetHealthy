export type ProgramExercise = {
    id: number;
    position: number;
    name: string;
    description: string;
    videoLink: string;
    firstMetric: ExerciseMetric;
    secondMetric?: ExerciseMetric;
  };
  
  export type ExerciseMetric = {
    id: number;
    name: string;
    unit: string;
  };