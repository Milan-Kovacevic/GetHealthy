import { Category } from "@/api/models/category";
import { ProgramFilters } from "@/api/models/training-program";
import { getAllCategories } from "@/api/services/category-service";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useProgramFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("s");
  const cats = searchParams.get("cs");
  const difficulty = searchParams.get("d");
  const pRng = searchParams.get("prng");
  const rRng = searchParams.get("rrng");

  const participantsRange = pRng?.split("-").map((item) => parseInt(item)) ?? [
    0, 1000,
  ];
  const ratingRange = rRng?.split("-").map((item) => parseInt(item)) ?? [0, 5];

  const defaultProgramFilters: ProgramFilters = {
    sort: sort ?? "name-asc",
    categories: cats?.split(",") ?? [],
    difficulty: parseInt(difficulty ?? "-1"),
    participantsRange: participantsRange,
    ratingRange: ratingRange,
  };

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

  return { filters, onApplyProgramFilters };
}
