import { useEffect, useState } from "react";
import { SearchBar } from "../shared/SearchBar";
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
import TrainingProgramService, {
  TrainingProgram,
} from "@/api/services/TrainingProgramService";
import CategoryService, { Category } from "@/api/services/CategoryService";
import { Separator } from "@/components/ui/separator";
import FeaturedTrainingPrograms from "./components/FeaturedTrainingPrograms";
import { TrainingProgramFilters } from "./components/TrainingProgramFilters";
import { TrainingProgramsLoader } from "./components/TrainingProgramsLoaders";
import { useNavigate } from "react-router-dom";

type TrainingProgramLayoutProps = {
  myTrainingPrograms: boolean;
};

export const TrainingProgramLayout = (props: TrainingProgramLayoutProps) => {
  const [myTrainingPrograms, setMyTrainingPrograms] = useState(false);
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const [searchString, setSearchString] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("asc");

  const service = new TrainingProgramService();

  useEffect(() => {
    async function updateList() {
      var list = await service.getFilteredPrograms(searchString, filter, sort);
      console.log(list);
      setPrograms(list);
    }
    updateList();
  }, [searchString, filter, sort]);

  useEffect(() => {
    async function fetchCategories() {
      let categoryService = new CategoryService();
      const data = await categoryService.get();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchTP() {
      const data = await service.getFilteredPrograms("", "All", "asc");
      setPrograms(data!);
    }
    // Mocked for now...
    new Promise((resolve) => setTimeout(resolve, 3000)).then(() =>
      fetchTP().then(() => {
        setLoading(false);
      })
    );
  }, []);

  useEffect(() => {
    setMyTrainingPrograms(props.myTrainingPrograms);

    return () => {};
  }, [myTrainingPrograms]);

  return (
    <section className="container mx-auto relative overflow-hidden sm:px-5 px-4 pt-8 pb-10">
      <div className="h-full space-y-5">
        <div className="mx-auto flex flex-col">
          <TrainingProgramsPageTitle showCreate={myTrainingPrograms} />
          <Separator className="my-4" />
          {!myTrainingPrograms && <FeaturedTrainingPrograms />}
          {!myTrainingPrograms && (
            <>
              <div className="space-y-0.5">
                <h2 className="text-2xl font-medium">Training programs</h2>
              </div>
              <Separator className="my-4" />
            </>
          )}

          <div className="flex lg:flex-row flex-col lg:gap-8 gap-2">
            <div className="flex flex-col my-6 pr-4 lg:border-r lg:border-b-0 border-b pb-4">
              <SearchBar
                setData={setSearchString}
                service={service}
              ></SearchBar>

              <h2 className="text-lg font-semibold mb-0 mt-6">Filters</h2>
              <TrainingProgramFilters />
            </div>

            {loading ? (
              <TrainingProgramsLoader />
            ) : (
              <div className="grid mt-5 gap-x-6 gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 flex-1">
                {programs.map((item) => (
                  <TrainingProgramCard
                    rating={4.4}
                    categories={[item.category]}
                    key={item.id}
                    editable={props.myTrainingPrograms}
                    title={item.title}
                    description={item.description}
                    id={item.id}
                    difficulty={item.difficulty}
                    image="https://cdn-icons-png.flaticon.com/512/9584/9584876.png"
                    trainer="Bruce Wayne"
                  ></TrainingProgramCard>
                ))}
              </div>
            )}
          </div>

          <Pagination className="mt-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
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
        <p className="text-2xl font-bold">Training Programs</p>
        <p className="text-muted-foreground text-sm">
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
