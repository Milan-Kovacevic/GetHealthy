import {
  ManageTrainingProgramOnSchedule,
  TrainingProgramOnSchedule,
} from "@/api/models/training-program-on-schedule";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSchedule } from "@/pages/training-schedule/hooks/use-schedule";
import TrainingWorkoutDialog from "@/pages/training-workout/TrainingWorkoutDialog";
import {
  addMinutesToTime,
  ScheduleTrainingStatus,
} from "@/utils/date-time-utils";
import {
  CheckIcon,
  ExternalLinkIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import CreateEditProgramOnScheduleModal from "./CreateEditProgramOnScheduleModal";
import { cn } from "@/lib/utils";
import { SimpleAlertDialog } from "@/pages/shared/SimpleAlertDialog";

interface TrainingProgramCardProps {
  programOnSchedule: TrainingProgramOnSchedule;
  programStatus: ScheduleTrainingStatus;
  onViewDetails: (programId: number) => void;
  editable: boolean;
  isTodaysDay: boolean;
}

export default function TrainingProgramCard({
  programOnSchedule,
  onViewDetails,
  programStatus,
  editable,
  isTodaysDay,
}: TrainingProgramCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            data-state="closed"
            className={cn(
              "transition-colors p-1 bg-card/80 shadow-md select-none",
              isTodaysDay && "bg-card",
              programStatus == "not_completed" &&
                "border-2 border-red-400 dark:border-red-700",
              programStatus == "completed" && "border-2 border-green-600/60",
              (programStatus == "upcoming" || programStatus == "live") &&
                "border-2 border-border/60",
              programStatus == "live" &&
                "border-red-400/50 dark:border-red-700/50",
              "hover:bg-accent/10 dark:hover:bg-accent/90 duration-300"
            )}
          >
            <CardContent className="p-2 pt-1 pb-0.5 flex flex-col">
              <div className="flex justify-between items-center gap-0.5 mb-1.5">
                <h3
                  className={cn(
                    "font-medium text-sm tracking-tight leading-tight",
                    isTodaysDay && "font-semibold"
                  )}
                >
                  {programOnSchedule.program.name}
                </h3>
                <Button
                  onClick={() => onViewDetails(programOnSchedule.program.id)}
                  size="sm"
                  variant="ghost"
                  className="h-auto py-1 font-normal px-1.5 [&_svg]:h-3.5 [&_svg]:w-3.5"
                >
                  <ExternalLinkIcon className="w-3.5 h-3.5" />
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mb-1">
                Trainer: {programOnSchedule.program.trainerFirstName}{" "}
                {programOnSchedule.program.trainerLastName}
              </p>
              <p
                className={cn(
                  "text-xs font-medium leading-none text-foreground/80",
                  isTodaysDay && "font-semibold"
                )}
              >
                {addMinutesToTime(
                  programOnSchedule.startTime,
                  programOnSchedule.program.trainingDuration
                )}
              </p>
            </CardContent>
            <CardContent className="p-2 pb-1 pt-0 flex flex-col">
              <div className="mt-1 flex justify-between items-center">
                <StatusBadge status={programStatus} />
                {editable && (
                  <ManageProgramPopup programOnSchedule={programOnSchedule} />
                )}
              </div>
              {programStatus === "live" && (
                <TrainingWorkoutDialog programOnSchedule={programOnSchedule} />
              )}
            </CardContent>
          </Card>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
}

const StatusBadge = ({ status }: { status: ScheduleTrainingStatus }) => {
  const statusStyles = {
    completed:
      "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    not_completed: "bg-red-100 text-red-800",
    upcoming:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    live: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 animate-pulse",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center ${statusStyles[status]}`}
    >
      {status == "completed" && <CheckIcon className="h-3.5 w-3.5 mr-1" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ManageProgramPopup = ({
  programOnSchedule,
}: {
  programOnSchedule: TrainingProgramOnSchedule;
}) => {
  const { onEditProgram, onRemoveProgram } = useSchedule();

  const handleEditProgramOnSchedule = (
    data: ManageTrainingProgramOnSchedule
  ) => {
    return onEditProgram(programOnSchedule.id, data);
  };

  return (
    <Popover>
      <PopoverTrigger
        asChild
        onClick={(e) => {
          e.type;
        }}
      >
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-0">
        <CreateEditProgramOnScheduleModal
          isEdit={true}
          programOnSchedule={programOnSchedule}
          onSubmitModal={handleEditProgramOnSchedule}
        />
        <SimpleAlertDialog
          onConfirm={() => onRemoveProgram(programOnSchedule.id)}
          title="Are you sure?"
          description="This action cannot be undone, are you sure you want to continue?"
          submitText="Yes"
          cancelText="No"
        >
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start rounded-none px-4 py-2 text-xs font-normal text-destructive hover:text-destructive"
          >
            <Trash2Icon className="mr-0 h-3.5 w-3.5" />
            Remove
          </Button>
        </SimpleAlertDialog>
      </PopoverContent>
    </Popover>
  );
};
