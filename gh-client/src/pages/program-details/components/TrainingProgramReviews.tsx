import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircleIcon, SendIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

export default function TrainingProgramReviews() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Alice",
      content: "Great feature! This will be very useful.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Bob",
      content:
        "I found a small bug. The button doesn't work on mobile devices.",
      timestamp: "1 hour ago",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: "Current User",
        content: newComment.trim(),
        timestamp: "Just now",
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  return (
    <div className="w-full max-w-screen-lg md:px-2 my-5 flex flex-col md:p-0 p-3">
      <div className="flex flex-row items-center gap-1.5 ml-1 mb-4">
        <MessageCircleIcon className="h-5 w-5 text-foreground/80" />
        <p className="font-medium text-xl tracking-wide mb-0.5">
          Program comments
        </p>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 mt-2">
          <div className="space-y-4 flex-1 w-full mb-2 mt-1">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4 pb-2">
                <Avatar className="h-14 w-14">
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">
                      {comment.author}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">
                      {comment.content}
                    </p>
                    <time className="text-xs text-muted-foreground">
                      {comment.timestamp}
                    </time>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex-1 my-4 px-1 mt-0"
          >
            <div className="flex flex-col md:flex-row items-end gap-2">
              <Textarea
                placeholder="Write your comment here..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <Button variant="secondary" type="submit">
                <SendIcon className="text-primary" />
                Send comment
              </Button>
            </div>
          </form>
        </div>
      </ScrollArea>
    </div>
  );
}
