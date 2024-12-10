import { MessageCircleIcon } from "lucide-react";
import StarRating from "@/components/primitives/StarRating";
import TrainingProgramComments from "./TrainingProgramComments";
import { useProgramComments } from "../../hooks/use-program-comments";
import ProgramCommentForm from "./ProgramCommentForm";
import { sendTrainingProgramRating } from "@/api/services/program-review-service";
import { useState } from "react";
import { toast } from "sonner";

export default function TrainingProgramReviews() {
  const programId = 1; // Mocked for now...
  const {
    comments,
    isLoadingComments,
    hasMoreComments,
    onCommentPageChange,
    onSendProgramComment,
  } = useProgramComments({ programId });

  const [rating, setRating] = useState(0);
  const handleSubmitProgramRating = (rating: number) => {
    sendTrainingProgramRating(programId, { rate: rating })
      .then((response) => {
        setRating(response.rate);
      })
      .catch(() => {
        toast.error("Unexpected error", {
          description: "Unable to rate this training program",
        });
        setRating(0);
      });
  };

  return (
    <div className="w-full md:px-2 my-5 flex flex-col md:p-0 p-3 flex-1">
      <div className="flex sm:flex-row flex-col-reverse items-start sm:gap-1.5 gap-4 sm:mb-0 mb-4 ml-1 w-full justify-between">
        <div className="flex flex-row items-center gap-1.5">
          <MessageCircleIcon className="h-5 w-5 text-foreground/80" />
          <p className="font-medium text-xl tracking-wide mb-0.5">
            Program comments
          </p>
        </div>
        <div className="sm:self-start self-end">
          <p className="text-muted-foreground font-medium text-xs mb-1 text-end">
            Leave a review
          </p>
          <StarRating
            rating={rating}
            onRatingChange={handleSubmitProgramRating}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-2 flex-1">
        <TrainingProgramComments
          comments={comments}
          isLoading={isLoadingComments}
          hasMore={hasMoreComments}
          onCommentsPageChange={onCommentPageChange}
        />

        <ProgramCommentForm
          onSendComment={onSendProgramComment}
          disabled={isLoadingComments}
        />
      </div>
    </div>
  );
}
