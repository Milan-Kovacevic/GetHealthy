import { ApiEndpoints } from "@/utils/constants";
import { WorkoutSummary } from "../models/trainee-exercising";
import { delay } from "@/lib/utils";

//TODOO
const getWorkoutSummary = async (
  traineeId: number,
  programScheduleId: number
): Promise<WorkoutSummary> => {
  // TODO

  await delay(1000);
  return Promise.resolve<WorkoutSummary>(
    workoutSummaryMock[programScheduleId % 3]
  );
};

const startProgramWorkout = async (
  traineeId: number,
  programScheduleId: number
) => {
  await delay(1500);
};

const giveExerciseSetFeedback = async () => {
  var url = ApiEndpoints.TraineeExercising + `/exercise-set-feedback`;
  await delay(1500);
};

export { getWorkoutSummary, startProgramWorkout, giveExerciseSetFeedback };

const workoutSummaryMock: WorkoutSummary[] = [
  {
    id: 1,
    traineeExercisingId: 1,
    programExercises: [
      {
        id: 101,
        exerciseName: "Bench Press",
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
        exerciseName: "Pull-Ups",
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
  },
  {
    id: 2,
    traineeExercisingId: 2,
    programExercises: [
      {
        id: 201,
        exerciseName: "Squats",
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
        exerciseName: "Plank",
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
  {
    id: 3,
    traineeExercisingId: undefined,
    programExercises: [
      {
        id: 201,
        exerciseName: "Squats",
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
        exerciseName: "Plank",
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
