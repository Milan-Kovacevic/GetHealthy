import { Exercise } from "@/api/models/exercise";
import { getPageableExcercises } from "@/api/services/exercise-service";
import { usePagination } from "@/hooks/use-pagination";
import { useEffect, useState } from "react";

export default function useExercises() {
  const [searchQuery, setSearchQuery] = useState("");

  const onSearchExercises = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  useEffect(() => {
    loadMoreExercises();
  }, [searchQuery]);

  const {
    data: exercises,
    isLoading: loadingExercises,
    onLoadMoreData: loadMoreExercises,
    totalPages: totalExercisePages,
    last: lastExercisePage,
    first: firstExercisePage,
    page: exercisePage,
    setPage: setExercisePage,
  } = usePagination<Exercise>({
    fetchData: (state) => getPageableExcercises(searchQuery, state.page),
  });

  return {
    exercises,
    loadingExercises,
    totalExercisePages,
    lastExercisePage,
    firstExercisePage,
    exercisePage,
    setExercisePage,
    onSearchExercises,
  };
}
