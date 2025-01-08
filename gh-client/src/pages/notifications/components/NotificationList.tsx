import { Notification } from "@/api/models/notification";
import NotificationItem from "./NotificationItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { Loader2Icon } from "lucide-react";

type NotificationListProps = {
  notifications: Notification[];
  isLoading: boolean;
  hasMore: boolean;
  onPageChange: () => void;
  onDeleteNotification: (id: number) => void;
  onMarkReadNotification: (id: number) => void;
};

export default function NotificationList(props: NotificationListProps) {
  const {
    notifications,
    isLoading,
    hasMore,
    onPageChange,
    onMarkReadNotification,
    onDeleteNotification,
  } = props;

  const unreadNotifications = notifications.filter((notif) => !notif.isRead);
  const readNotifications = notifications.filter((notif) => notif.isRead);

  return (
    <ScrollArea className="w-full pl-5 pr-4 mr-3">
      <div className="h-[300px]">
        <div className="flex w-full flex-col items-center">
          {!isLoading && notifications.length == 0 && (
            <div className="self-start mt-2">
              <p className="text-muted-foreground text-sm italic">
                There are no notifications to show now ...
              </p>
            </div>
          )}
          {unreadNotifications.length > 0 && (
            <div className="mb-4 w-full">
              <h3 className="text-sm font-medium text-foreground/70 mb-1.5">
                Unread
              </h3>
              {unreadNotifications.map((notification, index) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={onMarkReadNotification}
                  onDelete={onDeleteNotification}
                  isLast={index === unreadNotifications.length - 1}
                />
              ))}
            </div>
          )}
          {readNotifications.length > 0 && (
            <div className="w-full">
              <h3 className="text-sm font-medium text-foreground/70 mb-1">
                Read
              </h3>
              {readNotifications.map((notification, index) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={onMarkReadNotification}
                  onDelete={onDeleteNotification}
                  isLast={index === readNotifications.length - 1}
                />
              ))}
            </div>
          )}
          <InfiniteScroll
            hasMore={hasMore}
            isLoading={isLoading}
            next={onPageChange}
            threshold={1}
          >
            {hasMore && <Loader2Icon className="my-2 h-6 w-6 animate-spin" />}
          </InfiniteScroll>
        </div>
      </div>
    </ScrollArea>
  );
}
