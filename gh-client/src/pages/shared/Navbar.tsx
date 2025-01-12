import {
  BellIcon,
  ChartBarIcon,
  DumbbellIcon,
  LayoutListIcon,
  Loader2Icon,
  Menu,
  NotebookPenIcon,
} from "lucide-react";

import appIcon from "@/assets/applogo.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import NotificationsPopover from "../notifications/NotificationsPopover";
import useAuth from "@/hooks/use-auth";
import { UserRole } from "@/api/enums/user-role";
import { toast } from "sonner";
import { useState } from "react";

type NavbarMenuItem = {
  title: string;
  link: string;
  submenu?: NavbarSubMenuItem[];
};

type NavbarSubMenuItem = {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
};

const Navbar = () => {
  const auth = useAuth();
  const [pending, setPending] = useState(false);
  const isLoggedIn = auth?.isLoggedIn();
  const isTrainer = auth?.getUserRole() == UserRole.TRAINER;
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
          isLoggedIn={isLoggedIn ?? false}
          onLogout={handleLogout}
          pending={pending}
        />
      </div>
      <MobileNavbar
        navbarMenuItems={navBarMenu}
        isTrainer={isTrainer}
        isLoggedIn={isLoggedIn ?? false}
        onLogout={handleLogout}
        pending={pending}
      />
    </section>
  );
};

const AppBanner = () => {
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
};
type NavbarProps = {
  navbarMenuItems: NavbarMenuItem[];
  isTrainer: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
  pending: boolean;
};

const DesktopNavbar = ({
  navbarMenuItems,
  isTrainer,
  isLoggedIn,
  onLogout,
  pending,
}: NavbarProps) => {
  return (
    <nav className="hidden justify-between lg:flex">
      <div className="flex items-center gap-6">
        <AppBanner />
        <div className="flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              {navbarMenuItems.map((item, index) => {
                if (!item.submenu) {
                  return (
                    <Link
                      key={"nav-bar_" + index}
                      className={cn(
                        "text-muted-foreground",
                        navigationMenuTriggerStyle,
                        buttonVariants({
                          variant: "ghost",
                        })
                      )}
                      to={item.link}
                    >
                      {item.title}
                    </Link>
                  );
                } else {
                  return (
                    <NavigationMenuItem
                      key={"nav-bar_" + index}
                      className="text-muted-foreground"
                    >
                      <NavigationMenuTrigger>
                        <span>{item.title}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="w-[360px] p-3">
                          <NavigationMenuLink>
                            {item.submenu.map((item, idx) => (
                              <li key={idx}>
                                <Link
                                  className={cn(
                                    "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  )}
                                  to={item.link}
                                >
                                  {item.icon}
                                  <div>
                                    <div className="text-sm font-semibold">
                                      {item.title}
                                    </div>
                                    <p className="text-sm leading-snug text-muted-foreground">
                                      {item.description}
                                    </p>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </NavigationMenuLink>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <NotificationsPopover isTrainer={isTrainer} />

        <SignUpButtons
          isLoggedIn={isLoggedIn}
          pending={pending}
          onLogout={onLogout}
        />
      </div>
    </nav>
  );
};

const SignUpButtons = ({
  isLoggedIn,
  pending,
  onLogout,
  mobile,
}: {
  isLoggedIn: boolean;
  pending: boolean;
  onLogout: () => void;
  mobile?: boolean;
}) => {
  const navigate = useNavigate();

  return !isLoggedIn ? (
    <div className={cn(mobile && "flex flex-col gap-2.5")}>
      <Button
        onClick={() => {
          navigate("/login");
        }}
        size="sm"
        variant={"outline"}
      >
        Log in
      </Button>
      <Button
        onClick={() => {
          navigate("/register");
        }}
        size="sm"
      >
        Sign up
      </Button>
    </div>
  ) : (
    <Button
      disabled={pending}
      onClick={onLogout}
      size="sm"
      variant={"secondary"}
      className={cn("min-w-20", mobile && "w-full")}
    >
      {pending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <span className="mb-0.5">Log out</span>
      )}
    </Button>
  );
};

const MobileNavbar = ({
  navbarMenuItems,
  isTrainer,
  isLoggedIn,
  onLogout,
  pending,
}: NavbarProps) => {
  return (
    <div className="block lg:hidden px-4">
      <div className="flex items-center justify-between">
        <AppBanner />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto w-full">
            <SheetHeader>
              <SheetTitle className="-ml-2">
                <AppBanner />
              </SheetTitle>
            </SheetHeader>
            <div className="my-8 mb-3 flex flex-col gap-4">
              <Accordion
                type="single"
                collapsible
                className="w-full flex flex-col gap-4"
              >
                {navbarMenuItems.map((item, index) => {
                  if (!item.submenu) {
                    return (
                      <Link
                        key={"mobile-nav-bar_" + index}
                        className={cn("font-semibold")}
                        to={item.link}
                      >
                        {item.title}
                      </Link>
                    );
                  } else {
                    return (
                      <AccordionItem
                        key={"mobile-nav-bar_" + index}
                        value="products"
                        className="border-b-0"
                      >
                        <AccordionTrigger className="py-0 font-semibold hover:no-underline">
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="mt-2 space-y-1">
                          {item.submenu.map((item, idx) => (
                            <Link
                              key={"mobile-nav-bar_" + index + "_" + idx}
                              className={cn(
                                "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              )}
                              to={item.link}
                            >
                              {item.icon}
                              <div>
                                <div className="text-sm font-semibold">
                                  {item.title}
                                </div>
                                <p className="text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  }
                })}
              </Accordion>

              <NotificationsPopover isTrainer={isTrainer} />
            </div>
            <div className="">
              <SignUpButtons
                mobile={true}
                isLoggedIn={isLoggedIn}
                pending={pending}
                onLogout={onLogout}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
