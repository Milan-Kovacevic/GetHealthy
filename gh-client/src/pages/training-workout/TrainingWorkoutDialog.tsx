import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import TrainingWorkoutForm from "./components/TrainingWorkoutForm";

type TrainingWorkoutDialogProps = {
  children: ReactNode;
};

export default function TrainingWorkoutDialog({
  children,
}: TrainingWorkoutDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Program workout</DialogTitle>
          <DialogDescription>
            Start your training program interactively
          </DialogDescription>
        </DialogHeader>
        <TrainingWorkoutForm />
      </DialogContent>
    </Dialog>
  );
}
