import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PencilIcon } from "lucide-react";
import { DeleteButton } from "../table";

interface PageActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  onGoBack: () => void;
  edit: {
    show: boolean;
    disabled?: boolean;
    onEdit?: () => void;
  };
  remove: {
    show: boolean;
    itemId?: string;
    disabled?: boolean;
  };
}

export const PageActions = (props: PageActionsProps) => {
  const { edit, remove, onGoBack, className, ...rest } = props;
  return (
    <div className={cn("gap-1 flex justify-end flex-wrap", className)}>
      <Button variant="ghost" className="self-start" onClick={onGoBack}>
        <ArrowLeft className="h-4 w-4" /> Go back
      </Button>

      <div className="gap-2 flex justify-end flex-wrap">
        {edit.show && (
          <Button
            disabled={edit.disabled}
            variant="ghost"
            onClick={edit.onEdit}
          >
            <PencilIcon className="h-4 w-4" /> Edit
          </Button>
        )}
        {remove.show && (
          <DeleteButton
            text="Delete"
            disabled={remove.disabled}
            itemId={remove.itemId ?? ""}
            resource="metrics"
            onSuccess={onGoBack}
          />
        )}
      </div>
    </div>
  );
};
