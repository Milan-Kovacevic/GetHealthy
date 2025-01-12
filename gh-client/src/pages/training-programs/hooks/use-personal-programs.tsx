import { TrainingProgram } from "@/api/models/training-program";
import { usePagination } from "@/hooks/use-pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useProgramFilters from "./use-program-filters";
import {
  getPageableTrainingProgramsForUser,
  removeTrainingProgram,
} from "@/api/services/training-program-service";
import { TrainingProgramsState } from "./use-training-programs";
import { toast } from "sonner";

export default function usePersonalTrainingPrograms(userId: number) {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q");
  const page = searchParams.get("p");

  const [searchQuery, setSearchQuery] = useState(query ?? "");
  const { filters, onApplyProgramFilters } = useProgramFilters();

  const onSearchTrainingPrograms = () => {
    searchParams.set("q", searchQuery);
    setSearchParams(searchParams);
    loadMoreTrainingPrograms();
  };

  const onProgramsPageChange = (page: number) => {
    searchParams.set("p", page.toString());
    setSearchParams(searchParams);
    setCurrentProgramPage(page);
  };

  const onRemoveTrainingProgram = (programId: number) => {
    removeTrainingProgram(programId).then(() => {
      loadMoreTrainingPrograms();
      toast.info("Selected program removed successfully.");
    });
  };

  useEffect(() => {
    loadMoreTrainingPrograms();
  }, [filters]);

  const {
    data: trainingPrograms,
    isLoading: loadingPrograms,
    onLoadMoreData: loadMoreTrainingPrograms,
    totalPages: totalProgramPages,
    last: lastProgramPage,
    first: firstProgramPage,
    page: currentProgramPage,
    setPage: setCurrentProgramPage,
  } = usePagination<TrainingProgram>({
    fetchData: (state) => {
      return getPageableTrainingProgramsForUser(
        userId,
        searchQuery,
        state.page,
        filters
      );
    },
    initialPage: parseInt(page ?? "0"),
  });

  return {
    programs: trainingPrograms,
    loading: loadingPrograms,
    totalPages: totalProgramPages,
    isLastPage: lastProgramPage,
    isFirstPage: firstProgramPage,
    currentPage: currentProgramPage,
    filters: filters,
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
    onPageChange: onProgramsPageChange,
    onApplyFilters: onApplyProgramFilters,
    onSearch: onSearchTrainingPrograms,
    onMoreTrainingPrograms: loadMoreTrainingPrograms,
    onRemoveTrainingProgram,
  } as TrainingProgramsState & {
    onRemoveTrainingProgram: (programId: number) => void;
  };
}
