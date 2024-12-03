import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";

type Request = {
  id: number;
  name: string;
  avatar: string;
  message: string;
  time: string;
};

type RequestItemProps = {
  request: Request;
};

export default function RequestItem(props: RequestItemProps) {
  const { request } = props;
  return (
    <div className="flex items-center space-x-3.5 p-2" key={request.id}>
      <Avatar className="self-start mt-1.5">
        <AvatarImage src={request.avatar} alt={request.name} />
        <AvatarFallback>
          {request.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">{request.name}</p>
        <p className="text-xs text-muted-foreground">{request.message}</p>
        <p className="text-xs text-muted-foreground">{request.time}</p>
      </div>
      <div className="flex space-x-2 self-end">
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <CheckIcon className="h-4 w-4" />
          <span className="sr-only">Accept</span>
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-destructive hover:text-destructive"
        >
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Reject</span>
        </Button>
      </div>
    </div>
  );
}
