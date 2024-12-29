import {
  FeaturedTrainingProgram,
  ProgramFilters,
  TrainingProgram,
} from "@/api/models/training-program";
import {
  getFeaturedTrainingPrograms,
  getPageableTrainingPrograms,
} from "@/api/services/training-program-service";
import { usePagination } from "@/hooks/use-pagination";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useTrainingPrograms() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q");
  const page = searchParams.get("p");
  const sort = searchParams.get("s");
  const categories = searchParams.get("cs");
  const difficulty = searchParams.get("d");
  const pRng = searchParams.get("prng");
  const rRng = searchParams.get("rrng");

  const participantsRange = pRng?.split("-").map((item) => parseInt(item)) ?? [
    0, 1000,
  ];
  const ratingRange = rRng?.split("-").map((item) => parseInt(item)) ?? [0, 5];

  const defaultProgramFilters: ProgramFilters = {
    sort: sort ?? "name-asc",
    categories: categories?.split(",") ?? [],
    difficulty: parseInt(difficulty ?? "-1"),
    participantsRange: participantsRange,
    ratingRange: ratingRange,
  };

  const [searchQuery, setSearchQuery] = useState(query ?? "");
  const [filters, setFilters] = useState<ProgramFilters>(defaultProgramFilters);

  const onApplyProgramFilters = (filters: ProgramFilters) => {
    searchParams.set("s", filters.sort);
    searchParams.set("cs", filters.categories.join(","));
    searchParams.set("d", filters.difficulty.toString());
    searchParams.set(
      "prng",
      `${filters.participantsRange[0]}-${filters.participantsRange[1]}`
    );
    searchParams.set(
      "rrng",
      `${filters.ratingRange[0]}-${filters.ratingRange[1]}`
    );
    setSearchParams(searchParams);
    setFilters(filters);
  };

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
    fetchData: (state) =>
      getPageableTrainingPrograms(searchQuery, state.page, filters),
    initialPage: parseInt(page ?? "0"),
  });

  return {
    trainingPrograms,
    loadingPrograms,
    totalProgramPages,
    lastProgramPage,
    firstProgramPage,
    currentProgramPage,
    programFilters: filters,
    programsSearchQuery: searchQuery,
    setProgramsSearchQuery: setSearchQuery,
    onProgramsPageChange,
    onApplyProgramFilters,
    onSearchTrainingPrograms,
    loadMoreTrainingPrograms,
  };
}
