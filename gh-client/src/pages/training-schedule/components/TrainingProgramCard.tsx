import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock, ChevronRight, Play, DumbbellIcon } from "lucide-react";
import { TrainingProgram } from "../TrainingSchedulePage";
import TrainingWorkoutDialog from "@/pages/training-workout/TrainingWorkoutDialog";

interface TrainingProgramCardProps {
  program: TrainingProgram;
  onViewDetails: (programId: number) => void;
  getProgramStatus: (program: TrainingProgram) => TrainingStatus;
}

export default function TrainingProgramCard({
  program,
  onViewDetails,
  getProgramStatus,
}: TrainingProgramCardProps) {
  const status = getProgramStatus(program);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-pointer shadow-md hover:border-foreground transition-colors p-1 border-foreground/35">
            <CardContent
              className="p-2 flex flex-col"
              onClick={() => onViewDetails(program.id)}
            >
              <h3 className="font-semibold text-sm mb-1">{program.name}</h3>
              <p className="text-xs text-muted-foreground">
                {program.startTime} - {program.endTime}
              </p>

              <div className="mt-1">
                <StatusBadge status={status} />
              </div>
            </CardContent>
            <CardContent className="p-2 pt-0 flex flex-col">
              {status === "live" && (
                <TrainingWorkoutDialog>
                  <Button
                    className="w-full text-xs"
                    size="sm"
                    variant="secondary"
                  >
                    Begin workout
                  </Button>
                </TrainingWorkoutDialog>
              )}
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{program.description}</p>

          <p className="text-xs text-muted-foreground font-medium">
            Trainer: {program.trainerName}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {program.startTime} - {program.endTime}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

type TrainingStatus = "completed" | "upcoming" | "live";

const StatusBadge = ({ status }: { status: TrainingStatus }) => {
  const statusStyles = {
    completed: "bg-green-100 text-green-800",
    upcoming: "bg-yellow-100 text-yellow-800",
    live: "bg-red-100 text-red-800 animate-pulse",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
