import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  ArrowLeftToLine,
  ArrowRightToLine,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { UseTableReturnType } from "@refinedev/react-table";
import { BaseRecord } from "@refinedev/core";
import { Skeleton } from "@/components/ui/skeleton";

export function DataTable<TData extends BaseRecord>({
  ...tableProps
}: UseTableReturnType<TData>) {
  const {
    getHeaderGroups,
    getRowModel,
    refineCore: {
      tableQuery: { data: tableData, isLoading, isFetching },
    },
    getState,
    setPageIndex,
    getCanPreviousPage,
    getPageCount,
    getCanNextPage,
    nextPage,
    previousPage,
    setPageSize,
    getColumn,
  } = tableProps;

  const canGoToPrev = getCanPreviousPage();
  const canGoToNext = getCanNextPage();

  return (
    <div className="flex flex-col gap-6">
      {isLoading || isFetching ? (
        <div className="space-y-2">
          {[
            Array.from(Array(10)).map((_, index) => {
              return (
                <Skeleton
                  key={index}
                  className={cn("w-full h-12", index == 0 && "h-10 mb-2")}
                />
              );
            }),
          ]}
        </div>
      ) : (
        <Table className="flex-1">
          <TableHeader>
            {getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.getSize(), // Use the column's calculated size
                      }}
                    >
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    style={{
                      width: cell.column.getSize(), // Ensure cell respects column size
                    }}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Pagination>
        <PaginationContent className="flex flex-row flex-wrap justify-center items-center">
          <div className="flex flex-row">
            <PaginationItem
              className={cn(
                "cursor-pointer",
                !canGoToPrev && "pointer-events-none opacity-50"
              )}
            >
              <PaginationLink onClick={() => setPageIndex(0)}>
                <ArrowLeftToLine className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem
              className={cn(
                "cursor-pointer",
                !canGoToPrev && "pointer-events-none opacity-50"
              )}
            >
              <PaginationPrevious onClick={() => previousPage()}>
                <ChevronLeftIcon className="h-4 w-4" />
              </PaginationPrevious>
            </PaginationItem>
            <PaginationItem
              className={cn(
                "cursor-pointer",
                !canGoToNext && "pointer-events-none opacity-50"
              )}
            >
              <PaginationNext onClick={() => nextPage()}>
                <ChevronRightIcon className="h-4 w-4" />
              </PaginationNext>
            </PaginationItem>
            <PaginationItem
              className={cn(
                "cursor-pointer",
                !canGoToNext && "pointer-events-none opacity-50"
              )}
            >
              <PaginationLink onClick={() => setPageIndex(getPageCount() - 1)}>
                <ArrowRightToLine className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          </div>

          <div className="flex items-center space-x-6 lg:space-x-8 mx-2">
            <div className="flex items-center justify-center text-sm text-foreground/80">
              Page {getState().pagination.pageIndex + 1} of {getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm">Rows per page</p>
              <Select
                value={`${getState().pagination.pageSize}`}
                onValueChange={(value: any) => {
                  setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
