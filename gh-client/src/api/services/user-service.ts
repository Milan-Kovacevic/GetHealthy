import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {
  TraineeDTO,
  TrainerDTO,
  TrainingProgramApplicationDTO,
} from "../contracts/user-contract";
import { Trainee, Trainer } from "../models/user";
// import { TraineeDTO, TrainerDTO } from "../models/user";
// import { Trainee, Trainer } from "../contracts/user-contract";

const getTrainerProfile = (trainerId: number = 0): Promise<TrainerDTO> => {
  var url = `${ApiEndpoints.Users}/${trainerId}/trainer`;

  // return sendAxiosRequest<void, Trainer>({
  //   method: "GET",
  //   url: url,
  // }).then((response) => {
  //   return response.data as TrainerDTO;
  // });

  return Promise.resolve<TrainerDTO>({
    userId: 1,
    firstName: "Alex",
    lastName: "Johnson",
    dateOfBirth: new Date("1995-03-10"),
    gender: 1,
    biography: "175",
    contactInfo: "asdas",
    profilePictureFilePath: "",
  });
};

const getTraineeProfile = (traineeId: number = 0): Promise<TraineeDTO> => {
  var url = `${ApiEndpoints.Users}/${traineeId}/trainee`;

  // return sendAxiosRequest<void, Trainee>({
  //   method: "GET",
  //   url: url,
  // }).then((response) => {
  //   return response.data as TraineeDTO;
  // });

  return Promise.resolve<TraineeDTO>({
    userId: 2,
    firstName: "Alex",
    lastName: "Johnson",
    dateOfBirth: new Date("1995-03-10"),
    gender: 1,
    height: 175,
    weight: 70,
    medicalHistory: "No known medical conditions.",
    profilePictureFilePath: "",
  });
};

const updateTrainerProfile = (trainerProfile: Trainer): Promise<void> => {
  //     const url = `${ApiEndpoints.Profiles}/trainer`;
  //   return sendAxiosRequest<Trainer, void>({
  //     method: "PUT",
  //     url: url,
  //     data: trainerProfile,
  //   });
  console.log("You have entered service function for updating trainer!");
  return Promise.resolve();
};

const updateTraineeProfile = (traineeProfile: Trainee): Promise<void> => {
  // const url = `${ApiEndpoints.Profiles}/trainee`;
  // return sendAxiosRequest<Trainee, void>({
  //   method: "PUT",
  //   url: url,
  //   data: traineeProfile,
  // });
  console.log("You have entered service function for updating trainee!");
  return Promise.resolve();
};

const joinTrainingProgram = (
  request: TrainingProgramApplicationDTO
): Promise<void> => {
  const url = "http://localhost:8200/api/v1/users/join-program";

  return sendAxiosRequest<TrainingProgramApplicationDTO, void>({
    method: "POST",
    url: url,
    data: request,
  }).then(() => {});
};

export {
  getTrainerProfile,
  getTraineeProfile,
  updateTraineeProfile,
  updateTrainerProfile,
  joinTrainingProgram,
};
