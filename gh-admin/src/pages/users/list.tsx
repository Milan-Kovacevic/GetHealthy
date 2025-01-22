import React from "react";
import { IResourceComponentsProps, useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable, TableActions, TableHeading } from "@/components/table";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { capitalize } from "@/lib/utils";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { show } = useNavigation();

  const columns = React.useMemo<ColumnDef<IUserResponse>[]>(
    () => [
      {
        id: "name",
        accessorFn: (d) => {
          return `${d.firstName} ${d.lastName}`;
        },
        header: "Name",
        cell: ({ getValue }) => {
          return (
            <p className="text-[15px] text-foreground/80 font-medium">
              {getValue() as string}
            </p>
          );
        },
      },
      {
        id: "username",
        accessorKey: "username",
        header: "Username",
        cell: ({ getValue }) => {
          return (
            <span className="text-foreground/90">
              {(getValue() as string).replace(/.{4}$/, "****")}
            </span>
          );
        },
      },
      {
        id: "role",
        accessorKey: "role",
        header: "Role",
        cell: ({ getValue }) => {
          return (
            <span className="text-[15px] text-foreground/85">
              {capitalize(getValue() as string)}
            </span>
          );
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created at",
        cell: ({ getValue }) => {
          return (
            <span className="text-foreground/75 text-[13px]">
              {formatDistanceToNow(getValue() as string, { addSuffix: true })}
            </span>
          );
        },
      },
      {
        id: "enabled",
        accessorKey: "enabled",
        header: () => <div className="text-right mx-2">Status</div>,
        cell: ({ getValue }) => {
          const isEnabled = getValue() as boolean;
          return isEnabled ? (
            <div className="flex justify-end">
              <Badge className="font-normal" variant="outline">
                Enabled
              </Badge>
            </div>
          ) : (
            <div className="flex justify-end">
              <Badge className="font-normal" variant="destructive">
                Not enabled
              </Badge>
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
              resource="users"
              show={show}
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
      <TableHeading title="Users" />
      <DataTable {...tableProps} />
    </div>
  );
};
