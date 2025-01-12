import {
  ProgramComment,
  SendProgramComment,
} from "@/api/models/program-review";
import {
  getPageableProgramComments,
  sendTrainingProgramComment,
} from "@/api/services/program-review-service";
import useAuth from "@/hooks/use-auth";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type UseProgramCommentsProps = {
  programId: number;
  userId: number;
};

export function useProgramComments(props: UseProgramCommentsProps) {
  const { programId, userId } = props;

  const [pending, setPending] = useState(false);
  const {
    data: comments,
    setData: setComments,
    hasMore: hasMoreComments,
    setHasMore: setHasMoreComments,
    isLoading: isLoadingComments,
    setIsLoading: setIsLoadingComments,
    onPageChange: onCommentPageChange,
    page: commentsPage,
    setPage: setCommentsPage,
  } = useInfiniteScroll<ProgramComment>({
    fetchData: (state) => {
      return getPageableProgramComments(programId, state.page);
    },
  });

  const onSendProgramComment = (comment: SendProgramComment) => {
    setPending(true);
    sendTrainingProgramComment(userId, programId, comment)
      .then((commentResponse) => {
        setComments((prev) => [commentResponse, ...prev]);
      })
      .catch(() => {
        toast.error("Unexpected error", {
          description: "Unable to send comment on this training program",
        });
      })
      .finally(() => setPending(false));
  };

  return {
    comments,
    setComments,
    hasMoreComments,
    setHasMoreComments,
    isLoadingComments,
    setIsLoadingComments,
    commentsPage,
    setCommentsPage,
    pending,
    setPending,
    onCommentPageChange,
    onSendProgramComment,
  };
}
