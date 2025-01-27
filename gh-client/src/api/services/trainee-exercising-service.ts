import { ApiEndpoints } from "@/utils/constants";
import {
  ExerciseFeedbackRequest,
  ExerciseFeedbackResponse,
  ExerciseSetFeedbackResponse,
  GenerateWorkoutSummary,
  SendExerciseSetFeedbackRequest,
  SkipExerciseSetFeedbackRequest,
  StartWorkoutRequest,
  StartWorkoutResponse,
  WorkoutExercise,
  WorkoutSet,
  WorkoutSummary,
} from "../models/trainee-exercising";
import { delay } from "@/lib/utils";
import { sendAxiosRequest } from "./base-service";
import {
  ExerciseFeedbackRequestDTO,
  ExerciseFeedbackResponseDTO,
  ExerciseSetFeedbackResponseDTO,
  GenerateWorkoutSummaryDTO,
  SendExerciseSetFeedbackRequestDTO,
  SkipExerciseSetFeedbackRequestDTO,
  StartWorkoutRequestDTO,
  StartWorkoutResponseDTO,
  WorkoutSummaryDTO,
} from "../contracts/trainee-exercising-contract";

const getWorkoutSummary = async (
  traineeId: number,
  programScheduleId: number
): Promise<WorkoutSummary> => {
  var url = ApiEndpoints.TraineeExercising;
  url += "/summary";
  var body: GenerateWorkoutSummaryDTO = {
    traineeId: traineeId,
    programScheduleId: programScheduleId,
  };

  await delay(500);
  return sendAxiosRequest<GenerateWorkoutSummaryDTO, WorkoutSummaryDTO>({
    method: "POST",
    url: url,
    requireAuth: true,
    data: body as GenerateWorkoutSummary,
  }).then((response) => {
    return response.data as WorkoutSummary;
  });

  // return Promise.resolve<WorkoutSummary>({
  //   ...workoutSummaryMock[programScheduleId % 3],
  // });
};

const startProgramWorkout = async (
  traineeId: number,
  programScheduleId: number
): Promise<StartWorkoutResponse> => {
  var url = ApiEndpoints.TraineeExercising;
  url += "/start";
  const body: StartWorkoutRequestDTO = {
    traineeId: traineeId,
    programScheduleId: programScheduleId,
  };
  await delay(500);
  return sendAxiosRequest<StartWorkoutRequestDTO, StartWorkoutResponseDTO>({
    method: "POST",
    url: url,
    requireAuth: true,
    data: body as StartWorkoutRequestDTO,
  }).then((response) => {
    return {
      ...response.data,
      workoutId: response.data.traineeExercisingId,
    } as StartWorkoutResponse;
  });

  // return Promise.resolve<StartWorkoutResponse>({
  //   workoutId: 1,
  //   dateTaken: format(new Date(), "hh:mm:ss"),
  // });
};

const skipWorkoutExercise = async (
  workoutId: number,
  programExerciseId: number
): Promise<ExerciseFeedbackResponse> => {
  var url = ApiEndpoints.TraineeExercising;
  url += `/${workoutId}/exercises/skip`;
  const body: ExerciseFeedbackRequestDTO = {
    programExerciseId: programExerciseId,
  };
  await delay(500);
  return sendAxiosRequest<
    ExerciseFeedbackRequestDTO,
    ExerciseFeedbackResponseDTO
  >({
    method: "POST",
    url: url,
    requireAuth: true,
    data: body as ExerciseFeedbackRequestDTO,
  }).then((response) => {
    return response.data as ExerciseFeedbackResponse;
  });

  // return Promise.resolve<ExerciseFeedbackResponse>({
  //   exerciseFeedbackId: 1001,
  // });
};

const beginWorkoutExercise = async (
  workoutId: number,
  programExerciseId: number
): Promise<ExerciseFeedbackResponse> => {
  var url = ApiEndpoints.TraineeExercising;
  url += `/${workoutId}/exercises/begin`;
  const body: ExerciseFeedbackRequestDTO = {
    programExerciseId: programExerciseId,
  };
  await delay(500);
  return sendAxiosRequest<
    ExerciseFeedbackRequestDTO,
    ExerciseFeedbackResponseDTO
  >({
    method: "POST",
    url: url,
    requireAuth: true,
    data: body as ExerciseFeedbackRequestDTO,
  }).then((response) => {
    return response.data as ExerciseFeedbackResponse;
  });

  // return Promise.resolve<ExerciseFeedbackResponse>({
  //   exerciseFeedbackId: 1001,
  // });
};

const skipWorkoutExerciseSet = async (
  workoutId: number,
  exerciseFeedbackId: number,
  exerciseSetId: number
): Promise<ExerciseSetFeedbackResponse> => {
  var url = ApiEndpoints.TraineeExercising;
  url += `/${workoutId}/exercises/${exerciseFeedbackId}/sets/skip`;
  const body: SkipExerciseSetFeedbackRequestDTO = {
    exerciseSetId: exerciseSetId,
  };
  await delay(500);
  return sendAxiosRequest<
    SkipExerciseSetFeedbackRequestDTO,
    ExerciseSetFeedbackResponseDTO
  >({
    method: "POST",
    url: url,
    requireAuth: true,
    data: body as SkipExerciseSetFeedbackRequestDTO,
  }).then((response) => {
    return response.data as ExerciseSetFeedbackResponse;
  });

  // return Promise.resolve<ExerciseSetFeedbackResponse>({
  //   setFeedbackId: 101,
  // });
};

