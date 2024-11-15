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
  disableSearch?: boolean;
  comboBoxOpen: boolean;
  setComboBoxOpen: (value: boolean) => void;
  placeholder?: boolean;
  onSelect: (value: any) => void;
  selectedExercises: any;
};

const ExerciseSelector = ({
  exercises,
  form,
  disableSearch,
  comboBoxOpen,
  setComboBoxOpen,
  placeholder,
  onSelect,
  selectedExercises,
}: ExerciseSelectorProps) => {
  return (
    <FormField
      control={form.control}
      name="exercises"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Select exercises</FormLabel>
          <FormControl>
            <Popover open={comboBoxOpen} onOpenChange={setComboBoxOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={comboBoxOpen}
                  className="w-full justify-between"
                >
                  Select exercises ...
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
                      {exercises.map((item: any) => (
                        <CommandItem
                          key={item.id}
                          value={item.name}
                          onSelect={() => {
                            // onSelect(item.id);
                            field.onChange([...field.value, item]);
                          }}
                        >
                          {item.name}
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
          <FormDescription></FormDescription>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    ></FormField>
  );
};

export default ExerciseSelector;
