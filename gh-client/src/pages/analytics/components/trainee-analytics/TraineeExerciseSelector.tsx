import { ExerciseListingItem } from "@/api/models/exercise";
import { getPageableExerciseListing } from "@/api/services/exercise-service";
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
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon, Loader2Icon, XIcon } from "lucide-react";
import { useState } from "react";

type TraineeExerciseSelectorProps = {
  onExerciseSelected: (exercise?: ExerciseListingItem) => void;
  className?: string;
};

export default function TraineeExerciseSelector(
  props: TraineeExerciseSelectorProps
) {
  const { onExerciseSelected, className } = props;
  const [open, setOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] =
    useState<ExerciseListingItem>();

  const {
    data: exercises,
    hasMore,
    isLoading,
    onPageChange,
  } = useInfiniteScroll<ExerciseListingItem>({
    fetchData: (state) => {
      return getPageableExerciseListing("", state.page);
    },
  });

  const handeExerciseSelected = (exercise?: ExerciseListingItem) => {
    setOpen(false);
    onExerciseSelected(exercise);
    setSelectedExercise(exercise);
  };

  const dropdownText = selectedExercise
    ? `${selectedExercise.exerciseName}`
    : "Select exercise ...";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between font-normal truncate", className)}
        >
          {dropdownText}

          {selectedExercise ? (
            <div
              className="px-0 opacity-50 hover:opacity-75"
              onClick={() => handeExerciseSelected(undefined)}
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
          {exercises.length > 0 && (
            <CommandInput placeholder="Search for exercises..." />
          )}
          <CommandList className="w-[320px]">
            {!isLoading && (
              <CommandEmpty className="text-sm font-mediun italic text-muted-foreground p-3 px-4">
                There are no exercises to show ...
              </CommandEmpty>
            )}

            <CommandGroup>
              <ScrollArea>
                <div className="max-h-[200px] w-full">
                  <div className="flex w-full flex-col items-center">
                    {exercises.map((exercise) => (
                      <CommandItem
                        className={cn(
                          "w-full",
                          selectedExercise?.id == exercise.id &&
                            "bg-accent/50 text-accent-foreground border-primary border-b rounded-b-none"
                        )}
                        key={exercise.id}
                        value={exercise.exerciseName}
                        onSelect={() => handeExerciseSelected(exercise)}
                      >
                        <div className="p-0.5">
                          <p className="leading-none font-normal">
                            {exercise.exerciseName}
                          </p>
                          <div className="leading-tight flex flex-row gap-1.5 mt-0.5 items-center">
                            <p className="text-muted-foreground text-xs lowercase">
                              {`${exercise.firstExerciseMetric.name}`}
                            </p>
                            {exercise.secondExerciseMetric && (
                              <>
                                <span className="text-muted-foreground text-sm">
                                  •
                                </span>
                                <span className="lowercase text-muted-foreground text-xs">
                                  {exercise.secondExerciseMetric.name}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                    <InfiniteScroll
                      hasMore={hasMore}
                      isLoading={isLoading}
                      next={onPageChange}
                      threshold={1}
                    >
                      {hasMore && (
                        <Loader2Icon className="my-4 h-5 w-5 animate-spin text-muted-foreground" />
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
