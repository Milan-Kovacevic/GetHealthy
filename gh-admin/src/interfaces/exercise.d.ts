interface IExerciseResponse {
  id: number;
  exerciseName: string;
  description: string;
  videoLink: string;
  firstExerciseMetric: IMetric;
  secondExerciseMetric?: IMetric;
}

interface IExerciseRequest {
  exerciseName: string;
  description: string;
  videoLink: string;
  metricType1Id: number;
  metricType2Id?: number;
}
