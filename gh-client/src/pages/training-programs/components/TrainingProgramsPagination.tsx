import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type TrainingProgramsPaginationProps = {
  currentPage: number;
  isFirst: boolean;
  isLast: boolean;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function TrainingProgramsPagination(
  props: TrainingProgramsPaginationProps
) {
  const { currentPage, isFirst, isLast, totalPages, onPageChange } = props;
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={
              isFirst
                ? "pointer-events-none opacity-50 cursor-default"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
        {[...Array(totalPages)]
          .map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => onPageChange(i)}
                isActive={currentPage === i}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))
          .slice(
            Math.max(0, currentPage - 3),
            Math.min(totalPages, currentPage + 2)
          )}
        {currentPage + 2 < totalPages && (
          <PaginationItem>
            <PaginationEllipsis
              className="cursor-pointer"
              onClick={() => onPageChange(currentPage + 2)}
            />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={
              isLast
                ? "pointer-events-none opacity-50 cursor-default"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
