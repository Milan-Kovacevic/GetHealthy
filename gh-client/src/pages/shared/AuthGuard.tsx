import { UserRole } from "@/api/enums/user-role";
import useAuth from "@/hooks/use-auth";
import { Children, ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type AuthGuardProps = {
  allowedRoles: UserRole[];
  children: ReactNode;
};

export default function AuthGuard(props: AuthGuardProps) {
  const { isLoggedIn, getUserRole } = useAuth();
  const location = useLocation();
  const role = getUserRole();
  const authenticated = isLoggedIn();

  if (!authenticated)
    return <Navigate to={"/login"} state={{ from: location }} replace />;

  return authenticated && props.allowedRoles.find((r) => r === role) ? (
    props.children
  ) : null;
}
