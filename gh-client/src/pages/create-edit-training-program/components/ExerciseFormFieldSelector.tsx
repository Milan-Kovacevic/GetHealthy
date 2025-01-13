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
import { ChevronsUpDown } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExercisePlanItem } from "@/api/models/exercise";
import { useEffect, useState } from "react";
import { getAllExcercises } from "@/api/services/exercise-service";

type ExerciseFormFieldSelectorProps = {
  form: any;
  errors?: any;
  exercisesPath: string;
  disableSearch?: boolean;
  onSelect?: (exercise: ExercisePlanItem) => void;
};

const ExerciseFormFieldSelector = ({
  form,
  errors,
  exercisesPath,
  disableSearch,
  onSelect,
}: ExerciseFormFieldSelectorProps) => {
  const [selectedExercise, setSelectedExercise] = useState<ExercisePlanItem>();
  const [open, setOpen] = useState(false);
  const [exercises, setExercises] = useState<ExercisePlanItem[]>([]);

  useEffect(() => {
    getAllExcercises().then((exercises) => {
      var mappedExercises: ExercisePlanItem[] = exercises.map((item) => ({
        name: item.exerciseName,
        id: item.id,
        firstExerciseMetric: item.firstExerciseMetric,
        secondExerciseMetric: item.secondExerciseMetric,
        sets: [],
      }));
      setExercises(mappedExercises);
    });
  }, []);

  const handeExerciseSelected = (exercise?: ExercisePlanItem) => {
    if (!exercise) return;
    setOpen(false);
    onSelect?.(exercise);
    setSelectedExercise(exercise);
  };

  const hasError =
    form.watch(exercisesPath)?.length == 0 &&
    (errors?.message || errors?.root?.message);

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
                  className={cn(
                    "justify-between w-full font-normal truncate text-foreground/75",
                    selectedExercise && "text-foreground"
                  )}
                >
                  Select exercises
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[20rem] p-0">
                <Command>
                  {!disableSearch && (
                    <CommandInput placeholder="Search exercise ..." />
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
                                value={item.name}
                                className={cn("w-full")}
                                onSelect={() => handeExerciseSelected(item)}
                              >
                                {item.name}
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

          {hasError ? (
            <p className="text-xs font-normal text-destructive">
              {errors?.message ?? errors?.root?.message}
            </p>
          ) : (
            <FormDescription className="text-xs ml-0.5">
              Add exercises to workout
            </FormDescription>
          )}
        </FormItem>
      )}
    ></FormField>
  );
};

export default ExerciseFormFieldSelector;
