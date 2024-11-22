import { Fragment, useEffect, useState } from "react";
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
import FilterModal from "./components/FilterModal";
import { Separator } from "@/components/ui/separator";
import SortByButton from "../shared/SortByButton";
import FeaturedTrainingPrograms from "./components/FeaturedTrainingPrograms";
import { TrainingProgramFilters } from "./components/TrainingProgramFilters";

type TrainingProgramLayoutProps = {
  myTrainingPrograms: boolean;
};

export const TrainingProgramLayout = (props: TrainingProgramLayoutProps) => {
  const [myTrainingPrograms, setMyTrainingPrograms] = useState(false);
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);

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

    fetchTP();
  }, []);

  useEffect(() => {
    setMyTrainingPrograms(props.myTrainingPrograms);

    return () => {};
  }, [myTrainingPrograms]);

  return (
    <section className="relative overflow-hidden md:px-2 sm:px-4 px-6 h-full pt-8 pb-10">
      <div className="container mx-auto my-auto h-full space-y-5">
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
              {/* <div className="flex justify-between gap-2">
                <FilterModal
                  setData={setFilter}
                  service={service}
                ></FilterModal>
                <SortByButton
                  setData={setSort}
                  service={service}
                ></SortByButton>
              </div> */}
              <h2 className="text-lg font-semibold mb-0 mt-6">Filters</h2>
              <TrainingProgramFilters />
            </div>
            <div className="grid gap-x-6 gap-y-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-1">
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
  return (
    <div className="flex justify-between">
      <div className="space-y-0.5">
        <p className="text-2xl font-bold">Training Programs</p>
        <p className="text-muted-foreground text-sm">
          Browse and explore your perfect training program today.
        </p>
      </div>
      {showCreate && (
        <Button variant={"secondary"} className="self-end">
          <PlusIcon className="text-primary"></PlusIcon>
          Create program
        </Button>
      )}
    </div>
  );
};
