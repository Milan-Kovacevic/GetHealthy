import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

type SearchBarProps = {
  query: string;
  setQuery?: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export const SearchBar = (props: SearchBarProps) => {
  const { placeholder, query, setQuery, className, onSearch, disabled } = props;
  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        disabled={disabled}
        type="search"
        placeholder={placeholder ?? "Search..."}
        className="pl-8"
        value={query}
        onChange={(e) => {
          if (setQuery) setQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (onSearch && e.key === "Enter") onSearch();
        }}
      />
    </div>
  );
};
