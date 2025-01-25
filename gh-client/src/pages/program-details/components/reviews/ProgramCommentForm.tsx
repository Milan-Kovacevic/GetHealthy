import { SendProgramComment } from "@/api/models/program-review";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon, SendIcon } from "lucide-react";
import React, { useState } from "react";

type ProgramCommentFormProps = {
  onSendComment: (comment: SendProgramComment) => void;
  disabled: boolean;
};

export default function ProgramCommentForm(props: ProgramCommentFormProps) {
  const { onSendComment, disabled } = props;
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: SendProgramComment = {
        content: newComment.trim(),
      };
      onSendComment(comment);
      setNewComment("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 my-4 px-1 mt-0 max-w-screen-lg"
    >
      <div className="flex flex-col md:flex-row items-end gap-2">
        <Textarea
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px] resize-none"
        />
        <Button variant="secondary" type="submit" disabled={disabled}>
          {disabled ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <SendIcon className="text-primary" />
          )}
          Send comment
        </Button>
      </div>
    </form>
  );
}
