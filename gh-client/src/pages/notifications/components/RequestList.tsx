import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import RequestItem from "./RequestItem";
import { Separator } from "@/components/ui/separator";
import InfiniteScroll from "@/components/ui/infnite-scroll";
import { Loader2Icon } from "lucide-react";
import { ProgramRequestDTO } from "@/api/models/program-request";

type RequestListProps = {
  requests: ProgramRequestDTO[];
  isLoading: boolean;
  hasMore: boolean;
  onPageChange: () => void;
};

export default function RequestList(props: RequestListProps) {
  const { requests, isLoading, hasMore, onPageChange } = props;

  return (
    <ScrollArea className="w-full overflow-y-auto pl-5 pr-4 mr-3">
      <div className="h-[300px]">
        <div className="flex w-full flex-col items-center">
          <div className="space-y-2">
            {requests.map((request, index) => (
              <React.Fragment key={request.id}>
                <RequestItem request={request} />
                {index < requests.length - 1 && <Separator />}
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
  );
}
