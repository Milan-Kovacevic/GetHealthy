import { UserRole } from "../enums/user-role";

export type UserLoginDTO = {
  username: string;
  password: string;
};

export type LoginResponseDTO = {
  user: AuthUserDTO;
  tokens: TokensDTO;
};

export type AuthUserDTO = {
  id: number;
  firstName: string;
  lastName: string;
  role: UserRole;
};

export type TokensDTO = {
  accessToken: string;
  refreshToken: string;
};
