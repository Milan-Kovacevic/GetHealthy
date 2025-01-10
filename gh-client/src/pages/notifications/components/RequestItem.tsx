import { ProgramRequest } from "@/api/models/program-request";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

type RequestItemProps = {
  request: ProgramRequest;
  isLast: boolean;

  onClick: (request?: ProgramRequest) => void;
};

export default function RequestItem(props: RequestItemProps) {
  const { request, isLast, onClick } = props;
  return (
    <div
      className={cn(
        "flex items-center space-x-2.5 py-3 px-2 w-full hover:bg-accent/70 hover:cursor-pointer pb-2 hover:border-b-primary",
        !isLast && "border-b"
      )}
      onClick={() => onClick(request)}
    >
      <Avatar className="self-start mt-1.5">
        <AvatarImage src={request.traineeProfilePictureFilePath} alt={""} />
        <AvatarFallback>
          {request.traineeFirstName[0]}
          {request.traineeLastName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-tight tracking-tight">
          {request.programName} - {request.traineeFirstName}{" "}
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
        <p className="text-[11px] text-muted-foreground">
          {formatDistanceToNow(request.submissionDate, { addSuffix: true })}
        </p>
      </div>
      {/* <div className="flex space-x-0.5 self-center">
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
      </div> */}
    </div>
  );
}
