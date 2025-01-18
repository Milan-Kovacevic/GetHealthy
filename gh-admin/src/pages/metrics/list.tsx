import React from "react";

import {
  GetManyResponse,
  IResourceComponentsProps,
  useNavigation,
  useMany,
} from "@refinedev/core";

import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";

import { LucideEye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, TableHeading } from "@/components/table";

export const MetricList: React.FC<IResourceComponentsProps> = () => {
  const columns = React.useMemo<ColumnDef<IBlogPost>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "ID",
      },
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
      },
      {
        id: "content",
        accessorKey: "content",
        header: "Content",
      },
      {
        id: "category",
        header: "Category",
        accessorKey: "category.id",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoryData: GetManyResponse<ICategory>;
          };
          const category = meta.categoryData?.data?.find(
            (item: ICategory) => item.categoryId === getValue()
          );

          return category?.name ?? "";
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
          return (
            <div className="flex flex-row flex-nowrap gap-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  show("requests", getValue() as string);
                }}
              >
                <LucideEye size={16} />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );
  const { create, show } = useNavigation();

  const { ...tableProps } = useTable({
    columns,
    refineCoreProps: {
      meta: {
        populate: ["category"],
      },
    },
  });

  const catList =
    tableProps.refineCore.tableQuery.data?.data?.map(
      (item: IBlogPost) => item?.category?.id
    ) ?? [];

  const { data: categoryData } = useMany({
    resource: "categories",
    ids: catList,
    queryOptions: {
      enabled: !!tableProps.refineCore.tableQuery.data?.data,
    },
  });

  tableProps?.setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoryData,
    },
  }));

  const handleCreateMetric = () => {
    create("metrics");
  };

  return (
    <div className="flex flex-col">
      <TableHeading
        title="Exercise metrics"
        create={{ label: "Create metric", onCreate: handleCreateMetric }}
      />
      <DataTable {...tableProps} />
    </div>
  );
};
