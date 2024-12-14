"use client";

import { useEffect, useState } from "react";
import { RangedSlider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FilterIcon, XIcon } from "lucide-react";
import { Category } from "@/api/models/category";
import { getAllCategories } from "@/api/services/category-service";

type FilterProps = {
  setFilters: any;
};

export function TrainingProgramFilters(props: FilterProps) {
  const [sortBy, setSortBy] = useState("name-asc");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("");
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [participantsRange, setParticipantsRange] = useState([0, 1000]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      setCategories(await getAllCategories());
    }
    fetchCategories();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <aside className="lg:w-64 mt-3 flex lg:flex-col md:flex-row flex-col flex-1 gap-6">
      <div className="space-y-5 lg:flex-none flex-1">
        <div>
          <h3 className="text-sm font-medium mb-2">Sort By</h3>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="date-asc">Date (Oldest first)</SelectItem>
              <SelectItem value="date-desc">Date (Newest first)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.category.id}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={category.category.id.toString()}
                  checked={selectedCategories.includes(
                    category.category.id.toString()
                  )}
                  onCheckedChange={() =>
                    handleCategoryChange(category.category.id.toString())
                  }
                />
                <Label htmlFor={category.category.id.toString()}>
                  {category.category.categoryName}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5 lg:flex-auto flex-1">
        <div>
          <h3 className="text-sm font-medium mb-2">Difficulty</h3>
          <RadioGroup value={difficulty} onValueChange={setDifficulty}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="1" />
              <Label htmlFor="beginner">Beginner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="2" />
              <Label htmlFor="intermediate">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="3" />
              <Label htmlFor="advanced">Advanced</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Rating</h3>
          <RangedSlider
            min={0}
            max={5}
            step={0.5}
            value={ratingRange}
            onValueChange={setRatingRange}
            className="mt-2"
          />
          <div className="flex justify-between mt-2 text-sm">
            <span>{ratingRange[0]}</span>
            <span>{ratingRange[1]}</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Number of Participants</h3>
          <RangedSlider
            min={0}
            max={1000}
            step={10}
            value={participantsRange}
            onValueChange={setParticipantsRange}
            className="mt-2"
          />
          <div className="flex justify-between mt-2 text-sm">
            <span>{participantsRange[0]}</span>
            <span>{participantsRange[1]}</span>
          </div>
        </div>
        <div className="flex gap-2 justify-end pt-3">
          <Button
            variant="secondary"
            className=""
            onClick={() =>
              props.setFilters(
                categories,
                difficulty,
                ratingRange,
                participantsRange,
                sortBy
              )
            }
          >
            <FilterIcon />
            Apply
          </Button>
          <Button variant="outline" className="">
            <XIcon />
            Clear
          </Button>
        </div>
      </div>
    </aside>
  );
}
