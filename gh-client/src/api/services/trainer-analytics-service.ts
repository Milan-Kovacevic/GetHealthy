import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {
  EngagementAnalyticsRequestDTO,
  PopularityAnalyticsRequestDTO,
  TrainerDashboardAnalyticsDTO,
  TrainerEngagementAnalyticsDTO,
  TrainerPopularityAnalyticsDTO,
} from "../contracts/analytics-contract";
import {
  AnalyticsProgramExercise,
  AnalyticsProgramParticipant,
  TrainerDashboardAnalytics,
  TrainerEngagementAnalytics,
  TrainerPopularityAnalytics,
} from "../models/analytics";
import { delay } from "@/lib/utils";
import { ProgramParticipantDTO } from "../contracts/program-participant-contract";
import { getTrainingProgramExercises } from "./training-program-exercise-service";

const topInteractedMock = [
  { program: "Cardio HIIT", value: 10 },
  { program: "Best Program", value: 14 },
  { program: "Third one", value: 8 },
];
const topJoinedMock = [
  { program: "Cardio HIIT", value: 126 },
  { program: "Best Program", value: 257 },
  { program: "Third one", value: 42 },
];
const topVotedMock = [
  { program: "Cardio HIIT", value: 4.7 },
  { program: "Best Program", value: 4.8 },
  { program: "Third one", value: 4.55 },
];
const totalProgramsMock = [
  { beginner: 1260, intermediate: 570, advanced: 621 },
];

const getTrainerDashboardAnalytics = async (
  userId: number
): Promise<TrainerDashboardAnalytics> => {
  var url = ApiEndpoints.TrainerAnalytics.replace("{userId}", `${userId}`);
  url += "/general";
  await delay(500);
  return sendAxiosRequest<void, TrainerDashboardAnalyticsDTO>({
    method: "GET",
    url: url,
    requireAuth: true,
  }).then((response) => {
    return response.data as TrainerDashboardAnalytics;
  });
  // return {
  //   topInteracted: topInteractedMock,
  //   topJoined: topJoinedMock,
  //   topVoted: topVotedMock,
  //   totalPrograms: totalProgramsMock,
  // };
};

const ratingData = [
  { date: "2024-12-30", value: 4.5 },
  { date: "2024-12-31", value: 4.2 },
  { date: "2025-01-01", value: 4.7 },
  { date: "2025-01-02", value: 4.3 },
  { date: "2025-01-03", value: 4.1 },
];
const participantData = [
  { date: "2024-12-30", value: 150 },
  { date: "2024-12-31", value: 120 },
  { date: "2025-01-01", value: 200 },
  { date: "2025-01-02", value: 180 },
  { date: "2025-01-03", value: 100 },
];

const generateTrainerPopularityAnalytics = async (
  userId: number,
  from: Date,
  to: Date,
  programId: number
): Promise<TrainerPopularityAnalytics> => {
  var url = ApiEndpoints.TrainerAnalytics.replace("{userId}", `${userId}`);
  url += `/popularity`;

  var body: PopularityAnalyticsRequestDTO = {
    from: from.toISOString(),
    to: to.toISOString(),
    programId: programId,
  };
  await delay(500);
  return sendAxiosRequest<
    PopularityAnalyticsRequestDTO,
    TrainerPopularityAnalyticsDTO
  >({
    method: "POST",
    url: url,
    requireAuth: true,
    data: body,
  }).then((response) => {
    return response.data as TrainerPopularityAnalytics;
  });

  // return {
  //   ratings: ratingData,
  //   totalParticipants: participantData,
  // };
};

