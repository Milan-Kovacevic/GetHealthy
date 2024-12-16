export type UserDTO = {
  userId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: number;
  profilePictureFilePath?: string;
};

export type TrainerDTO = UserDTO & {
  biography: string;
  contactInfo: string;
};

export type TraineeDTO = UserDTO & {
  height: number;
  weight: number;
  medicalHistory: string;
};

export type TrainingProgramApplicationDTO = {
  programId: number;
  traineeId: number;
  note: string;
};
