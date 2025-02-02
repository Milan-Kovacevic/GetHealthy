import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthUser } from "@/api/models/authentication";
import { useProgramDetails } from "../hooks/use-program-details";
import AuthGuard from "@/pages/shared/AuthGuard";
import { TRAINER_ONLY_ROLE } from "@/utils/constants";

type ProgramDetailsTabsProps = {
  children: ReactNode;
};

export default function ProgramDetailsTabs({
  children,
}: ProgramDetailsTabsProps) {
  const { programInfo } = useProgramDetails();

  const programDetailRoutes = [
    { path: "details", name: "Details" },
    { path: "trainer-info", name: "About trainer" },
    { path: "reviews", name: "Reviews" },
    {
      path: "trainees",
      name: "Manage",
      guard: {
        allowedRoles: [TRAINER_ONLY_ROLE],
        allowAccess: (user: AuthUser) => {
          return programInfo?.trainerId == user.id;
        },
      },
    },
  ];

  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="flex flex-col overflow-y-hidden flex-1">
      <div className="flex md:flex-row flex-col relative">
        {programDetailRoutes.map((item, index) => {
          return !item.guard ? (
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
          ) : (
            <AuthGuard
              key={`link-${index}`}
              allowedRoles={item.guard.allowedRoles}
              preCheck={item.guard.allowAccess}
            >
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
            </AuthGuard>
          );
        })}
        <span className="w-full h-0.5 bottom-0 z-0 bg-border absolute" />
      </div>

      {children}
    </div>
  );
}
