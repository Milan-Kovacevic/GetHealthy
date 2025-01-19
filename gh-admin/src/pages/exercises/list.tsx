import { DataTable, DeleteButton, TableHeading } from "@/components/table";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon, TrashIcon, XIcon } from "lucide-react";
import React, { ReactNode } from "react";

export const ExerciseList = () => {
  const columns = React.useMemo<ColumnDef<IExercise>[]>(
    () => [
      {
        id: "exerciseName",
        accessorKey: "exerciseName",
        header: "Name",
        cell: ({ getValue }) => {
          return (
            <p className="text-[15px] font-medium text-foreground/85">
              {getValue() as string}
            </p>
          );
        },
      },
      {
        id: "description",
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => {
          return (
            <span className="text-foreground/80 line-clamp-2 max-w-sm w-full leading-tight">
              {getValue() as string}
            </span>
          );
        },
      },

      {
        id: "firstExerciseMetric",
        accessorKey: "firstExerciseMetric",
        header: () => <p className="text-right">First metric</p>,
        cell: ({ getValue }) => {
          const firstMetric = getValue() as IMetric;

          return (
            <p className="text-foreground/70 text-[13px] font-medium text-right">
              {firstMetric.name} [
              <span className="text-muted-foreground font-normal">
                {firstMetric.unit}
              </span>
              ]
            </p>
          );
        },
      },
      {
        id: "secondExerciseMetric",
        accessorKey: "secondExerciseMetric",
        header: () => <p className="text-right">Second metric</p>,
        cell: ({ getValue }) => {
          const secondMetric = getValue() as IMetric;

          return secondMetric ? (
            <p className="text-foreground/70 text-[13px] font-medium text-right">
              {secondMetric.name} [
              <span className="text-muted-foreground font-normal">
                {secondMetric.unit}
              </span>
              ]
            </p>
          ) : (
            <div className="flex justify-end items-center">
              <XIcon className="h-4 w-4 text-muted-foreground" />
            </div>
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
                  show("exercises", getValue() as string);
                }}
              >
                <EyeIcon size={16} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="w-auto h-auto py-2 px-2 text-foreground/85"
                onClick={() => {
                  edit("exercises", getValue() as string);
                }}
              >
                <EditIcon size={16} />
              </Button>
              <DeleteButton
                itemId={getValue() as string}
                resource="exercises"
                className="w-auto h-auto py-2 px-2 ml-1.5"
              />
            </div>
          );
        },
      },
    ],
    []
  );

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
        title="Manage exercises"
        create={{ label: "Add new exercise", onCreate: handleCreateCategory }}
      />
      <DataTable {...tableProps} />
    </div>
  );
};
