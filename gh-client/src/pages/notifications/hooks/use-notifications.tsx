import { Notification } from "@/api/models/notification";
import {
  deleteUserNotification,
  getPageableUserNotifications,
  markAllUserNotificationsAsRead,
  markUserNotificationAsRead,
} from "@/api/services/notification-service";
import { usePagination } from "@/hooks/use-pagination";
import { useState } from "react";
import { toast } from "sonner";

export function useNotifications() {
  const [pending, setPending] = useState(false);
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
  } = usePagination<Notification>({
    fetchData: (state) => {
      return getPageableUserNotifications({
        page: state.page,
      });
    },
  });

  const onMarkNotificationAsRead = async (id: number) => {
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

  const onDeleteNotification = async (id: number) => {
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

  const onMarkAllAsRead = async () => {
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

  return {
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
