import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {
  MoveProgramParticipantDTO,
  PageableProgramParticipantsDTO,
  SingleProgramDetailsDTO,
} from "../contracts/program-details-contract";
import {
  MoveProgramParticipant,
  PageableProgramParticipants,
  SingleProgramDetails,
} from "../models/program-details";
import { ExerciseMetric, ProgramExercise } from "../models/exercise";
import { delay } from "@/lib/utils";

const metrics: ExerciseMetric[] = [
  {
    id: 1,
    name: "Reps",
    unit: "",
  },
  {
    id: 2,
    name: "Weight",
    unit: "kg",
  },
];
import {
  SingleTrainingProgramDTO,
  SingleProgramTrainerDTO,
} from "../contracts/program-details-contract";
import {
  SingleTrainingProgram,
  SingleProgramTrainer,
} from "../models/program-details";


const getSingleTrainingProgram = async (programId: number) => {
  var url = ApiEndpoints.SingleTrainingProgram.replace(
    "{programId}",
    `${programId}`
  );
  await delay(2000);
  return sendAxiosRequest<void, SingleTrainingProgramDTO>({
    method: "GET",
    url: url,
  }).then((response) => response.data as SingleTrainingProgram);
};

const getSingleProgramTrainer = async (programId: number) => {
  var url = ApiEndpoints.SingleTrainingProgram.replace(
    "{programId}",
    `${programId}`
  );
  url += `/trainer-info`;
  await delay(2000);
  return sendAxiosRequest<void, SingleProgramTrainerDTO>({
    method: "GET",
    url: url,
  }).then((response) => response.data as SingleProgramTrainer);
};

const getSingleTrainingProgramDetails = (id: number) => {
  var url = ApiEndpoints.SingleTrainingProgram.replace("{programId}", `${id}`);
  url += "/details";

  return sendAxiosRequest<void, SingleProgramDetailsDTO>({
    method: "GET",
    url: url,
  }).then((response) => {
    // Perform neccessary mappings etc...
    return response.data as SingleProgramDetails;
  });

  // return Promise.resolve<SingleProgramDetails>({
  //   requirements:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim  ad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  //   trainingDuration: 90,
  //   exercises: exercises,
  // });
};

// const mockParticipants: SingleProgramParticipant[] = [
//   {
//     id: 1,
//     profilePictureFilePath: "/placeholder.svg?height=40&width=40",
//     firstName: "John",
//     lastName: "Doe",
//     dateOfBirth: "1999-12-14",
//     gender: "Male",
//     joinDate: "2023-01-15",
//     height: 180,
//     weight: 75,
//   },
//   {
//     id: 2,
//     profilePictureFilePath:
//       "https://cdn.nba.com/headshots/nba/latest/1040x760/201566.png",
//     firstName: "Jane",
//     lastName: "Smith",
//     dateOfBirth: "1998-12-14",
//     gender: "Female",
//     joinDate: "2023-02-20",
//     height: 165,
//     weight: 60,
//     medicalHistory:
//       "Mild asthma Mild asthma Mild asthmaMild asthmaMild asthmaMild asthmaMild asthmaMild asthmavMild asthmaMild asthmaMild asthmaMild asthmaMild asthmaMild asthmaMild asthma",
//   },
//   {
//     id: 3,
//     profilePictureFilePath:
//       "https://b.fssta.com/uploads/application/nba/headshots/1937.vresize.350.350.medium.5.png",
//     firstName: "Mike",
//     lastName: "Johnson",
//     dateOfBirth: "2001-12-14",
//     gender: "Male",
//     joinDate: "2023-03-10",
//     height: 175,
//     weight: 80,
//     medicalHistory: "High blood pressure, controlled with medication",
//   },
//   {
//     id: 4,
//     profilePictureFilePath: "/placeholder.svg?height=40&width=40",
//     firstName: "Emily",
//     lastName: "Brown",
//     dateOfBirth: "2002-12-14",
//     gender: "Female",
//     joinDate: "2023-04-05",
//     height: 170,
//     weight: 65,
//   },
//   {
//     id: 5,
//     profilePictureFilePath: "/placeholder.svg?height=40&width=40",
//     firstName: "Sarah",
//     lastName: "Taylor",
//     dateOfBirth: "2001-12-14",
//     gender: "Female",
//     joinDate: "2023-04-07",
//     height: 172,
//     weight: 68,
//   },
//   {
//     id: 6,
//     profilePictureFilePath: "/placeholder.svg?height=40&width=40",
//     firstName: "Emily",
//     lastName: "Smith",
//     dateOfBirth: "2000-11-14",
//     gender: "Female",
//     joinDate: "2023-03-14",
//     height: 165,
//     weight: 60,
//   },
// ];

const getPageableTrainingProgramParticipants = async (
  programId: number,
  page: number = 0,
  filter: string = "",
  pageSize: number = 5
) => {
  var url = ApiEndpoints.SingleTrainingProgramParticipants.replace(
    "{programId}",
    `${programId}`
  );
  url += `?filter=${filter}&page=${page}&size=${pageSize}`;
  await delay(2000);
  return sendAxiosRequest<void, PageableProgramParticipantsDTO>({
    method: "GET",
    url: url,
  }).then((response) => {
    // Perform neccessary mappings etc...
    return response.data as PageableProgramParticipants;
  });
};

const removeParticipantFromTrainingProgram = async (
  programId: number,
  traineeId: number
) => {
  var url = ApiEndpoints.SingleTrainingProgramParticipants.replace(
    "{programId}",
    `${programId}`
  );
  url += `/${traineeId}`;

  await delay(2000);
  return sendAxiosRequest<void, void>({
    method: "DELETE",
    url: url,
  });
};

const moveParticipantToAnotherTrainingProgram = async (
  model: MoveProgramParticipant
) => {
  var url = ApiEndpoints.SingleTrainingProgramParticipants.replace(
    "{programId}",
    `${model.programId}`
  );
  url += `/${model.traineeId}/move`;

  await delay(2000);
  return sendAxiosRequest<MoveProgramParticipantDTO, void>({
    method: "PUT",
    url: url,
    data: model as MoveProgramParticipantDTO,
  });
};

export {
  getSingleTrainingProgramDetails,
  getPageableTrainingProgramParticipants,
  getSingleTrainingProgram,
  getSingleProgramTrainer,
  removeParticipantFromTrainingProgram,
  moveParticipantToAnotherTrainingProgram,
};
