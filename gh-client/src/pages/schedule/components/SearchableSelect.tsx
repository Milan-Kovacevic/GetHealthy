import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

interface SearchableSelectProps {
  options: Option[];
  placeholder?: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const SearchableSelectt: React.FC<SearchableSelectProps> = ({
  options,
  placeholder = "Select an option",
  onValueChange,
  className,
}) => {
  const [search, setSearch] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredOptions(
      options.filter((option) => option.label.toLowerCase().includes(value))
    );
  };

  return (
    <div className={className}>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-auto">
          {/* Input for search */}
          <div className="p-2">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search..."
              className="w-full border p-2 rounded-md"
              autoFocus // Ensures the input is always focused when the dropdown opens
              onKeyDown={(e) => e.stopPropagation()} // Prevents Radix from intercepting keys
            />
          </div>
          {/* List of options */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchableSelectt;
