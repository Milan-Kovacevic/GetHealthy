import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode, useState } from "react";
import TrainingWorkoutContent from "./components/TrainingWorkoutContent";

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
      <AlertDialogContent className="max-w-lg">
        <TrainingWorkoutContent />
      </AlertDialogContent>
    </AlertDialog>
  );
}
