import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, XIcon } from "lucide-react";
import React, { ReactNode } from "react";

type NotificationsPopoverProps = {
  children: ReactNode;
};

// Mock data for notifications and requests
const notifications = [
  {
    id: 1,
    title: "Order Shipped",
    description: "Your order #12345 has been shipped",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "New Feature",
    description: "Check out our latest feature update",
    time: "1 day ago",
  },
  {
    id: 3,
    title: "Subscription Expiring",
    description: "Your subscription will expire in 3 days",
    time: "3 days ago",
  },
  {
    id: 4,
    title: "Order Shipped",
    description: "Your order #12345 has been shipped",
    time: "2 hours ago",
  },
  {
    id: 5,
    title: "New Feature",
    description: "Check out our latest feature update",
    time: "1 day ago",
  },
  {
    id: 6,
    title: "Subscription Expiring",
    description: "Your subscription will expire in 3 days",
    time: "3 days ago",
  },
];

const requests = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://picsum.photos/200/300",
    message: "John Doe wants to connect",
    time: "1 hour ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://picsum.photos/200/300",
    message: "Jane Smith sent you a friend request",
    time: "2 days ago",
  },
];

export default function NotificationsPopover({
  children,
}: NotificationsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[400px] px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground hover:text-primary"
          >
            Mark all as read
          </Button>
        </div>
        <Tabs defaultValue="inbox">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="inbox">
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {notifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <div className="flex flex-col space-y-1 p-2">
                      <h3 className="text-sm font-medium">
                        {notification.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        {notification.time}
                      </p>
                    </div>
                    {index < notifications.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="requests">
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {requests.map((request, index) => (
                  <React.Fragment key={request.id}>
                    <div className="flex items-center space-x-4 p-2">
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
                        <p className="text-xs text-gray-500">
                          {request.message}
                        </p>
                        <p className="text-xs text-gray-500">{request.time}</p>
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
                    {index < requests.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
