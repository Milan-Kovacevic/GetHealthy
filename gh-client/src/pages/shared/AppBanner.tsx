import appIcon from "@/assets/applogo.png";
import { Link } from "react-router-dom";

export default function AppBanner() {
  return (
    <Link to="/">
      <div className="flex items-center gap-0">
        <img
          src={appIcon}
          className="w-14 -my-3 dark:filter-white"
          alt="logo"
        />
        <span className="text-lg font-bold">
          <span className="text-primary text-xl">Get</span>Healthy
        </span>
      </div>
    </Link>
  );
}
