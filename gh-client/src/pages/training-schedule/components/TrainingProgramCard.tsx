import { TrainingProgramOnSchedule } from "@/api/models/training-program-on-schedule";
import { deleteTrainingProgramOnSchedule } from "@/api/services/training-program-on-schedule-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TrainingWorkoutDialog from "@/pages/training-workout/TrainingWorkoutDialog";
import {
  getTrainingProgramTimeRange,
  ScheduleTrainingStatus,
} from "@/utils/date-time-utils";
import { ExternalLinkIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import CreateEditProgramOnScheduleModal from "./CreateEditProgramOnScheduleModal";

interface TrainingProgramCardProps {
  programOnSchedule: TrainingProgramOnSchedule;
  onEditProgramOnSchedule: (
    programOnSchedule: TrainingProgramOnSchedule
  ) => void;
  programStatus: ScheduleTrainingStatus;
  onViewDetails: (programId: number) => void;
  editable: boolean;
}

export default function TrainingProgramCard({
  programOnSchedule,
  onViewDetails,
  programStatus,
  editable,
  onEditProgramOnSchedule,
}: TrainingProgramCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-pointer shadow-md hover:border-foreground transition-colors p-1 border-foreground/35">
            <CardContent className="p-2 flex flex-col">
              <h3 className="font-semibold text-sm mb-1">
                {programOnSchedule.program.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {getTrainingProgramTimeRange(programOnSchedule)}
              </p>
            </CardContent>
            <CardContent className="p-2 pt-0 flex flex-col">
              <div className="mt-1 flex justify-between items-center">
                <StatusBadge status={programStatus} />
                {editable && (
                  <ManageProgramPopup
                    programOnSchedule={programOnSchedule}
                    onEditProgramOnSchedule={onEditProgramOnSchedule}
                  />
                )}
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
          <p>{programOnSchedule.program.description}</p>

          <p className="text-xs text-muted-foreground font-medium">
            Trainer: {programOnSchedule.program.trainerName}
          </p>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-muted-foreground">
              {getTrainingProgramTimeRange(programOnSchedule)}
            </p>
            <Button
              onClick={() => onViewDetails(programOnSchedule.program.id)}
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

const ManageProgramPopup = ({
  programOnSchedule,
  onEditProgramOnSchedule,
}: {
  programOnSchedule: TrainingProgramOnSchedule;
  onEditProgramOnSchedule: (
    programOnSchedule: TrainingProgramOnSchedule
  ) => void;
}) => {
  const handleEdit = (editedProgram: TrainingProgramOnSchedule) => {
    onEditProgramOnSchedule(editedProgram);
  };

  const handleRemove = async () => {
    try {
      await deleteTrainingProgramOnSchedule(programOnSchedule.id);
      toast.success("Training program successfully deleted!");
    } catch (error) {
      toast.error("Could not delete training program!");
      console.log(error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-0">
        <CreateEditProgramOnScheduleModal
          isEdit={true}
          programOnSchedule={programOnSchedule}
          onEditProgramOnSchedule={handleEdit}
        />
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
