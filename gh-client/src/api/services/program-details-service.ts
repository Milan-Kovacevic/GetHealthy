import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {SingleTrainingProgramDTO, SingleProgramTrainerDTO} from "../contracts/program-details-contract";
import {SingleTrainingProgram, SingleProgramTrainer} from "../models/program-details";
import { SingleProgramDetails } from "../models/program-details";
import { SingleProgramDetailsDTO } from "../contracts/program-details-contract";
import { ProgramExercise } from "../models/exercise";

const exercises: ProgramExercise[] = [
  {
    id: 1,
    position: 1,
    name: "Bench Press",
    description:
      "A compound exercise that primarily targets the chest muscles.",
    videoLink: "https://example.com/bench-press",
    exerciseSets: [
      { id: 1, firstMetricValue: "10", secondMetricValue: "135", restTime: 90 },
      { id: 2, firstMetricValue: "8", secondMetricValue: "155", restTime: 120 },
      { id: 3, firstMetricValue: "6", secondMetricValue: "175", restTime: 150 },
    ],
    firstMetric: {
      id: 1,
      name: "Broj ponavljanja",
      unit: "broj",
    },
    secondMetric: {
      id: 1,
      name: "Tezina",
      unit: "KG",
    },
  },
  {
    id: 2,
    position: 2,
    name: "Incline Bench Press",
    description:
      "A compound exercise that primarily targets the chest muscles. A compound exercise that primarily targets the chest muscles. A compound exercise that primarily targets the chest muscles.",
    videoLink: "https://example.com/bench-press",
    exerciseSets: [
      { id: 4, firstMetricValue: "10", secondMetricValue: "135", restTime: 90 },
      { id: 5, firstMetricValue: "8", secondMetricValue: "155", restTime: 120 },
    ],
    firstMetric: {
      id: 1,
      name: "Broj ponavljanja",
      unit: "broj",
    },
    secondMetric: {
      id: 1,
      name: "Tezina",
      unit: "KG",
    },
  },
  // {
  //   id: 3,
  //   name: "Squats",
  //   description:
  //     "A lower body exercise that targets the quadriceps, hamstrings, and glutes.",
  //   videoLink: "https://example.com/squats",
  //   exerciseSets: [
  //     { firstMetricValue: "12", secondMetricValue: "185", restTime: 90 },
  //     { firstMetricValue: "10", secondMetricValue: "205", restTime: 120 },
  //     { firstMetricValue: "8", secondMetricValue: "225", restTime: 150 },
  //     { firstMetricValue: "6", secondMetricValue: "245", restTime: 180 },
  //   ],
  // },

  // {
  //   id: 4,
  //   name: "Bench Press",
  //   description:
  //     "A compound exercise that primarily targets the chest muscles.",
  //   videoLink: "https://example.com/bench-press",
  //   exerciseSets: [
  //     { firstMetricValue: "10", secondMetricValue: "135", restTime: 90 },
  //     { firstMetricValue: "8", secondMetricValue: "155", restTime: 120 },
  //     { firstMetricValue: "6", secondMetricValue: "175", restTime: 150 },
  //   ],
  // },
];

const getSingleTrainingProgram = async (
    programId: number
) => {
    var url = ApiEndpoints.SingleTrainingProgram.replace(
        "{programId}",
        `${programId}`
      );
      return sendAxiosRequest<void, SingleTrainingProgramDTO>({
        method: "GET",
        url: url,
      }).then((response) => response.data as SingleTrainingProgram);  
}; 

const getSingleProgramTrainer = async (
    programId: number
) => {
    var url = ApiEndpoints.SingleTrainingProgram.replace(
        "{programId}",
        `${programId}`
      );
      url+=`/trainer-info`;

      return sendAxiosRequest<void, SingleProgramTrainerDTO>({
        method: "GET",
        url: url,
      }).then((response) => response.data as SingleProgramTrainer);  
}; 

const getSingleTrainingProgramDetails = (id: number) => {
  var url = ApiEndpoints.SingleTrainingProgram.replace("{programId}", `${id}`);
  url += "/details";

  //   return sendAxiosRequest<void, SingleProgramDetailsDTO>({
  //     method: "GET",
  //     url: url,
  //   }).then((response) => {
  //     // Perform neccessary mappings etc...
  //     return response.data as SingleProgramDetails;
  //   });

  return Promise.resolve<SingleProgramDetails>({
    requirements:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim  ad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    estimatedWorkoutTime: 90,
    exercises: exercises,
  });
};

export { getSingleTrainingProgramDetails, getSingleTrainingProgram, getSingleProgramTrainer };
