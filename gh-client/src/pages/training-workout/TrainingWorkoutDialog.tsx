import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import TrainingWorkoutContent from "./components/TrainingWorkoutContent";
import { Button, buttonVariants } from "@/components/ui/button";
import { TrainingProgramOnSchedule } from "@/api/models/training-program-on-schedule";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { DumbbellIcon, SquareArrowOutUpRight, XIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type TrainingWorkoutDialogProps = {
  programOnSchedule: TrainingProgramOnSchedule;
};

export default function TrainingWorkoutDialog({
  programOnSchedule,
}: TrainingWorkoutDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full text-xs mt-2 h-auto py-2 [&_svg]:h-4"
          size="sm"
          variant="secondary"
        >
          <DumbbellIcon className="-mr-1" />
          Workout
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1 gap-2 flex-wrap mb-0.5">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  {programOnSchedule.program.name}
                </h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto py-1.5 px-2 mt-1"
                      >
                        <Link
                          to={`/programs/${programOnSchedule.program.id}/details`}
                          target="_blank"
                        >
                          <SquareArrowOutUpRight />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-normal">
                        View training program details
                      </p>
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
          </AlertDialogTitle>
          <Separator className="-translate-y-0.5" />
        </AlertDialogHeader>
        <AlertDialogDescription className="p-0 m-0 hidden" />

        <TrainingWorkoutContent
          scheduleProgram={programOnSchedule}
          onWorkoutFinished={() => setOpen(false)}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
