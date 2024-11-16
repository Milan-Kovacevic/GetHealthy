import { Button } from "@/components/ui/button";
import { SortAscIcon, SortDescIcon } from "lucide-react";
import { useState } from "react";

type SortProps = {
  setData: any;
  service: any;
};

export default function SortByButton(props: SortProps) {
  const [sortType, setSortType] = useState("asc");

  async function onClick() {
    if (sortType === "asc") {
      setSortType("desc");
      //props.updateList();
    } else {
      setSortType("asc");
      //props.updateList();
    }
    props.setData(sortType);
  }

  return (
    <Button onClick={onClick} variant={"outline"}>
      {sortType === "asc" && (
        <>
          <SortAscIcon></SortAscIcon>{" "}
        </>
      )}
      {sortType === "desc" && (
        <>
          <SortDescIcon></SortDescIcon>
        </>
      )}
      Sort by name
    </Button>
  );
}
