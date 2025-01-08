import { AuthUser, UserLogin } from "@/api/models/authentication";
import { UserAuthContext } from "@/hooks/use-auth";
import { LoginFormSchema } from "@/schemas/login-form-schema";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  AUTH_USER_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/utils/constants";
import { useState } from "react";
import { loginUser, logoutUser } from "@/api/services/auth-service";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  var contextJson = localStorage.getItem(AUTH_USER_STORAGE_KEY);
  var authUserState: AuthUser | null = null;
  if (contextJson) {
    authUserState = JSON.parse(contextJson) as AuthUser;
  }

  const [authUser, setAuthUser] = useState<AuthUser | null>(authUserState);

  const login = async (data: LoginFormSchema) => {
    return loginUser(data as UserLogin).then((response) => {
      setAuthUser(response.user);

      localStorage.setItem(
        AUTH_USER_STORAGE_KEY,
        JSON.stringify(response.user)
      );
      localStorage.setItem(
        ACCESS_TOKEN_STORAGE_KEY,
        JSON.stringify(response.tokens.accessToken)
      );
      localStorage.setItem(
        REFRESH_TOKEN_STORAGE_KEY,
        JSON.stringify(response.tokens.refreshToken)
      );
      return response.user;
    });
  };

  const logout = async () => {
    return logoutUser().then(() => {
      setAuthUser(null);
      localStorage.removeItem(AUTH_USER_STORAGE_KEY);
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    });
  };

  const getUserId = () => {
    return authUser?.id ?? null;
  };
  const getUserRole = () => {
    return authUser?.role ?? null;
  };
  const isLoggedIn = () => {
    return authUser != undefined;
  };

  const value = {
    user: authUser,
    login: login,
    logout: logout,
    getUserId: getUserId,
    getUserRole: getUserRole,
    isLoggedIn: isLoggedIn,
  };

  return (
    <UserAuthContext.Provider {...props} value={value}>
      {children}
    </UserAuthContext.Provider>
  );
}
