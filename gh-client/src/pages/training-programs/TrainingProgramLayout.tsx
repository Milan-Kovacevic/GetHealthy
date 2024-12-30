import { useEffect, useState } from "react";
import { TrainingProgramCard } from "./components/TrainingProgramCard";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import FeaturedTrainingPrograms from "./components/FeaturedTrainingPrograms";
import { TrainingProgramFilters } from "./components/TrainingProgramFilters";
import { TrainingProgramsLoader } from "./components/TrainingProgramsLoaders";
import { useNavigate } from "react-router-dom";
import { CircleBackgroundBlob } from "../shared/BackgroundBlobs";
import { Category } from "@/api/models/category";
import { SearchBar } from "@/components/primitives/SearchBar";
import useTrainingPrograms from "./hooks/use-training-programs";
import { getAllCategories } from "@/api/services/category-service";

type TrainingProgramLayoutProps = {
  myTrainingPrograms: boolean;
};

export const TrainingProgramLayout = (props: TrainingProgramLayoutProps) => {
  const [myTrainingPrograms, setMyTrainingPrograms] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    trainingPrograms,
    currentProgramPage,
    lastProgramPage,
    programsSearchQuery,
    programFilters,
    firstProgramPage,
    loadingPrograms,
    totalProgramPages,
    setProgramsSearchQuery,
    onApplyProgramFilters,
    onProgramsPageChange,
    onSearchTrainingPrograms,
  } = useTrainingPrograms();

  // TODO: nemam pojma sta ovo radi
  useEffect(() => {
    getAllCategories().then((categories) => {
      setCategories(categories);
    });

    setMyTrainingPrograms(props.myTrainingPrograms);
    return () => {};
  }, [myTrainingPrograms]);

  return (
    <section className="overflow-hidden relative sm:px-5 px-4 pt-8 pb-10">
      {/* <TopBackgroundBlob /> */}
      <CircleBackgroundBlob
        variant="lighter"
        className="left-auto -right-56 w-80 h-96 top-44"
      />
      <CircleBackgroundBlob
        variant="lightest"
        className="-left-72 w-1/4 h-96 top-44"
      />
      <CircleBackgroundBlob variant="lightest" />
      <CircleBackgroundBlob
        variant="lightest"
        className="-bottom-24 -right-16 w-1/3 h-96 left-auto"
      />
      <div className="container mx-auto h-full space-y-5 z-10 relative">
        <div className="mx-auto flex flex-col">
          <TrainingProgramsPageTitle showCreate={myTrainingPrograms} />
          <Separator className="my-4" />
          {!myTrainingPrograms && <FeaturedTrainingPrograms />}
          <div className="flex lg:flex-row flex-col lg:gap-8 gap-2">
            <div className="flex flex-col my-6 pr-4 lg:border-r lg:border-b-0 border-b pb-4">
              <SearchBar
                query={programsSearchQuery}
                setQuery={setProgramsSearchQuery} // todo
                onSearch={onSearchTrainingPrograms}
              />

              <h2 className="text-lg font-semibold mb-0 mt-6">Filters</h2>
              <TrainingProgramFilters
                filters={programFilters}
                categories={categories}
                onFilterApply={onApplyProgramFilters}
              />
            </div>

            {loadingPrograms ? (
              <TrainingProgramsLoader />
            ) : (
              <div className="grid mt-5 gap-x-6 gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 flex-1">
                {trainingPrograms.map((item) => (
                  <TrainingProgramCard
                    rating={item.rating}
                    categories={item.categories.map((c) => c.categoryName)}
                    key={item.id}
                    editable={props.myTrainingPrograms}
                    title={item.name}
                    description={item.description}
                    id={item.id}
                    createdAt={item.createdAt}
                    difficulty={item.difficulty}
                    image={item.imageFilePath}
                    trainer={`${item.trainerFirstName} ${item.trainerLastName}`}
                  ></TrainingProgramCard>
                ))}
              </div>
            )}
          </div>

          <Pagination className="mt-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onProgramsPageChange(currentProgramPage - 1)}
                  className={
                    firstProgramPage
                      ? "pointer-events-none opacity-50 cursor-default"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {[...Array(totalProgramPages)]
                .map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      className="cursor-pointer"
                      onClick={() => onProgramsPageChange(i)}
                      isActive={currentProgramPage === i}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))
                .slice(
                  Math.max(0, currentProgramPage - 3),
                  Math.min(totalProgramPages, currentProgramPage + 2)
                )}
              {currentProgramPage + 2 < totalProgramPages && (
                <PaginationItem>
                  <PaginationEllipsis
                    className="cursor-pointer"
                    onClick={() => onProgramsPageChange(currentProgramPage + 2)}
                  />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => onProgramsPageChange(currentProgramPage + 1)}
                  className={
                    lastProgramPage
                      ? "pointer-events-none opacity-50 cursor-default"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
};

const TrainingProgramsPageTitle = ({ showCreate }: { showCreate: boolean }) => {
  const navigate = useNavigate();

  const handleCreateProgram = () => {
    navigate("/programs/create");
  };

  return (
    <div className="flex justify-between">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Training Programs</h2>
        <p className="text-muted-foreground">
          Browse and explore your perfect training program today.
        </p>
      </div>
      {showCreate && (
        <Button
          variant={"secondary"}
          className="self-end"
          onClick={handleCreateProgram}
        >
          <PlusIcon className="text-primary"></PlusIcon>
          Create program
        </Button>
      )}
    </div>
  );
};
