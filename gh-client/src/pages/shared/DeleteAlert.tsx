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
import React, { ReactNode } from "react";

type AlertDialogProps = {
  description: string;
  title: string;
  children: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  cancelText?: string;
  submitText?: string;
};

export const DeleteAlert = (props: AlertDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        {props.children}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[460px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={props.onCancel}>
            {props.cancelText ?? "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={props.onConfirm}
            className="bg-destructive/95 hover:bg-destructive"
          >
            {props.submitText ?? "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
