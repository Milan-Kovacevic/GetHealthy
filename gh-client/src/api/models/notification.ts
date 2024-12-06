export type NotificationDTO = {
  id: number;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
};

export type PageableNotificationsDTO = {
  content: NotificationDTO[];
  page: number;
  size: number;
};
