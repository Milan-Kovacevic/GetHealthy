import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "@/hooks/use-auth";


type ProgramDetailsTabsProps = {
  children: ReactNode;
};

const programDetailRoutes = [
  { path: "details", name: "Details" },
  { path: "trainer-info", name: "About trainer" },
  { path: "reviews", name: "Reviews" },
  { path: "trainees", name: "Manage", requiresTrainer: true },
];

export default function ProgramDetailsTabs({
  children,
}: ProgramDetailsTabsProps) {
  const location = useLocation();
  const { pathname } = location;

  const auth = useAuth();
  const isTrainer = auth.isTrainer();

  return (
    <div className="flex flex-col overflow-y-hidden flex-1">
      <div className="flex md:flex-row flex-col relative">
        {programDetailRoutes
        .filter((item) => !item.requiresTrainer || isTrainer)
        .map((item, index) => (
          <Link
            key={`link-${index}`}
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

      {children}
    </div>
  );
}
