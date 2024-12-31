import { TrainerProgram } from "@/api/models/training-program";
import { getAllTrainingProgramsForTrainer } from "@/api/services/training-program-service";
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
import { ChevronsDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

type TrainerProgramSelectorProps = {
  onProgramSelected: (program: TrainerProgram) => void;
  programs: TrainerProgram[];
  text: string;
};

export default function TrainerProgramSelector(
  props: TrainerProgramSelectorProps
) {
  const { onProgramSelected, text, programs } = props;
  const [open, setOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<TrainerProgram>();

  const handeProgramSelected = (program: TrainerProgram) => {
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
          className="w-full justify-between font-normal truncate"
        >
          {text}
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
              <ScrollArea className="overflow-y-auto h-[200px]">
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
