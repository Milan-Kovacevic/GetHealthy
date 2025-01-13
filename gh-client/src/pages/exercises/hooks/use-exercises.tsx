import { Exercise } from "@/api/models/exercise";
import { getPageableExcercises } from "@/api/services/exercise-service";
import { usePagination } from "@/hooks/use-pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type ExercisesState = {
  exercises: Exercise[];
  loading: boolean;
  totalPages: number;
  isLastPage: boolean;
  isFirstPage: boolean;
  currentPage: number;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onPageChange: (page: number) => void;
  onSearch: () => void;
  onMoreExercises: () => void;
};

export default function useExercises() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q");
  const page = searchParams.get("p");

  const [searchQuery, setSearchQuery] = useState(query ?? "");

  useEffect(() => {
    loadMoreExercises();
  }, [searchQuery, page]);

  const onSearchExercises = (searchQuery: string) => {
    searchParams.set("q", searchQuery);
    setSearchParams(searchParams);
    loadMoreExercises();
  };

  const onExercisesPageChange = (page: number) => {
    searchParams.set("p", page.toString());
    setSearchParams(searchParams);
    setCurrentExercisePage(page);
  };

  const {
    data: exercises,
    isLoading: loadingExercises,
    onLoadMoreData: loadMoreExercises,
    totalPages: totalExercisePages,
    last: lastExercisePage,
    first: firstExercisePage,
    page: currentExercisePage,
    setPage: setCurrentExercisePage,
  } = usePagination<Exercise>({
    fetchData: (state) => {
      return getPageableExcercises(searchQuery, state.page);
    },
    initialPage: parseInt(page ?? "0"),
  });

  return {
    exercises: exercises,
    loading: loadingExercises,
    totalPages: totalExercisePages,
    isLastPage: lastExercisePage,
    isFirstPage: firstExercisePage,
    currentPage: currentExercisePage,
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
    onPageChange: onExercisesPageChange,
    onSearch: onSearchExercises,
  } as ExercisesState;
}
