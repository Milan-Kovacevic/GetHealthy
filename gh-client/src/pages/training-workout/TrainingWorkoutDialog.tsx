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
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <AlertDialogTitle>Program workout</AlertDialogTitle>
              <AlertDialogDescription>
                Start your training program interactively
              </AlertDialogDescription>
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
