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
import { getPageableTrainingPrograms } from "@/api/services/training-program-service";
import { TrainingProgram } from "@/api/models/training-program";
import { Category } from "@/api/models/category";
import { SearchBar } from "@/components/primitives/SearchBar";

type TrainingProgramLayoutProps = {
  myTrainingPrograms: boolean;
};

interface ComplexState {
  categories: Category[]; // Replace with the actual Category type
  difficulty: number;
  ratingRange: number[];
  participantsRange: number[];
  sortBy: string;
}

export const TrainingProgramLayout = (props: TrainingProgramLayoutProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [myTrainingPrograms, setMyTrainingPrograms] = useState(false);
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchString, setSearchString] = useState("");

  const [filterParams, setFilterParams] = useState<ComplexState>({
    categories: [],
    difficulty: 0,
    ratingRange: [0, 5],
    participantsRange: [0, 1000],
    sortBy: "name-asc",
  });

  useEffect(() => {
    async function fetchTP() {
      const data = await getPageableTrainingPrograms();
      setPrograms(data.content);
    }
    // Mocked for now...
    new Promise((resolve) => setTimeout(resolve)).then(() =>
      fetchTP().then(() => {
        setLoading(false);
      })
    );
  }, []);

  useEffect(() => {
    async function fetchTP() {
      var sortOpt = filterParams.sortBy.split("-");
      let response = await getPageableTrainingPrograms(
        searchString,
        currentPage - 1,
        filterParams.categories,
        filterParams.difficulty,
        filterParams.ratingRange,
        filterParams.participantsRange,
        sortOpt[0],
        sortOpt[1]
      );
      setPrograms(response.content);
      setTotalPages(response.totalPages);
    }
    fetchTP();
  }, [currentPage, filterParams]);

  async function setFilter(
    categories: Category[],
    difficulty: number,
    ratingRange: number[],
    participantsRange: number[],
    sortBy: string
  ) {
    setFilterParams({
      categories,
      difficulty,
      ratingRange,
      participantsRange,
      sortBy,
    });
  }

  // TODO: nemam pojma sta ovo radi
  useEffect(() => {
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
          {/* {!myTrainingPrograms && (
            <>
              <div className="space-y-0.5">
                <h2 className="text-2xl font-medium">Training programs</h2>
              </div>
              <Separator className="my-4" />
            </>
          )} */}

          <div className="flex lg:flex-row flex-col lg:gap-8 gap-2">
            <div className="flex flex-col my-6 pr-4 lg:border-r lg:border-b-0 border-b pb-4">
              <SearchBar query={searchString} setQuery={setSearchString} />

              <h2 className="text-lg font-semibold mb-0 mt-6">Filters</h2>
              <TrainingProgramFilters setFilters={setFilter} />
            </div>

            {loading ? (
              <TrainingProgramsLoader />
            ) : (
              <div className="grid mt-5 gap-x-6 gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 flex-1">
                {programs.map((item) => (
                  <TrainingProgramCard
                    rating={item.rating}
                    categories={item.categories.map(
                      (c) => c.category.categoryName
                    )}
                    key={item.id}
                    editable={props.myTrainingPrograms}
                    title={item.name}
                    description={item.description}
                    id={item.id}
                    difficulty={item.difficulty.toString()}
                    image="https://cdn-icons-png.flaticon.com/512/9584/9584876.png"
                    trainer={`${item.user.firstName} ${item.user.lastName}`}
                  ></TrainingProgramCard>
                ))}
              </div>
            )}
          </div>

          <Pagination className="mt-10 cursor-pointer">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {[...Array(totalPages)]
                .map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))
                .slice(
                  Math.max(0, currentPage - 3),
                  Math.min(totalPages, currentPage + 2)
                )}
              {currentPage + 2 < totalPages && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
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
    navigate("/create-training-program");
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
