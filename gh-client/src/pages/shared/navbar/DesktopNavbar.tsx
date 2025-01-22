import React from "react";
import { NavbarMenuItem } from "./Navbar";
import { AuthUser } from "@/api/models/authentication";
import AppBanner from "../AppBanner";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import NotificationsPopover from "@/pages/notifications/NotificationsPopover";
import SignUpActions from "./SignUpActions";

type DesktopNavbarProps = {
  navbarMenuItems: NavbarMenuItem[];
  isTrainer: boolean;
  authUser: AuthUser | null;
  onLogout: () => void;
  pending: boolean;
};

export default function DesktopNavbar(props: DesktopNavbarProps) {
  const { navbarMenuItems, isTrainer, authUser, onLogout, pending } = props;
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
        <NotificationsPopover className="" isTrainer={isTrainer} />

        <SignUpActions
          isMobile={false}
          authUser={authUser ?? undefined}
          pendingLogout={pending}
          onLogout={onLogout}
        />
      </div>
    </nav>
  );
}
