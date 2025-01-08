import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterIcon } from "lucide-react";
import { Category } from "@/api/models/category";
import { getAllCategories } from "@/api/services/category-service";

type FilterProps = {
  setData: any;
  service: any;
};

export default function FilterModal(props: FilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function fetchCategories() {
      const data = await getAllCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  async function filter(event: any) {
    setCategory(event);
    props.setData(event);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          <FilterIcon></FilterIcon>
          <p>Filter</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Select value={category} onValueChange={filter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => {
                return (
                  <SelectItem key={category.categoryId} value={category.name}>
                    {category.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
