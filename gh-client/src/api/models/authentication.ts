// For now only...

import { UserRole } from "./user-account";

export type AuthUserContext = {
  user: AuthUser | null;
  tokens: Tokens | null;
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
