import { UserRole } from "@/api/enums/user-role";
import { AuthUser } from "@/api/models/authentication";
import useAuth from "@/hooks/use-auth";
import { Children, ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type AuthGuardProps = {
  allowedRoles: UserRole[];
  children: ReactNode;
  preCheck?: (user: AuthUser) => boolean;
};

export default function AuthGuard(props: AuthGuardProps) {
  const { isLoggedIn, getUserRole, user } = useAuth();
  const location = useLocation();
  const role = getUserRole();
  const authenticated = isLoggedIn();

  if (!authenticated || !user)
    return <Navigate to={"/login"} state={{ from: location }} replace />;

  const isChecked = !props.preCheck || props.preCheck(user);

  return isChecked && props.allowedRoles.find((r) => r === role)
    ? props.children
    : null;
}
