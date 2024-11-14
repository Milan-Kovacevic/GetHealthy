import { Fragment, useEffect, useState } from "react";
import { Search } from "../shared/Search";
import { TrainingProgramCard } from "./components/TrainingProgramCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { SelectContent } from "@radix-ui/react-select";
import CategoryService, { Category } from "@/api/services/CategoryService";
import FilterModal from "./components/FilterModal";

type TrainingProgramLayoutProps = {
  myTrainingPrograms: boolean;
};

export const TrainingProgramLayout = (props: TrainingProgramLayoutProps) => {
  const [myTrainingPrograms, setMyTrainingPrograms] = useState(false);
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);

  const service = new TrainingProgramService();

  const [categories, setCategories] = useState<Category[]>([]);

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
      const data = await service.get();
      setPrograms(data);
    }

    fetchTP();
  }, []);

  useEffect(() => {
    setMyTrainingPrograms(props.myTrainingPrograms);

    return () => {};
  }, [myTrainingPrograms]);

  return (
    <section className="relative overflow-hidden px-2 h-full">
      <div className="container mx-auto my-auto h-full">
        <div className="mx-auto flex flex-col py-10">
          <div className="flex justify-between  m-3 mb-5">
            <p className="text-3xl">Trening programi</p>
            {myTrainingPrograms === true && (
              <Fragment>
                <Button>
                  <PlusIcon></PlusIcon>
                </Button>
              </Fragment>
            )}
          </div>
          <hr></hr>
          <div className="flex justify-between">
            <Search updateList={setPrograms} service={service}></Search>
            <FilterModal service={service} updateList={setPrograms}></FilterModal>
          </div>
          <hr></hr>
          <div className="grid gap-6 p-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-7">
            {programs.map((item) => (
              <TrainingProgramCard
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
