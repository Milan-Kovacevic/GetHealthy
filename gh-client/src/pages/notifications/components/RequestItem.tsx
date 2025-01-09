import { ProgramRequest } from "@/api/models/program-request";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { CheckIcon, XIcon } from "lucide-react";

type RequestItemProps = {
  request: ProgramRequest;
  onAccept: (programId: number, traineeId: number) => void;
  onReject: (programId: number, traineeId: number) => void;
};

export default function RequestItem(props: RequestItemProps) {
  const { request, onAccept, onReject } = props;
  return (
    <div className="flex items-center space-x-3.5 py-1 px-0.5 w-full">
      <Avatar className="self-start mt-1.5">
        <AvatarImage src="TODO" alt={request.traineeFirstName} />
        <AvatarFallback>
          {request.traineeFirstName[0]}
          {request.traineeLastName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">
          {request.trainingProgramName} - {request.traineeFirstName}{" "}
          {request.traineeLastName}
        </p>

        <p
          className={cn(
            "text-xs text-muted-foreground line-clamp-1",
            !request.note && "italic"
          )}
        >
          {request.note ?? "No additional note..."}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(request.submissionDate, { addSuffix: true })}
        </p>
      </div>
      <div className="flex space-x-2 self-end">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => onAccept(request.programId, request.traineeId)}
        >
          <CheckIcon className="h-4 w-4" />
          <span className="sr-only">Accept</span>
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => onReject(request.programId, request.traineeId)}
        >
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Reject</span>
        </Button>
      </div>
    </div>
  );
}
