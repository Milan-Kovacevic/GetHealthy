import { UserRole } from "@/api/enums/user-role";

export type UserLogin = {
  username: string;
  password: string;
};

export type AuthUserContext = {
  user: AuthUser;
  tokens: Tokens;
};

export type AuthUser = {
  id: number;
  firstName: string;
  lastName: string;
  role: UserRole;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserRegistration = {
  role: UserRole;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  qualification?: File;
};
