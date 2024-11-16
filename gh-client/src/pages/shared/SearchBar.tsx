import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchProps = {
  setData: any;
  service: any;
};

export const SearchBar = (props: SearchProps) => {
  return (
    <div className="relative w-full max-w-sm">
      <Input
        type="text"
        className="pl-10"
        onChange={(e) => props.setData(e.target.value)}
        placeholder="Search..."
      ></Input>
      <Search
        className={
          "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform transition-opacity duration-200"
        }
      />
    </div>
  );
};
