import React from "react";

import { IResourceComponentsProps, useNavigation } from "@refinedev/core";

import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable, TableActions, TableHeading } from "@/components/table";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export const RequestList: React.FC<IResourceComponentsProps> = () => {
  const columns = React.useMemo<ColumnDef<IRegistrationRequestResponse>[]>(
    () => [
      {
        id: "name",
        accessorFn: (d) => {
          return `${d.firstName} ${d.lastName}`;
        },
        header: "From",
        cell: ({ getValue }) => {
          return (
            <p className="text-[15px] text-foreground/80 font-medium">
              {getValue() as string}
            </p>
          );
        },
      },

      {
        id: "issueDate",
        accessorKey: "issueDate",
        header: "Issued",
        cell: ({ getValue }) => {
          return (
            <span className="text-foreground/80 text-[13px]">
              {formatDistanceToNow(getValue() as string, { addSuffix: true })}
            </span>
          );
        },
      },
      {
        id: "description",
        accessorKey: "description",
        header: "Note",
        cell: ({ getValue }) => {
          var value = getValue() as string;
          return (
            <span
              className={cn(
                "text-foreground/75 line-clamp-2 max-w-sm w-full leading-tight text-[13px]",
                !value && "italic"
              )}
            >
              {value ? value : "Not present..."}
            </span>
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
              resource="requests"
              show={show}
            />
          );
        },
      },
    ],
    []
  );
  const { show } = useNavigation();

  const { ...tableProps } = useTable({
    columns,
  });

  return (
    <div className="flex flex-col">
      <TableHeading title="Registration requests" />
      <DataTable {...tableProps} />
    </div>
  );
};
