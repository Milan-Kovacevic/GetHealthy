export type Notification = {
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
  | "PROGRAM_REMOVED_FROM_SCHEDULE";

export type PageableNotifications = {
  content: Notification[];
  totalPages: number;
  page: number;
  totalElements: number;
};
