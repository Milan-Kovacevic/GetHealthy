import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, XIcon } from "lucide-react";
import React, { ReactNode } from "react";

type NotificationsPopoverProps = {
  children: ReactNode;
};

// Mock data for notifications and requests
const notifications = [
  { id: 1, message: "Your order has been shipped", time: "2 hours ago" },
  { id: 2, message: "New feature available", time: "1 day ago" },
  { id: 3, message: "Your subscription will expire soon", time: "3 days ago" },
];

const requests = [
  { id: 1, message: "John Doe wants to connect", time: "1 hour ago" },
  {
    id: 2,
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
      <PopoverContent className="w-[380px]">
        <Tabs defaultValue="notifications">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="notifications">
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start space-x-4 p-2"
                  >
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="requests">
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-start space-x-4 p-2"
                  >
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{request.message}</p>
                      <p className="text-xs text-gray-500">{request.time}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8 px-2">
                        <CheckIcon />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 px-2">
                        <XIcon />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
