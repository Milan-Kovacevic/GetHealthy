import { AuthUser, AuthUserContext, Tokens } from "@/api/models/authentication";
import { UserRole } from "@/api/models/user-account";
import { UserAuthContext } from "@/hooks/use-auth";
import { delay } from "@/lib/utils";
import { LoginFormSchema } from "@/schemas/login-form-schema";
import { AUTH_CONTEXT_STORAGE_KEY } from "@/utils/constants";
import { useState } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  var contextJson = localStorage.getItem(AUTH_CONTEXT_STORAGE_KEY);
  var authContext: AuthUserContext | null = null;
  if (contextJson) {
    authContext = JSON.parse(contextJson) as AuthUserContext;
  }

  const [authUser, setAuthUser] = useState<AuthUser | null>(
    authContext?.user ?? null
  );
  const [tokens, setTokens] = useState<Tokens | null>(
    authContext?.tokens ?? null
  );

  const login = async (data: LoginFormSchema) => {
    // TODO: Call service layer etc.
    // Hardcoded now:
    const userMock = {
      id: 2,
      firstName: "Marko",
      lastName: "Markovic",
      role: UserRole.TRAINER,
    };
    const tokensMock = {
      accessToken: "123-sha256",
      refreshToken: "123456-sha512",
    };
    await delay(1500);
    setAuthUser(userMock);
    setTokens(tokensMock);
    const context: AuthUserContext = {
      tokens: tokens,
      user: authUser,
    };

    localStorage.setItem(AUTH_CONTEXT_STORAGE_KEY, JSON.stringify(context));
    return Promise.resolve(context);
  };

  const logout = () => {
    setAuthUser(null);
    setTokens(null);

    localStorage.removeItem(AUTH_CONTEXT_STORAGE_KEY);
  };

  const getUserId = () => {
    return authUser?.id ?? null;
  };
  const getUserRole = () => {
    return authUser?.role ?? null;
  };

  const value = {
    context: {
      user: authUser,
      tokens: tokens,
    },
    login: login,
    logout: logout,
    getUserId: getUserId,
    getUserRole: getUserRole,
  };

  return (
    <UserAuthContext.Provider {...props} value={value}>
      {children}
    </UserAuthContext.Provider>
  );
}
