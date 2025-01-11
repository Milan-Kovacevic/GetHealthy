import { SingleProgramParticipant } from "@/api/models/program-details";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SimpleAlertDialog } from "@/pages/shared/SimpleAlertDialog";
import { differenceInCalendarYears, format } from "date-fns";
import {
  CircleIcon,
  InfoIcon,
  MoreVerticalIcon,
  UserMinusIcon,
  UserPlus,
} from "lucide-react";

type ProgramParticipantItemProps = {
  participant: SingleProgramParticipant;
  onMove: (id: number) => void;
  onRemove: (id: number) => void;
};

export default function ProgramParticipantItem(
  props: ProgramParticipantItemProps
) {
  const { participant, onMove, onRemove } = props;
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar className="flex-shrink-0 h-12 w-12">
            <AvatarImage
              src={participant.profilePictureFilePath}
              alt={`${participant.firstName} ${participant.lastName}`}
              className="object-cover"
            />
            <AvatarFallback>
              {participant.firstName[0]}
              {participant.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-7 gap-0 lg:gap-2">
            <div className="flex items-center lg:col-span-2 col-span-1">
              <p className="text-base lg:text-sm font-medium text-foreground/90 truncate">
                {participant.firstName} {participant.lastName}
              </p>
            </div>
            <div className="flex items-center">
              {participant.dateOfBirth ? (
                <p className="text-sm text-foreground/70">
                  {differenceInCalendarYears(
                    new Date(),
                    participant.dateOfBirth
                  )}{" "}
                  years
                </p>
              ) : (
                <p className="text-sm text-muted-foreground italic">Not set</p>
              )}
            </div>
            <div className="flex items-center">
              <p className="text-xs sm:text-sm text-foreground/70">
                {participant.gender ?? "Not set"}
              </p>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <span className="text-xs text-muted-foreground leading-none">
                Joined:{" "}
              </span>
              <p className="text-sm text-foreground/85">
                {format(participant.joinDate, "PPP")}
              </p>
            </div>
          </div>
          <ParticipantCardActions
            participant={participant}
            onMove={onMove}
            onRemove={onRemove}
          />
        </div>
      </CardContent>
    </Card>
  );
}

type ParticipantCardActionsProps = {
  participant: SingleProgramParticipant;
  onMove: (id: number) => void;
  onRemove: (id: number) => void;
};

const ParticipantCardActions = ({
  participant,
  onMove,
  onRemove,
}: ParticipantCardActionsProps) => {
  return (
    <div className="flex sm:flex-row flex-col-reverse items-center ml-auto">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <InfoIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {participant.firstName} {participant.lastName}
            </DialogTitle>
            <DialogDescription>Participant Details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-1 py-2">
            <div className="flex items-center gap-4">
              <span className="text-sm text-foreground/80">Height:</span>
              <span className="text-sm">{participant.height} cm</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-foreground/80">Weight:</span>
              <span className="text-sm">{participant.weight} kg</span>
            </div>
            <div className="flex flex-col flex-wrap gap-1 mt-1">
              {participant.medicalHistory ? (
                <>
                  <div className="flex items-center gap-2">
                    <CircleIcon className="h-1.5 w-1.5 mt-0.5 fill-foreground/90" />
                    <span className="text-sm font-medium text-foreground/90">
                      Medical History:
                    </span>
                  </div>
                  <span className="text-xs text-justify text-foreground/75">
                    {participant.medicalHistory}
                  </span>
                </>
              ) : (
                <span className="text-xs text-justify italic text-foreground/75">
                  No significant medical history.
                </span>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-medium">Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onMove(participant.id)}>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Move to Different Program</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <SimpleAlertDialog
            onConfirm={() => {
              onRemove(participant.id);
            }}
            title="Confirm your action"
            description="Are you sure you want to remove participant from training program? This action cannot be undone."
          >
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="w-full"
            >
              <UserMinusIcon className="mr-2 h-4 w-4 text-destructive" />
              <span>Remove from Program</span>
            </DropdownMenuItem>
          </SimpleAlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
