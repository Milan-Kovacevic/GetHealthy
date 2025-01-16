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
  WorkoutSummary,
} from "../models/trainee-exercising";
import { delay } from "@/lib/utils";
import { sendAxiosRequest } from "./base-service";

//TODOO
const getWorkoutSummary = async (
  traineeId: number,
  programScheduleId: number
): Promise<WorkoutSummary> => {
  var url = ApiEndpoints.TraineeExercising;
  url += "/summary";
  var body: GenerateWorkoutSummary = {
    traineeId: traineeId,
    programScheduleId: programScheduleId,
  };

  // return sendAxiosRequest<GenerateWorkoutSummary, WorkoutSummary>({
  //   method: "POST",
  //   url: url,
  //   data: body as GenerateWorkoutSummary,
  // }).then((response) => {
  //   return response.data as WorkoutSummary;
  // });

  await delay(1000);
  return Promise.resolve<WorkoutSummary>({
    ...workoutSummaryMock[programScheduleId % 3],
  });
};

const startProgramWorkout = async (
  traineeId: number,
  programScheduleId: number
) => {
  var url = ApiEndpoints.TraineeExercising;
  url += "/start";
  const body: StartWorkoutRequest = {
    traineeId: traineeId,
    programScheduleId: programScheduleId,
  };
  await delay(1500);
  // return sendAxiosRequest<StartWorkoutRequest, StartWorkoutResponse>({
  //   method: "POST",
  //   url: url,
  //   data: body as StartWorkoutRequest,
  // }).then((response) => {
  //   return response.data as StartWorkoutResponse;
  // });

  return Promise.resolve<StartWorkoutResponse>({
    workoutId: 1,
    dateTaken: new Date().toUTCString(),
  });
};

const skipWorkoutExercise = async (
  workoutId: number,
  programExerciseId: number
) => {
  var url = ApiEndpoints.TraineeExercising;
  url += `/${workoutId}/exercises/skip`;
  const body: ExerciseFeedbackRequest = {
    programExerciseId: programExerciseId,
  };
  await delay(1500);

  // return sendAxiosRequest<ExerciseFeedbackRequest, ExerciseFeedbackResponse>({
  //   method: "POST",
  //   url: url,
  //   data: body as ExerciseFeedbackRequest,
  // }).then((response) => {
  //   return response.data as ExerciseFeedbackResponse;
  // });

  return Promise.resolve<ExerciseFeedbackResponse>({
    exerciseFeedbackId: 1001,
  });
};

const beginWorkoutExercise = async (
  workoutId: number,
  programExerciseId: number
) => {
  var url = ApiEndpoints.TraineeExercising;
  url += `/${workoutId}/exercises/begin`;
  const body: ExerciseFeedbackRequest = {
    programExerciseId: programExerciseId,
  };
  await delay(1500);

  // return sendAxiosRequest<ExerciseFeedbackRequest, ExerciseFeedbackResponse>({
  //   method: "POST",
  //   url: url,
  //   data: body as ExerciseFeedbackRequest,
  // }).then((response) => {
  //   return response.data as ExerciseFeedbackResponse;
  // });

  return Promise.resolve<ExerciseFeedbackResponse>({
    exerciseFeedbackId: 1001,
  });
};

const skipWorkoutExerciseSet = async (
  workoutId: number,
  exerciseFeedbackId: number,
  exerciseSetId: number
) => {
  var url = ApiEndpoints.TraineeExercising;
  url += `/${workoutId}/exercises/${exerciseFeedbackId}/sets/skip`;
  const body: SkipExerciseSetFeedbackRequest = {
    exerciseSetId: exerciseSetId,
  };
  await delay(1500);

  // return sendAxiosRequest<
  //   SkipExerciseSetFeedbackRequest,
  //   ExerciseSetFeedbackResponse
  // >({
  //   method: "POST",
  //   url: url,
  //   data: body as SkipExerciseSetFeedbackRequest,
  // }).then((response) => {
  //   return response.data as ExerciseSetFeedbackResponse;
  // });

  return Promise.resolve<ExerciseSetFeedbackResponse>({
    setFeedbackId: 101,
  });
};

const giveExerciseSetFeedback = async (
  workoutId: number,
  exerciseFeedbackId: number,
  data: SendExerciseSetFeedbackRequest
) => {
  var url = ApiEndpoints.TraineeExercising;
  url += `/${workoutId}/exercises/${exerciseFeedbackId}/sets`;
  await delay(1500);

  // return sendAxiosRequest<
  //   SendExerciseSetFeedbackRequest,
  //   ExerciseSetFeedbackResponse
  // >({
  //   method: "POST",
  //   url: url,
  //   data: data as SendExerciseSetFeedbackRequest,
  // }).then((response) => {
  //   return response.data as ExerciseSetFeedbackResponse;
  // });

  return Promise.resolve<ExerciseSetFeedbackResponse>({
    setFeedbackId: 101,
  });
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
        // exerciseFeedbackId: 2001,
        // exerciseSetsFeedback: [
        //   {
        //     setFeedbackId: 5,
        //     firstMetricValueFeedback: "90",
        //     secondMetricValueFeedback: "10",
        //     completed: true,
        //   },
        //   {
        //     setFeedbackId: 6,
        //     firstMetricValueFeedback: "95",
        //     secondMetricValueFeedback: "8",
        //     completed: false,
        //     skipped: true,
        //   },
        // ],
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
        // exerciseFeedbackId: 2002,
        // exerciseSetsFeedback: [
        //   { setFeedbackId: 7, firstMetricValueFeedback: "60", completed: true },
        //   { setFeedbackId: 8, firstMetricValueFeedback: "90", completed: true },
        // ],
      },
    ],
  },
];
