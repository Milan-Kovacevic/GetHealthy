import { DataTable, DeleteButton, TableHeading } from "@/components/table";
import { Button } from "@/components/ui/button";
import {
  useHandleNotification,
  useNavigation,
  useNotification,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon, TrashIcon, XIcon } from "lucide-react";
import React, { ReactNode, useEffect } from "react";

export const MetricList = () => {
  const columns = React.useMemo<ColumnDef<IExerciseResponse>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Metric name",
        cell: ({ getValue }) => {
          return (
            <p className="text-[15px] font-medium max-w-lg w-full text-foreground/85">
              {getValue() as string}
            </p>
          );
        },
      },
      {
        id: "unit",
        accessorKey: "unit",
        header: "Unit",
        cell: ({ getValue }) => {
          return (
            <span className="text-foreground/80">[{getValue() as string}]</span>
          );
        },
      },

      {
        id: "actions",
        accessorKey: "id",
        header: () => <div className="text-right mx-2">Actions</div>,
        cell: function render({ getValue }) {
          return (
            <div className="flex flex-row flex-nowrap gap-0 justify-end">
              <Button
                variant="ghost"
                size="icon"
                className="w-auto h-auto py-2 px-2 mr-1"
                onClick={() => {
                  show("metrics", getValue() as string);
                }}
              >
                <EyeIcon size={16} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="w-auto h-auto py-2 px-2 text-foreground/85"
                onClick={() => {
                  edit("metrics", getValue() as string);
                }}
              >
                <EditIcon size={16} />
              </Button>
              <DeleteButton
                itemId={getValue() as string}
                onSuccess={() => {
                  open?.({
                    message: "Metric deleted",
                    description: "Selected metric was deleted permanently.",
                    type: "success",
                  });
                }}
                resource="metrics"
                className="w-auto h-auto py-2 px-2 ml-1.5"
              />
            </div>
          );
        },
      },
    ],
    []
  );
  const { open } = useNotification();
  const { edit, show, create } = useNavigation();

  const { ...tableProps } = useTable({
    columns,
    refineCoreProps: {
      meta: {
        populate: ["exercises"],
      },
    },
  });

  tableProps?.setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  const handleCreateCategory = () => {
    create("exercises");
  };

  return (
    <div className="flex flex-col">
      <TableHeading
        title="Exercise metrics"
        create={{ label: "Add new exercise", onCreate: handleCreateCategory }}
      />
      <DataTable {...tableProps} />
    </div>
  );
};
