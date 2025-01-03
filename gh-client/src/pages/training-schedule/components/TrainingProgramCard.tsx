import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ScheduleTrainingStatus,
  TrainingProgram,
} from "../TrainingSchedulePage";
import TrainingWorkoutDialog from "@/pages/training-workout/TrainingWorkoutDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ExternalLinkIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";

interface TrainingProgramCardProps {
  program: TrainingProgram;
  programStatus: ScheduleTrainingStatus;
  onViewDetails: (programId: number) => void;
  editable: boolean;
}

export default function TrainingProgramCard({
  program,
  onViewDetails,
  programStatus,
  editable,
}: TrainingProgramCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-pointer shadow-md hover:border-foreground transition-colors p-1 border-foreground/35">
            <CardContent className="p-2 flex flex-col">
              <h3 className="font-semibold text-sm mb-1">{program.name}</h3>
              <p className="text-xs text-muted-foreground">
                {program.startTime} - {program.endTime}
              </p>
            </CardContent>
            <CardContent className="p-2 pt-0 flex flex-col">
              <div className="mt-1 flex justify-between items-center">
                <StatusBadge status={programStatus} />
                {editable && <ManageProgramPopup />}
              </div>
              {programStatus === "live" && (
                <TrainingWorkoutDialog>
                  <Button
                    // onClick={() => onViewDetails(program.id)}
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
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-muted-foreground">
              {program.startTime} - {program.endTime}
            </p>
            <Button
              onClick={() => onViewDetails(program.id)}
              size="sm"
              variant="ghost"
              className="h-auto py-1.5 px-2"
            >
              <ExternalLinkIcon className="w-4 h-4" />
            </Button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const StatusBadge = ({ status }: { status: ScheduleTrainingStatus }) => {
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

const ManageProgramPopup = () => {
  const handleEdit = () => {};

  const handleRemove = () => {};

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-0">
        <Button
          className="w-full justify-start rounded-none px-4 py-2 text-xs font-normal"
          size="sm"
          variant="ghost"
          onClick={handleEdit}
        >
          <PencilIcon className="mr-0 h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start rounded-none px-4 py-2 text-xs font-normal text-destructive hover:text-destructive"
          onClick={handleRemove}
        >
          <Trash2Icon className="mr-0 h-3.5 w-3.5" />
          Remove
        </Button>
      </PopoverContent>
    </Popover>
  );
};
