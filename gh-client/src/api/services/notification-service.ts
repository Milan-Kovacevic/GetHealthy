import { sendAxiosRequest } from "./base-service";
import { PageableNotifications } from "../contracts/notification-contract";
import { ApiEndpoints } from "@/utils/constants";
import { PageableNotificationsDTO } from "../models/notification";

const pageSize = 10;

const getPageableUserNotifications = ({ page }: { page: number }) => {
  const userId = "1"; // Hardcoded for now
  // TODO: Obtain this information from jwt or session storage...
  var url = ApiEndpoints.Notifications.replace("{userId}", userId);
  url += `?page=${page}&pageSize=${pageSize}`;
  //   return sendAxiosRequest<void, PageableNotifications>({
  //     method: "GET",
  //     url: url,
  //   }).then((response) => {
  //     return response.data;
  //   });

  // Mock response for now
  return Promise.resolve<PageableNotificationsDTO>({
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
    page: 1,
    size: 5,
  });
};

export { getPageableUserNotifications };
