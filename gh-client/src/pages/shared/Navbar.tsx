import {
  BellIcon,
  Book,
  DumbbellIcon,
  LayoutListIcon,
  Menu,
  NotebookPenIcon,
  Sunset,
  Trees,
  Zap,
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
  // TODO: Hardcoded for now...
  const isTrainer = true;

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
        : "Browse your training programs",
      icon: isTrainer ? (
        <NotebookPenIcon className="size-5 shrink-0 mt-1" />
      ) : (
        <DumbbellIcon className="size-5 shrink-0 mt-1" />
      ),
      link: "/programs/manage",
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
      title: "My profile",
      link: "/profile",
    },
  ];

  return (
    <section className="py-3 shadow-md dark:shadow-white/15 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="container mx-auto">
        <DesktopNavbar navbarMenuItems={navBarMenu} isTrainer={isTrainer} />
      </div>
      <MobileNavbar navbarMenuItems={navBarMenu} />
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
const DesktopNavbar = ({
  navbarMenuItems,
  isTrainer,
}: {
  navbarMenuItems: NavbarMenuItem[];
  isTrainer: boolean;
}) => {
  const navigate = useNavigate();

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
                        <ul className="w-80 p-3">
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
      <div className="flex items-center gap-2">
        {/* <ThemeToggle /> */}
        <NotificationsPopover isTrainer={isTrainer}>
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "relative",
              navigationMenuTriggerStyle,
              buttonVariants({
                variant: "ghost",
              }),
              "h-auto mr-3 [&_svg]:h-5 [&_svg]:w-5"
            )}
          >
            <Badge
              variant="secondary"
              className="absolute border-none top-0.5 -right-0.5 rounded-full pointer-events-none text-primary-foreground leading-none bg-primary text-[10px] px-1.5 py-1 h-auto"
            >
              <span className="font-semibold leading-none">4</span>
            </Badge>
            <BellIcon strokeWidth={2} className="w-full h-full" />
          </Button>
        </NotificationsPopover>

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
    </nav>
  );
};
const MobileNavbar = ({
  navbarMenuItems,
}: {
  navbarMenuItems: NavbarMenuItem[];
}) => {
  const navigate = useNavigate();

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
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="-ml-2">
                <AppBanner />
              </SheetTitle>
            </SheetHeader>
            <div className="my-8 flex flex-col gap-4">
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

              <Link className={cn("font-semibold")} to="#">
                Notifications
              </Link>
            </div>
            <div className="">
              <div className="mt-2 flex flex-col gap-3">
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
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