const engagementData = [
  { date: "2024-12-30", skipped: 74, completed: 71 },
  { date: "2024-12-31", skipped: 39, completed: 16 },
  { date: "2025-01-01", skipped: 85, completed: 26 },
  { date: "2025-01-02", skipped: 68, completed: 11 },
  { date: "2025-01-03", skipped: 38, completed: 4 },
  { date: "2025-01-04", skipped: 16, completed: 0 },
  { date: "2025-01-05", skipped: 36, completed: 50 },
  { date: "2025-01-06", skipped: 86, completed: 34 },
  { date: "2025-01-07", skipped: 40, completed: 27 },
  { date: "2025-01-08", skipped: 100, completed: 70 },
  { date: "2025-01-09", skipped: 65, completed: 72 },
  { date: "2025-01-10", skipped: 57, completed: 31 },
  { date: "2025-01-11", skipped: 77, completed: 63 },
  { date: "2025-01-12", skipped: 80, completed: 28 },
  { date: "2025-01-13", skipped: 87, completed: 94 },
  { date: "2025-01-14", skipped: 57, completed: 78 },
  { date: "2025-01-15", skipped: 2, completed: 54 },
  { date: "2025-01-16", skipped: 0, completed: 97 },
  { date: "2025-01-17", skipped: 10, completed: 88 },
  { date: "2025-01-18", skipped: 6, completed: 73 },
  { date: "2025-01-19", skipped: 45, completed: 27 },
  { date: "2025-01-20", skipped: 23, completed: 24 },
  { date: "2025-01-21", skipped: 86, completed: 13 },
  { date: "2025-01-22", skipped: 79, completed: 30 },
  { date: "2025-01-23", skipped: 56, completed: 57 },
  { date: "2025-01-24", skipped: 24, completed: 81 },
  { date: "2025-01-25", skipped: 95, completed: 58 },
  { date: "2025-01-26", skipped: 79, completed: 71 },
  { date: "2025-01-27", skipped: 26, completed: 4 },
  { date: "2025-01-28", skipped: 31, completed: 44 },
  { date: "2025-01-29", skipped: 63, completed: 71 },
];

const generateTrainerEngagementAnalytics = async (
  userId: number,
  from: Date,
  to: Date,
  programId: number,
  exerciseId: number,
  participantId?: number
): Promise<TrainerEngagementAnalytics> => {
  var url = ApiEndpoints.TrainerAnalytics.replace("{userId}", `${userId}`);
  url += `/engagement`;

  var body: EngagementAnalyticsRequestDTO = {
    from: from.toISOString(),
    to: to.toISOString(),
    programId: programId,
    exerciseId: exerciseId,
    traineeId: participantId,
  };
  await delay(500);
  return sendAxiosRequest<
    EngagementAnalyticsRequestDTO,
    TrainerEngagementAnalyticsDTO
  >({
    method: "POST",
    url: url,
    requireAuth: true,
    data: body,
  }).then((response) => {
    return {
      ...response.data,
      data: response.data.data.map((pair) => {
        return {
          ...pair,
          completed: pair.completed * 100,
          skipped: pair.skipped * 100,
        };
      }),
    } as TrainerEngagementAnalytics;
  });

  // return {
  //   data: engagementData,
  // };
};

const getAnalyticsProgramParticipants = async (programId: number) => {
  var url = ApiEndpoints.SingleTrainingProgramParticipants.replace(
    "{programId}",
    `${programId}`
  );
  url += `/all`;
  await delay(500);
  return sendAxiosRequest<void, ProgramParticipantDTO[]>({
    method: "GET",
    url: url,
    requireAuth: true,
  }).then((response) => {
    // Perform neccessary mappings etc...
    return response.data as AnalyticsProgramParticipant[];
  });
  // return [
  //   {
  //     id: 1,
  //     firstName: "Alex",
  //     lastName: "Doe",
  //     joinDate: "01/01/2025",
  //     dateOfBirth: "01/01/2001",
  //     gender: "MALE",
  //   },
  //   {
  //     id: 2,
  //     firstName: "Jhon",
  //     lastName: "Stock",
  //     joinDate: "02/01/2025",
  //     dateOfBirth: "01/01/2002",
  //     gender: "MALE",
  //   },
  // ];
};

const getAnalyticsProgramExercises = async (programId: number) => {
  return getTrainingProgramExercises(programId).then(
    (response) => response as AnalyticsProgramExercise[]
  );
  // await delay(500);
  // return [
  //   {
  //     id: 1,
  //     name: "Bench Press",
  //   },
  //   {
  //     id: 2,
  //     name: "Deadlift",
  //   },
  //   {
  //     id: 3,
  //     name: "Overhead Press",
  //   },
  //   {
  //     id: 4,
  //     name: "Pull-Up",
  //   },
  // ];
};

export {
  getTrainerDashboardAnalytics,
  generateTrainerPopularityAnalytics,
  generateTrainerEngagementAnalytics,
  getAnalyticsProgramParticipants,
  getAnalyticsProgramExercises,
};
