import { TrainerProgram } from "@/api/models/training-program";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsDownIcon } from "lucide-react";
import React, { useState } from "react";

type TrainerProgramSelectorProps = {
  programs: TrainerProgram[];
};

export default function TrainerProgramSelector(
  props: TrainerProgramSelectorProps
) {
  const { programs } = props;
  const [selectedProgram, setSelectedProgram] = useState<TrainerProgram>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between font-normal"
        >
          {selectedProgram
            ? selectedProgram.name
            : "Show data for training program..."}
          <ChevronsDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="">
          {programs.length > 0 && (
            <CommandInput placeholder="Search for programs ..." />
          )}
          <CommandList className="w-[300px]">
            <CommandEmpty className="text-sm font-mediun italic text-muted-foreground p-3 px-4">
              No training programs to show.
            </CommandEmpty>
            <CommandGroup>
              {programs.map((program: any) => (
                <CommandItem
                  key={program.id}
                  value={`${program.name}`}
                  onSelect={() => {
                    setSelectedProgram(program);
                  }}
                >
                  {program.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
