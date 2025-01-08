export type UserAccount = {
  userId: number;
  username: string;
  email: string;
};

export enum UserRole {
  TRAINER = "TRAINER",
  TRAINEE = "TRAINEE",
}
