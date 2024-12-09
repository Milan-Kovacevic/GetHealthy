export type UserAccount = {
  userId: number;
  username: string;
  email: string;
  password: string;
};

export type UpdatePassword = {
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmedNewPassword: string;
};

export type UpdateEmail = {
  userId: number;
  newEmail: string;
  confirmedPassword: string;
};
