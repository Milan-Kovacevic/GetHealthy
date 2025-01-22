import { Exercise } from "@/api/models/exercise";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ExerciseListSkeletonLoader from "./ExerciseListSkeletonLoader";
import ExerciseItem from "./ExerciseItem";

type ExerciseListProps = {
  showVideoEmbedded: boolean;
  exercises: Exercise[];
  loading: boolean;
  page: number;
  totalPages: number;
  isLastPage: boolean;
  isFirstPage: boolean;
  onPageChange: (page: number) => void;
};

export default function ExerciseList(props: ExerciseListProps) {
  const {
    showVideoEmbedded,
    exercises,
    loading,
    totalPages,
    page,
    isFirstPage,
    isLastPage,
    onPageChange,
  } = props;

  return (
    <div className="flex-1 flex flex-col">
      {loading && <ExerciseListSkeletonLoader />}
      {!loading && (
        <>
          <div className="flex-1">
            <div className="grid sm:gap-6 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {exercises.map((exercise) => (
                <ExerciseItem
                  key={exercise.id}
                  exercise={exercise}
                  showVideo={showVideoEmbedded}
                />
              ))}
            </div>
          </div>

          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => onPageChange(Math.max(page - 1, 0))}
                  className={
                    isFirstPage ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={() => onPageChange(index)}
                    isActive={page === index}
                    className={page === index ? "border" : ""}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => onPageChange(Math.min(page + 1, totalPages))}
                  className={isLastPage ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
