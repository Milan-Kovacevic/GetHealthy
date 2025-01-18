import { DataTable, TableHeading } from "@/components/table";
import { Button } from "@/components/ui/button";

import { useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import { EditIcon, EyeIcon } from "lucide-react";
import React from "react";

export const CategoryList = () => {
  const columns = React.useMemo<ColumnDef<ICategory>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Category name",
      },
      {
        id: "actions",
        accessorKey: "categoryId",
        header: () => <div className="text-right mx-4">Actions</div>,
        cell: function render({ getValue }) {
          return (
            <div className="flex flex-row flex-nowrap gap-0 justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  show("categories", getValue() as string);
                }}
              >
                <EyeIcon size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  edit("categories", getValue() as string);
                }}
              >
                <EditIcon size={16} />
              </Button>
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
        populate: ["category"],
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
    create("categories");
  };

  return (
    <div className="flex flex-col">
      <TableHeading
        title="Manage categories"
        create={{ label: "Create category", onCreate: handleCreateCategory }}
      />
      <DataTable {...tableProps} />
    </div>
  );
};
