import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface TableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  create?: {
    onCreate: () => void;
    label: string;
  };
}

export const TableHeading: React.FC<TableHeaderProps> = (
  props: TableHeaderProps
) => {
  const { title, create, ...rest } = props;
  return (
    <div className="mb-4 flex items-start justify-between" {...rest}>
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">{title}</h1>
      {create && (
        <div className="">
          <Button className="min-w-32" onClick={create.onCreate}>
            <PlusIcon />
            {create.label}
          </Button>
        </div>
      )}
    </div>
  );
};
