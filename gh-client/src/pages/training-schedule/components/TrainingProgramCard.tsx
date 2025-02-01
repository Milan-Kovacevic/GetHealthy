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
import { useSchedule } from "@/pages/training-schedule/hooks/use-schedule";
import TrainingWorkoutDialog from "@/pages/training-workout/TrainingWorkoutDialog";
import { addMinutesToTime } from "@/utils/date-time-utils";
import {
  CheckIcon,
  ExternalLinkIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import CreateEditProgramOnScheduleModal from "./CreateEditProgramOnScheduleModal";
import { capitalize, cn } from "@/lib/utils";
import { SimpleAlertDialog } from "@/pages/shared/SimpleAlertDialog";
import AuthGuard from "@/pages/shared/AuthGuard";
import { TRAINEE_ONLY_ROLE, TRAINER_ONLY_ROLE } from "@/utils/constants";
import { isWithinInterval } from "date-fns";

export type ScheduleTrainingStatus =
  | "FINISHED"
  | "NOT_STARTED"
  | "UPCOMING"
  | "IN_PROGRESS"
  | "LIVE";

interface TrainingProgramCardProps {
  programOnSchedule: TrainingProgramOnSchedule;
  onViewDetails: (programId: number) => void;
  isTodaysDay: boolean;
}

export default function TrainingProgramCard({
  programOnSchedule,
  onViewDetails,
  isTodaysDay,
}: TrainingProgramCardProps) {
  const getProgramStatus = (
    programOnSchedule: TrainingProgramOnSchedule
  ): ScheduleTrainingStatus => {
    if (!programOnSchedule.scheduleItemState) return "UPCOMING";

    const programDay = programOnSchedule.dayOfWeek;
    const currentDate = new Date();
    const currentDayIndex =
      currentDate.getDay() === 0 ? 7 : currentDate.getDay();
    const dayDifference = programDay - currentDayIndex;

    if (dayDifference > 0) return "UPCOMING";

    const [startHour, startMinute] = programOnSchedule.startTime
      .split(":")
      .map(Number);

    const programStart = new Date(currentDate);
    programStart.setDate(currentDate.getDate() + dayDifference);
    programStart.setHours(startHour, startMinute, 0, 0);
    const programEnd = new Date(
      programStart.getTime() +
        programOnSchedule.program.trainingDuration * 60000
    );

    if (programOnSchedule.scheduleItemState != "NOT_STARTED")
      return programOnSchedule.scheduleItemState;

    if (isWithinInterval(currentDate, { start: programStart, end: programEnd }))
      return "LIVE";

    if (programEnd > currentDate) return "UPCOMING";

    return programOnSchedule.scheduleItemState;
  };

  const noStatus = programOnSchedule.scheduleItemState == undefined;
  const programStatus = getProgramStatus(programOnSchedule);

  return (
    <Card
      data-state="closed"
      className={cn(
        "transition-colors p-1 m-2 bg-card/80 hadow-sm select-none",
        isTodaysDay && "bg-card",
        programStatus == "NOT_STARTED" &&
          "border-2 border-red-400/50 dark:border-red-700/50",
        programStatus == "FINISHED" && "border-2 border-green-600/60",
        (programStatus == "UPCOMING" ||
          programStatus == "IN_PROGRESS" ||
          programStatus == "LIVE") &&
          "border-2 border-border/60",
        (programStatus == "IN_PROGRESS" || programStatus == "LIVE") &&
          "border-red-400 dark:border-red-500",
        "hover:bg-accent/10 dark:hover:bg-accent/90 duration-300",
        noStatus && "border-foreground/50"
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
          <AuthGuard allowedRoles={[TRAINEE_ONLY_ROLE]}>
            <StatusBadge status={programStatus} />
          </AuthGuard>
          <AuthGuard allowedRoles={[TRAINER_ONLY_ROLE]}>
            <ManageProgramPopup programOnSchedule={programOnSchedule} />
          </AuthGuard>
        </div>
        <AuthGuard allowedRoles={[TRAINEE_ONLY_ROLE]}>
          {(programStatus === "LIVE" || programStatus == "IN_PROGRESS") && (
            <TrainingWorkoutDialog programOnSchedule={programOnSchedule} />
          )}
        </AuthGuard>
      </CardContent>
    </Card>
  );
}

const StatusBadge = ({ status }: { status: ScheduleTrainingStatus }) => {
  const statusStyles = {
    FINISHED:
      "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    NOT_STARTED: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100",
    UPCOMING:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    IN_PROGRESS:
      "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 animate-pulse",
    LIVE: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 animate-pulse",
  };

  return (
    <span
      className={`px-2 py-0.5 mt-2 rounded-full text-xs font-semibold flex items-center ${statusStyles[status]}`}
    >
      {status == "FINISHED" && <CheckIcon className="h-3.5 w-3.5 mr-1" />}
      {capitalize(status.replace("_", " "))}
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
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 ml-auto">
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-1">
        <CreateEditProgramOnScheduleModal
          isEdit={true}
          programOnSchedule={programOnSchedule}
          onSubmitModal={handleEditProgramOnSchedule}
        >
          <Button
            className="w-full justify-start h-auto px-2 py-2 text-xs font-normal [&_svg]:h-3.5 [&_svg]:w-3.5"
            size="sm"
            variant="ghost"
          >
            <PencilIcon className="mr-0 h-3.5 w-3.5" />
            Edit
          </Button>
        </CreateEditProgramOnScheduleModal>
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
            className="w-full justify-start h-auto px-2 py-2 text-xs font-normal [&_svg]:h-3.5 [&_svg]:w-3.5 text-destructive hover:text-destructive dark:text-red-700"
          >
            <Trash2Icon className="mr-0 h-3.5 w-3.5" />
            Remove
          </Button>
        </SimpleAlertDialog>
      </PopoverContent>
    </Popover>
  );
};
