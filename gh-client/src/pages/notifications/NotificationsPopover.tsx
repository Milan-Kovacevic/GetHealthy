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
import NotificationItem from "./components/NotificationItem";
import RequestItem from "./components/RequestItem";

type NotificationsPopoverProps = {
  children: ReactNode;
};

// Mock data for notifications and requests
const initialNotifications = [
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
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, unread: false }))
    );
  };

  const unreadNotifications = notifications.filter((notif) => notif.unread);
  const readNotifications = notifications.filter((notif) => !notif.unread);

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[400px] px-0 py-4">
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
          <TabsContent value="inbox">
            <ScrollArea className="h-[300px] pl-5 pr-4 mr-1">
              {unreadNotifications.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-foreground/70 mb-1.5">
                    Unread
                  </h3>
                  {unreadNotifications.map((notification, index) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      markAsRead={markAsRead}
                      isLast={index === unreadNotifications.length - 1}
                    />
                  ))}
                </div>
              )}
              {readNotifications.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-foreground/70 mb-1">
                    Read
                  </h3>
                  {readNotifications.map((notification, index) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      markAsRead={markAsRead}
                      isLast={index === readNotifications.length - 1}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
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
      </PopoverContent>
    </Popover>
  );
}
