import { ApiEndpoints } from "@/utils/constants";
import {
  TraineeDashboardAnalytics,
  TraineeProgressAnalytics,
} from "../models/analytics";
import { delay } from "@/lib/utils";
import {
  ProgressAnalyticsRequestDTO,
  TraineeDashboardAnalyticsDTO,
  TraineeProgressAnalyticsDTO,
} from "../contracts/analytics-contract";
import { sendAxiosRequest } from "./base-service";

const mockProgressData = [
  { date: "2024-12-30", firstMetric: 74, secondMetric: 71 },
  { date: "2024-12-31", firstMetric: 39, secondMetric: 16 },
  { date: "2025-01-01", firstMetric: 85, secondMetric: 26 },
  { date: "2025-01-02", firstMetric: 68, secondMetric: 11 },
  { date: "2025-01-03", firstMetric: 38, secondMetric: 4 },
  { date: "2025-01-04", firstMetric: 16, secondMetric: 0 },
  { date: "2025-01-05", firstMetric: 36, secondMetric: 50 },
  { date: "2025-01-06", firstMetric: 86, secondMetric: 34 },
  { date: "2025-01-07", firstMetric: 40, secondMetric: 27 },
  { date: "2025-01-08", firstMetric: 100, secondMetric: 70 },
  { date: "2025-01-09", firstMetric: 65, secondMetric: 72 },
  { date: "2025-01-10", firstMetric: 57, secondMetric: 31 },
];

const generateTraineeProgressAnalytics = async (
  userId: number,
  from: Date,
  to: Date,
  exerciseId: number
): Promise<TraineeProgressAnalytics> => {
  var url = ApiEndpoints.TraineeAnalytics.replace("{userId}", `${userId}`);
  url += `/engagement`;

  var body: ProgressAnalyticsRequestDTO = {
    from: from.toISOString(),
    to: to.toISOString(),
    exerciseId: exerciseId,
  };
  //   return sendAxiosRequest<
  //     ProgressAnalyticsRequestDTO,
  //     TraineeProgressAnalyticsDTO
  //   >({
  //     method: "POST",
  //     url: url,
  //     data: body,
  //   }).then((response) => {
  //     return response.data as TraineeProgressAnalytics;
  //   });
  await delay(1500);

  return {
    data: mockProgressData,
  };
};

const totalJoined = [{ interacted: 8, nonInteracted: 1 }];

const topInteractedMock = [
  { program: "Cardio HIIT", value: 10 },
  { program: "Best Program", value: 14 },
  { program: "Third one", value: 8 },
];

const topSkippedExercisesMock = [
  { exercise: "Squat", value: 9 },
  { exercise: "Bench press", value: 10 },
  { exercise: "Plank", value: 7 },
];

const topInteractedExercisesMock = [
  { exercise: "Squat", value: 9 },
  { exercise: "Bench press", value: 12 },
  { exercise: "Plank", value: 8 },
];

const getTraineeDashboardAnalytics = async (
  userId: number
): Promise<TraineeDashboardAnalytics> => {
  var url = ApiEndpoints.TraineeAnalytics.replace("{userId}", `${userId}`);
  url += "/general";

  //   return sendAxiosRequest<void, TraineeDashboardAnalyticsDTO>({
  //     method: "GET",
  //     url: url,
  //   }).then((response) => {
  //     return response.data as TraineeDashboardAnalytics;
  //   });
  await delay(1500);

  return {
    topFavoriteExercises: topInteractedExercisesMock,
    topInteractedPrograms: topInteractedMock,
    topSkippedExercises: topSkippedExercisesMock,
    totalJoined: totalJoined,
  };
};

export { getTraineeDashboardAnalytics, generateTraineeProgressAnalytics };
