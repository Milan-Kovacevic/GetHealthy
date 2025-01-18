interface IExercise {
  id: number;
  exerciseName: string;
  description: string;
  videoLink: string;
  firstExerciseMetric: IMetric;
  secondExerciseMetric?: IMetric;
}

interface IMetric {
  id: number;
  name: string;
  unit: string;
}
