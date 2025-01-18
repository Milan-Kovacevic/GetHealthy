import { DataTable, TableHeading } from "@/components/table";
import { Button } from "@/components/ui/button";
import {
  HttpError,
  useNavigation,
  useTable as useCoreTable,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import { EditIcon, EyeIcon } from "lucide-react";
import React, { ReactNode } from "react";

export const ExerciseList = () => {
  const columns = React.useMemo<ColumnDef<IExercise>[]>(
    () => [
      {
        id: "exerciseName",
        accessorKey: "exerciseName",
        header: "Name",
      },
      {
        id: "description",
        accessorKey: "description",
        header: "Description",
      },
      {
        id: "videoLink",
        accessorKey: "videoLink",
        header: "Video Link",
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
                onClick={() => {
                  show("exercises", getValue() as string);
                }}
              >
                <EyeIcon size={16} />
              </Button>
              {/* <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  edit("exercises", getValue() as string);
                }}
              >
                <EditIcon size={16} />
              </Button> */}
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
