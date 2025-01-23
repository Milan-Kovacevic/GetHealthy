import { Notification } from "@/api/models/notification";
import {
  deleteUserNotification,
  getPageableUserNotifications,
  getNotificationsSummary,
  markAllUserNotificationsAsRead,
  markUserNotificationAsRead,
  parseNotificationMessage,
} from "@/api/services/notification-service";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IMessage, useSubscription } from "react-stomp-hooks";

export function useNotifications(userId: number) {
  const [pending, setPending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const {
    data: notifications,
    setData: setNotifications,
    hasMore: hasMoreNotifications,
    setHasMore: setHasMoreNotifications,
    isLoading: isLoadingNotifications,
    setIsLoading: setIsLoadingNotifications,
    onPageChange: onNotificationPageChange,
    page: notificationsPage,
    setPage: setNotificationsPage,
  } = useInfiniteScroll<Notification>({
    fetchData: (state) => {
      return getPageableUserNotifications(userId, state.page);
    },
  });

  const onNotificationReceive = (message: IMessage) => {
    const notification = parseNotificationMessage(message.body);
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };
  useSubscription(`/topic/notifications/${userId}`, onNotificationReceive);

  useEffect(() => {
    setPending(true);
    getNotificationsSummary(userId)
      .then((response) => {
        setUnreadCount(response.totalUnread);
      })
      .finally(() => setPending(false));
  }, []);

  const onMarkNotificationAsRead = async (id: number) => {
    setPending(true);
    markUserNotificationAsRead(userId, id)
      .then(() => {
        setNotifications((prev) => [
          ...prev.map((notif) =>
            notif.id === id ? { ...notif, isRead: true } : notif
          ),
        ]);
        setUnreadCount((prev) => Math.max(prev - 1, 0));
      })
      .catch(() => {
        toast.error("Unexpected error", {
          description: "Unable to mark notification as read",
        });
      })
      .finally(() => setPending(false));
  };

  const onDeleteNotification = async (id: number) => {
    setPending(true);
    deleteUserNotification(userId, id)
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

  const onMarkAllAsRead = async () => {
    setPending(true);
    markAllUserNotificationsAsRead(userId)
      .then(() => {
        setNotifications((prev) => [
          ...prev.map((notif) => {
            return { ...notif, isRead: true };
          }),
        ]);
        setUnreadCount(0);
      })
      .catch(() => {
        toast.error("Unexpected error", {
          description: "Unable to mark all notifications as read",
        });
      })
      .finally(() => setPending(false));
  };

  return {
    unreadCount,
    notifications,
    setNotifications,
    hasMoreNotifications,
    setHasMoreNotifications,
    isLoadingNotifications,
    setIsLoadingNotifications,
    notificationsPage,
    setNotificationsPage,
    pending,
    setPending,
    onNotificationPageChange,
    onMarkAllAsRead,
    onMarkNotificationAsRead,
    onDeleteNotification,
  };
}
