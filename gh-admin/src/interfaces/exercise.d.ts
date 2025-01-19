interface IExerciseResponse {
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

interface IExerciseRequest {
  exerciseName: string;
  description: string;
  videoLink: string;
  metricType1Id: number;
  metricType2Id?: number;
}
