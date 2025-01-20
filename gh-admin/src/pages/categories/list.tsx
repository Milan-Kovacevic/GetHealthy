import { DataTable, TableActions, TableHeading } from "@/components/table";
import { useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef } from "@tanstack/react-table";
import React from "react";

export const CategoryList = () => {
  const { edit, create } = useNavigation();

  const columns = React.useMemo<ColumnDef<ICategoryResponse>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Category name",
        cell: ({ getValue }) => {
          return (
            <p className="text-[15px] font-medium text-foreground/85">
              {getValue() as string}
            </p>
          );
        },
      },
      {
        id: "actions",
        accessorKey: "categoryId",
        header: () => <div className="text-right mx-4">Actions</div>,
        cell: function render({ getValue }) {
          return (
            <TableActions
              id={getValue() as string}
              resource="categories"
              edit={edit}
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
        title="Manage categories"
        create={{
          label: "Create category",
          onCreate: () => create("categories"),
        }}
      />
      <DataTable {...tableProps} />
    </div>
  );
};
