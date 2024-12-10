import {
  ProgramComment,
  SendProgramComment,
} from "@/api/models/program-review";
import {
  getPageableProgramComments,
  sendTrainingProgramComment,
} from "@/api/services/program-review-service";
import { usePagination } from "@/hooks/use-pagination";
import { useState } from "react";
import { toast } from "sonner";

type UseProgramCommentsProps = {
  programId: number;
};

export function useProgramComments(props: UseProgramCommentsProps) {
  const { programId } = props;
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
  } = usePagination<ProgramComment>({
    fetchData: (state) => {
      return getPageableProgramComments(programId, state.page);
    },
  });

  const onSendProgramComment = (comment: SendProgramComment) => {
    setPending(true);
    sendTrainingProgramComment(programId, comment)
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
