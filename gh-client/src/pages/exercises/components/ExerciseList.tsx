import { Exercise } from "@/api/models/exercise";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Link } from "react-router-dom";
import ExerciseListSkeletonLoader from "./ExerciseListSkeletonLoader";

type ExerciseListProps = {
  showVideoEmbed: boolean;
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
    showVideoEmbed,
    exercises,
    loading,
    totalPages,
    page,
    isFirstPage,
    isLastPage,
    onPageChange,
  } = props;

  return (
    <div>
      {loading && <ExerciseListSkeletonLoader />}
      {!loading && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exercises.map((exercise) => (
              <Card key={exercise.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{exercise.exerciseName}</CardTitle>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-0">
                  <div className="flex space-x-2 mb-5">
                    <Badge
                      key={exercise.firstExerciseMetric.id}
                      className="font-medium flex gap-2 px-3 h-auto py-1"
                      variant="secondary"
                    >
                      <span className="text-xs font-medium">
                        {exercise.firstExerciseMetric.name}
                      </span>
                      {exercise.firstExerciseMetric.unit && (
                        <>
                          <span className="bg-muted-foreground/90 h-full w-px"></span>
                          <span className="text-muted-foreground font-medium">
                            {exercise.firstExerciseMetric.unit}
                          </span>
                        </>
                      )}
                    </Badge>

                    {exercise.secondExerciseMetric && (
                      <Badge
                        key={exercise.secondExerciseMetric.id}
                        className="font-medium flex gap-2 px-3 h-auto py-1"
                        variant="secondary"
                      >
                        <span className="text-xs font-medium">
                          {exercise.secondExerciseMetric.name}
                        </span>
                        {exercise.secondExerciseMetric.unit && (
                          <>
                            <span className="bg-muted-foreground/90 h-full w-px"></span>
                            <span className="text-muted-foreground font-medium">
                              {exercise.secondExerciseMetric.unit}
                            </span>
                          </>
                        )}
                      </Badge>
                    )}
                  </div>
                  {showVideoEmbed ? (
                    <div className="aspect-video">
                      <iframe
                        src={exercise.videoLink}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-md"
                      ></iframe>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">
                        Demo video:
                      </p>
                      <Button
                        className="text-foreground/80 h-auto px-0 py-0 underline hover:text-foreground transition-all sm:w-full w-60 justify-start"
                        variant="link"
                      >
                        <Link
                          className="w-auto truncate text-start"
                          to={exercise.videoLink}
                        >
                          {exercise.videoLink}
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
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
