import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type SearchProps = {
  updateList: any;
  service: any;
};

export const Search = (props: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    var list = await props.service.search(searchQuery);
    console.log(list);
    props.updateList(list);
    console.log("Searching for:", searchQuery);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex max-w-sm items-start justify-start m-3 mb-4 space-x-2"
    >
      <Input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit" size="icon">
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
};
