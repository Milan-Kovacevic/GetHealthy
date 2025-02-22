import { ProgramFilters, TrainingProgram } from "@/api/models/training-program";
import { usePagination } from "@/hooks/use-pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useProgramFilters from "./use-program-filters";
import { getPageableTrainingPrograms } from "@/api/services/training-program-service";

export type TrainingProgramsState = {
  programs: TrainingProgram[];
  loading: boolean;
  totalPages: number;
  isLastPage: boolean;
  isFirstPage: boolean;
  currentPage: number;
  filters: ProgramFilters;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onPageChange: (page: number) => void;
  onApplyFilters: (filters: ProgramFilters) => void;
  onSearch: () => void;
  onMoreTrainingPrograms: () => void;
};

export default function useTrainingPrograms() {
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
      return getPageableTrainingPrograms(searchQuery, state.page, filters);
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
  } as TrainingProgramsState;
}
