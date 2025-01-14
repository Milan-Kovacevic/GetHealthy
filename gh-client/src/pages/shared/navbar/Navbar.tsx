import {
  ChartBarIcon,
  DumbbellIcon,
  LayoutListIcon,
  NotebookPenIcon,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/use-auth";
import { toast } from "sonner";
import { useState } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export type NavbarMenuItem = {
  title: string;
  link: string;
  submenu?: NavbarSubMenuItem[];
};

export type NavbarSubMenuItem = {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
};

const Navbar = () => {
  const auth = useAuth();
  const [pending, setPending] = useState(false);
  const authUser = auth?.user;
  const isTrainer = auth?.isTrainer();
  const navigate = useNavigate();

  const trainingProgramSubMenuItems: NavbarSubMenuItem[] = [
    {
      title: "Overview",
      description: "Browse training programs",
      icon: <LayoutListIcon className="size-5 shrink-0 mt-1" />,
      link: "/programs",
    },
    {
      title: isTrainer ? "Manage" : "My programs",
      description: isTrainer
        ? "Manage your training programs"
        : "View your training programs",
      icon: isTrainer ? (
        <NotebookPenIcon className="size-5 shrink-0 mt-1" />
      ) : (
        <DumbbellIcon className="size-5 shrink-0 mt-1" />
      ),
      link: "/programs/manage",
    },
  ];

  const resourcesSubMenuItems: NavbarSubMenuItem[] = [
    {
      title: "Exercises",
      description: "Browse available exercises",
      icon: <DumbbellIcon className="size-5 shrink-0 mt-1" />,
      link: "/exercises",
    },
    {
      title: "Statistics",
      description: isTrainer
        ? "Track program engagement"
        : "Track your progress",
      icon: <ChartBarIcon className="size-5 shrink-0 mt-1" />,
      link: "/statistics",
    },
  ];

  const navBarMenu: NavbarMenuItem[] = [
    {
      title: "Schedule",
      link: "/schedule",
    },
    {
      title: "Training programs",

      link: "/programs",
      submenu: trainingProgramSubMenuItems,
    },
    {
      title: "Resources & Analytics",
      link: "/resources",
      submenu: resourcesSubMenuItems,
    },
    {
      title: "Settings",
      link: "/profile",
    },
  ];

  const handleLogout = () => {
    setPending(true);
    auth
      .logout()
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        toast.error("Unable to logout", {
          description: "Please, try again later",
        });
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <section className="py-3 shadow-md dark:shadow-white/15 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="container mx-auto">
        <DesktopNavbar
          navbarMenuItems={navBarMenu}
          isTrainer={isTrainer}
          authUser={authUser}
          onLogout={handleLogout}
          pending={pending}
        />
      </div>
      <MobileNavbar
        navbarMenuItems={navBarMenu}
        isTrainer={isTrainer}
        authUser={authUser}
        onLogout={handleLogout}
        pending={pending}
      />
    </section>
  );
};

export default Navbar;
