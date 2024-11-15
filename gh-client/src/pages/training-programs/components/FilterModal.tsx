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
import CategoryService, { Category } from "@/api/services/CategoryService";

type FilterProps = {
  updateList: any;
  service: any;
};

export default function FilterModal(props: FilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function fetchCategories() {
      let categoryService = new CategoryService();
      const data = await categoryService.get();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  async function filter(event: any) {
    setCategory(event);
    let data = await props.service.filter(event);
    props.updateList(data);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="m-3">Filter</Button>
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
                  <SelectItem value={category.title}>
                    {category.title}
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
