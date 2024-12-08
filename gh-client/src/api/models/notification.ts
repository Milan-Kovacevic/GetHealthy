import { Page } from "../contracts/pageable-contract";

export type NotificationDTO = {
  id: number;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
};

export type PageableNotificationsDTO = Page<NotificationDTO>;
