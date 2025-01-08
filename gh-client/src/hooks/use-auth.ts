import { UserRole } from "@/api/enums/user-role";
import { AuthUserContext } from "@/api/models/authentication";
import { LoginFormSchema } from "@/schemas/login-form-schema";
import { createContext, useContext } from "react";

type UserAuthState = {
  context: AuthUserContext;
  login: (data: LoginFormSchema) => Promise<AuthUserContext | null>;
  logout: () => void;
  isLoggedIn: () => boolean;
  getUserId: () => number | null;
  getUserRole: () => UserRole | null;
};

export const UserAuthContext = createContext<UserAuthState | null>(null);

export default function useAuth() {
  const context = useContext(UserAuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
}
