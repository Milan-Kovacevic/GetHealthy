import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import NotificationList from "./components/NotificationList";
import ListItemSkeleton from "./components/ListItemSkeleton";
import RequestList from "./components/RequestList";
import { useNotifications } from "./hooks/use-notifications";
import { useProgramRequests } from "./hooks/use-program-requests";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BellIcon, TrashIcon } from "lucide-react";
import useAuth from "@/hooks/use-auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type NotificationsPopoverProps = {
  isTrainer: boolean;
  className?: string;
};

export default function NotificationsPopover({
  isTrainer,
  className,
}: NotificationsPopoverProps) {
  const auth = useAuth();
  const userId = auth.getUserId();
  if (!userId) return;

  const [activeTab, setActiveTab] = useState("inbox");

  const {
    requests,
    hasMoreRequests,
    isLoadingRequests,
    onRequestPageChange,
    onRequestApprove,
    onRequestReject,
    selectedRequest,
    onLoadRequestDetails,
    onCloseRequestDetails,
    loadingDetails: loadingRequestDetails,
  } = useProgramRequests();

  const {
    unreadCount,
    notifications,
    hasMoreNotifications,
    isLoadingNotifications,
    onNotificationPageChange,
    onDeleteNotification,
    onDeleteAllNotifications,
    onMarkNotificationAsRead,
    onMarkAllAsRead,
    pending: pendingNotifications,
  } = useNotifications(userId);

  const TrainerView = (
    <>
      <div className="flex items-center justify-between mb-2 mx-4 h-8">
        <NotificationTitle
          showActions={activeTab == "inbox"}
          disabled={unreadCount == 0}
          onDeleteAll={onDeleteAllNotifications}
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
          <RequestList
            requests={requests}
            isLoading={isLoadingRequests}
            hasMore={hasMoreRequests}
            onPageChange={onRequestPageChange}
            onAcceptRequest={onRequestApprove}
            onRejectRequest={onRequestReject}
            selectedRequest={selectedRequest}
            onLoadRequestDetails={onLoadRequestDetails}
            onCloseRequestDetails={onCloseRequestDetails}
            loadingDetails={loadingRequestDetails}
          />
        </TabsContent>
      </Tabs>
    </>
  );

  const TraineeView = (
    <>
      <div className="flex items-center justify-between mb-2 mx-4 h-8">
        <NotificationTitle
          disabled={unreadCount == 0}
          showActions={true}
          onDeleteAll={onDeleteAllNotifications}
          onMarkAll={onMarkAllAsRead}
        />
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            "relative",
            navigationMenuTriggerStyle,
            buttonVariants({
              variant: "ghost",
            }),
            "h-auto py-1.5 px-2.5 w-full lg:border-none border [&_svg]:h-6 [&_svg]:w-6",
            className
          )}
        >
          {unreadCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -top-px border-[2px] border-background translate-x-2.5 rounded-full pointer-events-none text-primary-foreground leading-none bg-primary text-[10px] px-[5px] py-0.5 h-auto"
            >
              {pendingNotifications ? (
                <span className="font-medium leading-none">..</span>
              ) : (
                <span className="font-medium leading-none">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Badge>
          )}

          <BellIcon strokeWidth={2} className="w-full h-full" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="sm:w-[400px] w-screen sm:relative px-0 py-4">
        {isTrainer ? TrainerView : TraineeView}
      </PopoverContent>
    </Popover>
  );
}

const NotificationTitle = ({
  onMarkAll,
  onDeleteAll,
  showActions,
  disabled,
}: {
  onMarkAll?: () => void;
  onDeleteAll?: () => void;
  showActions: boolean;
  disabled: boolean;
}) => {
  return (
    <div className="flex items-center justify-between h-8 w-full">
      <h2 className="text-lg font-semibold ml-0.5">Notifications</h2>
      {showActions && (
        <div className="flex items-center gap-px">
          <Button
            disabled={disabled}
            variant="ghost"
            size="sm"
            className="text-foreground hover:text-primary h-auto py-1.5 px-2"
            onClick={onMarkAll}
          >
            Mark all as read
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onDeleteAll}
                  variant="ghost"
                  size="sm"
                  className="h-auto py-1.5 px-2 hover:text-destructive"
                >
                  <TrashIcon className="" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-40 text-center">
                  Clear your inbox (delete all notifications)
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};
