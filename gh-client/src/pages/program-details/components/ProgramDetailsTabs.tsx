import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type ProgramDetailsTabsProps = {
  children: ReactNode;
};

const programDetailRoutes = [
  { path: "details", name: "Details" },
  { path: "trainer-info", name: "About trainer" },
  { path: "reviews", name: "Reviews" },
  { path: "trainees", name: "Manage" },
];

export default function ProgramDetailsTabs({
  children,
}: ProgramDetailsTabsProps) {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);

  return (
    <div className="flex flex-col overflow-y-hidden">
      <div className="flex md:flex-row flex-col relative">
        {programDetailRoutes.map((item) => (
          <Link
            to={item.path}
            className={cn(
              "py-3 px-6 font-medium border-b z-10",
              pathname.endsWith(item.path) &&
                "text-primary border-b-primary border-b-2"
            )}
          >
            {item.name}
          </Link>
        ))}
        <span className="w-full h-0.5 bottom-0 z-0 bg-border absolute" />
      </div>
      <ScrollArea className="flex-1">
        <div className="">{children}</div>
      </ScrollArea>
    </div>
  );
}
