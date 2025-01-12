import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import RequestItem from "./RequestItem";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { Loader2Icon } from "lucide-react";
import {
  ProgramRequest,
  ProgramRequestDetails,
} from "@/api/models/program-request";
import { Skeleton } from "@/components/ui/skeleton";
import RequestDetails from "./RequestDetails";

type RequestListProps = {
  requests: ProgramRequest[];
  isLoading: boolean;
  hasMore: boolean;
  onPageChange: () => void;
  onAcceptRequest: (programId: number, traineeId: number) => void;
  onRejectRequest: (programId: number, traineeId: number) => void;
  selectedRequest?: ProgramRequestDetails;
  onLoadRequestDetails: (programId: number, traineeId: number) => void;
  onCloseRequestDetails: () => void;
  loadingDetails: boolean;
};

export default function RequestList(props: RequestListProps) {
  const {
    requests,
    isLoading,
    hasMore,
    onPageChange,
    onAcceptRequest,
    onRejectRequest,
    selectedRequest,
    onLoadRequestDetails,
    onCloseRequestDetails,
    loadingDetails,
  } = props;

  const handleRequestOnClick = (request?: ProgramRequest) => {
    if (!request) return;
    onLoadRequestDetails(request.programId, request.traineeId);
  };

  return (
    <div>
      <ScrollArea className="w-full pl-5 pr-4 mr-3">
        <div className="h-[300px] py-1">
          {loadingDetails ? (
            <div className="w-full h-full">
              <Skeleton className="w-full h-full" />
            </div>
          ) : selectedRequest ? (
            <RequestDetails
              request={selectedRequest}
              onAccept={onAcceptRequest}
              onReject={onRejectRequest}
              onClose={onCloseRequestDetails}
              loading={loadingDetails}
            />
          ) : (
            <div className="flex w-full flex-col items-center">
              {!isLoading && requests.length == 0 && (
                <div className="self-start mt-2">
                  <p className="text-muted-foreground text-sm italic">
                    There are no requests to show now ...
                  </p>
                </div>
              )}
              <div className="space-y-0 w-full">
                {requests.map((request, index) => (
                  <React.Fragment
                    key={`${request.programId}-${request.traineeId}`}
                  >
                    {isLoading ? (
                      <div className="py-1">
                        <Skeleton className="w-full min-h-20" />
                      </div>
                    ) : (
                      <>
                        <RequestItem
                          request={request}
                          isLast={index == requests.length - 1}
                          onClick={handleRequestOnClick}
                        />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <InfiniteScroll
                hasMore={hasMore}
                isLoading={isLoading}
                next={onPageChange}
                threshold={1}
              >
                {hasMore && (
                  <Loader2Icon className="my-2 h-6 w-6 animate-spin" />
                )}
              </InfiniteScroll>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
