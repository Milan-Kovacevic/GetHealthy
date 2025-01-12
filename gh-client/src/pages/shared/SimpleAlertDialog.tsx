import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { InfoIcon } from "lucide-react";
import { ReactNode } from "react";

type AlertDialogProps = {
  description: string;
  title: string;
  children: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  cancelText?: string;
  submitText?: string;
};

export const SimpleAlertDialog = (props: AlertDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="">
        {props.children}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[460px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex items-center gap-1 sm:justify-start justify-center">
              <InfoIcon className="h-[18px] w-[18px] mt-0.5 text-destructive" />
              <p className="text-xl">{props.title}</p>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="h-auto py-2 font-normal"
            onClick={props.onCancel}
          >
            {props.cancelText ?? "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={props.onConfirm}
            className="bg-destructive/85 hover:bg-destructive h-auto py-2 font-normal text-destructive-foreground"
          >
            {props.submitText ?? "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
