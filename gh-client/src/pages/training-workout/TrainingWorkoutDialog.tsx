import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
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
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrainingWorkoutForm from "./components/TrainingWorkoutForm";
import { getWorkoutSummary } from "@/api/services/trainee-exercising-service";
import { TraineeExercising } from "@/api/models/trainee-exercising";

type TrainingWorkoutDialogProps = {
  children: ReactNode;
};

export default function TrainingWorkoutDialog({
  children,
}: TrainingWorkoutDialogProps) {
  const [open, setOpen] = useState(false);
  const [workout, setWorkout] = useState<TraineeExercising>();

  useEffect(() => {
    getWorkoutSummary()
      .then((value) => {
        setWorkout(value);
      })
      .catch((error) => {
        console.error("Error fetching workout information:", error);
      })
      .finally(() => {});
  }, []);

  if (!workout) {
    return <div>Loading workout...</div>;
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-fit">
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 gap-2 flex-wrap mb-0.5">
              <h2 className="text-xl font-bold">{workout.programName}</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link to="../programs/1/details" target="_blank">
                      <Button variant="ghost" size="sm" className="h-auto py-2">
                        <SquareArrowOutUpRight />
                      </Button>
                    </Link>
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
        <TrainingWorkoutForm traineeExercising={workout} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
