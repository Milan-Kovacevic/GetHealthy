import { TraineeExercising } from "@/api/models/trainee-exercising";
import { getWorkoutSummary } from "@/api/services/trainee-exercising-service";
import {
  AlertDialogCancel,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SquareArrowOutUpRight, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrainingWorkoutForm from "./TrainingWorkoutForm";
import WorkoutContentLoader from "./WorkoutContentLoader";

export default function TrainingWorkoutContent() {
  const [loadingWorkout, setLoadingWorkout] = useState(true);
  const [workout, setWorkout] = useState<TraineeExercising>();

  useEffect(() => {
    setLoadingWorkout(true);
    getWorkoutSummary()
      .then((value) => {
        setWorkout(value);
      })
      .catch((error) => {
        console.error("Error fetching workout information:", error);
      })
      .finally(() => {
        setLoadingWorkout(false);
      });
  }, []);

  return (
    <>
      {loadingWorkout && <WorkoutContentLoader />}
      {!loadingWorkout && workout && (
        <>
          <AlertDialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1 gap-2 flex-wrap mb-0.5">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {workout.programName}
                </h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto py-1.5 px-2 mt-1"
                      >
                        <Link to="../programs/1/details" target="_blank">
                          <SquareArrowOutUpRight />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View training program details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <AlertDialogCancel
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "self-start h-auto py-1.5 px-2 border-none"
                )}
              >
                <XIcon />
              </AlertDialogCancel>
            </div>
            <Separator className="-translate-y-0.5" />
          </AlertDialogHeader>
          <TrainingWorkoutForm workoutSummary={workout} />
        </>
      )}
    </>
  );
}
