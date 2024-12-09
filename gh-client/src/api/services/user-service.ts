import { ApiEndpoints } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import { TraineeDTO, TrainerDTO } from "../models/user";
import { Trainee, Trainer } from "../contracts/user-contract";

const getTrainerProfile = (trainerId: number = 0): Promise<TrainerDTO> => {
  var url = `${ApiEndpoints.Users}/${trainerId}/trainer`;

  // return sendAxiosRequest<void, Trainer>({
  //   method: "GET",
  //   url: url,
  // }).then((response) => {
  //   return response.data as TrainerDTO;
  // });

  return Promise.resolve<TrainerDTO>({
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

export {
  getTrainerProfile,
  getTraineeProfile,
  updateTraineeProfile,
  updateTrainerProfile,
};
