import { TrainerProgram } from "@/api/models/training-program";
import { getPageableProgramsForTrainer } from "@/api/services/training-program-service";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import useAuth from "@/hooks/use-auth";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ChevronsUpDownIcon, Loader2Icon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

type TrainerProgramSelectorProps = {
  onProgramSelected: (program?: TrainerProgram) => void;
  text: string;
  className?: string;
  selectedValue?: TrainerProgram; // Controlled vs Uncontrolled component...
};

export default function TrainerProgramSelector(
  props: TrainerProgramSelectorProps
) {
  const { onProgramSelected, text, className, selectedValue } = props;
  const [open, setOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<
    TrainerProgram | undefined
  >(selectedValue ?? undefined);
  const auth = useAuth();
  const userId = auth.getUserId();
  if (!userId) return;

  const {
    data: programs,
    hasMore: hasMorePrograms,
    isLoading: isLoadingPrograms,
    onPageChange: onProgramsPageChange,
  } = useInfiniteScroll<TrainerProgram>({
    fetchData: (state) => {
      return getPageableProgramsForTrainer(userId, state.page);
    },
  });

  useEffect(() => {
    if (selectedValue) {
      setSelectedProgram(selectedValue);
    }
  }, [selectedValue]);

  const handeProgramSelected = (program?: TrainerProgram) => {
    setOpen(false);
    onProgramSelected(program);
    setSelectedProgram(program);
  };

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
            <ChevronsUpDownIcon className="opacity-50" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command className="">
          {programs.length > 0 && (
            <CommandInput placeholder="Search for programs ..." />
          )}
          <CommandList className="w-[320px]">
            <CommandEmpty className="text-sm text-center italic text-muted-foreground p-5">
              No training programs to show.
            </CommandEmpty>
            <CommandGroup>
              <ScrollArea>
                <div className="max-h-[200px] w-full">
                  <div className="flex w-full flex-col items-center">
                    {programs.map((program) => (
                      <CommandItem
                        className={cn(
                          "w-full",
                          selectedProgram?.id == program.id &&
                            "bg-accent/50 text-accent-foreground border-primary border-b rounded-b-none"
                        )}
                        key={program.id}
                        value={program.name}
                        onSelect={() => handeProgramSelected(program)}
                      >
                        <div className="p-0.5">
                          <p className="leading-none font-normal">
                            {program.name}
                          </p>
                          <p className="text-muted-foreground text-[11px]">
                            Created{" "}
                            {formatDistanceToNow(program.createdAt, {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </CommandItem>
                    ))}
                    <InfiniteScroll
                      hasMore={hasMorePrograms}
                      isLoading={isLoadingPrograms}
                      next={onProgramsPageChange}
                      threshold={1}
                    >
                      {hasMorePrograms && (
                        <Loader2Icon className="my-2 h-5 w-5 animate-spin text-muted-foreground" />
                      )}
                    </InfiniteScroll>
                  </div>
                </div>
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
