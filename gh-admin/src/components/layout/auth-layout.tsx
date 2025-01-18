import { Outlet } from "react-router";
import { Toaster } from "sonner";

export const AuthLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
      <Toaster position="bottom-right" />
    </div>
  );
};
