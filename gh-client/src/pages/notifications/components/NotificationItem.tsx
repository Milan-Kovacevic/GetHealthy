import { Notification } from "@/api/models/notification";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { MoreVerticalIcon } from "lucide-react";
import React from "react";

interface NotificationItemProps {
  notification: Notification;
  onMarkRead: (id: number) => void;
  onDelete: (id: number) => void;
  isLast: boolean;
}

export default function NotificationItem({
  notification,
  onMarkRead,
  onDelete,
  isLast,
}: NotificationItemProps) {
  return (
    <React.Fragment>
      <div
        className={cn(
          "flex items-start space-x-4 py-2",
          !notification.isRead && "bg-muted/80 pl-3.5 pr-1 rounded-md mb-2"
        )}
      >
        <div className="flex-1 space-y-1">
          <h3
            className={`text-sm font-medium leading-tight tracking-tight ${
              !notification.isRead ? "text-foreground" : "text-foreground/85"
            }`}
          >
            {notification.title}
          </h3>
          <p className="text-xs text-foreground/80">
            {notification.description}
          </p>
          <p className="text-xs text-muted-foreground/90">
            {notification.time}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVerticalIcon className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!notification.isRead && (
              <DropdownMenuItem onClick={() => onMarkRead(notification.id)}>
                Mark as read
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => onDelete(notification.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!isLast && notification.isRead && <Separator />}
    </React.Fragment>
  );
}
