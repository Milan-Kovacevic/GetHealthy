import appIcon from "@/assets/applogo.png";
import useAuth from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

export default function AppBanner() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleOnClick = () => {
    if (auth.isLoggedIn()) navigate("/schedule");
    else navigate("/");
  };

  return (
    <div
      className="flex items-center gap-0 cursor-pointer"
      onClick={handleOnClick}
    >
      <img src={appIcon} className="w-14 -my-3 dark:filter-white" alt="logo" />
      <span className="text-lg font-bold">
        <span className="text-primary text-xl">Get</span>Healthy
      </span>
    </div>
  );
}
