import { DataTable, TableHeading } from "@/components/table";
import { TableActions } from "@/components/table";
import { useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef } from "@tanstack/react-table";
import React from "react";

export const MetricList = () => {
  const { edit, create } = useNavigation();

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
            <TableActions
              id={getValue() as string}
              resource="metrics"
              edit={edit}
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
        title="Exercise metrics"
        create={{
          label: "Add new metric",
          onCreate: () => create("metrics"),
        }}
      />
      <DataTable {...tableProps} />
    </div>
  );
};
