import { Page } from "./pageable-contract";

export type NotificationDTO = {
  id: number;
  markRead: boolean;
  metadata: string;
  date: Date;
  senderFirstName: string;
  senderLastName: string;
  notificationType: NotificationType;
};

export type NotificationType =
  | "PROGRAM_APPLICATION_ACCEPTED"
  | "PROGRAM_APPLICATION_REJECTED"
  | "NEW_COMMENT_ON_PROGRAM"
  | "PROGRAM_ADDED_ON_SCHEDULE"
  | "PROGRAM_REMOVED_FROM_SCHEDULE"
  | "TRAINEE_REMOVED_FROM_PROGRAM"
  | "TRAINEE_MOVED_TO_ANOTHER_PROGRAM";

export type PageableNotificationsDTO = Page<NotificationDTO>;

export type NotificationsSummaryDTO = {
  totalUnread: number;
};
