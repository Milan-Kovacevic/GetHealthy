import noImage from "@/assets/no-image.jpg";
import { Badge } from "@/components/ui/badge";
import { ActivityIcon, UsersIcon, UserXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/primitives/StarRating";
import {
  getSingleTrainingProgramInfo,
  leaveTrainingProgram,
} from "@/api/services/program-details-service";
import { SingleTrainingProgramInfo } from "@/api/models/program-details";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleTrainingProgramLoader from "./components/SingleTrainingProgramLoader";
import { toast } from "sonner";
import TrainingProgramApplicationModal from "./components/TrainingProgramApplicationModal";
import { capitalize, cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { sendTrainingProgramApplication } from "@/api/services/program-application-service";
import useAuth from "@/hooks/use-auth";
import { SimpleAlertDialog } from "../shared/SimpleAlertDialog";
import { SendProgramApplication } from "@/api/models/program-request";

export default function TrainingProgramInfo() {
  const auth = useAuth();
  const isTrainer = auth.isTrainer();
  const userId = auth.getUserId();

  if (!userId) return;

  const params = useParams();
  const [program, setProgram] = useState<SingleTrainingProgramInfo>();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const programId = params["id"];
    if (!programId) {
      console.error("No program ID provided");
      setLoading(false);
      return;
    }
    if (parseInt(programId) == program?.id) return;

    setLoading(true);
    getSingleTrainingProgramInfo(parseInt(programId))
      .then((value) => {
        setProgram(value);
      })
      .catch((error) => {
        console.error("Error fetching program:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  if (loading) {
    return <SingleTrainingProgramLoader />;
  }

  if (!program) {
    return (
      <p className="my-8 text-center text-sm text-muted-foreground italic">
        There is no data available to display for this program.
      </p>
    );
  }

  const handleApplicationModalSubmit = (note: string) => {
    const request: SendProgramApplication = {
      programId: program.id,
      note: note,
    };
    setSubmitting(true);
    sendTrainingProgramApplication(userId, request)
      .then(() => {
        toast.info("Application submitted!", {
          description: `Your request to join program '${program.name}' has been submitted. Check your inbox for status update.`,
        });
      })
      .catch(() => {
        toast.error("Unexpected error", {
          description: "Unable to send request. Please, try again later.",
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleLeaveTrainingProgram = () => {
    setSubmitting(true);
    leaveTrainingProgram(userId, program.id)
      .then(() => {
        toast.message(`You have left '${program.name}'.`);
      })
      .catch(() => {
        toast.error("Unexpected error", {
          description: "Unable to leave program. Please, try again later.",
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="my-4 flex flex-col lg:flex-row h-auto py-4 lg:px-0 px-4 relative">
      <div
        className={cn(
          "relative bg-primary/10 dark:bg-primary/5 w-full sm:h-[400px] lg:w-2/5 xl:w-1/3 mb-2 lg:mb-0 lg:border-2 rounded-xl overflow-hidden",
          !program.imageFilePath && "border-2"
        )}
      >
        <img
          src={program.imageFilePath || noImage}
          alt="Training Program"
          className={cn(
            "w-full h-full object-cover mix-blend-luminosity dark:mix-blend-luminosity",
            !program.imageFilePath && "dark:filter-white"
          )}
        />
        {program.joined && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <div
              className="absolute -left-16 top-6 -rotate-45 bg-primary/85 py-1.5
          text-center text-sm font-semibold text-white shadow-lg"
              style={{ width: "200px" }}
            >
              <span className="inline-block -rotate-270 text-base">Joined</span>
            </div>
          </div>
        )}
      </div>

      <div className="w-full lg:w-2/3 pl-0 lg:pl-8 relative flex flex-col">
        <div className="flex flex-col mt-1.5 flex-1">
          <div className="relative flex items-center justify-between gap-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold mb-0.5 leading-tight">
                {program.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="flex sm:flex-row flex-col sm:items-center gap-x-2">
                  <div className="flex items-center gap-1">
                    <ActivityIcon className="h-4 w-4" />
                    <p className="text-sm sm:text-base text-muted-foreground font-semibold">
                      {capitalize(program.difficulty)}
                    </p>
                  </div>

                  <span className="text-foreground/70 mt-0.5  text-xs sm:text-[13px]">
                    • Created{" "}
                    <span className="font-medium">
                      {formatDistanceToNow(program.createdAt)}
                    </span>{" "}
                    ago
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-xs mb-0.5">
                {program.totalRates + " reviews"}
              </p>
              <StarRating readonly={true} rating={program.rating ?? 0} />
            </div>
          </div>

          <h2 className="text-[13px]  sm:text-sm lg:max-w-[80%] text-muted-foreground text-pretty mt-4">
            {program.description}
          </h2>

          <div className="mt-4 text-base gap-2 flex flex-row items-center">
            <p className="text-foreground/80">Trainer:</p>
            <p className="">
              {program.trainerFirstName + " " + program.trainerLastName}
            </p>
          </div>

          <div className="pb-4">
            <p className="mt-1 text-muted-foreground text-sm">
              <div className="flex items-center">
                <UsersIcon className="w-3.5 h-3.5 mr-1" />
                <span>{program.currentlyEnrolled ?? "No "} participants</span>
              </div>
            </p>
            <div className="mt-3 mb-5 flex items-center flex-wrap gap-2">
              {program.categories?.length > 0 ? (
                program.categories.map((item) => (
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
          {!isTrainer && (
            <div className="flex items-center flex-wrap gap-2 lg:mt-auto mt-auto mb-0.5">
              {!program.joined && (
                <TrainingProgramApplicationModal
                  onSubmit={handleApplicationModalSubmit}
                  disabled={submitting}
                />
              )}
              {program.joined && (
                <SimpleAlertDialog
                  title="Are you sure?"
                  description="Are you sure you want to leave this training program?"
                  cancelText="No"
                  submitText="Yes"
                  onConfirm={handleLeaveTrainingProgram}
                >
                  <Button
                    disabled={submitting}
                    variant="outline"
                    className="h-auto items-center min-w-32 w-auto"
                  >
                    <UserXIcon className="h-5 w-5 text-destructive" />
                    <span>Leave</span>
                  </Button>
                </SimpleAlertDialog>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
