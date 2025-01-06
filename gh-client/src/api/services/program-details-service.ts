import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import { SingleProgramDetailsDTO } from "../contracts/program-details-contract";
import {
  MoveProgramParticipant,
  PageableProgramParticipants,
  SingleProgramDetails,
} from "../models/program-details";
import { ExerciseMetric } from "../models/exercise";
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
import {
  MoveProgramParticipantDTO,
  PageableProgramParticipantsDTO,
} from "../contracts/program-participant-contract";

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
};

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
