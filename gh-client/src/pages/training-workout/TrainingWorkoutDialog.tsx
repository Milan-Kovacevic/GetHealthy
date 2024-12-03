import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SquareArrowOutUpRight, XIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import TrainingWorkoutForm from "./components/TrainingWorkoutForm";

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
            <div className="flex items-center flex-1 gap-2 flex-wrap mb-0.5">
              <h2 className="text-xl font-bold">Full Body Strength</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link to="/programs/1" target="_blank">
                      <Button variant="ghost" size="sm" className="h-auto py-2">
                        <SquareArrowOutUpRight />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View training program details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
          <Separator className="-translate-y-0.5" />
        </AlertDialogHeader>
        <TrainingWorkoutForm />
      </AlertDialogContent>
    </AlertDialog>
  );
}
