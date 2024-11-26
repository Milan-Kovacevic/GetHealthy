import { ReactNode, useState } from "react";
import TrainingWorkoutForm from "./components/TrainingWorkoutForm";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SquareArrowOutUpRight, XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

type TrainingWorkoutDialogProps = {
  children: ReactNode;
};

export default function TrainingWorkoutDialog({
  children,
}: TrainingWorkoutDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-fit">
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h2 className="text-xl font-bold">Full Body Strength</h2>
              <Link to="/programs/1">
                <Button variant="ghost" size="sm" className="h-auto py-2">
                  <SquareArrowOutUpRight />
                </Button>
              </Link>
            </div>
            <AlertDialogCancel
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "self-start h-auto py-1.5 px-2 border-none"
              )}
            >
              <XIcon />
            </AlertDialogCancel>
          </div>
        </AlertDialogHeader>
        <TrainingWorkoutForm />
      </AlertDialogContent>
    </AlertDialog>
  );
}
