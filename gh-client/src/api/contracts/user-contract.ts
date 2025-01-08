export type UserAccountDTO = {
  userId: number;
  username: string;
  email: string;
  enabled: boolean;
  role: string;
  createdAt: Date;
  lastAccessed: Date;
};

export type UserDTO = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: number;
  profilePictureFilePath?: string;
  userAccount?: UserAccountDTO;
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
