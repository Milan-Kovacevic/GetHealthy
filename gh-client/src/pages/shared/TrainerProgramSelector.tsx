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
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronsDownIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

type TrainerProgramSelectorProps = {
  onProgramSelected: (program?: TrainerProgram) => void;
  programs: TrainerProgram[];
  text: string;
  className?: string;
};

export default function TrainerProgramSelector(
  props: TrainerProgramSelectorProps
) {
  const { onProgramSelected, text, programs, className } = props;
  const [open, setOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<TrainerProgram>();

  const handeProgramSelected = (program?: TrainerProgram) => {
    setOpen(false);
    onProgramSelected(program);
    setSelectedProgram(program);
  };
  useEffect(() => {}, [selectedProgram]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between font-normal truncate", className)}
        >
          {text}

          {selectedProgram ? (
            <div
              className="px-0 opacity-50 hover:opacity-75"
              onClick={() => handeProgramSelected(undefined)}
            >
              <XIcon />
            </div>
          ) : (
            <ChevronsDownIcon className="opacity-50" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command className="">
          {programs.length > 0 && (
            <CommandInput placeholder="Search for programs ..." />
          )}
          <CommandList className="w-[320px]">
            <CommandEmpty className="text-sm font-mediun italic text-muted-foreground p-3 px-4">
              No training programs to show.
            </CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[200px] max-h-[200px]">
                {programs.map((program: any) => (
                  <CommandItem
                    key={program.id}
                    value={`${program.name}`}
                    onSelect={() => {
                      handeProgramSelected(program);
                    }}
                  >
                    {program.name}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
