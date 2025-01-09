import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import RequestItem from "./RequestItem";
import { Separator } from "@/components/ui/separator";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { Loader2Icon } from "lucide-react";
import { ProgramRequest } from "@/api/models/program-request";
import { SearchBar } from "@/components/primitives/SearchBar";
import { Skeleton } from "@/components/ui/skeleton";

type RequestListProps = {
  requests: ProgramRequest[];
  isLoading: boolean;
  hasMore: boolean;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onPageChange: () => void;
  onAcceptRequest: (programId: number, traineeId: number) => void;
  onRejectRequest: (programId: number, traineeId: number) => void;
  onSearchRequests: () => void;
};

export default function RequestList(props: RequestListProps) {
  const {
    requests,
    isLoading,
    hasMore,
    searchQuery,
    setSearchQuery,
    onPageChange,
    onAcceptRequest,
    onRejectRequest,
    onSearchRequests,
  } = props;

  return (
    <div>
      {/* <div className="px-4 pt-1 pb-3">
        <SearchBar
          disabled={isLoading}
          query={searchQuery}
          setQuery={setSearchQuery}
          onSearch={onSearchRequests}
          placeholder="Search requests..."
        />
      </div> */}

      <ScrollArea className="w-full pl-5 pr-4 mr-3">
        <div className="h-[300px] pt-2">
          <div className="flex w-full flex-col items-center">
            {!isLoading && requests.length == 0 && (
              <div className="self-start mt-2">
                <p className="text-muted-foreground text-sm italic">
                  There are no requests to show now ...
                </p>
              </div>
            )}
            <div className="space-y-2 w-full">
              {requests.map((request, index) => (
                <React.Fragment
                  key={`${request.programId}-${request.traineeId}`}
                >
                  {isLoading ? (
                    <Skeleton className="w-full min-h-20" />
                  ) : (
                    <>
                      <RequestItem
                        onAccept={onAcceptRequest}
                        onReject={onRejectRequest}
                        request={request}
                      />
                      {index < requests.length - 1 && <Separator />}
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
              {hasMore && <Loader2Icon className="my-2 h-6 w-6 animate-spin" />}
            </InfiniteScroll>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
