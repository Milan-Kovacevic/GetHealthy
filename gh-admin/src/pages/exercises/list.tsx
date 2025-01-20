import { DataTable, TableHeading } from "@/components/table";
import { TableActions } from "@/components/table";
import { useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import React from "react";

export const ExerciseList = () => {
  const { edit, show, create } = useNavigation();

  const columns = React.useMemo<ColumnDef<IExerciseResponse>[]>(
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
          const firstMetric = getValue() as IMetricResponse;

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
          const secondMetric = getValue() as IMetricResponse;

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
            <TableActions
              id={getValue() as string}
              resource="exercises"
              edit={edit}
              show={show}
              showDelete={true}
            />
          );
        },
      },
    ],
    []
  );

  const { ...tableProps } = useTable({
    columns,
  });

  return (
    <div className="flex flex-col">
      <TableHeading
        title="Manage exercises"
        create={{
          label: "Add new exercise",
          onCreate: () => create("exercises"),
        }}
      />
      <DataTable {...tableProps} />
    </div>
  );
};
