import { ProgramComment } from "@/api/models/program-review";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import InfiniteScroll from "@/components/ui/infnite-scroll";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2Icon } from "lucide-react";

type TrainingProgramCommentsProps = {
  comments: ProgramComment[];
  isLoading: boolean;
  hasMore: boolean;
  onCommentsPageChange: () => void;
};

const TrainingProgramComments = (props: TrainingProgramCommentsProps) => {
  const { comments, isLoading, hasMore, onCommentsPageChange } = props;

  return (
    <ScrollArea className="w-full overflow-y-auto mx-1 mb-2 flex-1">
      <div className="max-h-[500px]">
        <div className="flex w-full flex-col items-center">
          {!isLoading && comments.length == 0 && (
            <div className="self-start mb-2">
              <p className="text-muted-foreground text-sm italic">
                There are no comments on this training program ...
                {/* <span className="font-semibold">
                  Be the first one to comment!
                </span> */}
              </p>
            </div>
          )}
          <div className="space-y-5 flex-1 w-full mb-2 mt-1 pl-5 pr-4 mr-3">
            {comments.map((comment) => (
              <div
                key={comment.commentId}
                className="flex items-start space-x-4 pb-2"
              >
                <Avatar className="h-14 w-14">
                  <AvatarFallback>
                    {comment.authorFirstName[0]}
                    {comment.authorLastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">
                      {comment.authorFirstName} {comment.authorLastName}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">
                      {comment.content}
                    </p>
                    <time className="text-xs text-muted-foreground">
                      {comment.datePosted}
                    </time>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <InfiniteScroll
            hasMore={hasMore}
            isLoading={isLoading}
            next={onCommentsPageChange}
            threshold={1}
            reverse={true}
          >
            {hasMore && <Loader2Icon className="my-2 h-6 w-6 animate-spin" />}
          </InfiniteScroll>
        </div>
      </div>
    </ScrollArea>
  );
};

export default TrainingProgramComments;
