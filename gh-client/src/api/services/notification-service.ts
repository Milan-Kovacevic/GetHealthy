import { sendAxiosRequest } from "./base-service";
import { ApiEndpoints } from "@/utils/constants";
import {
  NotificationsSummary,
  PageableNotifications,
} from "../models/notification";
import {
  NotificationDTO,
  NotificationsSummaryDTO,
  PageableNotificationsDTO,
} from "../contracts/notification-contract";
import { formatDistanceToNow } from "date-fns";
import { delay } from "@/lib/utils";

const pageSize = 5;

const generateNotificationContent = (
  notification: NotificationDTO
): { title: string; description: string } => {
  switch (notification.notificationType) {
    case "PROGRAM_APPLICATION_ACCEPTED": // PROGRAM_APPLICATION_ACCEPTED
      return {
        title: `Program request APPROVED`,
        description: `Your request for training program '${notification.metadata}' has been approved by ${notification.senderFirstName} ${notification.senderLastName}`,
      };
    case "PROGRAM_APPLICATION_REJECTED":
      return {
        title: `Program request REJECTED`,
        description: `Your request for training program '${notification.metadata}' has been rejected by ${notification.senderFirstName} ${notification.senderLastName}`,
      };
    case "NEW_COMMENT_ON_PROGRAM":
      return {
        title: `New comment on program`,
        description: `${notification.senderFirstName} ${notification.senderLastName} posted a new comment on '${notification.metadata}'`,
      };
    case "PROGRAM_REMOVED_FROM_SCHEDULE":
      return {
        title: `REMOVED program from schedule`,
        description: `${notification.senderFirstName} ${notification.senderLastName} removed '${notification.metadata}' from your schedule`,
      };
    case "PROGRAM_ADDED_ON_SCHEDULE":
      return {
        title: `ADDED program to schedule`,
        description: `${notification.senderFirstName} ${notification.senderLastName} added program '${notification.metadata}' on your schedule`,
      };
  }
};

const getPageableUserNotifications = async (
  userId: number,
  page: number = 0
) => {
  var url = ApiEndpoints.UserNotifications.replace("{userId}", `${userId}`);
  url += `?page=${page}&size=${pageSize}`;

  await delay(1500);
  return sendAxiosRequest<void, PageableNotificationsDTO>({
    method: "GET",
    url: url,
  }).then((response) => {
    var value: PageableNotifications = {
      ...response.data,
      content: response.data.content.map((item) => {
        var content = generateNotificationContent(item);
        return {
          id: item.id,
          title: content.title,
          description: content.description,
          isRead: item.markRead,
          time: formatDistanceToNow(item.date, { addSuffix: true }),
        };
      }),
    };
    return value;
  });
};

const markAllUserNotificationsAsRead = (userId: number) => {
  var url = ApiEndpoints.UserNotifications.replace("{userId}", `${userId}`);
  url += "/mark-read";

  return sendAxiosRequest<void, void>({
    method: "POST",
    url: url,
  });
};

const markUserNotificationAsRead = (userId: number, notificationId: number) => {
  var url = ApiEndpoints.UserNotifications.replace("{userId}", `${userId}`);
  url += `/${notificationId}/mark-read`;

  return sendAxiosRequest<void, void>({
    method: "POST",
    url: url,
  });
};

const deleteUserNotification = (userId: number, notificationId: number) => {
  var url = ApiEndpoints.UserNotifications.replace("{userId}", `${userId}`);
  url += `/${notificationId}`;

  return sendAxiosRequest<void, void>({
    method: "DELETE",
    url: url,
  });
};

const getNotificationsSummary = async (
  userId: number
): Promise<NotificationsSummary> => {
  var url = ApiEndpoints.UserNotifications.replace("{userId}", `${userId}`);
  url += `/summary`;
  await delay(1000);
  return sendAxiosRequest<void, NotificationsSummaryDTO>({
    method: "GET",
    url: url,
  }).then((response) => response.data as NotificationsSummary);
};

export {
  getPageableUserNotifications,
  markAllUserNotificationsAsRead,
  markUserNotificationAsRead,
  deleteUserNotification,
  getNotificationsSummary,
};
