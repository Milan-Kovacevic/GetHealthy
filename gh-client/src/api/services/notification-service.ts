import { sendAxiosRequest } from "./base-service";
import { PageableNotificationsDTO } from "../contracts/notification-contract";
import { ApiEndpoints } from "@/utils/constants";
import { PageableNotifications } from "../models/notification";

const pageSize = 10;

const getPageableUserNotifications = async ({ page }: { page: number }) => {
  const userId = "1"; // Hardcoded for now
  // TODO: Obtain this information from jwt or session storage...
  var url = ApiEndpoints.UserNotifications.replace("{userId}", userId);
  url += `?page=${page}&size=${pageSize}`;
  // return sendAxiosRequest<void, PageableNotificationsDTO>({
  //   method: "GET",
  //   url: url,
  // }).then((response) => {
  //   return response.data as PageableNotifications;
  // });

  // Mock response for now
  return Promise.resolve<PageableNotifications>({
    content: [
      {
        id: 1,
        title: "Notification 1",
        description: "This is the first notification",
        isRead: true,
        time: "test",
      },
      {
        id: 2,
        title: "Notification 2",
        description: "This is the second notification",
        isRead: false,
        time: "test",
      },
      {
        id: 3,
        title: "Notification 3",
        description: "This is the third notification",
        isRead: true,
        time: "test",
      },
    ],
    empty: false,
    first: true,
    last: true,
    number: 1,
    numberOfElements: 3,
    pageable: {
      offset: 0,
      paged: true,
      pageNumber: 1,
      pageSize: 3,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
    },
    size: 3,
    totalElements: 3,
    totalPages: 1,
  });
};

const markAllUserNotificationsAsRead = () => {
  const userId = "1"; // Hardcoded for now
  var url = ApiEndpoints.UserNotifications.replace("{userId}", userId);
  url += "/mark-read";

  return sendAxiosRequest<void, PageableNotifications>({
    method: "POST",
    url: url,
  });
};

const markUserNotificationAsRead = (id: number) => {
  const userId = "1"; // Hardcoded for now
  var url = ApiEndpoints.UserNotifications.replace("{userId}", userId);
  url += `/${id}/mark-read`;

  return sendAxiosRequest<void, PageableNotifications>({
    method: "POST",
    url: url,
  });
};

const deleteUserNotification = (id: number) => {
  const userId = "1"; // Hardcoded for now
  var url = ApiEndpoints.UserNotifications.replace("{userId}", userId);
  url += `/${id}`;

  return sendAxiosRequest<void, PageableNotifications>({
    method: "DELETE",
    url: url,
  });
};

export {
  getPageableUserNotifications,
  markAllUserNotificationsAsRead,
  markUserNotificationAsRead,
  deleteUserNotification,
};
