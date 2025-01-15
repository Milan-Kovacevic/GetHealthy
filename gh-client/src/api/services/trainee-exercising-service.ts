import { ApiEndpoints } from "@/utils/constants";
import {
  ExerciseFeedbackRequest,
  ExerciseSetFeedbackRequest,
  TraineeExercising,
} from "../models/trainee-exercising";
import {
  ExerciseFeedbackRequestDTO,
  ExerciseSetFeedbackRequestDTO,
  TraineeExercisingDTO,
  TraineeExercisingRequestDTO,
} from "../contracts/trainee-exercising-contract";
import { sendAxiosRequest } from "./base-service";
import { Category } from "../models/category";
import { ExerciseMetric } from "../models/exercise";
import { Set, Exercise } from "../models/trainee-exercising";
import { ProgramDifficulty } from "../enums/program-difficulty";
import { delay } from "@/lib/utils";

//TODOO
const getWorkoutSummary = async () =>
  // programId: number
  //userId: number
  {
    //TODOOO
    // var url = ApiEndpoints.TraineeExercising.replace(
    //   "{programId}",
    //   `${programId}`
    // );

    //   return sendAxiosRequest<void, TraineeExercisingDTO>({
    //     method: "GET",
    //     url: url,
    //   }).then((response) => {
    //     return response.data as TraineeExercising;
    //   });
    await delay(1000);
    return Promise.resolve<TraineeExercising>(mockTraineeExercising);
  };

const startWorkout = async (programId: number, userId: number) => {
  var url = ApiEndpoints.TraineeExercising + `/start`;
  return sendAxiosRequest<TraineeExercisingRequestDTO, TraineeExercisingDTO>({
    method: "POST",
    url: url,
    data: { programId, userId },
  }).then((response) => response.data as TraineeExercising);
};

const giveSetFeedback = async (feedback: ExerciseSetFeedbackRequest) => {
  var url = ApiEndpoints.TraineeExercising + `/exercise-set-feedback`;
  try {
    return sendAxiosRequest<ExerciseSetFeedbackRequestDTO, void>({
      method: "POST",
      url: url,
      data: feedback,
    });
  } catch (error) {
    console.error("Failed to submit set feedback:", error);
  }
};

const giveExerciseFeedback = async (feedback: ExerciseFeedbackRequest) => {
  var url = ApiEndpoints.TraineeExercising + `/exercise-feedback`;

  return sendAxiosRequest<ExerciseFeedbackRequestDTO, void>({
    method: "POST",
    url: url,
    data: feedback,
  });
};

// Mock podaci za ExerciseMetric
const mockExerciseMetrics: ExerciseMetric[] = [
  { id: 1, name: "Weight", unit: "kg" },
  { id: 2, name: "Repetitions", unit: "reps" },
  { id: 3, name: "Distance", unit: "meters" },
  { id: 4, name: "Time", unit: "seconds" },
];

// Mock podaci za ExerciseSet
const mockExerciseSets: Set[] = [
  {
    id: 1,
    restTime: 60,
    firstMetricValue: "20",
    secondMetricValue: "10",
    status: "pending",
  },
  {
    id: 2,
    restTime: 90,
    firstMetricValue: "25",
    secondMetricValue: "8",
    status: "pending",
  },
  {
    id: 3,
    restTime: 120,
    firstMetricValue: "30",
    secondMetricValue: "6",
    status: "pending",
  },
];

// Mock podaci za ProgramExerciseDetails
const mockProgramExercises: Exercise[] = [
  {
    id: 1,
    name: "Bench Press",
    description:
      "A compound exercise targeting the chest, shoulders, and triceps.",
    videoLink: "https://example.com/bench-press",
    firstExerciseMetric: mockExerciseMetrics[0],
    secondExerciseMetric: mockExerciseMetrics[1],
    exerciseSets: mockExerciseSets,
  },
  {
    id: 2,
    name: "Deadlift",
    description: "A compound movement working the entire posterior chain.",
    videoLink: "https://example.com/deadlift",
    firstExerciseMetric: mockExerciseMetrics[0],
    secondExerciseMetric: mockExerciseMetrics[1],
    exerciseSets: [
      {
        id: 4,
        restTime: 120,
        firstMetricValue: "50",
        secondMetricValue: "8",
        status: "pending",
      },
      {
        id: 5,
        restTime: 150,
        firstMetricValue: "60",
        secondMetricValue: "6",
        status: "pending",
      },
    ],
  },
  {
    id: 3,
    name: "Rowing Machine",
    description: "A cardio exercise that engages the full body.",
    videoLink: "https://example.com/rowing-machine",
    firstExerciseMetric: mockExerciseMetrics[2],
    secondExerciseMetric: mockExerciseMetrics[3],
    exerciseSets: [
      {
        id: 6,
        restTime: 30,
        firstMetricValue: "500",
        secondMetricValue: "120",
        status: "pending",
      },
      {
        id: 7,
        restTime: 45,
        firstMetricValue: "750",
        secondMetricValue: "180",
        status: "pending",
      },
    ],
  },
];

// Mock podaci za Category
const mockCategories: Category[] = [
  { categoryId: 1, name: "Strength" },
  { categoryId: 2, name: "Endurance" },
  { categoryId: 3, name: "Cardio" },
];

// Mock podaci za TraineeExercising
const mockTraineeExercising: TraineeExercising = {
  programName: "Total Body Strength",
  trainerName: "John Doe",
  programCategories: [mockCategories[0], mockCategories[2]], // Strength i Cardio
  programDifficulty: ProgramDifficulty.INTERMEDIATE,
  exercises: mockProgramExercises,
  traineeExercisingId: 0,
};

export {
  getWorkoutSummary,
  startWorkout,
  giveSetFeedback,
  giveExerciseFeedback,
};
