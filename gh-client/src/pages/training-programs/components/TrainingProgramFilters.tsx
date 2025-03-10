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
import { FilterIcon, ListCheckIcon, XIcon } from "lucide-react";
import { Category } from "@/api/models/category";
import { ProgramFilters } from "@/api/models/training-program";
import { ScrollArea } from "@/components/ui/scroll-area";

type TrainingProgramFiltersProps = {
  filters: ProgramFilters;
  categories: Category[];
  loadingCategories: boolean;
  onFilterApply: (filters: ProgramFilters) => void;
};

export function TrainingProgramFilters(props: TrainingProgramFiltersProps) {
  const { filters, categories, onFilterApply, loadingCategories } = props;
  const [sortBy, setSortBy] = useState(filters.sort);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string>();
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [participantsRange, setParticipantsRange] = useState([0, 1000]);

  useEffect(() => {}, []);

  const handleClearAllSelectedCategories = () => {
    setSelectedCategories([]);
  };

  const handleSelectAllCategories = () => {
    setSelectedCategories([...categories.map((c) => c.name)]);
  };

  const handleCategoryChange = (categoryId: number) => {
    const category = categories.find((c) => c.categoryId == categoryId);
    if (!category) return;

    setSelectedCategories((prev) =>
      prev.includes(category.name)
        ? prev.filter((c) => c !== category?.name)
        : [...prev, category.name]
    );
  };

  const handleApplyProgramFilters = () => {
    onFilterApply({
      categories: selectedCategories,
      difficulty: difficulty ? parseInt(difficulty) : -1,
      ratingRange,
      participantsRange,
      sort: sortBy,
    });
  };

  const handleClearProgramFilters = () => {
    setSelectedCategories([]);
    setDifficulty("");
    setRatingRange([0, 5]);
    setParticipantsRange([0, 1000]);
    setSortBy("name-asc");

    onFilterApply({
      categories: [],
      difficulty: -1,
      ratingRange: [0, 5],
      participantsRange: [0, 1000],
      sort: "name-asc",
    });
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
              <SelectItem value="createdAt-asc">Date (Oldest first)</SelectItem>
              <SelectItem value="createdAt-desc">
                Date (Newest first)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2 relative">
            <h3 className="text-sm font-medium">Categories</h3>
            {!loadingCategories && categories.length > 0 && (
              <div className="flex items-center gap-0 h-6 right-0">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-auto py-1.5 px-1.5 translate-y-0.5"
                  onClick={() => handleSelectAllCategories()}
                >
                  <ListCheckIcon className="text-foreground/80" />
                </Button>
                {selectedCategories.length > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-auto py-1.5 px-1.5 translate-y-0.5"
                    onClick={handleClearAllSelectedCategories}
                  >
                    <XIcon className="text-foreground/70" />
                  </Button>
                )}
              </div>
            )}
          </div>
          {loadingCategories ? (
            <div className="pb-5">
              <p className="text-muted-foreground italic text-sm">Loading...</p>
            </div>
          ) : categories.length == 0 ? (
            <p className="text-sm italic text-muted-foreground">
              No categories to show...
            </p>
          ) : (
            <ScrollArea className="">
              <div className="space-y-2.5 max-h-[200px]">
                {categories.map((category) => (
                  <div
                    key={category.categoryId}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      className="border-primary/75"
                      id={`category-${category.categoryId.toString()}`}
                      checked={selectedCategories.includes(category.name)}
                      onCheckedChange={() =>
                        handleCategoryChange(category.categoryId)
                      }
                    />
                    <Label
                      className="cursor-pointer font-normal"
                      htmlFor={`category-${category.categoryId.toString()}`}
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>

      <div className="space-y-5 lg:flex-auto flex-1">
        <div>
          <h3 className="text-sm font-medium mb-2">Difficulty</h3>
          <RadioGroup value={difficulty} onValueChange={setDifficulty}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="beginner" />
              <Label className="font-normal cursor-pointer" htmlFor="beginner">
                Beginner
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="intermediate" />
              <Label
                className="font-normal cursor-pointer"
                htmlFor="intermediate"
              >
                Intermediate
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="advanced" />
              <Label className="font-normal cursor-pointer" htmlFor="advanced">
                Advanced
              </Label>
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
            onClick={handleApplyProgramFilters}
          >
            <FilterIcon />
            Apply
          </Button>
          <Button
            variant="outline"
            className=""
            onClick={handleClearProgramFilters}
          >
            <XIcon />
            Clear
          </Button>
        </div>
      </div>
    </aside>
  );
}
