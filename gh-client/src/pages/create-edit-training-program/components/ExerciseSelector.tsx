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
import { Check, ChevronsUpDown } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";

type ExerciseSelectorProps = {
  exercises: any;
  form: any;
  formPath?: string;
  disableSearch?: boolean;
  comboBoxOpen: boolean;
  setComboBoxOpen: (value: boolean) => void;
  placeholder?: string;
  onSelect?: (value: any) => void;
  selectedExercises: any;
};

const ExerciseSelector = ({
  exercises,
  form,
  formPath = "",
  disableSearch,
  comboBoxOpen,
  setComboBoxOpen,
  placeholder,
  onSelect,
  selectedExercises,
}: ExerciseSelectorProps) => {
  const exercisesPath = formPath ? `${formPath}.exercises` : "exercises";
  return (
    <FormField
      control={form.control}
      name={`${exercisesPath}`}
      render={({ field }) => (
        <FormItem className="space-y-[2px]">
          <FormLabel>Exercises</FormLabel>
          <FormControl>
            <Popover open={comboBoxOpen} onOpenChange={setComboBoxOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={comboBoxOpen}
                  className="w-full justify-between"
                >
                  Select exercises
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  {!disableSearch && (
                    <CommandInput placeholder={`${placeholder}`} />
                  )}
                  <CommandList>
                    <CommandEmpty>No items found.</CommandEmpty>
                    <CommandGroup>
                      {exercises.map((item: any, index: any) => (
                        <CommandItem
                          key={index}
                          value={item.value}
                          onSelect={() => {
                            const newExercise = {
                              ...item,
                              name: item.label,
                              sets: [],
                            };
                            // field.onChange([...field.value, newExercise]);
                            onSelect?.(newExercise);
                          }}
                        >
                          {item.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              selectedExercises?.some(
                                (selected: any) => selected.id === item.id
                              )
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormDescription>Add exercises to workout</FormDescription>
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

export default ExerciseSelector;
