import { NotificationDTO } from "@/api/models/notification";
import { getPageableUserNotifications } from "@/api/services/notification-service";
import { useState } from "react";
import NotificationItem from "./NotificationItem";
// import InfiniteScroll from "react-infinite-scroll-component";
import { ScrollArea } from "@/components/ui/scroll-area";
import InfiniteScroll from "@/components/ui/infnite-scroll";
import { Loader2Icon } from "lucide-react";

export default function NotificationList() {
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const handleOnPageChange = async () => {
    setIsLoading(true);

    /**
     * Intentionally delay the search by 800ms before execution so that you can see the loading spinner.
     * In your app, you can remove this setTimeout.
     **/
    setTimeout(async () => {
      const response = await getPageableUserNotifications({ page: page });

      setNotifications((prev) => [...prev, ...response.content]);
      setPage((prev) => prev + 1);

      // Usually your response will tell you if there is no more data.
      if (response.content.length < 3) {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 800);
  };

  const toggleReadStatus = (id: number) => {
    console.log(id);
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: !notif.isRead } : notif
      )
    );
  };

  const unreadNotifications = notifications.filter((notif) => !notif.isRead);
  const readNotifications = notifications.filter((notif) => notif.isRead);

  return (
    <ScrollArea className="w-full overflow-y-auto pl-5 pr-4 mr-3">
      <div className="h-[300px]">
        <div className="flex w-full flex-col items-center">
          {unreadNotifications.length > 0 && (
            <div className="mb-4 w-full">
              <h3 className="text-sm font-medium text-foreground/70 mb-1.5">
                Unread
              </h3>
              {unreadNotifications.map((notification, index) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  toggleReadStatus={toggleReadStatus}
                  isLast={index === unreadNotifications.length - 1}
                />
              ))}
            </div>
          )}
          {readNotifications.length > 0 && (
            <div className="w-full">
              <h3 className="text-sm font-medium text-foreground/70 mb-1">
                Read
              </h3>
              {readNotifications.map((notification, index) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  toggleReadStatus={toggleReadStatus}
                  isLast={index === readNotifications.length - 1}
                />
              ))}
            </div>
          )}
          <InfiniteScroll
            hasMore={hasMore}
            isLoading={isLoading}
            next={handleOnPageChange}
            threshold={1}
          >
            {hasMore && <Loader2Icon className="my-2 h-6 w-6 animate-spin" />}
          </InfiniteScroll>
        </div>
      </div>
    </ScrollArea>

    // <InfiniteScroll
    //   // dataLength={notifications.length}
    //   isLoading={isLoading}
    //   next={handleOnPageChange}
    //   hasMore={hasMore}
    //   // loader={<div>LOADING...</div>}
    //   // className="h-[300px]"
    //   // style={{ height: "300px" }}
    // >
    //   <ScrollArea>
    //     {unreadNotifications.length > 0 && (
    //       <div className="mb-4">
    //         <h3 className="text-sm font-medium text-foreground/70 mb-1.5">
    //           Unread
    //         </h3>
    //         {unreadNotifications.map((notification, index) => (
    //           <NotificationItem
    //             key={notification.id}
    //             notification={notification}
    //             toggleReadStatus={toggleReadStatus}
    //             isLast={index === unreadNotifications.length - 1}
    //           />
    //         ))}
    //       </div>
    //     )}
    //     {readNotifications.length > 0 && (
    //       <div>
    //         <h3 className="text-sm font-medium text-foreground/70 mb-1">
    //           Read
    //         </h3>
    //         {readNotifications.map((notification, index) => (
    //           <NotificationItem
    //             key={notification.id}
    //             notification={notification}
    //             toggleReadStatus={toggleReadStatus}
    //             isLast={index === readNotifications.length - 1}
    //           />
    //         ))}
    //       </div>
    //     )}
    //   </ScrollArea>
    // </InfiniteScroll>
  );
}
