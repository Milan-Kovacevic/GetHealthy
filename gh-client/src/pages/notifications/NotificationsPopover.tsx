import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { ReactNode, useState } from "react";
import RequestItem from "./components/RequestItem";
import NotificationList from "./components/NotificationList";

type NotificationsPopoverProps = {
  children: ReactNode;
  isTrainer: boolean;
};

type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

type Request = {
  id: number;
  name: string;
  avatar: string;
  message: string;
  time: string;
};

// Mock data for notifications and requests
const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Order Shipped",
    description: "Your order #12345 has been shipped",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    title: "New Feature",
    description: "Check out our latest feature update",
    time: "1 day ago",
    unread: true,
  },
  {
    id: 3,
    title: "Subscription Expiring",
    description: "Your subscription will expire in 3 days",
    time: "3 days ago",
    unread: false,
  },
  {
    id: 4,
    title: "Payment Received",
    description: "We have received your payment",
    time: "1 week ago",
    unread: false,
  },
];

const initialRequests: Request[] = [
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
  isTrainer,
}: NotificationsPopoverProps) {
  const [requests, setRequests] = useState<Request[]>(initialRequests);

  const markAllAsRead = () => {};

  const TrainerView = () => (
    <>
      <div className="flex items-center justify-between mb-2 mx-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-foreground hover:text-primary"
          onClick={markAllAsRead}
        >
          Mark all as read
        </Button>
      </div>
      <Tabs defaultValue="inbox">
        <TabsList className="grid grid-cols-2 mx-4">
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox" className="">
          <NotificationList />
        </TabsContent>
        <TabsContent value="requests">
          <ScrollArea className="h-[300px] px-5">
            <div className="space-y-2">
              {requests.map((request, index) => (
                <React.Fragment key={request.id}>
                  <RequestItem request={request} />
                  {index < requests.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </>
  );

  const TraineeView = () => (
    <>
      <div className="flex items-center justify-between mb-2 mx-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-foreground hover:text-primary"
          onClick={markAllAsRead}
        >
          Mark all as read
        </Button>
      </div>
      <NotificationList />
    </>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[400px] px-0 py-4">
        {isTrainer ? <TrainerView /> : <TraineeView />}
      </PopoverContent>
    </Popover>
  );
}
