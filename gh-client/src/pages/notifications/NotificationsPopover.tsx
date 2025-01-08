import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode, useState } from "react";
import NotificationList from "./components/NotificationList";
import ListItemSkeleton from "./components/ListItemSkeleton";
import RequestList from "./components/RequestList";
import { useNotifications } from "./hooks/use-notifications";
import { useProgramRequests } from "./hooks/use-program-requests";

type NotificationsPopoverProps = {
  children: ReactNode;
  isTrainer: boolean;
};

export default function NotificationsPopover({
  children,
  isTrainer,
}: NotificationsPopoverProps) {
  const [activeTab, setActiveTab] = useState("inbox");

  const {
    requests,
    hasMoreRequests,
    isLoadingRequests,
    onRequestPageChange,
    pending: pendingRequests,
    onRequestApprove,
    onRequestReject,
  } = useProgramRequests();

  const {
    notifications,
    hasMoreNotifications,
    isLoadingNotifications,
    onNotificationPageChange,
    onDeleteNotification,
    onMarkNotificationAsRead,
    onMarkAllAsRead,
    pending: pendingNotifications,
  } = useNotifications();

  const TrainerView = () => (
    <>
      <div className="flex items-center justify-between mb-2 mx-4 h-8">
        <NotificationTitle
          showMarkAll={activeTab == "inbox"}
          onMarkAll={onMarkAllAsRead}
        />
      </div>
      <Tabs defaultValue="inbox" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mx-4">
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox" className="">
          {pendingNotifications ? (
            <ListItemSkeleton />
          ) : (
            <NotificationList
              notifications={notifications}
              isLoading={isLoadingNotifications}
              hasMore={hasMoreNotifications}
              onPageChange={onNotificationPageChange}
              onDeleteNotification={onDeleteNotification}
              onMarkReadNotification={onMarkNotificationAsRead}
            />
          )}
        </TabsContent>
        <TabsContent value="requests">
          {pendingRequests ? (
            <ListItemSkeleton />
          ) : (
            <RequestList
              requests={requests}
              isLoading={isLoadingRequests}
              hasMore={hasMoreRequests}
              onPageChange={onRequestPageChange}
              onAcceptRequest={onRequestApprove}
              onRejectRequest={onRequestReject}
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );

  const TraineeView = () => (
    <>
      <div className="flex items-center justify-between mb-2 mx-4 h-8">
        <NotificationTitle showMarkAll={true} onMarkAll={onMarkAllAsRead} />
      </div>

      <NotificationList
        notifications={notifications}
        isLoading={isLoadingNotifications}
        hasMore={hasMoreNotifications}
        onPageChange={onNotificationPageChange}
        onDeleteNotification={onDeleteNotification}
        onMarkReadNotification={onMarkNotificationAsRead}
      />
    </>
  );

  const NotificationTitle = ({
    onMarkAll,
    showMarkAll,
  }: {
    onMarkAll?: () => void;
    showMarkAll: boolean;
  }) => {
    return (
      <div className="flex items-center justify-between h-8 w-full">
        <h2 className="text-lg font-semibold ml-0.5">Notifications</h2>
        {showMarkAll && (
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground hover:text-primary"
            onClick={onMarkAll}
          >
            Mark all as read
          </Button>
        )}
      </div>
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="sm:w-[400px] w-screen sm:relative sm:translate-y-0 -translate-y-1/2 px-0 py-4">
        {isTrainer ? <TrainerView /> : <TraineeView />}
      </PopoverContent>
    </Popover>
  );
}
