interface ILoginRequest {
  username: string;
  password: string;
}

interface ILoginResponse {
  user: IAuthUser;
  tokens: IAuthTokens;
}

interface IAuthUser {
  userId: number;
  firstName: string;
  lastName: string;
}

interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}
