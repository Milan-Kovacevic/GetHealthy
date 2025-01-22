import { useState } from "react";
import { DeleteOneResponse, useDeleteButton } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2Icon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeleteButtonProps {
  className?: string;
  disabled?: boolean;
  text?: string;
  resource: string;
  itemId: string;
  onSuccess?: (value: DeleteOneResponse) => void;
}

export function DeleteButton(props: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const { onConfirm, loading, cancelLabel, confirmOkLabel, confirmTitle } =
    useDeleteButton({
      resource: props.resource,
      successNotification: {
        message: "Resource deleted successfully",
        type: "success",
      },
      id: props.itemId,
      onSuccess: props.onSuccess,
    });

  return (
    <AlertDialog open={loading || open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "border-destructive/60 text-destructive hover:text-destructive",
            props.className
          )}
          disabled={props.disabled}
        >
          <TrashIcon className="h-4 w-4" /> {props.text}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete selected
            resource from the server
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive/95 hover:bg-destructive h-auto py-2 font-normal text-destructive-foreground"
            disabled={loading}
            onClick={onConfirm}
          >
            {loading && <Loader2Icon className="animate-spin" />}
            {confirmOkLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