const giveExerciseSetFeedback = async (
  workoutId: number,
  exerciseFeedbackId: number,
  data: SendExerciseSetFeedbackRequest
): Promise<ExerciseSetFeedbackResponse> => {
  var url = ApiEndpoints.TraineeExercising;
  url += `/${workoutId}/exercises/${exerciseFeedbackId}/sets`;
  await delay(500);
  return sendAxiosRequest<
    SendExerciseSetFeedbackRequestDTO,
    ExerciseSetFeedbackResponseDTO
  >({
    method: "POST",
    url: url,
    requireAuth: true,
    data: data as SendExerciseSetFeedbackRequestDTO,
  }).then((response) => {
    return response.data as ExerciseSetFeedbackResponse;
  });

  // return Promise.resolve<ExerciseSetFeedbackResponse>({
  //   setFeedbackId: 101,
  // });
};

export {
  getWorkoutSummary,
  startProgramWorkout,
  skipWorkoutExercise,
  beginWorkoutExercise,
  skipWorkoutExerciseSet,
  giveExerciseSetFeedback,
};

const workoutSummaryMock: WorkoutSummary[] = [
  {
    id: 1,
    workoutId: 1,
    programExercises: [
      {
        id: 101,
        name: "Bench Press",
        description:
          "A strength exercise that targets the chest, shoulders, and triceps.",
        videoLink: "https://www.example.com/bench-press-video",
        firstExerciseMetric: { id: 1, name: "Weight", unit: "kg" },
        secondExerciseMetric: { id: 2, name: "Reps", unit: "reps" },
        exerciseSetsFeedback: [
          {
            id: 1,
            restTime: 60,
            firstMetricValue: "70",
            secondMetricValue: "10",
            setFeedbackId: 1,
            firstMetricValueFeedback: "70",
            secondMetricValueFeedback: "10",
            completed: true,
          },
          {
            id: 2,
            restTime: 60,
            firstMetricValue: "75",
            secondMetricValue: "8",
            setFeedbackId: 2,
            firstMetricValueFeedback: "75",
            secondMetricValueFeedback: "8",
            completed: true,
          },
        ],
        exerciseFeedbackId: 1001,
      },
      {
        id: 102,
        name: "Pull-Ups",
        description: "A bodyweight exercise that targets the back and arms.",
        videoLink: "https://www.example.com/pull-ups-video",
        firstExerciseMetric: { id: 3, name: "Weight", unit: "kg" },
        secondExerciseMetric: { id: 4, name: "Reps", unit: "reps" },
        exerciseSetsFeedback: [
          {
            id: 3,
            restTime: 90,
            firstMetricValue: "10",
            secondMetricValue: "12",
            setFeedbackId: 3,
            firstMetricValueFeedback: "5",
            secondMetricValueFeedback: "12",
            completed: true,
          },
          {
            id: 4,
            restTime: 90,
            firstMetricValue: "15",
            secondMetricValue: "10",
            setFeedbackId: 4,
            firstMetricValueFeedback: "10",
            secondMetricValueFeedback: "10",
            completed: true,
          },
        ],
        exerciseFeedbackId: 1002,
      },
    ],
  } as const,
  {
    id: 2,
    workoutId: 2,
    programExercises: [
      {
        id: 201,
        name: "Squats",
        description:
          "A lower-body strength exercise that targets the legs and glutes.",
        videoLink: "https://www.example.com/squats-video",
        firstExerciseMetric: { id: 5, name: "Weight", unit: "kg" },
        secondExerciseMetric: { id: 6, name: "Reps", unit: "reps" },
        exerciseSetsFeedback: [
          {
            id: 5,
            restTime: 90,
            firstMetricValue: "90",
            secondMetricValue: "10",
            setFeedbackId: 5,
            firstMetricValueFeedback: "90",
            secondMetricValueFeedback: "10",
            completed: true,
            skipped: false,
          },
          {
            id: 6,
            restTime: 90,
            firstMetricValue: "95",
            secondMetricValue: "8",
          },
        ],

        exerciseFeedbackId: 2001,
      },
      {
        id: 202,
        name: "Plank",
        description:
          "A core-strengthening exercise that targets the abdominal muscles.",
        videoLink: "https://www.example.com/plank-video",
        firstExerciseMetric: { id: 7, name: "Time", unit: "seconds" },
        secondExerciseMetric: undefined,
        exerciseSetsFeedback: [
          { id: 7, restTime: 60, firstMetricValue: "60" },
          { id: 8, restTime: 60, firstMetricValue: "90" },
        ],
      },
    ],
  } as const,
  {
    id: 3,
    workoutId: undefined,
    programExercises: [
      {
        id: 201,
        name: "Squats",
        description:
          "A lower-body strength exercise that targets the legs and glutes.",
        videoLink: "https://www.example.com/squats-video",
        firstExerciseMetric: { id: 5, name: "Weight", unit: "kg" },
        secondExerciseMetric: { id: 6, name: "Reps", unit: "reps" },
        exerciseSetsFeedback: [
          {
            id: 5,
            restTime: 90,
            firstMetricValue: "90",
            secondMetricValue: "10",
          },
          {
            id: 6,
            restTime: 90,
            firstMetricValue: "95",
            secondMetricValue: "8",
          },
        ],
      },
      {
        id: 202,
        name: "Plank",
        description:
          "A core-strengthening exercise that targets the abdominal muscles.",
        videoLink: "https://www.example.com/plank-video",
        firstExerciseMetric: { id: 7, name: "Time", unit: "seconds" },
        secondExerciseMetric: { id: 8, name: "Sets", unit: "sets" },
        exerciseSetsFeedback: [
          { id: 7, restTime: 60, firstMetricValue: "60" },
          { id: 8, restTime: 60, firstMetricValue: "90" },
        ],
      },
    ],
  },
];
