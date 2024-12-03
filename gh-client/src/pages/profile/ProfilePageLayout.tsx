import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/SidebarNav";
import { Outlet } from "react-router-dom";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Account",
    href: "/profile/account",
  },
  {
    title: "Appearance",
    href: "/profile/appearance",
  },
  {
    title: "Statistics",
    href: "/profile/statistics",
  },
];

const ProfilePageLayout = () => {
  return (
    <section className="overflow-hidden relative sm:px-5 px-4 pt-8 pb-10">
      <div className=" container mx-auto space-y-5">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">
            Manage your details, account, appearance and view statistics
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/6">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePageLayout;
