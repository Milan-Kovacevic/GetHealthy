import { Page } from "../contracts/pageable-contract";

export type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
};

export type PageableNotifications = Page<Notification>;
