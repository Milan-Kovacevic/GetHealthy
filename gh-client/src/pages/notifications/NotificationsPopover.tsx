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
import {
  deleteUserNotification,
  getPageableUserNotifications,
  markAllUserNotificationsAsRead,
  markUserNotificationAsRead,
} from "@/api/services/notification-service";
import { NotificationDTO } from "@/api/models/notification";
import { toast } from "sonner";
import ListItemSkeleton from "./components/ListItemSkeleton";

type NotificationsPopoverProps = {
  children: ReactNode;
  isTrainer: boolean;
};

type Request = {
  id: number;
  name: string;
  avatar: string;
  message: string;
  time: string;
};

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
  const [activeTab, setActiveTab] = useState("inbox");

  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [pending, setPending] = useState(false);

  const handleOnNotificationPageChange = async () => {
    if (!hasMore) return;
    setIsLoading(true);

    setTimeout(async () => {
      const response = await getPageableUserNotifications({ page: page });

      setNotifications((prev) => [...prev, ...response.content]);
      setPage((prev) => prev + 1);

      // Usually your response will tell you if there is no more data.
      if (notifications.length > 10) {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 800);
  };

  const handleMarkNotificationAsRead = async (id: number) => {
    setPending(true);
    markUserNotificationAsRead(id)
      .then(() => {
        setNotifications((prev) => [
          ...prev.map((notif) =>
            notif.id === id ? { ...notif, isRead: true } : notif
          ),
        ]);
      })
      .catch(() => {
        toast.error("Unexpected error", {
          description: "Unable to mark notification as read",
        });
      })
      .finally(() => setPending(false));
  };

  const handleDeleteNotification = async (id: number) => {
    setPending(true);
    deleteUserNotification(id)
      .then(() => {
        setNotifications((prev) => [
          ...prev.filter((notif) => notif.id !== id),
        ]);
      })
      .catch(() => {
        toast.error("Unexpected error", {
          description: "Unable to delete given notification",
        });
      })
      .finally(() => setPending(false));
  };

  const handleMarkAllAsRead = async () => {
    setPending(true);
    markAllUserNotificationsAsRead()
      .then(() => {
        setNotifications((prev) => [
          ...prev.map((notif) => {
            return { ...notif, isRead: true };
          }),
        ]);
      })
      .catch(() => {
        toast.error("Unexpected error", {
          description: "Unable to mark all notifications as read",
        });
      })
      .finally(() => setPending(false));
  };

  const TrainerView = () => (
    <>
      <div className="flex items-center justify-between mb-2 mx-4 h-8">
        <NotificationTitle
          showMarkAll={activeTab == "inbox"}
          onMarkAll={handleMarkAllAsRead}
        />
      </div>
      <Tabs defaultValue="inbox" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mx-4">
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox" className="">
          {pending ? (
            <ListItemSkeleton />
          ) : (
            <NotificationList
              notifications={notifications}
              isLoading={isLoading}
              hasMore={hasMore}
              onPageChange={handleOnNotificationPageChange}
              onDeleteNotification={handleDeleteNotification}
              onMarkReadNotification={handleMarkNotificationAsRead}
            />
          )}
        </TabsContent>
        <TabsContent value="requests">
          {pending ? (
            <ListItemSkeleton />
          ) : (
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
          )}
        </TabsContent>
      </Tabs>
    </>
  );

  const TraineeView = () => (
    <>
      <NotificationTitle showMarkAll={true} onMarkAll={handleMarkAllAsRead} />
      <NotificationList
        notifications={notifications}
        isLoading={isLoading}
        hasMore={hasMore}
        onPageChange={handleOnNotificationPageChange}
        onDeleteNotification={handleDeleteNotification}
        onMarkReadNotification={handleMarkNotificationAsRead}
      />
    </>
  );

  const NotificationTitle = ({
    onMarkAll,
    showMarkAll,
  }: {
    onMarkAll?: () => void;
    showMarkAll: boolean;
  }) => {
    return (
      <div className="flex items-center justify-between h-8 w-full">
        <h2 className="text-lg font-semibold ml-0.5">Notifications</h2>
        {showMarkAll && (
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground hover:text-primary"
            onClick={onMarkAll}
          >
            Mark all as read
          </Button>
        )}
      </div>
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[400px] px-0 py-4">
        {isTrainer ? <TrainerView /> : <TraineeView />}
      </PopoverContent>
    </Popover>
  );
}
