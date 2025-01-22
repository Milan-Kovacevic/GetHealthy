import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import FeaturedTrainingPrograms from "./components/FeaturedTrainingPrograms";
import { TrainingProgramFilters } from "./components/TrainingProgramFilters";
import { useNavigate } from "react-router-dom";
import { CircleBackgroundBlob } from "../shared/BackgroundBlobs";
import { Category } from "@/api/models/category";
import { SearchBar } from "@/components/primitives/SearchBar";
import { TrainingProgramsState } from "./hooks/use-training-programs";
import { getAllCategories } from "@/api/services/category-service";
import TrainingProgramsPagination from "./components/TrainingProgramsPagination";
import PageHeadingLayout from "@/layouts/PageHeadingLayout";

type TrainingProgramLayoutProps = {
  showFeatures: boolean;
  showCreate: boolean;
  state: TrainingProgramsState;
  children: ReactNode; // Programs section
};

export const TrainingProgramLayout = (props: TrainingProgramLayoutProps) => {
  const { showFeatures, showCreate, state, children } = props;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingCategories(true);
    getAllCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .finally(() => setLoadingCategories(false));
  }, []);

  const handleCreateProgram = () => {
    navigate("/programs/create");
  };

  return (
    <PageHeadingLayout
      title="Training Programs"
      description="Browse and explore your perfect training program today."
      actions={
        showCreate ? (
          <Button
            variant={"secondary"}
            className="self-end"
            onClick={handleCreateProgram}
          >
            <PlusIcon className="text-primary"></PlusIcon>
            <span className="sm:block hidden">Create program</span>
          </Button>
        ) : undefined
      }
    >
      <>
        {showFeatures && <FeaturedTrainingPrograms />}
        <div className="flex lg:flex-row flex-col lg:gap-8 gap-2">
          {/* Filters and search bar */}
          <div className="flex flex-col my-4 mb-0 pr-4 lg:border-r lg:border-b-0 border-b pb-4">
            <SearchBar
              query={state.searchQuery}
              setQuery={state.setSearchQuery}
              onSearch={state.onSearch}
            />

            <h2 className="text-lg font-semibold mb-0 mt-6">Filters</h2>
            <TrainingProgramFilters
              filters={state.filters}
              categories={categories}
              loadingCategories={loadingCategories}
              onFilterApply={state.onApplyFilters}
            />
          </div>
          {children}
        </div>
        <div className="mt-10">
          <TrainingProgramsPagination
            currentPage={state.currentPage}
            isFirst={state.isFirstPage}
            isLast={state.isLastPage}
            onPageChange={state.onPageChange}
            totalPages={state.totalPages}
          />
        </div>
      </>
    </PageHeadingLayout>
  );
};
