import React from "react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "./delete-button";
import { EyeIcon, PencilIcon } from "lucide-react";
import { BaseKey, IResourceItem } from "@refinedev/core";

interface TableActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  resource: string;
  edit?: (resource: string | IResourceItem, id: BaseKey) => void;
  show?: (resource: string | IResourceItem, id: BaseKey) => void;
  showDelete?: boolean;
}

export const TableActions: React.FC<TableActionsProps> = (
  props: TableActionsProps
) => {
  const { id, resource, edit, show, showDelete, ...rest } = props;

  return (
    <div className="flex flex-row flex-nowrap gap-0 justify-end" {...rest}>
      {show && (
        <Button
          variant="ghost"
          size="icon"
          className="w-auto h-auto py-2 px-2 mr-1"
          onClick={() => {
            show(resource, id);
          }}
        >
          <EyeIcon size={16} />
        </Button>
      )}
      {edit && (
        <Button
          variant="ghost"
          size="icon"
          className="w-auto h-auto py-2 px-2 text-foreground/85"
          onClick={() => {
            edit(resource, id);
          }}
        >
          <PencilIcon size={16} />
        </Button>
      )}
      {showDelete && (
        <DeleteButton
          itemId={id}
          onSuccess={() => {}}
          resource={resource}
          className="w-auto h-auto py-2 px-2 ml-1.5"
        />
      )}
    </div>
  );
};
