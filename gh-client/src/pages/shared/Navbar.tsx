import { Book, GlassWater, Menu, Sunset, Trees, Zap } from "lucide-react";

import appIcon from "@/assets/applogo.png";
import ThemeToggle from "@/components/primitives/ThemeToggle";
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

const subMenuItemsOne = [
  {
    title: "Overview",
    description: "Browse training plans",
    icon: <GlassWater className="size-5 shrink-0" />,
    link: "/programs",
  },
  {
    title: "Management",
    description: "Manage your training plans",
    icon: <Trees className="size-5 shrink-0" />,
    link: "/programs/manage",
  },
];

const subMenuItemsTwo = [
  {
    title: "Help Center",
    description: "Get all the answers you need right here",
    icon: <Zap className="size-5 shrink-0" />,
  },
  {
    title: "Contact Us",
    description: "We are here to help you with any questions you have",
    icon: <Sunset className="size-5 shrink-0" />,
  },
  {
    title: "Status",
    description: "Check the current status of our services and APIs",
    icon: <Trees className="size-5 shrink-0" />,
  },
  {
    title: "Terms of Service",
    description: "Our terms and conditions for using our services",
    icon: <Book className="size-5 shrink-0" />,
  },
];

const Navbar = () => {
  return (
    <section className="py-3 shadow-md dark:shadow-white/15 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="container mx-auto">
        <DesktopNavbar />
      </div>
      <MobileNavbar />
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
const DesktopNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="hidden justify-between lg:flex">
      <div className="flex items-center gap-6">
        <AppBanner />
        <div className="flex items-center">
          <Link
            className={cn(
              "text-muted-foreground",
              navigationMenuTriggerStyle,
              buttonVariants({
                variant: "ghost",
              })
            )}
            to="/schedule"
          >
            Schedule
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="text-muted-foreground">
                <NavigationMenuTrigger>
                  <span>Training Programs</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-80 p-3">
                    <NavigationMenuLink>
                      {subMenuItemsOne.map((item, idx) => (
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
              <NavigationMenuItem className="text-muted-foreground">
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-80 p-3">
                    <NavigationMenuLink>
                      {subMenuItemsTwo.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            className={cn(
                              "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}
                            to="#"
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
            </NavigationMenuList>
          </NavigationMenu>

          <NotificationsPopover isTrainer={true}>
            <Button
              variant="ghost"
              className={cn(
                "text-muted-foreground relative",
                navigationMenuTriggerStyle,
                buttonVariants({
                  variant: "ghost",
                })
              )}
            >
              <Badge
                variant="secondary"
                className="absolute border-none top-0.5 -right-0.5 rounded-full pointer-events-none text-primary-foreground leading-none bg-primary text-[10px] px-1.5 py-1 h-auto"
              >
                <span className="font-semibold leading-none">4</span>
              </Badge>
              Notifications
            </Button>
          </NotificationsPopover>
          <Link
            className={cn(
              "text-muted-foreground",
              navigationMenuTriggerStyle,
              buttonVariants({
                variant: "ghost",
              })
            )}
            to="/profile"
          >
            My Profile
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
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
const MobileNavbar = () => {
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
              <a href="#" className="font-semibold">
                Home
              </a>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="products" className="border-b-0">
                  <AccordionTrigger className="mb-4 py-0 font-semibold hover:no-underline">
                    Training programs
                  </AccordionTrigger>
                  <AccordionContent className="mt-2">
                    {subMenuItemsOne.map((item, idx) => (
                      <a
                        key={idx}
                        className={cn(
                          "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        href="#"
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
                      </a>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="resources" className="border-b-0">
                  <AccordionTrigger className="py-0 font-semibold hover:no-underline">
                    Resources
                  </AccordionTrigger>
                  <AccordionContent className="mt-2">
                    {subMenuItemsTwo.map((item, idx) => (
                      <a
                        key={idx}
                        className={cn(
                          "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        href="#"
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
                      </a>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <a href="#" className="font-semibold">
                Pricing
              </a>
              <a href="#" className="font-semibold">
                Blog
              </a>
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
