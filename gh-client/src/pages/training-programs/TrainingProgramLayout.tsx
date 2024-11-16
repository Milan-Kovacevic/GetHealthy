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
    <section className="relative overflow-hidden px-2 h-full pb-3">
      <div className="container mx-auto my-auto h-full">
        <div className="mx-auto flex flex-col py-10">
          <div className="flex justify-between m-3 mb-5">
            <div>
              <p className="text-3xl font-semibold">Training Programs</p>
              <p className="text-muted-foreground text-base">
                Browse and explore your perfect training program today.
              </p>
            </div>
            {myTrainingPrograms === true && (
              <Fragment>
                <Button variant={"outline"}>
                  <PlusIcon></PlusIcon>
                  Create program
                </Button>
              </Fragment>
            )}
          </div>
          <Separator></Separator>
          <div className="flex justify-between m-3">
            <SearchBar
              setData={setSearchString}
              service={service}
            ></SearchBar>
            <div className="flex justify-between gap-2">
              <FilterModal
                setData={setFilter}
                service={service}
              ></FilterModal>
              <SortByButton
                setData={setSort}
                service={service}
              ></SortByButton>
            </div>
          </div>
          <Separator></Separator>
          <div className="grid gap-6 p-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
            {programs.map((item) => (
              <TrainingProgramCard
                rating={4.4}
                category={item.category}
                key={item.id}
                myProgram={props.myTrainingPrograms}
                title={item.title}
                description={item.description}
                id={item.id}
                img="https://cdn-icons-png.flaticon.com/512/9584/9584876.png"
                trainer="Bruce Wayne"
              ></TrainingProgramCard>
            ))}
          </div>
        </div>
        <Pagination>
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
    </section>
  );
};
