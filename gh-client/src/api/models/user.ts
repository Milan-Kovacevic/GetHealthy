export type User = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: number;
  profilePictureFilePath?: string;
};

export type Trainer = User & {
  biography: string;
  contactInfo: string;
};

export type Trainee = User & {
  height: number;
  weight: number;
  medicalHistory: string;
};

export enum UserRole {
  TRAINER = "TRAINER",
  TRAINEE = "TRAINEE",
}
