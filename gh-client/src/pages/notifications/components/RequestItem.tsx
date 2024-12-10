import { ProgramRequest } from "@/api/models/program-request";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";

type RequestItemProps = {
  request: ProgramRequest;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
};

export default function RequestItem(props: RequestItemProps) {
  const { request, onAccept, onReject } = props;
  return (
    <div className="flex items-center space-x-3.5 p-2" key={request.id}>
      <Avatar className="self-start mt-1.5">
        <AvatarImage src="" alt={request.traineeFirstName} />
        <AvatarFallback>
          {request.traineeFirstName[0]}
          {request.traineeLastName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">
          {request.traineeFirstName} {request.traineeLastName}
        </p>
        <p className="text-xs text-muted-foreground">{request.note}</p>
        <p className="text-xs text-muted-foreground">
          {request.submissionDate}
        </p>
      </div>
      <div className="flex space-x-2 self-end">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => onAccept(request.id)}
        >
          <CheckIcon className="h-4 w-4" />
          <span className="sr-only">Accept</span>
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => onReject(request.id)}
        >
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Reject</span>
        </Button>
      </div>
    </div>
  );
}
