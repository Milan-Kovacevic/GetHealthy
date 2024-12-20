export type UserAccountDTO = {
  userId: number;
  username: string;
  email: string;
  password: string;
};

export type PasswordChangeDTO = {
  currentPassword: string;
  newPassword: string;
  confirmedNewPassword: string;
};

export type EmailChangeDTO = {
  email: string;
  confirmedPassword: string;
};
