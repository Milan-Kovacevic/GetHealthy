import noImage from "@/assets/no-image.jpg";
import { Badge } from "@/components/ui/badge";
import { ActivityIcon, UsersIcon, UserXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/primitives/StarRating";
import SingleTrainingProgramLoader from "./SingleTrainingProgramLoader";
import TrainingProgramApplicationModal from "./TrainingProgramApplicationModal";
import { capitalize, cn, pictureUrl } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { SimpleAlertDialog } from "../../shared/SimpleAlertDialog";
import { useProgramDetails } from "../hooks/use-program-details";
import AuthGuard from "@/pages/shared/AuthGuard";
import { TRAINEE_ONLY_ROLE } from "@/utils/constants";

export default function TrainingProgramInfo() {
  const {
    loadingProgram,
    programInfo,
    pending,
    onJoinTrainingProgram,
    onLeaveTrainingProgram,
  } = useProgramDetails();

  if (loadingProgram) {
    return <SingleTrainingProgramLoader />;
  }

  if (!programInfo) {
    return (
      <p className="my-8 text-center text-sm text-muted-foreground italic">
        There is no data available to display for this program.
      </p>
    );
  }

  return (
    <div className="my-4 flex flex-col lg:flex-row h-auto py-4 lg:px-0 px-4 relative">
      <div
        className={cn(
          "relative bg-primary/10 dark:bg-primary/5 w-full sm:h-[400px] lg:w-2/5 xl:w-1/3 mb-2 lg:mb-0 lg:border-2 rounded-xl overflow-hidden",
          !programInfo.imageFilePath && "border-2"
        )}
      >
        <img
          src={pictureUrl(programInfo.imageFilePath) || noImage}
          alt="Training Program"
          className={cn(
            "w-full h-full object-cover mix-blend-luminosity dark:mix-blend-luminosity",
            !programInfo.imageFilePath && "dark:filter-white"
          )}
        />
        {programInfo.status == "JOINED" && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <div
              className="absolute -left-16 top-6 -rotate-45 bg-primary/85 py-1.5
          text-center text-sm font-semibold text-white shadow-lg"
              style={{ width: "200px" }}
            >
              <span className="inline-block -rotate-270 uppercase sm:text-[13px] text-xs tracking-wider">
                Joined
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="w-full lg:w-2/3 pl-0 lg:pl-8 relative flex flex-col">
        <div className="flex flex-col mt-1.5 flex-1">
          <div className="relative flex items-center justify-between gap-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold mb-1">
                {programInfo.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="flex sm:flex-row flex-col sm:items-center gap-x-2">
                  <div className="flex items-center gap-1">
                    <ActivityIcon className="h-4 w-4" />
                    <p className="text-sm sm:text-base text-muted-foreground font-semibold">
                      {capitalize(programInfo.difficulty)}
                    </p>
                  </div>

                  <span className="text-foreground/70 mt-0.5  text-xs sm:text-[13px]">
                    • Created{" "}
                    <span className="font-medium">
                      {formatDistanceToNow(programInfo.createdAt)}
                    </span>{" "}
                    ago
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-xs mb-0.5">
                {programInfo.totalRates + " reviews"}
              </p>
              <StarRating readonly={true} rating={programInfo.rating ?? 0} />
            </div>
          </div>

          <h2 className="text-[13px]  sm:text-sm lg:max-w-[80%] text-muted-foreground text-pretty mt-4">
            {programInfo.description}
          </h2>

          <div className="mt-4 text-base gap-2 flex flex-row items-center">
            <p className="text-foreground/80">Trainer:</p>
            <p className="">
              {programInfo.trainerFirstName + " " + programInfo.trainerLastName}
            </p>
          </div>

          <div className="pb-4">
            <p className="mt-1 text-muted-foreground text-sm">
              <div className="flex items-center">
                <UsersIcon className="w-3.5 h-3.5 mr-1" />
                <span>
                  {programInfo.currentlyEnrolled ?? "No "} participants
                </span>
              </div>
            </p>
            <div className="mt-3 mb-5 flex items-center flex-wrap gap-2">
              {programInfo.categories?.length > 0 ? (
                programInfo.categories.map((item) => (
                  <Badge
                    key={item.categoryId}
                    variant="secondary"
                    className="py-1 h-auto px-3 border border-foreground/5"
                  >
                    {item.name}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground text-sm italic">
                  There are no categories for this program
                </p>
              )}
            </div>
          </div>
          <AuthGuard allowedRoles={[TRAINEE_ONLY_ROLE]}>
            <div className="flex items-center flex-wrap gap-2 lg:mt-auto mt-auto mb-0.5">
              {(programInfo.status == "NOT_JOINED" ||
                programInfo.status == "PENDING") && (
                <TrainingProgramApplicationModal
                  onSubmit={onJoinTrainingProgram}
                  disabled={pending}
                  pending={programInfo.status == "PENDING"}
                />
              )}
              {programInfo.status == "JOINED" && (
                <SimpleAlertDialog
                  title="Are you sure?"
                  description="Are you sure you want to leave this training program?"
                  cancelText="No"
                  submitText="Yes"
                  onConfirm={onLeaveTrainingProgram}
                >
                  <Button
                    disabled={pending}
                    variant="outline"
                    className="h-auto items-center min-w-32 w-auto"
                  >
                    <UserXIcon className="h-5 w-5 text-destructive" />
                    <span>Leave</span>
                  </Button>
                </SimpleAlertDialog>
              )}
            </div>
          </AuthGuard>
        </div>
      </div>
    </div>
  );
}
