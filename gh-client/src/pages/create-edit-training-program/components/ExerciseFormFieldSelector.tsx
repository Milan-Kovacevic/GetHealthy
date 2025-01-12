import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2Icon } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../../../components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { ExerciseListing } from "@/api/models/exercise";
import { useState } from "react";

type ExerciseFormFieldSelectorProps = {
  exercises: any[];
  form: any;
  formPath?: string;
  disableSearch?: boolean;
  placeholder?: string;
  onSelect?: (exercise: any) => void;
  initialValue?: any;
};

const ExerciseFormFieldSelector = ({
  exercises,
  form,
  formPath = "",
  disableSearch,
  placeholder,
  onSelect,
  initialValue,
}: ExerciseFormFieldSelectorProps) => {
  const exercisesPath = formPath ? `${formPath}.exercises` : "exercises";
  const [selectedExercise, setSelectedExercise] = useState<any | undefined>(
    initialValue ?? undefined
  );
  const [open, setOpen] = useState(false);

  const handeExerciseSelected = (exercise?: any) => {
    setOpen(false);

    const newExercise = {
      ...exercise,
      name: exercise.label,
      sets: [],
    };
    onSelect?.(newExercise);
    setSelectedExercise(exercise);
  };

  return (
    <FormField
      control={form.control}
      name={`${exercisesPath}`}
      render={({ field }) => (
        <FormItem className="space-y-[2px]">
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("justify-between w-full font-normal truncate")}
                >
                  Select exercises
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[20rem] p-0">
                <Command>
                  {!disableSearch && (
                    <CommandInput placeholder={`${placeholder}`} />
                  )}
                  <CommandList>
                    <CommandEmpty className="text-muted-foreground p-5 text-center text-sm">
                      No items found.
                    </CommandEmpty>
                    <CommandGroup>
                      <ScrollArea>
                        <div className="max-h-[200px] w-full">
                          <div className="flex w-full flex-col items-center">
                            {exercises.map((item) => (
                              <CommandItem
                                key={item.id}
                                value={item.label}
                                className={cn(
                                  "w-full",
                                  selectedExercise?.id == item.id &&
                                    "bg-accent/50 text-accent-foreground border-primary border-b rounded-b-none"
                                )}
                                onSelect={() => handeExerciseSelected(item)}
                              >
                                {item.label}
                              </CommandItem>
                            ))}
                            {/* <InfiniteScroll
                      hasMore={hasMorePrograms}
                      isLoading={isLoadingPrograms}
                      next={onProgramsPageChange}
                      threshold={1}
                    >
                      {hasMorePrograms && (
                        <Loader2Icon className="my-2 h-5 w-5 animate-spin text-muted-foreground" />
                      )}
                    </InfiniteScroll> */}
                          </div>
                        </div>
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormDescription className="text-xs ml-0.5">
            Add exercises to workout
          </FormDescription>
          {form.formState.errors?.[exercisesPath]?.message && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors?.[exercisesPath]?.message}
            </p>
          )}
        </FormItem>
      )}
    ></FormField>
  );
};

export default ExerciseFormFieldSelector;
