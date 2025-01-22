import { UserRole } from "@/api/enums/user-role";
import useAuth from "@/hooks/use-auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type RequireAuthProps = {
  allowedRoles: UserRole[];
};

export default function RequireAuth(props: RequireAuthProps) {
  const {isLoggedIn, getUserRole } = useAuth();
  const location = useLocation();
  const role = getUserRole();
  const authenticated = isLoggedIn();

  if (!authenticated)
    return (
      <Navigate to={"/login"} state={{ from: location }} replace />
    );

  return authenticated && props.allowedRoles.find((r) => r === role) ? (
    <Outlet />
  ) : (
    <Navigate
      to={"/forbidden"}
      state={{ from: location }}
      replace
    />
  );
}