import { NotificationProvider } from "@refinedev/core";
import { toast } from "sonner";

export const notificationProvider: NotificationProvider = {
  open: ({ message, type, description }) => {
    switch (type) {
      case "success":
        toast.message(message, {
          description: description,
        });
        break;
      case "error":
        toast.error(message, {
          description: description,
        });
        break;
    }
  },
  close: (key: string) => {
    return key;
  },
};
