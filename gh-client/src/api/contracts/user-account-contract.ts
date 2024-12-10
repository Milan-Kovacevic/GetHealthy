export type UserAccountDTO = {
  userId: number;
  username: string;
  email: string;
  password: string;
};

export type UpdatePasswordDTO = {
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmedNewPassword: string;
};

export type UpdateEmailDTO = {
  userId: number;
  newEmail: string;
  confirmedPassword: string;
};
