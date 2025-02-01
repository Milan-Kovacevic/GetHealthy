import { NavbarMenuItem, NavbarSubMenuItem } from "./Navbar";
import { AuthUser } from "@/api/models/authentication";
import AppBanner from "../AppBanner";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NotificationsPopover from "@/pages/notifications/NotificationsPopover";
import SignUpActions from "./SignUpActions";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

type MobileNavbarProps = {
  navbarMenuItems: NavbarMenuItem[];
  isTrainer: boolean;
  authUser: AuthUser | null;
  onLogout: () => void;
  pending: boolean;
};

export default function MobileNavbar(props: MobileNavbarProps) {
  const { navbarMenuItems, isTrainer, authUser, onLogout, pending } = props;
  const [open, setOpen] = useState(false);

  return (
    <div className="block lg:hidden px-4">
      <div className="flex items-center justify-between">
        <AppBanner />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <MenuIcon className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto w-full">
            <SheetHeader>
              <SheetTitle className="-ml-2">
                <AppBanner />
              </SheetTitle>
            </SheetHeader>
            <div className="my-8 mb-3 flex flex-col gap-4">
              {navbarMenuItems.map((item, index) => {
                if (!item.submenu) {
                  return (
                    <Link
                      key={"mobile-nav-bar_" + index}
                      className={cn("font-medium")}
                      to={item.link}
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                  );
                } else {
                  return (
                    <Accordion
                      key={"mobile-nav-bar_" + index}
                      type="single"
                      collapsible
                      className="w-full flex flex-col gap-4"
                    >
                      <AccordionItem value="products" className="border-b-0">
                        <AccordionTrigger className="py-0 font-medium hover:no-underline">
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="mt-2 space-y-1">
                          {item.submenu.map((item: NavbarSubMenuItem, idx) => (
                            <Link
                              onClick={() => setOpen(false)}
                              key={"mobile-nav-bar_" + index + "_" + idx}
                              className={cn(
                                "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              )}
                              to={item.link}
                            >
                              {item.icon}
                              <div>
                                <div className="text-sm font-medium">
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
                    </Accordion>
                  );
                }
              })}

              <NotificationsPopover isTrainer={isTrainer} />
            </div>
            <div className="">
              <SignUpActions
                isMobile={true}
                authUser={authUser ?? undefined}
                pendingLogout={pending}
                onLogout={onLogout}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
